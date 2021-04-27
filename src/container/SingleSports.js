import React ,{Component} from 'react';
import SingleVenue_info from '../component/SingleVenues_sports/SingleVenues' ;
class SingleVenue extends Component{
    constructor(props){
        super(props)
        this.state={
            venue:{
                  _id:'',
                  name:'' ,
                  image:'',
                  location:'',
                  description:'',
                  lat:'',//==default value==//
                  long:'',//==default value==//
                  booking_price:'',
                  category:''
            }
        }
    }
    
    componentDidMount(){
        fetch(`http://localhost:9090/api/sports/${this.props.match.params.id}`).then(
            res=>res.json()
        ).then(res2=>{
           console.log(res2);
           this.setState({
               venue:res2
           })
           console.log(this.state.venue.lat)
        })
    }
    render()
    {

        return(
            <div>
           <SingleVenue_info description={this.state.venue.description} lat={this.state.venue.lat} long={this.state.venue.long} id={this.state.venue._id} />
            </div>

        )
    }
}
export default SingleVenue;