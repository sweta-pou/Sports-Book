import React from 'react';
import {Card,Button,Image,Row,Col} from 'react-bootstrap';
import classes from './Venue_ind.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'
const Cards =(props)=>(
  <div>
      <div className={classes.Cards}>
         <Card className={classes.Card} style={{ width: '50vw',height:'20vh' }}>
         <Row>
         <Col xs={6} md={7}>
         <Image  src={props.image}
          style={{height:'19vh',width:'20vw'}} thumbnail/>
         </Col>
         <Col xs={6} md={4}>
         <Card.Title>
           <h5 className={classes.Title}>{props.name}</h5> </Card.Title>
           <Card.Text className={classes.Location}>
        <FontAwesomeIcon icon={faMapPin}/>

            {props.location}
          </Card.Text>
          <Link to={`/api/sports/${props.id}`}>
          <Button  className={classes.Button} >View</Button>

          </Link>
        </Col>
        </Row>
       
      </Card>
        </div>
        </div>
)
export default Cards;