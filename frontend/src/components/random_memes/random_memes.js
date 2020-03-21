import React from 'react';
import RandromMeme from './random_meme';

class RandomMemes extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    async getMemes() {
        const response = await fetch(
            `https://api.imgur.com/3/gallery/hot/viral/1`
        );
        const data = await response.json();

    }

}

export default RandomMemes;