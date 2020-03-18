import React from 'react';
import GeneratorContainer from './generator/generator_container';
import ShowPage from './show/show';


class MainPage extends React.Component {

    render() {
        return (
            <div className="MainPage-Container">
                <GeneratorContainer />
                <ShowPage />
            </div>
        );
    }
}

export default MainPage;