import React from 'react';

class RandomMeme extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "random-meme-image">
                <img scr={this.props.image} alt=""></img>
                {this.props.title}
            </div>
        )
    }

}

export default RandomMeme;