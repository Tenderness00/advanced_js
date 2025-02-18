
const host = 'https://wedev-api.sky.pro/api/v1/alina-sytovaa'

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
    }).then(() => {
        return fetchComments()
    })
}
