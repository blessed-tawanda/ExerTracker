import React, { Component } from 'react';
import axios from 'axios';
import Exercise from './exercise.component';

export default class ExcerciseList extends Component {

  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.exerciseList = this.exerciseList.bind(this);

    this.state = {
      exercises: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:5005/excercises")
    .then(response => {
      this.setState({exercises: response.data});
    })
    .catch(err => console.log(err))
  }

  deleteExercise(id) {
    axios.delete(`http://localhost:5005/excercises/${id}`)
    .then(res => console.log(res.data));

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    
    return this.state.exercises.map(exercise => {
      
      return (<Exercise exercise={exercise} deleteExercise={this.deleteExercise} key={exercise._id}/>)
    })
  }

  
  render() {
  
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className='table'>
          <thead className='thead-light'>
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}
