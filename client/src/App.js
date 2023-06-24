import React, { Component } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"
import "./css/index.css"
import classes from "./css/styles.js"

import Register from "./components/Register"
import ResetDatabase from "./components/ResetDatabase"
import Login from "./components/Login"
import Logout from "./components/Logout"
//import Form from "./components/AddCar"
import EditCar from "./components/EditCar"
import DeleteCar from "./components/DeleteCar"
import DisplayAllCars from "./components/DisplayAllCars"
import LoggedInRoute from "./components/LoggedInRoute"
import Navbar from "./components/Navbar";

import logo from './images/logo.jpg'

//import Posts from "./components/Postsss"
import Form from "./components/AddCar"
import CarTable from "./components/CarTable"




import { ACCESS_LEVEL_GUEST } from "./config/global_constants"


if (typeof sessionStorage.accessLevel === "undefined") {
    sessionStorage.name = "GUEST"
    sessionStorage.accessLevel = ACCESS_LEVEL_GUEST
}


export default class App extends Component {
    render() {
        return (

            <BrowserRouter>
                <Navbar />
                <Container maxwidth="lg">
                    <AppBar className={classes.appBar} position="static" color="inherit">
                        <Typography className={classes.heading} variant="h2" align="center">CA3 Forum</Typography>
                    </AppBar>
                </Container>
                <Switch>
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/ResetDatabase" component={ResetDatabase} />
                    <Route exact path="/" component={DisplayAllCars} />
                    <Route exact path="/Login" component={Login} />
                    <LoggedInRoute exact path="/Logout" component={Logout} />
                    <LoggedInRoute exact path="/AddCar" component={Form} />
                    <LoggedInRoute exact path="/EditCar/:id" component={EditCar} />
                    <LoggedInRoute exact path="/DeleteCar/:id" component={DeleteCar} />
                    <Route exact path="/DisplayAllCars" component={DisplayAllCars} />
                    <Route path="*" component={DisplayAllCars} />

                    <footer>
                        <h2>Footer</h2>
                    </footer>
                </Switch>
            </BrowserRouter>
        )
    }
}