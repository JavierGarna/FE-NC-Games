import { useEffect, useState, React } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getReviews } from "../api";
import ReviewCard from "./reviewCard";

const ReviewList = () => {
    const { category } = useParams()
    const [reviews, setReviews] = useState([]);
    const [sortBy] = useState(['created_at', 'votes']);
    const [currSearch, setCurrSearch] = useState();
    const [order, setOrder] = useState('asc');
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getReviews(category, currSearch, order).then((fetchReviews) => {
            setReviews(fetchReviews)
            setLoading(false);
        })
    }, [category, order]);

    if (loading) return <p>Loading...</p>

    return (
        <main>
            <article>
            {sortBy.map((data) => {
                return (
                    <button key={data} value={searchParams} onClick={() => {
                        setCurrSearch(data)
                        setSearchParams({sortBy: data, order: order}, {replace: true})
                        if (order === 'asc') {setOrder('desc')} else {setOrder('asc')}
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