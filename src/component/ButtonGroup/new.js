import React,{Component} from 'react';
import  './Button.module.css';

class Buttons extends Component{
    constructor(props){
        super(props);
        this.state={
            border: '2px solid black',
            marginRight: '4px',
            padding:'3px',
            backgroundColor: 'green'
        }
        this.changeRed=this.changeRed.bind(this)
        this.changeGreen=this.changeGreen.bind(this)

     

    }
    changeRed=(e)=>{
        this.setState({backgroundColor:'red'})

    }
    changeGreen=(e)=>{
       return this.setState({backgroundColor:'green'})

    }
    render(){
        console.log(this.state);
        console.log(this.props);

        let check=  this.props.time_array.map(function(object, i){
            console.log("1",object)
          { this.changeGreen.bind(this)}
           
      
            for(var j=0;j< this.props.booked.length;j++){
              if(object== this.props.booked[j])
              {
                this.changeRed();
                  console.log(this.state.backgroundColor);
              }
            }
            console.log(this.state.backgroundColor);
              return <label   key={i} style={this.state} >
             <input
                name="isGoing"
                type="checkbox"
               
              />
              
               {this.props.time_array[i]}-{this.props.time_array[i+1]}
            </label>
          })
        return(
            <div>
            {check}
        </div>
        )
    }
}
export default Buttons;