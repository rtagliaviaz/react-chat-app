import React from 'react'
import { Link } from 'react-router-dom'

const SignedOutLinks = () => {
  
  return (
    <React.Fragment>
      <li><Link to="/signup" className="item">Signup</Link></li>
      <li><Link to="/login" className="item">Login</Link></li>
    </React.Fragment>
  )
}

export default SignedOutLinks
