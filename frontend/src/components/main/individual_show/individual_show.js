import React from 'react';
import "../show/show.css"
import { Link } from 'react-router-dom';

class IndividualShow extends React.Component {
    constructor(props) {
        super(props)
        this.imageEnlarge = this.imageEnlarge.bind(this)
        this.likeMeme = this.likeMeme.bind(this)
        this.deleteLikeMeme = this.deleteLikeMeme.bind(this)
        this.likes = this.props.likes
     
    }

    componentDidMount(){
        this.props.fetchMeme(this.props.match.params.id)  
      
    }
   componentDidUpdate(prevProps){

        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchMeme(this.props.match.params.id)  
        }
          
    }




    imageEnlarge(e) {
        const img = e.currentTarget.src 
        this.props.openModal(img)
    }

    likeMeme(id) {
        this.props.createNewLike(`${id}`)
        .then(res =>  this.props.fetchMeme(this.props.match.params.id) )
    }

    deleteLikeMeme(id) {
        this.props.deleteOldLike(id)
        .then(res =>  this.props.fetchMeme(this.props.match.params.id) )

    }



    noLike() {
        return (
            <div className="Individual-Meme-Like-Not-Sign-In">
                Sign In to Like The Post.
            </div>
        )
    }



    render() {
        let content = this.props.singleMeme.map( meme => {
            const userLiked = meme.likes.some( user => user._id === this.props.currentUser.id)  
            const likedMeme = (( this.likes[meme._id] || userLiked) ? 
                <div className='Individual-Likes' onClick={ ()=> this.deleteLikeMeme(meme._id)}>
               <img src="fire.png" className="Meme-Like-Icon" alt="UNLIKE" />
               </div>
        :

        <img src="nofire.png" className="Meme-Like-Icon-2" alt="LIKE" onClick={ () => this.likeMeme(meme._id) } />);

    
      
        const commentsLength = meme.comments.length

            let viewComments;

            if (commentsLength === 0) {
                viewComments = `No comments yet...`
            // } else if (commentsLength === 1) {
            //     viewComments = `View 1 comment`
            } else {
                viewComments = `View all comments `
            }
            let showLike = this.props.loggedIn ?    likedMeme : this.noLike()
            let date = new Date(meme.date)
            let minutes = date.getMinutes();
            minutes = minutes >  9 ? minutes : "0" + minutes; 
            let hours = date.getHours();
            hours = hours > 9 ? hours : "0" + hours;
            let day = date.getDate()
            let year = date.getFullYear();
            let month = date.getMonth() +1
            return (
            
            <div key={meme._id} className="Individual-Meme-Container">
            <div className='Individual-Name'>
                <Link to={`/users/${meme.user._id}`}>
                    {meme.user.username}
                </Link>
                       posted on {month}/{day}{year} {hours}:{minutes}
                </div>
                <div className='Individual-Meme-Pic'>
                <img onClick={this.imageEnlarge} src={`${meme.image}`} alt="" />
                </div>
            
                {showLike}
             
                <div>
                    <Link to={`/${meme._id}`}>
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

export default IndividualShow;
