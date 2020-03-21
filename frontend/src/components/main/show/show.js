import React from 'react';
import "./show.css"

class ShowPage extends React.Component {
    constructor(props) {
        super(props)
        this.imageEnlarge = this.imageEnlarge.bind(this)
    }

    componentDidMount(){
        this.props.fetchMemes()    
    }

    imageEnlarge(e) {
//         const img = document.getElementById("Modal-Image")

        const img = e.currentTarget.src 
        this.props.openModal(img)

    }



    render() {
        let content = this.props.allMemes.map( meme => (
            <div key={meme._id} className="Individual-Meme-Container">
                <div className='Individual-Name'>{meme.user.username} POSTED:
                </div>
                <div className='Individual-Meme-Pic'>
                <img onClick={this.imageEnlarge} src={`${meme.image}`} alt="" />
                </div>
                    <div className='Individual-Likes'>
                    LIKE!
                    </div>
                    <div className="Individual-Comment">
                    <textarea className="Individual-Comment-Box" placeholder="Add a comment..." />
                    </div>
            </div>
        ))

        return (
            <div className="Fetched-Meme-Container">
               
               {content}

            </div>
        );
    }
}

export default ShowPage;
