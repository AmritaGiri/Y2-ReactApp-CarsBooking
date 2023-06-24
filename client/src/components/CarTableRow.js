import React, { Component } from "react"
import { Link } from "react-router-dom"

import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
//import Moment from 'moment';
import axios from "axios";

import classes from './styles'


export default class CarTableRow extends Component {
    render() {
        return (

            <tr>

                <td>
                    {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link to={"/EditCar/" + this.props.blog._id}> <Button size="small" color="primary"><EditIcon fontSize="small" /> Edit</Button></Link> : null}
                    {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link to={"/DeleteCar/" + this.props.blog._id}> <Button size="small" color="primary"><DeleteIcon fontSize="small" /> Delete</Button></Link> : null}

                </td>
            </tr>
        )
    }
}