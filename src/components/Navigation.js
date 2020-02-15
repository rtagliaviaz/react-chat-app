import React, { Component } from "react";
import { Link} from "react-router-dom";
import {connect} from 'react-redux'

//components
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

class Navigation extends Component {
  render() {
    const {auth} = this.props;
    const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>
    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <Link to='/' className='navbar-brand ml-4'>
          Chat App
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ml-auto'>
            {links}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return{
    auth: state.firebase.auth
  }
}

export default connect (mapStateToProps)(Navigation)


