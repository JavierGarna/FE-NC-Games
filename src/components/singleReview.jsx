import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getComments, getReviewById, patchVotes, postComment } from "../api";
import CommentCard from "./commentCard.jsx";
import userContext from "../contexts/userContext";

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
                    <div className="wrapper-votes-review">
                        <button aria-pressed={upvoteClicked} className="upvote" onClick={handleUpvote} >👍</button>
                        {userVote + review.votes}
                        <button aria-pressed={downvoteClicked}  className="downvote" onClick={handleDownvote}>👎</button>
                    </div>
                    <section className="comment-list">
                        <article>
                            <form className="comment-form" onSubmit={handleSubmit}>
                                <label>What are your thoughts?</label><input type="text" name="comment-input" id="comment-input" value={commentInput} onChange={(event) => {setCommentInput(event.target.value)}}></input><button type="submit" id="comment-button">Comment</button>
                            </form>
                        </article>
                        {comments.map((comment) => {
                            return (
                                <article className="comment-list-article" key={comment.comment_id}>
                                    <CommentCard comment_id={comment.comment_id} comment={comment}/>
                                </article>
                            )
                        })}
                    </section>
                </div>
            </article>
        </main>
    )
};

export default SingleReview;