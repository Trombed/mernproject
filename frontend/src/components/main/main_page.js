import React from 'react';
// import GeneratorContainer from './generator/generator_container';
import ShowPageContainer from './show/show_container';
import './mainpage_container.css'
import {Route} from 'react-router-dom'
import RandomMemes from '../random_memes/random_memes';
import IndividualShowContainer from './individual_show/individual_show_container'
import SingleShow from './single_meme/single_meme';

class MainPage extends React.Component {

    render() {
        return (
            <div className="MainPage-Container">
                {/* <GeneratorContainer /> */}
                <Route exact path='/' component={ShowPageContainer} />
                <Route exact path='/randommemes' component={RandomMemes} />
                <Route exact path='/users/:id' component={IndividualShowContainer} />
                <Route exact oath ='/:id' component={SingleShow} />
                </div>
        );
    }
}

export default MainPage;