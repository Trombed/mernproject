import React from 'react';
import RandomMeme from './random_meme';

class RandomMemes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memes: []
        }
    }

    componentDidMount() {
        this.getMemes();
    }

    async getMemes() {
        const response = await fetch(
            `https://api.imgur.com/3/gallery/hot/viral/1`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Client-ID 681400f6e78cb77"
                }
            }
        );
        const result = await response.json();
        this.setState({memes: result.data})

    }
    render() {
        // debugger
        return (
            
            <div> 
                <h1>fjgfjhjhfdjhfdhjahfdjhfjhaj</h1>
                {
                this.state.memes.filter(meme => meme.images_count > 0).map(meme => (
                  
                    <RandomMeme 
                    key={meme.id}
                    title={meme.title}
                    image={meme.images[0].link}/>
                ))
            }
            </div>
        )
    }
}

export default RandomMemes;