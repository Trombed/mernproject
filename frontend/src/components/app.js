import React from 'react';
import NavBarContainer from './nav/navbar_container';
import MainPage from './main/main_page';
import "./app_container.css";
import ImageModal from './modal/image_modal';
import SessionModal from '../../src/components/modal/session_modal';

const App = () => (
    <div className="App-Container">
        <ImageModal />      
        <SessionModal />
  
        <NavBarContainer />
        <MainPage />
   

    </div>
);

export default App;