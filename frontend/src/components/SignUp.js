import React, { Component } from 'react';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            userName: "",
        };
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
    }

    createAccount() {

    }

    handleFirstName(e) {
        this.setState({firstName: e.target.value});
    }

    handleLastName(e) {
        this.setState({lastName: e.target.value});
    }

    handleUserName(e) {
        this.setState({userName: e.target.value});
    }

    render() {
        return (
            <div className='container'>
                <form className='sign-up-form'>
                    <div className="group">      
                        <input type="text" onChange={this.handleFirstName} required />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>First Name</label>
                    </div>
                    
                    <div className="group">      
                        <input type="text" onChange={this.handleLastName} required />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Last Name</label>
                    </div>

                    <div className="group">      
                        <input type="text" onChange={this.handleUserName} required />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>User Name</label>
                    </div>
                    <button
                        type="button"
                        className='create-button'
                        onClick={this.createAccount}
                    >
                        Create Account
                    </button>
                </form>
            </div>
            
        );
    }
}
