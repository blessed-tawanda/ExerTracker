import { Link } from 'react-router-dom';

export default function Exercise(props) {

    return (
      <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
          <Link to={`/edit/${props.exercise._id}`}> Edit </Link> | <a href="#" className="href" onClick={() => props.deleteExercise(props.exercise._id)}>Delete Exercise</a>
        </td>
      </tr>
    )
  
}
