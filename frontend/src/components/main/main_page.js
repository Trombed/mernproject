import React from 'react';
import GeneratorContainer from './generator/generator_container';
import ShowPageContainer from './show/show_container';
import './mainpage_container.css'

class MainPage extends React.Component {

    render() {
        return (
            <div className="MainPage-Container">
                <GeneratorContainer />
                {/* <ShowPageContainer /> */}
            </div>
        );
    }
}

export default MainPage;