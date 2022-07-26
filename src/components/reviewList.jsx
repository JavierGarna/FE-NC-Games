import { useContext } from "react";
import { useEffect, useState, React } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getReviews } from "../api";
import userContext from "../contexts/userContext";
import ReviewCard from "./reviewCard";

const ReviewList = () => {
    const { category } = useParams();
    const {headerLoading, pageLoading, setPageLoading} = useContext(userContext);
    const [reviews, setReviews] = useState([]);
    const [sortBy] = useState(['created_at', 'votes']);
    const [currSearch, setCurrSearch] = useState();
    const [order, setOrder] = useState('asc');
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        getReviews(category, currSearch, order).then((fetchReviews) => {
            setReviews(fetchReviews)
            setPageLoading(false);
        })
    }, [category, order]);

    if(pageLoading || headerLoading) return null;

    return (
        <main className="homepage">
            <article className="search-buttons">
            {sortBy.map((data) => {
                return (
                    <button className="search-button" key={data} value={searchParams} onClick={() => {
                        setCurrSearch(data)
                        setSearchParams({sortBy: data, order: order}, {replace: true})
                        if (order === 'asc') {setOrder('desc')} else {setOrder('asc')}
                    }}>{data === 'created_at' ? 'Order by date' : `Order by ${data}`}</button>
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