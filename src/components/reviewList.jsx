import { useEffect, useState, React } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getReviews } from "../api";
import ReviewCard from "./reviewCard";

const ReviewList = () => {
    const { category } = useParams()
    const [reviews, setReviews] = useState([]);
    const [sortBy] = useState(['created_at', 'comment_count', 'votes']);
    const [currSearch, setCurrSearch] = useState()
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        getReviews(category, currSearch).then((fetchReviews) => {
            setReviews(fetchReviews)
        })
    }, [category, currSearch]);

    return (
        <main>
            <article>
            {sortBy.map((data) => {
                return (
                    <button key={data} value={searchParams} onClick={() => {
                        setCurrSearch(data)
                        setSearchParams(data, { replace: true})
                    }}>{data}</button>
                )
            })}
            </article>
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