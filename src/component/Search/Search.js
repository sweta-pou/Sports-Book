import React,{useState} from 'react';
import { MDBCol, MDBIcon } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import classes from './Search.module.css';
const Search = (props) => {
const  handleChange=(event)=>{
        props.setSearch(event);
  }
  return (
    <div className={classes.Search}>
      <MDBCol md="6">
      <form className="form-inline mt-4 mb-4" >
        <FontAwesomeIcon icon={faSearch}/>
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" 
        onChange={(e)=>handleChange(e) } name="search"/>
      </form>
    </MDBCol>
    </div>
    
  );
}

export default Search;