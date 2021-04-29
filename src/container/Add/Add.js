import React ,{Component} from 'react';
class Add extends Component{
    constructor(){
        super()
        this.state={
                  _id:'',
                  name:'' ,
                  image:'',
                  location:'',
                  description:'',
                  lat:'',
                  long:'',
                  booking_price:''
        }
        // this.submitHandler=this.submitHandler.bind(this)
    }
    changeName(event){
        this.setState({name:event.target.value});
    }
    changeImage(event){
        this.setState({image:event.target.value});
    }
    changeLocation(event){
        this.setState({location:event.target.value});
    }
    changeDesc(event){
        this.setState({description:event.target.value});
    }
    changePrice(event){
        this.setState({booking_price:event.target.value});
    }

    render(){
        return(
            <div>
                <form>
                <input  type="text" placeholder="name" name="name" onChange={(e)=>this.changeName(e)} />
             <input type="text" placeholder="image" name="image" onChange={(e)=>this.changeImage(e)}/>
             <input type="text" placeholder="location" name="location" onChange={(e)=>this.changeLocation(e)} />
             <input type="text" placeholder="description" name="description" onChange={(e)=>this.changeDesc(e)} />
             <input type="price" placeholder="price" name="price" onChange={(e)=>this.changePrice(e)}/>
                </form>
             
            </div>
        )
    }

}
export default Add;
