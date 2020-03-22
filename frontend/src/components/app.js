import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import MainPage from './main/main_page';
import GreetingContainer from './greeting/greeting_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import "./app_container.css"
import StitchAppContainer from '../components/stitch/stitchApp_container'
import ImageModal from './modal/image_modal';
import Modal from '../../src/components/modal/image_modal';

const App = () => (
    <div className="App-Container">
        <ImageModal />      
        <Modal/>
        <header>
            <GreetingContainer />
        </header>
        <NavBarContainer />
        <MainPage />
        <StitchAppContainer appId='stitchcraft-meme-maker-lxnid' />
        <Switch>
            {/* <AuthRoute exact path="/" component={MainPage} /> */}
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
        </Switch>
    </div>
);

export default App;