import React from "react";
import "./comment.css";
import { Link } from "react-router-dom"

class Comments extends React.Component {
  render() {

    const comment = this.props.comments.map( (comment) => (
      
      <div className={`Comment-Individual-Container ${this.props.id}`} key={comment._id}>
        <div className="Comment-Name">
       <Link to={`/users/${comment.user._id}`}>
        {comment.user.username}:
        </Link> 
        </div>

        <div className="Comment-Body">{comment.body}</div>
      </div>
    ));
    console.log(comment)
    return <div className="Comment-Container">{comment}</div>;
  }
}

export default Comments;
