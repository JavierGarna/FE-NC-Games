import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewById, patchVotes } from "../api";

const SingleReview = () => {
    const { review_id } = useParams()
    const [review, setReview] = useState([]);
    const [userVote, setUserVote] = useState(0);
    const [upvoteClicked, setUpvoteClicked] = useState(false);
    const [downvoteClicked, setDownvoteClicked] = useState(false);    

    const handleUpvote = () => {
        if (downvoteClicked) {
            setDownvoteClicked(false)
            setUserVote((prevVote) => prevVote + 1);
            patchVotes(1, review_id)
        }
        if (upvoteClicked) {
            setUpvoteClicked(false)
            setUserVote((prevVote) => prevVote - 1);
            patchVotes(-1, review_id)
        } else {
            setUpvoteClicked(true)
            setUserVote((prevVote) => prevVote + 1);
            patchVotes(1, review_id)
        }
    };

    const handleDownvote = () => {
        if (upvoteClicked) {
            setUpvoteClicked(false)
            setUserVote((prevVote) => prevVote - 1);
            patchVotes(-1, review_id)
        }
        if (downvoteClicked) {
            setDownvoteClicked(false)
            setUserVote((prevVote) => prevVote + 1);
            patchVotes(1, review_id)
        } else {
            setDownvoteClicked(true)
            setUserVote((prevVote) => prevVote - 1);
            patchVotes(-1, review_id)
        }
    };

    useEffect(() => {
        getReviewById(review_id).then((fetchReview) => {
            setReview(fetchReview)
        });
    }, [review_id]);

    if (typeof review === 'string') {
        return <p className="error">Oops, something went wrong.</p>
    };

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
                        <button aria-pressed={upvoteClicked} className="upvote" onClick={handleUpvote} >👍</button>
                        {userVote + review.votes}
                        <button aria-pressed={downvoteClicked}  className="downvote" onClick={handleDownvote}>👎</button>
                    </div>
                </div>
            </article>
        </main>
    )
};

export default SingleReview;