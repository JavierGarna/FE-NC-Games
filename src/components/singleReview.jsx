import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewById, addVotes } from "../api";

const SingleReview = () => {
    const { review_id } = useParams()
    const [review, setReview] = useState([]);
    const [userVote, setUserVote] = useState(0);

    const handleUpvote = () => {
        setUserVote((prevVote) => prevVote + 1);
        addVotes(1, review_id)
    };

    const handleDownvote = () => {
        setUserVote((prevVote) => prevVote - 1);
        addVotes(-1, review_id)
    };

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
                <div className="wrapper-owner-review">
                    <p className="single-review-owner">Posted by {review.owner}</p>
                </div>
                <div className="wrapper-title-review">
                    <h3 className="single-review-title">{review.title}</h3>
                </div>
                <div className="wrapper-img-review">
                    <img className="single-review-img" src={review.review_img_url} alt={review.title}/>
                </div>
                <div className="wrapper-body-review">
                    <p className="single-review-body">{review.review_body}</p>
                </div>
                <div className="wrapper-bottom-review">
                    <p>💬 {review.comment_count} comments</p>
                    <div className="wrapper-votes-review">
                        <button onClick={handleUpvote}>👍</button>
                        {userVote + review.votes}
                        <button onClick={handleDownvote}>👎</button>
                    </div>
                </div>
            </article>
        </main>
    )
};

export default SingleReview;