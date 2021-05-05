import React ,{Component} from 'react';
import { Container } from 'react-bootstrap';
import { Button, Form } from 'semantic-ui-react'
import classes from './Add.module.css';

import axios from 'axios';
class Add extends Component{
    constructor(){
        super()
        this.state={
                  name:'' ,
                  image:'',
                  location:'',
                  description:'',
                  booking_price:'',
                  start_time:'',
                  end_time:'',
                  difference:''
        }
        this.submitHandler=this.submitHandler.bind(this)
    }
    changeName(event){
        console.log(event.target.value);
        this.setState({name:event.target.value});
        console.log(this.state);
    }
    changeImage(event){
        this.setState({image:event.target.value});
        console.log(this.state);
    }
    changeLocation(event){
        this.setState({location:event.target.value});
    }
    changeDesc(event){
        this.setState({description:event.target.value});
    }
    changePrice(event){
        this.setState({booking_price:event.target.value});
        console.log(this.state);

    }
    changeStart(event){
      this.setState({start_time:event.target.value});
      console.log(this.state);

  }
  changeEnd(event){
    this.setState({end_time:event.target.value});
    console.log(this.state);

}
changeDiff(event){
  this.setState({difference:event.target.value});
  console.log(this.state);

}
    submitHandler(event){
        event.preventDefault()
        console.log("reached");
            const added ={
               name:this.state.name,
               image:this.state.image,
               location:this.state.location,
               description:this.state.description,
               booking_price:this.state.booking_price,
               start_time:this.state.start_time,
               end_time:this.state.end_time,
              difference:this.state.difference

            
        }
        console.log(added);
        axios.post('http://localhost:9090/api/add',added).then(
            response=>{
                console.log(response.data);
            }
        )
        this.setState({
                 name:'' ,
                  image:'',
                  location:'',
                  description:'',
                  booking_price:'',
                  start_time:'',
                  end_time:'',
                  difference:''
        })
    }

    render(){
        return(
            <Container className={classes.Container}>
                <h1 className={classes.text}>Venue Details</h1>
                <Form>
    <Form.Field className={classes.input} >
      <label className={classes.label}> Name</label>
      <input placeholder=' Name' name="name" className={classes.field} required onChange={(e)=>this.changeName(e)} />
    </Form.Field>
    <Form.Field className={classes.input}>
      <label className={classes.label}>Image</label>
      <input placeholder='Image' name="image" className={classes.field} required onChange={(e)=>this.changeImage(e)} />
    </Form.Field>
    <Form.Field className={classes.input}>
      <label className={classes.label}>Location</label>
      <input placeholder='Location' name="location" className={classes.field} required onChange={(e)=>this.changeLocation(e)} />
    </Form.Field>
    <Form.Field className={classes.input}>
      <label className={classes.label}>Description</label>
      <textarea placeholder='Description' name="description" className={classes.field} required onChange={(e)=>this.changeDesc(e)}/>
    </Form.Field>
    <Form.Field className={classes.input}>
      <label className={classes.label} >Price</label>
      <input  type="number" placeholder='Price' name="price" className={classes.field} required onChange={(e)=>this.changePrice(e)} />
    </Form.Field>
    <Form.Field className={classes.input}>
      <label className={classes.label} >Start time</label>
      <input placeholder='Start time' type="time" name="start_time" required onChange={(e)=>this.changeStart(e)}  />
    </Form.Field>
    <Form.Field className={classes.input}>
      <label className={classes.label} >End time</label>
      <input placeholder='End time' type="time" name="end_time" required onChange={(e)=>this.changeEnd(e)} />
    </Form.Field>
    <Form.Field className={classes.input}>
      <label className={classes.label} >Time gap(in minutes)</label>
      <input placeholder='Difference' type="number" required name="difference" onChange={(e)=>this.changeDiff(e)} />
    </Form.Field>
    <Button type='submit' onClick={this.submitHandler} basic color='yellow'>Submit</Button>
  </Form>
             
            </Container>
        )
    }

}
export default Add;
