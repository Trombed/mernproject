import React from 'react';

class RandomMeme extends React.Component {

    constructor(props) {
        super(props);
    }

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