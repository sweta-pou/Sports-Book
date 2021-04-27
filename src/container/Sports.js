import React ,{Component} from 'react';
import Venues from '../component/Venues_sports/Venue_ind';
import Search from '../component/Search/Search';
class Venue extends Component{
    constructor(){
        super()
        this.state={
            venue:[{
                _id:'',
                name:'' ,
                image:''

          }]
        }
    }
    componentDidMount(){
        fetch('http://localhost:9090/api/sports').then(
            res=>res.json()
        ).then(res2=>{
            this.setState({
                venue:res2
            })
        })
    }
    render()
    {
    let card = this.state.venue.map(item=>{
       
        return( 
        
        <Venues key={item._id} id={item._id} 
        name={item.name} 
        image={item.image} 
        location={item.location}
        /> 
       
        )
        
    })
        return(
            <div>
            <Search/>
                {card}
  
            </div>

        )
    }
}
export default Venue;