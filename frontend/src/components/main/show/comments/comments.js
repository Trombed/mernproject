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
      let date = new Date(comment.date)
     
      let minutes = date.getMinutes();
      minutes = minutes >  9 ? minutes : "0" + minutes; 
      let hours = date.getHours();
      hours = hours > 9 ? hours : "0" + hours;
      let month = date.getMonth() + 1
      let day = date.getDate();
      let year = date.getFullYear();
      return (
      <div className={`Comment-Individual-Container ${this.props.id}`} key={comment._id}>
        <div className="Comment-Name">
        <Link to={`/users/${comment.user._id}`}>
        {comment.user.username}
        </Link>
        <span className="Comment-Date">
        commented on: {month}/{day}/{year} {hours}:{minutes}

        </span>
        </div>

        <div className="Comment-Body">{comment.body}</div>
        <div>{deletePost}</div>
      </div>)
    });
   
    return <div className="Comment-Container">{comment}</div>;
  }
}

export default Comments;
