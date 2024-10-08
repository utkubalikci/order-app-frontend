const BASE_URL = "/api/";

export const GET_ALL_PRODUCTS = () => {

    var request = fetch(BASE_URL + 'products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return request
}

export const GET_PRODUCT_BY_CATEGORY_ID = (categoryId) => {
    var request = fetch(BASE_URL + 'products/category/' + categoryId, {
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

export const REMOVE_CART_BY_USER_ID = (userId) => {
    var request = fetch(BASE_URL + 'cart/remove/' + userId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('tokenKey')
        }
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

export const GET_ALL_CATEGORIES = () => {
    var request = fetch(BASE_URL + 'category/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return request
}

export const GET_CATEGORY = (categoryId) => {
    var request = fetch(BASE_URL + 'category/' + categoryId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return request
}


export const CREATE_ORDER_BY_USER_ID = (userId) => {
    var request = fetch(BASE_URL + 'order/createByUserId/' + userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('tokenKey')
        }
    })

    return request
}

export const GET_ORDERS_BY_USER_ID = (userId) => {
    var request = fetch(BASE_URL + 'order/user/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('tokenKey')
        }
    })

    return request
}

export const CONFIRM_ORDER = (orderId) => {
    var request = fetch(BASE_URL + 'order/confirm/' + orderId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('tokenKey')
        }
    })

    return request
}

export const CREATE_PRODUCT = (body) => {
    var request = fetch(BASE_URL + 'products/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('tokenKey')
        },
        body: JSON.stringify(body)
    })

    return request
}

export const CREATE_CATEGORY = (body) => {
    var request = fetch(BASE_URL + 'category/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('tokenKey')
        },
        body: JSON.stringify(body)
    })

    return request
}

export const EDIT_CATEGORY = (body) => {
    var request = fetch(BASE_URL + 'category/edit', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('tokenKey')
        },
        body: JSON.stringify(body)
    })

    return request
}

// export const CREATE_CATEGORY = async (body) => {
//     try {
//         const response = await fetch(BASE_URL + 'category/add', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': localStorage.getItem('tokenKey')
//             },
//             body: JSON.stringify(body)
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error('Error creating category:', error);
//         throw error; // İsteğe bağlı: Hata fırlatma
//     }
// }