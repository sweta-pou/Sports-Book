import React,{Component} from 'react';
import {Container,Row,Col,Image,Button} from 'react-bootstrap';
import {Route} from 'react-router-dom';

import Mapbox from '../Mapbox/Mapbox';
import classes from './SingleVenues.module.css';
import {Link} from 'react-router-dom'
import Booking from '../../container/Booking/Booking'
import {ProtectedRoute} from '../../protectedroutes';

class SingleVenues extends Component{
  
  render(){
    console.log(this.props.image);
    console.log(this.props.lat)
  return(
    <div>
<Container className={classes.Container} key={this.props.id}>
  <Row>
    <Col className={classes.Col} xs={12} md={5}>
    <Mapbox latitude={this.props.lat} longitude={this.props.long}/>
    </Col>
    <Col className={classes.Col2}>
<Image src={this.props.image}  className={classes.Image}  rounded thumbnail/>
         <h3 style={{paddingTop:'30px',color:'#00004d '}}>Description:</h3>
         <p>{this.props.description}</p>
         <br/>
         <Link to={`/api/sports/${this.props.id}/booking`}>
         <Button variant="outline-success">Booking</Button>
         </Link>

    </Col>
  </Row>
  </Container>
  <div className={classes.space}>
  <ProtectedRoute path="/api/sports/:id/booking" exact component={Booking}/>

  </div>
  
    </div>
    
  )}
}
export default SingleVenues;
