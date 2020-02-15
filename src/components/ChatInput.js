import React, { Component } from "react";

export default class ChatInput extends Component {
  state = {
    msg: ""
  };

  onChange = e => {
    e.keyCode === 13
      ? this.onSubmit()
      : this.setState({
          [e.target.id]: e.target.value
        });
  };

  validMsg = text => text && text.replace(/\s/g, "").length

  onSubmit = () => {
    if (this.validMsg(this.state.msg)) {
      console.log(this.state.msg);
      this.props.submitMsg(this.state.msg)
      document.getElementById("msg").value = "";
    }
  };

  onInputClicked = () => {
    this.props.msgRead();
  }

  render() {
    return (
      <div className='chatBox'>
        <input
          type='text'
          id='msg'
          className='form-control'
          placeholder='Type your Message'
          onKeyUp={this.onChange}
          onFocus={this.onInputClicked}
        />
        <button className='btn btn-dark' onClick={this.onSubmit}>
          Send
        </button>
      </div>
    );
  }
}
