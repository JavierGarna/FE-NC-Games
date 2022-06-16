import { useState } from "react";
import { addVotes } from "../api";
import { Link } from 'react-router-dom';

const ReviewCard = ({ review, review_id}) => {
    const [userVote, setUserVote] = useState(0);

    const handleUpvote = () => {
        setUserVote((prevVote) => prevVote + 1);
        addVotes(1, review_id)
    };

    const handleDownvote = () => {
        setUserVote((prevVote) => prevVote - 1);
        addVotes(-1, review_id)
    };

    return (
        <li className="review-card" key={review.review_id}>
            <div className="wrapper-votes-card">
                <button onClick={handleUpvote}>👍</button>
                {userVote + review.votes}
                <button onClick={handleDownvote}>👎</button>
            </div>
            <Link to={`/reviews/${review.review_id}`} key={review.review_id} className="wrapper-review-card">
                <p className="review-card-title">{review.title}</p>
                <img className="review-card-img" src={review.review_img_url} alt={review.title}/>
            </Link>
        </li>
    )
};

export default ReviewCard;