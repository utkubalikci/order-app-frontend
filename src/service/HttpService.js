const BASE_URL = "http://localhost:8080/";

export const GET_ALL_PRODUCTS = () => {

    var request = fetch(BASE_URL + 'products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return request
}

export const LOGIN = (body) => {
    var request = fetch(BASE_URL + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    return request
}

export const REGISTER = (body) => {
    var request = fetch(BASE_URL + 'auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    return request
}

export const GET_USER = (userId) => {
    var request = fetch(BASE_URL + 'users/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('tokenKey')
        }
    })

    return request
}

export const GET_CART = (userId) => {
    var request = fetch(BASE_URL + 'cart/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('tokenKey')
        }
    })

    return request
}

export const GET_CART_ITEMS = (userId) => {
    var request = fetch(BASE_URL + 'cart/products/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('tokenKey')
        }
    })

    return request
}

export const REMOVE_FROM_CART = (body) => {
    var request = fetch(BASE_URL + 'cart/remove', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('tokenKey')
        },
        body: JSON.stringify(body)
    })

    return request
}

export const ADD_TO_CART = (body) => {
    var request = fetch(BASE_URL + 'cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('tokenKey')
        },
        body: JSON.stringify(body)
    })

    return request
}