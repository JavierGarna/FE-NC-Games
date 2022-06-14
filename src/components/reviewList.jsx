import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "../api";

const ReviewList = () => {
    const { category } = useParams()
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getReviews(category).then((reviews) => {
            setReviews(reviews)
        })
    }, [category]);


    return (
        <main>
            <ul className="review-list">
                {reviews.map((review) => (
                    <li className="review-card" key={review.review_id}>
                        <h3>{review.title}</h3>
                        <img className="img" src={review.review_img_url} alt={review.title}/>
                        <p>{review.owner}</p>
                    </li>
                ))}
            </ul>
        </main>
    )
};

export default ReviewList;