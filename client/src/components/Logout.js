import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import '../css/logout.css';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigate: false
        }

        this.onClickLogOut = this.onClickLogOut.bind(this);
    };

    onClickLogOut = () => {
        localStorage.clear('jwt');
        localStorage.clear('email');
        
        this.setState({ navigate: true });
    };

    render() {
        const { navigate } = this.state;

        if (navigate) {
            return <Redirect to="/" push={true} />;
        }

        return <button className="signout" onClick={this.onClickLogOut}>Sign Out</button>;
    };
}

export default Logout;