import React, { Component } from 'react';

import '../css/userdetails.css';

import Logout from './Logout';

class UserDetails extends Component {
    render() {
        return (
            <div className="user-details-wrapper">
                <Logout />
                Welcome, <strong>{ localStorage.getItem('email') }</strong>!
            </div>
        );
    };
};

export default UserDetails;