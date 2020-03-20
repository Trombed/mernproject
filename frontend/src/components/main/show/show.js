import React from 'react';
import "./show.css"

class ShowPage extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.fetchMemes()
        
    }



    render() {
        let content = this.props.allMemes.map( meme => (
            <div key={meme._id} className="Individual-Meme-Container">
                {meme._id}
                <img src={`${meme.image}`} />
            </div>
        ))

        return (
            <div>
               This will be the show pagetestsetset
               {content}
            </div>
        );
    }
}

export default ShowPage;