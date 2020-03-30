import React from 'react';
// import GeneratorContainer from './generator/generator_container';
import ShowPageContainer from './show/show_container';
import './mainpage_container.css'
import {Route} from 'react-router-dom'
import RandomMemes from '../random_memes/random_memes';


class MainPage extends React.Component {

    render() {
        return (
            <div className="MainPage-Container">
                {/* <GeneratorContainer /> */}
                <Route exact path='/' component={ShowPageContainer} />
                <Route exact path='/randommemes' component={RandomMemes} />
                </div>
        );
    }
}

export default MainPage;