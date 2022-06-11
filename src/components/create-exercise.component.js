import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateExercise extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:5005/users")
    .then(res => {
      if(res.data.length > 0) {
        this.setState({
          users: res.data.map(user => user.username),
          username: res.data[0].username
        });
      }
    })
  }



  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    axios.post('http://localhost:5005/excercises/add', exercise)
    .then(res => {
      console.log(res.data)
    })

    console.log(exercise)

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput" required className="form-control" value={this.state.username} onChange={this.onChange} name="username">
              {
                this.state.users.map(user => {
                  return (
                    <option key={user} value={user}>{user}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input type="text" className="form-control" name="description" onChange={this.onChange} value={this.state.description}/>
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input type="text" className="form-control" name="duration" value={this.state.duration} onChange={this.onChange}/>
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker 
                selected={this.state.date}
                onChange={(value) => this.onChangeDate(value)}
              />
            </div>
          </div>
          <div className="form-group mt-2">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
