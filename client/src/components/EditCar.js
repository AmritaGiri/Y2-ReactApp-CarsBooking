import React, { Component } from "react"
import Form from "react-bootstrap/Form"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import { ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import classes from './Form/styles'

export default class EditCar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            author: "",
            title: "",
            message: "",
            tags: "",
            redirectToDisplayAllCars: sessionStorage.accessLevel < ACCESS_LEVEL_ADMIN
        }
    }

    componentDidMount() {
        this.inputToFocus.focus()

        axios.get(`${SERVER_HOST}/blogs/get_blog/${this.props.match.params.id}`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else {
                        this.setState({
                            author: res.data.creator,
                            title: res.data.title,
                            message: res.data.message,
                            tags: res.data.tags,
                        })
                    }
                }
                else {
                    console.log(`Record not found`)
                }
            })
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleSubmit = (e) => {
        e.preventDefault()

        const carObject = {
            author: this.state.author,
            title: this.state.title,
            message: this.state.message,
            tags: this.state.tags
        }

        axios.put(`${SERVER_HOST}/blogs/update_blog/${this.props.match.params.id}`, carObject)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log(`Record updated`)
                        this.setState({ redirectToDisplayAllCars: true })
                    }
                }
                else {
                    console.log(`Record not updated`)
                }
            })
    }


    render() {
        return (
            <Paper className={classes.paper}>
                {this.state.redirectToDisplayAllCars ? <Redirect to="/DisplayAllCars" /> : null}
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
                    <Typography variant="h6">Create New Post</Typography>
                    <TextField ref={(input) => { this.inputToFocus = input }} name="author" variant="outlined" label="Author" onChange={this.handleChange} fullWidth value={this.state.author} />
                    <TextField name="title" variant="outlined" label="Title" onChange={this.handleChange} fullWidth value={this.state.title} />
                    <TextField name="message" variant="outlined" label="Message" onChange={this.handleChange} fullWidth multiline rows={4} value={this.state.message} />
                    <TextField name="tags" variant="outlined" label="Tags (coma separated)" onChange={this.handleChange} fullWidth value={this.state.tags} />
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={this.handleSubmit}>Submit</Button>
                    <Link to={"/DisplayAllCars"}> <Button variant="contained" color="secondary" size="small" fullWidth>Cancel</Button></Link>
                </form>
            </Paper>
        )
    }
}