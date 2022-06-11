import axios from 'axios';
import React, { Component } from 'react'

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user)
    axios.post('http://localhost:5005/users/add', user)
    .then(res => {
      console.log(res.data)
    })
    this.setState({username: ''})

   
  }
  render() {
    return (
      <div>
      <h3>Create New User</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input type="text" className="form-control" name="username" onChange={this.onChange} value={this.state.username}/>
        </div>
        <div className="form-group mt-2">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
