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