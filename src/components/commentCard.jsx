import { useContext } from "react";
import { useState } from "react";
import { deleteComment, patchVotes } from "../api";
import userContext from "../contexts/userContext";

const CommentCard = ({ comment_id, comment }) => {
    const {loggedUser} = useContext(userContext);
    const [userVote, setUserVote] = useState(0);
    const [upvoteClicked, setUpvoteClicked] = useState(false);
    const [downvoteClicked, setDownvoteClicked] = useState(false);

    const handleUpvote = () => {
        if (downvoteClicked) {
            setDownvoteClicked(false)
            setUserVote((prevVote) => prevVote + 1);
            patchVotes(1, comment_id).then((res) => {
                if(res.msg) {
                    alert("Oops, something went wrong.")
                }
            })
        }
        if (upvoteClicked) {
            setUpvoteClicked(false)
            setUserVote((prevVote) => prevVote - 1);
            patchVotes(-1, comment_id).then((res) => {
                if(res.msg) {
                    alert("Oops, something went wrong.")
                }
            })
        } else {
            setUpvoteClicked(true)
            setUserVote((prevVote) => prevVote + 1);
            patchVotes(1, comment_id).then((res) => {
                if(res.msg) {
                    alert("Oops, something went wrong.")
                }
            })
        }
    };

    const handleDownvote = () => {
        if (upvoteClicked) {
            setUpvoteClicked(false)
            setUserVote((prevVote) => prevVote - 1);
            patchVotes(-1, comment_id).then((res) => {
                if(res.msg) {
                    alert("Oops, something went wrong.")
                }
            })
        }
        if (downvoteClicked) {
            setDownvoteClicked(false)
            setUserVote((prevVote) => prevVote + 1);
            patchVotes(1, comment_id).then((res) => {
                if(res.msg) {
                    alert("Oops, something went wrong.")
                }
            })
        } else {
            setDownvoteClicked(true)
            setUserVote((prevVote) => prevVote - 1);
            patchVotes(-1, comment_id).then((res) => {
                if(res.msg) {
                    alert("Oops, something went wrong.")
                }
            })
        }
    };

    return (
        <article className="comment-card" key={comment.comment_id}>
            <div className="comment-card-top">
                <p className="comment-card-author">{comment.author}</p>
                <p className="comment-card-created-at">{comment.created_at}</p>
                {comment.author === loggedUser.username ? (
                    <button onClick={() => {
                        deleteComment(comment.comment_id).then((res) => {if(res === 'No Content') {alert('Your comment was deleted succesfully')}})
                    }}>Delete</button>
                ) : null}
            </div>
            <div>
                <p className="comment-card-body">{comment.body}</p>
            </div>
            <div className="comment-card-bottom">
                <button aria-pressed={upvoteClicked} className="upvote" onClick={handleUpvote}>👍</button>
                {userVote + comment.votes}
                <button aria-pressed={downvoteClicked}  className="downvote" onClick={handleDownvote}>👎</button>
            </div>
        </article>
    )
};

export default CommentCard;