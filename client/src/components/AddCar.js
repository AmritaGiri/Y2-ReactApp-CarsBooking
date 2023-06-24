import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import { ACCESS_LEVEL_NORMAL_USER, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"
import classes from './Form/styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core'





export default class AddCar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            author: "",
            title: "",
            message: "",
            tags: "",
            redirectToDisplayAllCars: sessionStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER
        }
    }


    componentDidMount() {
        this.inputToFocus.focus()
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleSubmit = (e) => {
        e.preventDefault()

        // let formData = new FormData()  
        //formData.append("profilePhoto", this.state.selectedFile)

        const carObject = {
            author: this.state.author,
            title: this.state.title,
            message: this.state.message,
            tags: this.state.tags
            //profilePhotoFilename: this.state.selectedFile
        }
        console.log(carObject)
        axios.defaults.withCredentials = true
        axios.post(`${SERVER_HOST}/blogs/add_blog`, carObject)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log("Record added")
                        console.log(res.data)
                        this.setState({ redirectToDisplayAllCars: true })
                    }
                }
                else {
                    console.log("Record not added")
                }
            })
    }


    handleFileChange = (e) => {
        this.setState({ selectedFile: e.target.files[0] })
    };


    render() {
        return (
            <Paper className={classes.paper}>
                {this.state.redirectToDisplayAllCars ? <Redirect to="/DisplayAllCars" /> : null}
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
                    <Typography variant="h6">Create New Post</Typography>
                    <TextField ref={(input) => { this.inputToFocus = input }} name="author" variant="outlined" label="Author" onChange={this.handleChange} fullWidth value={this.state.author} />
                    <TextField name="title" variant="outlined" label="Title" onChange={this.handleChange} fullWidth value={this.state.title} />
                    <TextField name="message" variant="outlined" label="Message" onChange={this.handleChange} fullWidth multiline rows={4} value={this.state.message} />
                    <TextField name="tags" variant="outlined" label="Tags (coma separated)" onChange={this.handleChange} fullWidth value={this.state.tags.split(',')} />
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={this.handleSubmit}>Submit</Button>
                    <Link to={"/DisplayAllCars"}> <Button variant="contained" color="secondary" size="small" fullWidth>Cancel</Button></Link>
                    <input
                        type="file"
                        onChange={this.handleFileChange}
                    />
                </form>
            </Paper>
        );

    }

}