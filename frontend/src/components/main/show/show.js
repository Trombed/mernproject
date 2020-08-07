import React from 'react';
import "./show.css"
import { Link } from 'react-router-dom'

class ShowPage extends React.Component {
    constructor(props) {
        super(props)
        this.imageEnlarge = this.imageEnlarge.bind(this)
        this.likeMeme = this.likeMeme.bind(this)
        this.deleteLikeMeme = this.deleteLikeMeme.bind(this)
        this.likes = this.props.likes
 
    }

    componentDidMount(){
        this.props.fetchMemes()    
    }


    componentDidUpdate (prevProp) {
       if (prevProp.likes !== this.props.likes) {
           this.props.fetchMemes()
       } else if (prevProp.allMemes !== this.props.allMemes) {

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

    noLike() {
        return (
            <div className="Individual-Meme-Like-Not-Sign-In">
                Sign In to Like The Post.
            </div>
        )
    }


    render() {
      

        let content = this.props.allMemes.map( meme => {        
        const userLiked = meme.likes.some( user => user._id === this.props.currentUser.id);
        const likedMeme = (( this.likes[meme._id] || userLiked) ? 
        <div className='Individual-Likes' onClick={ ()=> this.deleteLikeMeme(meme._id)}>
        <img src="fire.png" className="Meme-Like-Icon" alt="UNLIKE" />
        </div>
        :

        <div className='Individual-Likes' onClick={() => this.likeMeme(meme._id)}>
            <img src="nofire.png" className="Meme-Like-Icon-2" alt="LIKE" />
        </div>

        );

        const commentsLength = meme.comments.length

        let viewComments;
            if (commentsLength === 0) {
                viewComments = `No comments yet...`
            } else {
                viewComments = `View all comments `
            }

        let showLike = this.props.loggedIn ?    likedMeme : this.noLike()

            return (
            <div key={meme._id} className="Individual-Meme-Container">
          
            <div className='Individual-Meme-Pic'>
            <img onClick={this.imageEnlarge} src={`${meme.image}`} alt="" />
            </div>
            <div className='Individual-Name'>
                <Link to={`/users/${meme.user._id}`}>
                {meme.user.username + " POSTED"} </Link> 
            </div>
            {/* {likedMeme} */}
            {showLike}
                <div>

                    <Link to={`${meme._id}`}>
                    <div className={`${meme._id}`} id="Comment-Replies" >
                        {viewComments}
                    </div>

                    </Link>
                    
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
