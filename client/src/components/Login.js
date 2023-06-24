import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import { ACCESS_LEVEL_GUEST, SERVER_HOST } from "../config/global_constants"
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';


export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            isLoggedIn: false
        }
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleSubmit = (e) => {
        axios.post(`${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`)
            .then(res => {
                // default if not logged in
                sessionStorage.name = "GUEST"
                sessionStorage.accessLevel = ACCESS_LEVEL_GUEST
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else // user successfully logged in
                    {
                        console.log("User logged in")

                        sessionStorage.name = res.data.name
                        sessionStorage.accessLevel = res.data.accessLevel

                        this.setState({ isLoggedIn: true })
                    }
                }
                else {
                    console.log("Login failed")
                }
            })
    }


    render() {
        return (
            <form className="login-box" noValidate={true} id="loginOrRegistrationForm">
                <h1>Login</h1>

                {this.state.isLoggedIn ? <Redirect to="/DisplayAllCars" /> : null}

                <div class="textbox">
                    <PersonIcon></PersonIcon>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    /><br />
                </div>

                <div class="textbox">
                    <LockIcon></LockIcon>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    /><br /><br />
                </div>
                <LinkInClass value="Login" className="btn" onClick={this.handleSubmit} />
                <Link className="btn" to={"/DisplayAllCars"}>Cancel</Link>
            </form>
        )
    }
}