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




    



    render() {
        let content = this.props.allMemes.map( meme => {        
        const userLiked = meme.likes.some( user => user._id === this.props.currentUser.id);
        const likedMeme = (( this.likes[meme._id] || userLiked) ? 
        <div className='Individual-Likes' onClick={ ()=> this.deleteLikeMeme(meme._id)}>
                <img src="fire.svg" className="Meme-Like-Icon" alt="UNLIKE" />
        </div>
        :

=======
        <img src="nofire.svg" className="Meme-Like-Icon-2" alt="LIKE" />);
        const comments = (meme.comments.length > 0) ? 
        <Comments comments={meme.comments} id={meme._id}/>
        :
        null;
>>>>>>> master
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
          
                <div>
<<<<<<< HEAD
                    <Link to={`${meme._id}`}>
                    <div className={`${meme._id}`} id="Comment-Replies" >
                        Replies: {commentsLength}
=======
                    <div className={`${meme._id}`} id="Comment-Replies" onClick={() => this.collapse(`${meme._id}`)}>
                        View Comments: {commentsLength}
>>>>>>> master
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
