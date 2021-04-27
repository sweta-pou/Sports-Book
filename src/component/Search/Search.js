import React from 'react';
import { MDBCol, MDBIcon } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import classes from './Search.module.css';
const Search = () => {
  return (
    <div className={classes.Search}>
      <MDBCol md="6">
      <form className="form-inline mt-4 mb-4">
        <FontAwesomeIcon icon={faSearch}/>
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" name="search"/>
      </form>
    </MDBCol>
    </div>
    
  );
}

export default Search;