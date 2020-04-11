import React from "react";
import "./comment.css";
import { Link } from "react-router-dom"


class Comments extends React.Component {

  deleteComment(id, commentId) {
    this.props.deleteComment(id, commentId)
  }
  
  render() {
    const comment = this.props.comments.map( (comment) => {
      const deletePost = (comment.user._id === this.props.user) ? (
        <div>
          <button className="delete-comment" onClick={ () => this.deleteComment(this.props.memeId, comment._id)}>Delete Comment</button>
        </div>
      ) : (
        null
      )
      return (
      <div className={`Comment-Individual-Container ${this.props.id}`} key={comment._id}>
        <div className="Comment-Name">
       <Link to={`/users/${comment.user._id}`}>
        {comment.user.username}:
        </Link>
        </div>

        <div className="Comment-Body">{comment.body}</div>
        <div>{deletePost}</div>
      </div>)
    });
   
    return <div className="Comment-Container">{comment}</div>;
  }
}

export default Comments;
