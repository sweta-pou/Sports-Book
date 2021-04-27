import React,{Component} from 'react';
// import { browserHistory} from 'react-router';
import {Row,Col,Container} from 'react-bootstrap';
import Datepicker from '../component/Datepicker/Datepicker';
import Buttons from '../component/ButtonGroup/Button';
import {Link} from 'react-router-dom';
import classes from '../component/BookingForm/Form.module.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
class Booking extends Component{
    constructor(){
      super()
      this.state={
        booking:{
            id:'',
            start_time:'',
            end_time:'',
            difference:'',
            not_start:[],
            time_array:[]
        },
        dateparam:'',
        form:{
            name:'',
            contact:'',
            email:'',
            date:'',
            time:'',
        },
     submitted:'false'
      }
      this.onChange=this.onChange.bind(this)
      this.onClicken=this.onClicken.bind(this)
      this.changeName=this.changeName.bind(this)
      this.changeEmail=this.changeEmail.bind(this)
      this.changeContact=this.changeContact.bind(this)
      this.onSubmited = this.onSubmited.bind(this)


    }
    componentDidMount(){
        console.log("mounted");
        fetch(`http://localhost:9090/api/sports/${this.props.match.params.id}/booking`).then(
            res=>res.json()
        ).then(res2=>{
           console.log(res2);
           console.log(res2.foundBook.start_time);
           this.setState(function(state) {
            return { 
              booking: Object.assign({}, 
                state.booking, {
                    start_time:res2.foundBook.start_time,
                    end_time:res2.foundBook.end_time,
                           difference:res2.foundBook.difference,
                           booked:res2.not_start,
                           time_array:res2.time_array,
                           not_start:res2.not_start,
                           id:res2.foundVenue._id
              })
            }
          })
        //    this.setState({
        //      booking:{  start_time:res2.foundBook.start_time,
        //        end_time:res2.foundBook.end_time,
        //        difference:res2.foundBook.difference,
        //        booked:res2.not_start,
        //        time_array:res2.time_array,
        //        not_start:res2.not_start,
        //        id:res2.foundVenue._id}
        //    })
        console.log(this.state.booking);
        })
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("component did update");
        console.log(prevState.dateparam);
        console.log(this.state.dateparam);
        if(prevState.dateparam !== this.state.dateparam){
            fetch(`http://localhost:9090/api/sports/${this.props.match.params.id}/booking?date=${this.state.dateparam}`).then(
                res=>res.json()
            ).then(res2=>{
               console.log(res2);
               console.log(res2.foundBook.start_time);
               this.setState(function(state) {
                return { 
                  booking: Object.assign({}, 
                    state.booking, {
                        start_time:res2.foundBook.start_time,
                        end_time:res2.foundBook.end_time,
                               difference:res2.foundBook.difference,
                               booked:res2.not_start,
                               time_array:res2.time_array,
                               not_start:res2.not_start,
                               id:res2.foundVenue._id
                  })
                }
              })
            console.log(this.state.booking);
            console.log(this.state.booking.id);

            })
        }
    }
    onChange =(date)=>{
        console.log(date);
        this.setState({dateparam:date});
        console.log(this.state.form.date);
        console.log(this.state.dateparam);
        this.setState(function(state) {
            return { 
              form: Object.assign({}, 
                state.form, {
                date:date
              })
            }
          })
       

    }
   onClicken=(event)=>{
       console.log("hahaha")
       console.log(event.target.value);
       console.log(this.state.form.time);
       this.setState(function(state) {
        return { 
          form: Object.assign({}, 
            state.form, {
            time: event.target.value
          })
        }
      })
   }
   changeName=(event)=>{
       console.log(event.target.value)
       this.setState(function(state) {
        return { 
          form: Object.assign({}, 
            state.form, {
            name: event.target.value
          })
        }
      })
   }
   changeEmail=(event)=>{
    this.setState(function(state) {
        return { 
          form: Object.assign({}, 
            state.form, {
            email: event.target.value
          })
        }
      })
}
changeContact=(event)=>{
    this.setState(function(state) {
        return { 
          form: Object.assign({}, 
            state.form, {
            contact: event.target.value
          })
        }
      })
}
onSubmited(event){
    console.log("hehehhe")

    event.preventDefault()
    console.log("hehehhe")
  

    const form ={
        name:this.state.form.name,
        contact:this.state.form.contact,
        email:this.state.form.email,
        time:this.state.form.time,
        date:this.state.dateparam
    
}
console.log(form);
axios.post(`http://localhost:9090/api/sports/${this.state.booking.id}/booked`,form).then(
    response=>
    {console.log(response.data);
      this.props.history.push('/api/sports/');}
)
this.setState(function(state) {
    return { 
      form: Object.assign({}, 
        state.form, {
       name:'',
       email:'',
       date:'',
       time:'',
       contact:''
      })
    }
  })  
}
    render()
    {
        console.log("rendered");
        const {  submitted } = this.state.submitted;

        return(
                <ValidatorForm  ref="form"
                onSubmit={this.onSubmited}>
        <Row>
                <Col style={{paddingTop:'25px',paddingLeft:'30px'}}>
                <Calendar className={classes.Date} onChange={this.onChange} minDate={new Date()}/>
                </Col>
                <Col style={{paddingTop:'25px',paddingLeft:'30px'}}>
                    <h3>Choose a slot</h3>
                    <p style={{ color: '#ff9980'}}>Price for one slot: Rs.100</p>
            <Buttons start_time={this.state.booking.start_time} end_time={this.state.booking.end_time}difference={this.state.booking.difference}
            booked={this.state.booking.booked} time_array={this.state.booking.time_array}
            onClicked={this.onClicken} />
            <div>
               
                <h2>Enter your details:</h2>
            <label>Name</label>
                <TextValidator type="text" name="booked[name]" placeholder="name" 
                  onChange={this.changeName} value={this.state.form.name}
                  validators={['required']}
                  errorMessages={['this field is required']} /><br/>
               <div style={{color:'red'}}>{this.state.nameError}</div>
            <label>Email</label>
              <TextValidator type="email" name="booked[email]" placeholder="email" 
               onChange={this.changeEmail} value={this.state.form.email}
               validators={['required']}
                  errorMessages={['this field is required']} /><br/>
            <label>contact</label>
              <TextValidator type="number" name="booked[number]" placeholder="contact number"  
               onChange={this.changeContact} value={this.state.form.contact}
               validators={['required']}
                  errorMessages={['this field is required']}/><br/>
              
              <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={submitted}
                >
                    {
                        (submitted && 'Your form is submitted!')
                        || (!submitted && 'Submit')
                    }
                </Button>
            
            
                
            </div>
                </Col>
                </Row>
                </ValidatorForm>
            
        )
    }

   
}

export default Booking;