import React from 'react';
import './random_meme.css';

class RandomMeme extends React.Component {

 

    render() {
        return (
            <div className = "random-meme">
                <div className="random-meme-container">

                    <div className="random-meme-image">
                        <img src={this.props.image} alt=""></img>
                    </div>
                    <div className="random-meme-title">{this.props.title}</div>
                </div>
            </div>
        )
    }

}

export default RandomMeme;