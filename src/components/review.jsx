import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewById } from "../api";

const Review = () => {
    const { review_id } = useParams()
    const [review, setReview] = useState([]);

    useEffect(() => {
        getReviewById(review_id).then((fetchReview) => {
            setReview(fetchReview)
        });
    }, [review_id]);

    if (typeof review === 'string') {
        return <p className="error">Oops, something went wrong.</p>
    }

    return (
        <main>
            <article className="single-review">
                <div className="wrapper">
                    <img className="review-img" src={review.review_img_url} alt={review.title}/>
                </div>
                <div className="wrapper">
                <h3 className="review-title">{review.title}</h3>
                <p className="review-info">
                    Category: {review.category} Designer: {review.designer} Owner: {review.owner} Votes: {review.votes}
                </p>
                <p className="review-body">
                    {review.review_body} 
                </p>
                </div>
            </article>
        </main>
    )
};

export default Review;