import React,{Component, useContext} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  classes from './Login.module.css';
import UserContext from '../../hoc/context';
toast.configure()
class Register extends Component{
    static contextType=UserContext;
    constructor(){
        super()
        this.state={
            email:'',
            password:''
        }
        this.submitHandler=this.submitHandler.bind(this)


    }
    changeEmail(event){
        console.log(event.target.value)
        this.setState({
            email:event.target.value
        })
        
    }
    changePassword(event){
        console.log(event.target.value)

        this.setState({
            password:event.target.value
        })
    }
    notify(){
        toast.success("Successfully logged In !",{position:toast.POSITION.TOP});
    }
    submitHandler(event){
        event.preventDefault()
            const registered ={
                password:this.state.password,
                email:this.state.email
            
        }
        
        axios.post('http://localhost:9090/api/login',registered).then(
            response=>{
            console.log(response.data);
            console.log(this.context);
            const{user,setUser}=this.context;
             setUser(response.data);
             this.props.history.push('/api/sports/');
              this.notify();
               }
            
        )
        this.setState({
            email:'',
            password:''
        })
    }
 render(){

     return(
             <div className={classes.joinOuterContainer}>
        <div className={classes.joinInnerContainer}>
            <h1 className={classes.heading}>Login</h1>
             <form onSubmit={this.submitHandler}>
                 <TextField id="standard-basic" label="Email" required className={classes.joinInput}
                 InputLabelProps={{
                    className: classes.floatingLabelFocusStyle
                }} onChange={(e)=>this.changeEmail(e)} value={this.state.email} /><br/>
             <TextField id="standard-basic"  type="password" required label="Password" className={classes.joinInput} 
             InputLabelProps={{
                className: classes.floatingLabelFocusStyle
            }}onChange={(e)=>this.changePassword(e)} value={this.state.password} /><br/>
             <button  className={classes.button}>Signup</button>
            
             </form>
         </div>
         </div>
     )
 }
}
export default Register;