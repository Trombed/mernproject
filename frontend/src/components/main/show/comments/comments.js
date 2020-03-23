import React from "react";
import "./comment.css";
class Comments extends React.Component {
  render() {
    const comment = this.props.comments.map(comment => (
      <div className={`Comment-Individual-Container ${this.props.id}`}>
        <div className="Comment-Name">{comment.user.username} replied:</div>

        <div className="Comment-Body">{comment.body}</div>
      </div>
    ));
    return <div className="Comment-Container">{comment}</div>;
  }
}

export default Comments;
