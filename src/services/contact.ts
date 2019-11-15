import fs from 'fs';
const Model = require('../../models');

class Contact {

    public static async save(
        contactId: number | null,
        name: string, surname: string,
        email: string | null,
        note: string | null,
        phoneNumbers: Array<object>) {

        const t = await Model.sequelize.transaction();
        try {

            // add contact record
            let data: object = { name, surname };

            if (email) data = { ...data, email };
            if (note) data = { ...data, note };

            // update or create
            if (contactId && !isNaN(contactId)) {
                // if id was provided update
                // update contact record
                const result = await Model.Contact.update(data, { where: { id: contactId }, transaction: t });
                // check for successful update
                if (!result || !Array.isArray(result) || result[0] == 0) {
                    throw new Error('Invalid contact id provided'); 
                }
                // delete all phone numbers for a specific contact record
                await Model.Phone.destroy({ where: { contactId }, transaction: t });
            } else {
                const contact = await Model.Contact.create(data, { transaction: t });
                contactId = contact.get('id');
            }

            // add all phone numbers
            for (let i = 0; i < phoneNumbers.length; i++) {
                const phoneObject = {
                    contactId,
                    number: phoneNumbers[i]['number'],
                    phoneTypeId: phoneNumbers[i]['phoneTypeId'],
                    
                };
                await Model.Phone.create(phoneObject, { transaction: t });
            }
            
            await t.commit();
            
            return true;

        } catch (error) {
            await t.rollback();
            return Promise.reject(error);
        }

    }

    public static async delete(id: number) {
        const t = await Model.sequelize.transaction();
        try {
            // delete all phone numbers for a specific contact record
            await Model.Phone.destroy({ where: { contactId: id }, transaction: t });
            // contact record
            await Model.Contact.destroy({ where: { id }, transaction: t });

            await t.commit();
            
            return true;
        } catch (error) {
            await t.rollback();
            return Promise.reject(error);
        }
    }

    public static async get(id: number | null, limit: number | null, offset: number | null) {
        try {

            // construct query
            const query = {
                order: [
                    ['name', 'ASC']
                ]
            };
            if (!isNaN(id)) { id = Number(id); query['where'] = {id}; }
            if (!isNaN(offset)) {offset = Number(offset); query['offset'] = offset; }
            if (!isNaN(limit)) {limit = Number(limit); query['limit'] = limit; }

            // join contact with phone table
            query['include'] = [{
                model: Model.Phone,
            }];

            // get contact and join with phone numbers
            const contacts = await Model.Contact.findAll(query);

            // get the total count for the query above, will be used for pagination
            const totalRecords = await Model.sequelize.query(`SELECT COUNT(id) as 'count' FROM Contacts`);

            if (!totalRecords || !Array.isArray(totalRecords) || !Array.isArray(totalRecords[0])) {
                return Promise.reject(new Error('Total amount of records could not be retrieved from database'));
            }

            return {
                contacts,
                limit,
                offset,
                totalRecords: totalRecords[0][0].count,
            };

        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }

    }

}

export default Contact;
