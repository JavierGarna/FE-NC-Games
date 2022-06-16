import { useEffect, useState, React } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "../api";
import ReviewCard from "./reviewCard";

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
            <section className="review-list">
                {reviews.map((review) => {
                    return (
                        <article className="review-list-article" key={review.review_id}>
                            <ReviewCard review_id={review.review_id} review={review}/>
                        </article>
                    )
                })}
            </section>
        </main>
    )
};

export default ReviewList;