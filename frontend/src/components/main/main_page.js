import React from 'react';
// import GeneratorContainer from './generator/generator_container';
import ShowPageContainer from './show/show_container';
import './mainpage_container.css'
import {Route, Switch} from 'react-router-dom'
import RandomMemes from '../random_memes/random_memes';
import IndividualShowContainer from './individual_show/individual_show_container'
import SingleShowContainer from './single_meme/single_meme_container';

class MainPage extends React.Component {

    render() {
        return (
            <div className="MainPage-Container">
            <Switch> 
                {/* <GeneratorContainer /> */}
                <Route exact path='/' component={ShowPageContainer} />
                <Route exact path='/randommemes' component={RandomMemes} />
                <Route exact path='/users/:id' component={IndividualShowContainer} />
                <Route exact path ='/:id' component={SingleShowContainer} />
            </Switch>
            </div>
        );
    }
}

export default MainPage;