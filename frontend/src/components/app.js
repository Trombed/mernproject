import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import "./app_container.css"
import StitchAppContainer from '../components/stitch/stitchApp_container';
import RandomMemes from '../components/random_memes/random_memes';

const App = () => (
    <div className="App-Container">
        <NavBarContainer />
        <MainPage />
        <StitchAppContainer appId='stitchcraft-meme-maker-lxnid' />
        <RandomMemes />
        <Switch>
            {/* <AuthRoute exact path="/" component={MainPage} /> */}
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
        </Switch>
    </div>
);

export default App;