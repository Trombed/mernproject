import React from "react";
import "./comment.css";
import { Link } from "react-router-dom"

class Comments extends React.Component {
  render() {
 
    const comment = this.props.comments.map( (comment, index) => (
      <div className={`Comment-Individual-Container ${this.props.id}`} key={index}>
        <div className="Comment-Name">
       <Link to={`/users/${comment.user._id}`}>
        {comment.user.username} replied:
        </Link> 
        </div>

        <div className="Comment-Body">{comment.body}</div>
      </div>
    ));
    return <div className="Comment-Container">{comment}</div>;
  }
}

export default Comments;
