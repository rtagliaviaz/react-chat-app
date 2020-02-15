import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {signIn} from '../store/actions/authActions'

class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  onInputChange = e => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state)
  }

  render() {
    const {auth, authError} = this.props
    if(auth.uid) return <Redirect to='/dashboard'/>
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 col-sm-12 offset-md-2  py-4'>
            <form onSubmit={this.onSubmit}>
              <h2 className="text-center py-4">Login</h2>
              <div className='form-group'>
                <label htmlFor='email'>Email Address</label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  onChange={this.onInputChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  onChange={this.onInputChange}
                />
              </div>
              <button type='submit' className='btn btn-block btn-dark my-4'>
                Login
              </button>

              {/* Error alert */}
              {authError ?
              <div
                  className='alert alert-danger alert-dismissible fade show'
                  role='alert'
                >
                   <p>{authError}</p> 
                  <button
                    type='button'
                    className='close'
                    data-dismiss='alert'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>×</span>
                  </button>
                </div>
                : null}
                {/* Error alert */}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

//redux

const mapStateToProps = state => {
  console.log(state)
  return{
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = dispatch => {
  return{
    signIn: (credentials) => dispatch(signIn(credentials))
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Login)