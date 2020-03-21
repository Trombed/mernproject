import React from 'react';

class RandomMeme extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "random-meme-image">
                <li><img src={this.props.image} alt=""></img></li>
                <li>{this.props.title}</li>
                {/* {this.props.image} */}
            </div>
        )
    }

}

export default RandomMeme;