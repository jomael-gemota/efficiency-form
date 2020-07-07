import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Banner from './Banner';
import Title from './Title';
import Content from './Content';
import UserDetails from './UserDetails';

class Form extends Component {
    render() {
        return (
            <div>
                <UserDetails />
                <Banner />
                <Title />
                <Content />
            </div>
        );
    };
};

export default withRouter(Form);