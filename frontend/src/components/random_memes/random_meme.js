import React from 'react';
import './random_meme.css';

class RandomMeme extends React.Component {

 

    render() {
        return (
            <div className = "random-meme">
                <li className = "random-meme-image"><img src={this.props.image} alt=""></img></li>
                {/* <li>{this.props.title}</li> */}
            </div>
        )
    }

}

export default RandomMeme;