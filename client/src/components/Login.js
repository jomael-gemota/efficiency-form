import React, { Component } from 'react';
import axios from 'axios';

import '../css/login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            message: '',
            isLoading: ''
        };

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    };

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submit(e) {
        e.preventDefault();

        this.setState({
            isLoading: <i class="fa fa-spinner fa-pulse fa-3x fa-fw loading"></i>
        });

        axios.post('api/user/login', {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            if (res.data.success === 0) {
                this.setState({
                    isLoading: '',
                    message: <p className="login-notif-error">{JSON.stringify(res.data.message)}</p>
                });

                this.props.history.push('/');
            } else {
                this.setState({
                    id: res.data.id,
                    isLoading: '',
                    message: <p className="login-notif-success">{res.data.message}</p>
                });

                localStorage.setItem('jwt', res.data.token);
                localStorage.setItem('email', this.state.email);

                this.props.history.push({
                    pathname: '/view',
                    search: '',
                    state: { id: this.state.id }
                });
            };
        }).catch(error => this.setState({
            isLoading: '',
            message: <p className="login-notif-error">{error}</p>
        }));
    };

    render() {
        const { message, isLoading } = this.state;

        return (
            <div>
                <form onSubmit={e => this.submit(e)}>
                    <h1>Login</h1>
                    <h3>Sign in to your account</h3>
                    <p className="label-name">Username: </p>
                    <div className="input-container">
                        <i class="fas fa-envelope icon"></i>
                        <input type="email" name="email" required onChange={e => this.change(e)} />
                    </div>
                    <p className="label-name">Password: </p>
                    <div className="input-container">
                        <i class="fas fa-key icon"></i>
                        <input type="password" name="password" required onChange={e => this.change(e)} />
                    </div>
                    <button type="submit">Sign In</button>
                    { isLoading }
                </form>
                { message }
            </div>
        );
    };
}

export default Login;