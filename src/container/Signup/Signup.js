import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@material-ui/core/TextField';
import classes from './Signup.module.css';

toast.configure()

class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.submitHandler = this.submitHandler.bind(this)


    }
    changeEmail(event) {
        console.log(event.target.value)
        this.setState({
            email: event.target.value
        })

    }
    changePassword(event) {
        console.log(event.target.value)

        this.setState({
            password: event.target.value
        })
    }
    Emailnotify = () => {

        toast.success("Please check your email for verification !", { position: toast.POSITION.TOP });
    }
    Errornotify = () => {
        toast.error("Email already exists !", { position: toast.POSITION.TOP });

    }
    submitHandler(event) {
        event.preventDefault()
        const registered = {
            password: this.state.password,
            email: this.state.email

        }
        axios.post('http://localhost:9090/api/register', registered).then(
            response => {
                console.log(response.data);
                if (response.data === "email already exists!") {
                    this.Errornotify();

                } else {
                    this.Emailnotify();
                }
                this.props.history.push('/api/login/');
            }
        )
        this.setState({
            email: '',
            password: ''
        })
    }

    render() {
        return (
            <div className={classes.joinOuterContainer}>
                <div className={classes.joinInnerContainer}>
                    <h1 className={classes.heading}>Let's Signup</h1>
                    <form onSubmit={this.submitHandler}>
                        <TextField id="standard-basic" label="Email" required className={classes.joinInput}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle
                            }} onChange={(e) => this.changeEmail(e)} value={this.state.email} /><br />
                        <TextField id="standard-basic" type="password" required label="Password" className={classes.joinInput}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle
                            }} onChange={(e) => this.changePassword(e)} value={this.state.password} /><br />
                        <button className={classes.button}>Signup</button>

                    </form>
                </div>
            </div>
        )
    }
}
export default Register;