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