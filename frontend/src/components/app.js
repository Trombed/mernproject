import React from 'react';
import { AuthRoute} from '../util/route_util';
import {
    Route,
    Switch,
} from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import "./app_container.css";
import ImageModal from './modal/image_modal';
import RandomMemes from '../components/random_memes/random_memes';
import SessionModal from '../../src/components/modal/session_modal';

const App = () => (
    <div className="App-Container">
        <ImageModal />      
        <SessionModal/>
        {/* <header>
            <GreetingContainer />
        </header> */}
        <NavBarContainer />
        <MainPage />
   

    </div>
);

export default App;