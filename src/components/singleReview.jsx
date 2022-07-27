import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getComments, getReviewById, patchVotes, postComment } from "../api";
import CommentCard from "./commentCard.jsx";
import userContext from "../contexts/userContext";
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike, AiOutlineSend } from "react-icons/ai";

const SingleReview = () => {
    const { review_id } = useParams()
    const [review, setReview] = useState([]);
    const [userVote, setUserVote] = useState(0);
    const [upvoteClicked, setUpvoteClicked] = useState(false);
    const [downvoteClicked, setDownvoteClicked] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState("");
    const { loggedUser } = useContext(userContext);
    const [errorMsg, setErrorMsg] = useState("");

    const handleUpvote = () => {
        if (downvoteClicked) {
            setDownvoteClicked(false)
            setUserVote((prevVote) => prevVote + 1);
            patchVotes(1, review_id).then((res) => {
                if(res.msg) {
                    alert("Sorry, something went wrong.")
                }
            })
        }
        if (upvoteClicked) {
            setUpvoteClicked(false)
            setUserVote((prevVote) => prevVote - 1);
            patchVotes(-1, review_id).then((res) => {
                if(res.msg) {
                    alert("Sorry, something went wrong.")
                }
            })
        } else {
            setUpvoteClicked(true)
            setUserVote((prevVote) => prevVote + 1);
            patchVotes(1, review_id).then((res) => {
                if(res.msg) {
                    alert("Sorry, something went wrong.")
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
                    alert("Sorry, something went wrong.")
                }
            })
        }
        if (downvoteClicked) {
            setDownvoteClicked(false)
            setUserVote((prevVote) => prevVote + 1);
            patchVotes(1, review_id).then((res) => {
                if(res.msg) {
                    alert("Sorry, something went wrong.")
                }
            })
        } else {
            setDownvoteClicked(true)
            setUserVote((prevVote) => prevVote - 1);
            patchVotes(-1, review_id).then((res) => {
                if(res.msg) {
                    alert("Sorry, something went wrong.")
                }
            })
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        postComment(review_id, commentInput, loggedUser.username).then((fetchComment) => {
            if (fetchComment) {
                alert("Your comment was posted succesfully");
            }
        })
    };

    useEffect(() => {
        getReviewById(review_id).then((fetchReview) => {
            if (typeof fetchReview === 'string') {
                setErrorMsg(fetchReview);
            } else {
                setReview(fetchReview);
                getComments(review_id).then((res) => {
                    if (res !== undefined) {
                        setComments(res)
                    }
                });
            }
        });
    }, [review_id]);

    if (errorMsg) return (
        <section className="error-box">
            <p>Sorry, something went wrong.</p>
        </section>
    )

    return (
        <main className="single-review-page">
            <article className="single-review">
                <div className="wrapper-votes-card">
                    {upvoteClicked ? <AiFillLike aria-pressed={upvoteClicked} onClick={handleUpvote} /> 
                        : <AiOutlineLike aria-pressed={upvoteClicked} onClick={handleUpvote}/>}
                    {userVote + review.votes}
                    {downvoteClicked ? <AiFillDislike aria-pressed={downvoteClicked} onClick={handleDownvote} /> 
                        : <AiOutlineDislike aria-pressed={downvoteClicked} onClick={handleDownvote}/>}
                </div>
                <section className="single-review-info">
                    <div className="single-review-top">
                    <p className="single-review-owner">Posted by {review.owner}</p>
                    <h3 className="single-review-title">{review.title}</h3>
                    </div>
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
                            <form className="comment-form">
                                <textarea className="comment-area" type="text" name="comment-area" id="comment-area" maxLength='270' placeholder="What are your thoughts?" value={commentInput} onChange={(event) => {setCommentInput(event.target.value)}}></textarea>
                                <AiOutlineSend className="comment-submit-button" onClick={handleSubmit} id="comment-button"/>
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