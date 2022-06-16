export const getReviews = (category) => {
    let url = 'https://ncgames-javiergarcia.herokuapp.com/api/reviews';
    if (category) { url += `?category=${category}`};
    return fetch(url)
    .then((res) => {
        return res.json();
    })
    .then((res) => {
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
        if (!res.review) {
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