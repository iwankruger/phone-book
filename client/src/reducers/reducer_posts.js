import _ from 'lodash';
import {FETCH_POSTS, FETCH_POST, DELETE_POST, NEW_CONTACT} from "../actions";
const INITIAL_STATE = {
    activePage: 1,
    itemsCountPerPage: 5,
    totalItemsCount: 100,
    pageRangeDisplayed: 5,
    limit: 5,
    offset: 0
};


export default function (state = INITIAL_STATE, action) {
    switch(action.type){
        case FETCH_POSTS:
            // calculate pagination
            const offset = (action.payload.data.offset)? action.payload.data.offset: 0;
            const page = Math.ceil((offset + action.payload.data.contacts.length) / state.itemsCountPerPage);
            const pagination = { totalItemsCount: action.payload.data.totalRecords, activePage: page };

            return { ...state, contacts: action.payload.data.contacts, ...pagination };
        case FETCH_POST:
            const data = {...action.payload.data.contacts[0], phoneNumbers: action.payload.data.contacts[0]['Phones']}
            return {...state, data: data };
        case NEW_CONTACT:
            console.log(action.payload);
            return {...state};
        default:
            return state;
    }
}