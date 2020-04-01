import React from 'react';
import "./show.css"
import Comments from './comments/comments'
import { Link } from 'react-router-dom'

class ShowPage extends React.Component {
    constructor(props) {
        super(props)
        this.imageEnlarge = this.imageEnlarge.bind(this)
        this.likeMeme = this.likeMeme.bind(this)
        this.deleteLikeMeme = this.deleteLikeMeme.bind(this)
        this.likes = this.props.likes
        this.replyMeme = this.replyMeme.bind(this)
        this.collpase = this.collapse.bind(this)
    }

    componentDidMount(){
        this.props.fetchMemes()    
    }


    componentDidUpdate (prevProp) {
       if (prevProp.likes !== this.props.likes) {
           this.props.fetchMemes()
       }
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

    collapse(id){
        var coll = document.getElementsByClassName(`${id}`);
        if (coll.length <= 0) return null;
        
        
        for (let i = 0; i < coll.length; i++) {
          coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if( content === null) {
                return null;
            }
            else if (content.style.display === "block") {
              content.style.display = "none";
            } else {
              content.style.display = "block";
            }
          }
          )}
    }
    



    render() {
        let content = this.props.allMemes.map( meme => {        
        const userLiked = meme.likes.some( user => user._id === this.props.currentUser.id);
        const likedMeme = (( this.likes[meme._id] || userLiked) ? 
        <div className='Individual-Likes' onClick={ ()=> this.deleteLikeMeme(meme._id)}>
                <img src="fire.svg" className="Meme-Like-Icon" alt="UNLIKE" />
        </div>
        :
        <img src="nofire.svg" className="Meme-Like-Icon-2" alt="LIKE" />);
        const comments = (meme.comments.length > 0) ? 
        <Comments comments={meme.comments} id={meme._id}/>
        :
        null;
        const commentsLength = meme.comments.length
        

            return (
            <div key={meme._id} className="Individual-Meme-Container">
                <div className='Individual-Name'>
                <Link to={`/users/${meme.user._id}`}>
                {meme.user.username} POSTED:
                </Link>
                </div>
                <div className='Individual-Meme-Pic'>
                <img onClick={this.imageEnlarge} src={`${meme.image}`} alt="" />
                </div>
                {likedMeme}
                <div className="Individual-Comment">
                
                    <textarea className="Individual-Comment-Box" id={meme._id} placeholder="Add a comment..." />
                    <button onClick={(e) => this.replyMeme(e, meme._id)} >
                        Flame This Post 
                    </button>                
                </div>
                <div>
                    <div className={`${meme._id}`} id="Comment-Replies" onClick={() => this.collapse(`${meme._id}`)}>
                        View Comments: {commentsLength}
                    </div>
                    
                    {comments}
                    
                </div>
            </div>
            )
        })

        return (
            <div className="Fetched-Meme-Container">
               {content}
            </div>
        );
    }
}

export default ShowPage;
