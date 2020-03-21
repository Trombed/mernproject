import React from 'react';

class RandomMeme extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "random-meme-image">
                <img scr={this.props.image}></img>
            </div>
        )
    }

}

export default RandomMeme;