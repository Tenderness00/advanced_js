const host = 'https://wedev-api.sky.pro/api/v1/alina-sytova'

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

        // return comments;
        // return appComments;
    })
}

