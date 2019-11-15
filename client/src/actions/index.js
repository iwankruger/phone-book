import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POSTS = 'create_posts';
export const DELETE_POST = 'delete_posts';
export const NEW_CONTACT = 'new_contact';

// this would need to point to the actual server
const ROOT_URL = 'http://localhost:5000/api';

export function fetchContacts(limit, offset) {
    console.log(`${ROOT_URL}/contacts?limit=${limit}&offset=${offset}`);
    const request = axios.get(`${ROOT_URL}/contacts?limit=${limit}&offset=${offset}`);
    return {
        type: FETCH_POSTS,
        payload: request

    }
}

export function createPost(values, callback) {
    const request = axios.post(`${ROOT_URL}/contacts`, values)
        .then(() => {
            callback();
        });

    return {
        type: CREATE_POSTS,
        payload: request

    }
}

export function updatePost(id, values, callback) {
    const request = axios.patch(`${ROOT_URL}/contacts/${id}`, values)
        .then(() => {
            callback();
        });

    return {
        type: CREATE_POSTS,
        payload: request

    }
}

export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/contacts/${id}`);

    return {
        type: FETCH_POST,
        payload: request

    }
}

export function deletePost(id, callback) {
    const request = axios.delete(`${ROOT_URL}/contacts/${id}`)
        .then(() => {
            callback();
        });

    return {
        type: DELETE_POST,
        payload: id

    }
}

export function newForm() {

    const request = {
        contactInfo: [{
            phoneNumbers: '',
            type: ''
        }
        ]
    }

    return {
        type: NEW_CONTACT,
        payload: request

    }
}
