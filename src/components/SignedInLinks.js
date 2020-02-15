import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../store/actions/authActions";

const SignedInLinks = (props) => {
  return (
    <React.Fragment>
      <li className='nav-item'>
        <Link to='/dashboard' className='item'>
          Dashboard
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/' onClick={props.signOut} className='item'>
          Logout
        </Link>
      </li>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return{
    signOut: () => dispatch(signOut())
  }
}

export default connect (null, mapDispatchToProps)(SignedInLinks);
