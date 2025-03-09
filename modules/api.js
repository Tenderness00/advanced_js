import { renderLogin } from "./renderLogin.js"

const host = 'https://wedev-api.sky.pro/api/v2/alina-sytovaa'

let token = ''

export const updateToken = (newToken) => {
    token = newToken
}

const authHost = 'https://wedev-api.sky.pro/api/user'

export let fetchComments = () => {
    return fetch(host + '/comments')
    .then((res) => {
        return res.json()
    })
    .then((responseData) => {
        
        const appComments = responseData.comments.map(comments => { 
            return {
                name: comments.author.name,
                date: new Date,
                text: comments.text,
                likes: comments.likes,
                isLiked: false,
            }
        })
        return appComments;
    })
}

export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
    body: JSON.stringify({
        text,
        name,
    }),
    }).then((response) => {
        if (response.status === 500) {
            throw new Error("Ошибка сервера")
        }
        if (response.status === 400){
            throw new Error("Неверный запрос")
        }
        if (response.status === 201) {
            return response.json()
        }
        if (response.status === 401) {
            throw new Error("Пользователь не авторизирован")
        }
    }).then(() => {
        return fetchComments()
    })
}

export function login({ login, password }) {
    return fetch(authHost + '/login', {
        method: 'POST',
        body: JSON.stringify({
            login,
            password
        }),
    }).then((response) => {
        return response.json()
    })
}

export function registration({ login, name, password }) {
    return fetch(authHost, {
        method: 'POST',
        body: JSON.stringify({
            login,
            name,
            password
        }),
    }).then((response) => {
        return response.json()
    })
}