import { useState } from "react";
import { patchVotes } from "../api";
import { Link } from 'react-router-dom';

const ReviewCard = ({ review, review_id }) => {
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

    if (typeof review === 'string') {
        return <p className="error">Oops, something went wrong.</p>
    };

    return (
        <li className="review-card" key={review.review_id}>
            <div className="wrapper-votes-card">
                <button aria-pressed={upvoteClicked} className="upvote" onClick={handleUpvote}>👍</button>
                {userVote + review.votes}
                <button aria-pressed={downvoteClicked}  className="downvote" onClick={handleDownvote}>👎</button>
            </div>
            <Link to={`/reviews/${review.review_id}`} key={review.review_id} className="wrapper-review-card">
                <p className="review-card-title">{review.title}</p>
                <img className="review-card-img" src={review.review_img_url} alt={review.title}/>
            </Link>
        </li>
    )
};

export default ReviewCard;