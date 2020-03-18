import React from 'react';
import Generator from './generator/generator';
import ShowPage from './show/show';


class MainPage extends React.Component {

    render() {
        return (
            <div className="MainPage-Container">
                <Generator />
                <ShowPage />
            </div>
        );
    }
}

export default MainPage;