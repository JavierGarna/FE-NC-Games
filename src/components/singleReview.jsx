import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getComments, getReviewById, patchVotes, postComment } from "../api";
import CommentCard from "./commentCard.jsx";
import userContext from "../contexts/userContext";
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

const SingleReview = () => {
    const { review_id } = useParams()
    const [review, setReview] = useState([]);
    const [userVote, setUserVote] = useState(0);
    const [upvoteClicked, setUpvoteClicked] = useState(false);
    const [downvoteClicked, setDownvoteClicked] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState("");
    const { loggedUser } = useContext(userContext);

    const handleUpvote = () => {
        if (downvoteClicked) {
            setDownvoteClicked(false)
            setUserVote((prevVote) => prevVote + 1);
            patchVotes(1, review_id).then((res) => {
                if(res.msg) {
                    alert("Oops, something went wrong.")
                }
            })
        }
        if (upvoteClicked) {
            setUpvoteClicked(false)
            setUserVote((prevVote) => prevVote - 1);
            patchVotes(-1, review_id).then((res) => {
                if(res.msg) {
                    alert("Oops, something went wrong.")
                }
            })
        } else {
            setUpvoteClicked(true)
            setUserVote((prevVote) => prevVote + 1);
            patchVotes(1, review_id).then((res) => {
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
            patchVotes(-1, review_id).then((res) => {
                if(res.msg) {
                    alert("Oops, something went wrong.")
                }
            })
        }
        if (downvoteClicked) {
            setDownvoteClicked(false)
            setUserVote((prevVote) => prevVote + 1);
            patchVotes(1, review_id).then((res) => {
                if(res.msg) {
                    alert("Oops, something went wrong.")
                }
            })
        } else {
            setDownvoteClicked(true)
            setUserVote((prevVote) => prevVote - 1);
            patchVotes(-1, review_id).then((res) => {
                if(res.msg) {
                    alert("Oops, something went wrong.")
                }
            })
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        postComment(review_id, commentInput, loggedUser.username)
    };

    useEffect(() => {
        getReviewById(review_id).then((fetchReview) => {
            setReview(fetchReview)
        });
        getComments(review_id).then((res) => {
            setComments(res)
        });
    }, [review_id]);

    return (
        <main>
            <article className="single-review">
                <div className="wrapper-votes-card">
                    {upvoteClicked ? <AiFillLike aria-pressed={upvoteClicked} onClick={handleUpvote} /> 
                        : <AiOutlineLike aria-pressed={upvoteClicked} onClick={handleUpvote}/>}
                    {userVote + review.votes}
                    {downvoteClicked ? <AiFillDislike aria-pressed={downvoteClicked} onClick={handleDownvote} /> 
                        : <AiOutlineDislike aria-pressed={downvoteClicked} onClick={handleDownvote}/>}
                </div>
                <section className="single-review-info">
                    <p className="single-review-owner">Posted by {review.owner}</p>
                    <h3 className="single-review-title">{review.title}</h3>
                    <img className="single-review-img" src={review.review_img_url} alt={review.title}/>
                    <p className="single-review-body">{review.review_body}</p>
                <div className="wrapper-bottom-review">
                    <section>
                        {comments.map((comment) => {
                            return (
                                <article className="comment-list-article" key={comment.comment_id}>
                                    <CommentCard comment_id={comment.comment_id} comment={comment}/>
                                </article>
                            )
                        })}
                        <article>
                            <form className="comment-form" onSubmit={handleSubmit}>
                                <label>What are your thoughts?</label><input type="text" name="comment-input" id="comment-input" value={commentInput} onChange={(event) => {setCommentInput(event.target.value)}}></input><button type="submit" id="comment-button">Comment</button>
                            </form>
                        </article>
                    </section>
                </div>
                </section>
            </article>
        </main>
    )
};

export default SingleReview;