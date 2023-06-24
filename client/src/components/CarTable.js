import React, { Component } from "react"
import { Grid, CircularProgress, Button } from '@material-ui/core'
import { Link } from "react-router-dom"
import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Post from './CarTableRow'
//import CarTableRow from './CarTableRow'
import classes from './styles'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';

import image1 from '../images/blog1.jpg'
import image2 from '../images/blog2.jpg'

export default class CarTable extends Component {
  render() {

    return (

      <div class="row">
        <div class="left-column">
          <div class="card">
            <Card.Header>TITLE HEADING</Card.Header>
            <Card.Title>Title description, Dec 7, 2017</Card.Title>
            <img src={image1} />
            <p>Some text..</p>
            <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
            {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link to={"/EditCar/" + this.props.blog}> <Button size="small" color="primary"><EditIcon fontSize="small" /> Edit</Button></Link> : null}
            {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link to={"/DeleteCar/" + this.props.blog}> <Button size="small" color="primary"><DeleteIcon fontSize="small" /> Delete</Button></Link> : null}
          </div>
          <div class="card">
            <Card.Header>TITLE HEADING</Card.Header>
            <Card.Title>Title description, Dec 7, 2017</Card.Title>
            <img src={image2} />
            <p>Some text..</p>
            <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
            {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link to={"/EditCar/" + this.props.blog}> <Button size="small" color="primary"><EditIcon fontSize="small" /> Edit</Button></Link> : null}
            {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link to={"/DeleteCar/" + this.props.blog}> <Button size="small" color="primary"><DeleteIcon fontSize="small" /> Delete</Button></Link> : null}
          </div>



          <div class="card">
            {this.props.blogs.map((blog, index) =>

              <div id="movieDiv" key={index}>



                <Card.Header>{blog.title}</Card.Header>
                <Card.Body>
                  <Card.Title>{blog.author}</Card.Title>
                  <Card.Text>
                    Message: {blog.message}<br></br>

        Hashtags: {blog.tags}<br></br>


                  </Card.Text>
                  <Post blog={blog} />

                </Card.Body>


              </div>

            )}
          </div>
        </div>

      </div>


    )

  }
}


