import React from 'react';
import "../show/show.css"
import {Link} from "react-router-dom"

class IndividualShow extends React.Component {
    constructor(props) {
        super(props)
        this.imageEnlarge = this.imageEnlarge.bind(this)
        this.likeMeme = this.likeMeme.bind(this)
        this.deleteLikeMeme = this.deleteLikeMeme.bind(this)
        this.likes = this.props.likes
        this.replyMeme = this.replyMeme.bind(this)
     
    }

    componentDidMount(){
        this.props.fetchMeme(this.props.match.params.id)  
    
    }


    componentDidUpdate (prevProp) {
       if (prevProp.likes !== this.props.likes 
        ) {
        
           this.props.fetchMeme(this.props.params.match.id)
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



    render() {
       
        let content = this.props.singleMeme.map( meme => {
        const userLiked = meme.likes.some( user => user._id === this.props.currentUser.id)
        const likedMeme = (( this.likes[meme._id] || userLiked) ? 
        <div className='Individual-Likes' onClick={ ()=> this.deleteLikeMeme(meme._id)}>
        <img src="fire.svg" className="Meme-Like-Icon" alt="UNLIKE" />
        </div>
        :
        <div className='Individual-Likes' onClick={ ()=> this.likeMeme(meme._id)}>
                LIKE!
         </div>)

            return (
            <div key={meme._id} className="Individual-Meme-Container">
                <div className='Individual-Name'>
                    <Link to={meme.user._id}>
                    {meme.user.username}
                    </Link>
                     POSTED:
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

export default IndividualShow;
