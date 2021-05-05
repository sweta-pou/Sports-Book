import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

class Map extends Component{
  constructor(props){
    super(props)
    console.log("constructor");
    this.state={
      lat:'',
      lng:'',
      zoom:13
    }
   
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // do things with nextProps.someProp and prevState.cachedSomeProp
    console.log("getderived");
    console.log(nextProps,prevState)
    return {
      lat:nextProps.latitude,lng:nextProps.longitude
    };
  }
//   componentDidUpdate(prevProps, prevState){
//     console.log("upadate component");
//     console.log(prevState);
//     console.log(prevProps);

// const map = new mapboxgl.Map(
//   {
//     container:this.mapContainer,
//     style:'mapbox://styles/mapbox/streets-v11',
//     center: [this.state.lng,this.state.lat],
//     zoom:this.state.zoom
//   }
// )
// var marker = new mapboxgl.Marker().setLngLat([this.state.lng,this.state.lat]).addTo(map);
// }
componentDidMount(){
  console.log("mounted");
  const map = new mapboxgl.Map(
    {
      container:this.mapContainer,
      style:'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng,this.state.lat],
      zoom:this.state.zoom
    }
  )
  var marker = new mapboxgl.Marker().setLngLat([this.state.lng,this.state.lat]).addTo(map);
}
 
  render()
  { console.log("map rendered");
    return(
      <div>
        <div ref={el =>this.mapContainer =el} style={{width:"100%",height:"500px"}}/>
      </div>
    )
  }
}


  export default Map;
