import React from 'react';
import Buttons from '../ButtonGroup/new';
import {Link} from 'react-router-dom';
import {Button, Container,Form} from 'react-bootstrap';
import classes from './Form.module.css';

const form =(props)=>{
    return(
        <Form>
            <p style={{ color: '#ff9980'}}>Price for one slot: Rs.100</p>
            <Buttons start_time={props.start_time} end_time={props.end_time}difference={props.difference}/>
            <div>
                <Container className={classes.Container}>
                <h2>Enter your details:</h2>
            <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="booked[name]" placeholder="name"  required /><br/>
            <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="booked[email]" placeholder="email"  required/><br/>
            <Form.Label>contact</Form.Label>
              <Form.Control type="number" name="booked[number]" placeholder="contact number"  required/><br/>
              
            <Link to={'/api/sports/:id/booking'}>
            <Button>Book</Button>
            </Link>
                </Container>
                
            </div>
            
        </Form>
    )
}
export default form;