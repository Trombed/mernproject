import React from 'react';
import "../show/show.css";
import Comments from '../show/comments/comments';
import { Link } from 'react-router-dom';

class SingleShow extends React.Component {
    constructor(props) {
        super(props)
        this.imageEnlarge = this.imageEnlarge.bind(this)
        this.likeMeme = this.likeMeme.bind(this)
        this.deleteLikeMeme = this.deleteLikeMeme.bind(this)
        this.likes = this.props.likes
        this.replyMeme = this.replyMeme.bind(this)
     
    }

    componentDidMount(){

    }





    imageEnlarge(e) {
        const img = e.currentTarget.src 
        this.props.openModal(img)
    }

    likeMeme(id) {
        this.props.createNewLike(`${id}`)
    }

    deleteLikeMeme(id) {
        this.props.deleteOldLike(id)
    }

    replyMeme(e, id) {
        e.preventDefault()
        const body = document.getElementById(id).value
        const comment = {
            id,
            body
        }
        this.props.composeReply(comment)
    }





    render() {

    

            return (
                <div></div>
            )

    }
}

export default SingleShow;
