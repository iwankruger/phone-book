function validate(values) {
   
    const errors = {};

    // validate values
    if (!values.name) {
        errors.name = 'Enter a name';
    }

    if (!values.surname) {
        errors.surname = 'Enter a surname';
    }

    if (values.phoneNumbers && Array.isArray(values.phoneNumbers)) {
        const phoneNumbers = [];
        for (let i = 0; i < values.phoneNumbers.length; i++) {
            if (!values.phoneNumbers[i] || Object.keys(values.phoneNumbers[i]).length === 0
                || !values.phoneNumbers[i].number || !values.phoneNumbers[i].phoneTypeId
            ) {
                phoneNumbers[i] = 'Enter a phone number and select a type';
            }
        }
        if (phoneNumbers.length > 0) {
            errors.phoneNumbers = phoneNumbers;
            errors.phoneNumbers = { _error: 'Enter a phone number and select a type' }
        }
    }

    if (values.email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(values.email).toLowerCase())) {
            errors.email = 'Enter an email address';
        }
    }

    return errors;
}

export default validate;
