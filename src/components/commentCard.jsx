import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { AiFillDislike, AiFillLike, AiOutlineDelete, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { deleteComment, patchVotes } from "../api";
import userContext from "../contexts/userContext";

const CommentCard = ({ comment_id, comment }) => {
    const {loggedUser} = useContext(userContext);
    const [userVote, setUserVote] = useState(0);
    const [upvoteClicked, setUpvoteClicked] = useState(false);
    const [downvoteClicked, setDownvoteClicked] = useState(false);

    return (
        <article className="comment-card" key={comment.comment_id}>
            <div className="wrapper-votes-card">
            <AiFillLike aria-pressed={upvoteClicked} />
            {userVote + comment.votes}
            <AiFillDislike aria-pressed={downvoteClicked} />
            </div>
            <section className="wrapper-comment-info">
            <div className="comment-card-top">
                <p className="comment-card-author">{comment.author}</p>
                <p className="comment-card-created-at">{comment.created_at}</p>
                {comment.author === loggedUser.username ? (
                    <AiOutlineDelete className="delete-button" onClick={() => {
                        deleteComment(comment.comment_id).then((res) => {if(res === 'No Content') {
                            alert('Your comment was deleted succesfully')
                        }})
                    }}/>
                ) : null}
            </div>
                <p className="comment-card-body">{comment.body}</p>
            </section>
        </article>
    )
};

export default CommentCard;