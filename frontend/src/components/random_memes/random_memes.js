import React from 'react';
import RandomMeme from './random_meme';
import './random_meme.css';

class RandomMemes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memes: [],
            loading: false,
            newMemes: [],
            page: 0
        }
    }

    componentDidMount() {
        this.getMemes();

        window.addEventListener("scroll", (event) => {
            // debugger

            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            let scrollHeight = event.srcElement.body.scrollHeight;

            // console.log(scrollTop, window.outerHeight, scrollHeight, document.body.scrollTop, document.documentElement.scrollTop)
            if (scrollTop + window.outerHeight >= scrollHeight) {
                this.setState({ loading: true });
                setTimeout(() => {
                    this.getMemes();
                }, 2000);
            }
        });
    }

    async getMemes() {
        this.setState({ loading: true });

        let memes = this.state.memes;
        let newMemes = this.state.newMemes;
        let page = this.state.page;

        if (newMemes.length === 0) {

        page +=1;
        const response = await fetch(
            `https://api.imgur.com/3/gallery/hot/viral/${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Client-ID 681400f6e78cb77"
                }
            }
        );
        const result = await response.json();

        newMemes = result.data.filter(meme => meme.images_count > 0 && 
                                      meme.images[0].type.startsWith('image/') && 
                                      meme.images[0].height < 1.6 * meme.images[0].width);
        }

        memes = memes.concat(newMemes.slice(0,10));
        newMemes = newMemes.slice(10);

        this.setState({memes: memes, newMemes: newMemes, page: page, loading: false})

    }
    render() {
        // debugger
        return (
            
            <div>
                <div className="memes" style={{ overflow: "auto" }}> 
                {
                this.state.memes
                            // .filter(meme => meme.images_count > 0 && meme.images[0].type.startsWith('image/'))
                            // .sort(() => 0.5 - Math.random())
                            // .slice(0, 10)
                            .map(meme => (
                                <RandomMeme 
                                key={meme.id}
                                title={meme.title}
                                image={meme.images[0].link}/>
                                ))
                }
                </div>
                {this.state.loading ? <div className="loading"> Loading More Items...</div> : ""}
            </div>
        )
    }
}

export default RandomMemes;