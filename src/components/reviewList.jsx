import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "../api";
import { Link } from 'react-router-dom';

const ReviewList = () => {
    const { category } = useParams()
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getReviews(category).then((fetchReviews) => {
            setReviews(fetchReviews)
        })
    }, [category]);

    return (
        <main>
            <ul className="review-list">
                {reviews.map((review) => (
                    <li className="review-card" key={review.review_id}>
                        <div>
                            <Link to={`/reviews/${review.review_id}`} key={review.review_id} className='title'>{review.title}</Link>
                            <img className="img" src={review.review_img_url} alt={review.title}/>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    )
};

export default ReviewList;