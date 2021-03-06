import React from 'react';
import "../show/show.css";
import Comments from '../show/comments/comments';
import { Link } from 'react-router-dom';
import { closeModal} from '../../../actions/image_modal_actions'

class SingleShow extends React.Component {
    constructor(props) {
        super(props)
        this.imageEnlarge = this.imageEnlarge.bind(this)
        this.likeMeme = this.likeMeme.bind(this)
        this.deleteLikeMeme = this.deleteLikeMeme.bind(this)
        this.likes = this.props.likes
        this.replyMeme = this.replyMeme.bind(this)
     
    }

    componentDidMount() {

        this.props.fetchSingleMeme(this.props.match.params.id)
        closeModal()
        this.props.closeModal();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchSingleMeme(this.props.match.params.id)
        }
    }




    imageEnlarge(e) {
        const img = e.currentTarget.src 
        this.props.openModal(img)
    }

    likeMeme(id) {
        this.props.createNewLike(`${id}`)
        .then( res =>    this.props.fetchSingleMeme(this.props.match.params.id) )
    }

    deleteLikeMeme(id) {
        this.props.deleteOldLike(id)
        .then( res =>    this.props.fetchSingleMeme(this.props.match.params.id) )
    }

    replyMeme(e, id) {
        e.preventDefault()
        const body = document.getElementById(id).value
        const comment = {
            id,
            body
        }
        this.props.composeReply(comment)
        .then( res => this.props.fetchSingleMeme(this.props.match.params.id))
        .then(() => document.getElementById(id).value = "")
    }


    deletePost(id) {
        this.props.deleteMemes(id)
        this.props.history.push("/")
       
    }

    noLike() {
        return (
            <div className="Individual-Meme-Like-Not-Sign-In">
                Sign In to Comment The Post.
            </div>
        )
    }



    render() {
      
        var content = null
        if (Object.values(this.props.oneMeme).length <= 0) {
            content = null 
        } else {
            const meme = this.props.oneMeme;
            const commentsLength = meme.comments.length;
            let date = new Date(meme.date)
            let minutes = date.getMinutes();
            minutes = minutes >  9 ? minutes : "0" + minutes; 
            let hours = date.getHours();
            hours = hours > 9 ? hours : "0" + hours;
           
            let viewComments;

            if (commentsLength === 0) {
                viewComments = `No comments yet...` 
            } else {
                viewComments = `Comments: `
            }

            const userLiked = meme.likes.some( user => user._id === this.props.currentUser.id)
            
             const likedMeme = (( this.likes[meme._id] || userLiked) ? 
                <div className='Individual-Likes' onClick={ ()=> this.deleteLikeMeme(meme._id)}>
                    <img src="fire.png" className="Meme-Like-Icon" alt="UNLIKE" />
                </div>
        :
        <img src="nofire.png" className="Meme-Like-Icon-2" alt="LIKE"  onClick={ () => this.likeMeme(meme._id) } />);
            const deletePost = (meme.user._id === this.props.currentUser.id) ? 
            ( <div className="delete"> 
                <button className="delete-post" onClick={() => this.deletePost(meme._id)}> Delete Post </button> 
              </div>
            ) : (
                null
            )
        let showLike = this.props.loggedIn ?    likedMeme : this.noLike()
        let showReplyBox = !this.props.loggedIn ? ( null) : (
                 <div className="Individual-Comment">
                                <textarea className="Individual-Comment-Box" id={meme._id} placeholder="Add a comment..." />
                                <button className="flame" onClick={(e) => this.replyMeme(e, meme._id)} >
                                    Reply: 
                                </button>                
                </div>
        )
        content = (

                <div key={meme._id} className="Individual-Meme-Container">
                <div className='Individual-Name'>
                <Link to={`/users/${meme.user._id}`}>
                    {meme.user.username} posted on {date.getMonth() +1}/{date.getDate()}/{date.getFullYear()} {hours}:{minutes}
                </Link>
                     
                </div>
                <div className='Individual-Meme-Pic'>
                <img onClick={this.imageEnlarge} src={`${meme.image}`} alt="" />
                </div>
                {showLike}
                {showReplyBox}
           
                <div>
                    <div className={`${meme._id}`} id="Comment-Replies" >
                        {viewComments}
                    </div>
                         <Comments comments={meme.comments} user={this.props.currentUser.id} deleteComment={this.props.deleteUserComment}
                         memeId={meme._id}
                         />
                  
                    <div>
                        {deletePost}
                    </div>
                </div>
        </div>
                
            )
        }
        

            return (
            <div className="Fetched-Meme-Container">{content}</div>
            )

    }
}

export default SingleShow;
