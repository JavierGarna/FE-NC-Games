export const getReviews = (category, sortBy, order) => {
    let url = 'https://ncgames-javiergarcia.herokuapp.com/api/reviews';
    let symbol = '?'
    if (category) {
        url += `?category=${category}` 
        symbol='&'
    };
    if (sortBy) {
        url += `${symbol}sort_by=${sortBy}`
        symbol='&'
    };
    url += `${symbol}order=${order}`

    return fetch(url)
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        if (res.msg) {return res.msg}
        return res.reviews;
    });
};

export const getCategories = () => {
    return fetch('https://ncgames-javiergarcia.herokuapp.com/api/categories')
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        return res.categories;
    });
};

export const getReviewById = (review_id) => {
    return fetch(`https://ncgames-javiergarcia.herokuapp.com/api/reviews/${review_id}`)
    .then((res) => {
        return res.json()
    })
    .then((res) => {
        if (res.msg) {
            return res.msg
        }
        return res.review;
    })
};

export const patchVotes = (likes, review_id) => {
    return fetch(`https://ncgames-javiergarcia.herokuapp.com/api/reviews/${review_id}`, {
        method: 'PATCH',
        body: JSON.stringify({ inc_votes: likes}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((res) => {
        return res.json()
    })
    .then((res) => {
        if (!res.review) {
            return res;
        }
        return res.review;
    });
};

export const getComments = (review_id) => {
    return fetch(`https://ncgames-javiergarcia.herokuapp.com/api/reviews/${review_id}/comments`)
    .then((res) => {
        return  res.json()
    })
    .then((res) => {
        return res.comments;
    })
};

export const postComment = (review_id, body, username) => {
    return fetch(`https://ncgames-javiergarcia.herokuapp.com/api/reviews/${review_id}/comments`, {
        method: 'POST',
        body: JSON.stringify({ body, username}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((res) => {
        return res.json()
    })
    .then((res) => {
        if (!res.comment) {
            alert('You need to log in!')
        } else {
            return res.comment;
        }
    })
};

export const getUsers = () => {
    let url = 'https://ncgames-javiergarcia.herokuapp.com/api/users';
    return fetch(url)
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        return res.users;
    })
};

export const deleteComment = (comment_id) => {
    let url = `https://ncgames-javiergarcia.herokuapp.com/api/comments/${comment_id}`;
    return fetch(url, {method: 'DELETE'})
    .then((res) => {
        return res.statusText;
    })
}