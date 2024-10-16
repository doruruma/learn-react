import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// date-fns
import setDefaultOptions from 'date-fns/setDefaultOptions'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { id } from 'date-fns/locale'

// set date-fns locale
setDefaultOptions({ locale: id })

const WorkoutDetails = ({ workout }) => {

  const { dispatch } = useWorkoutsContext()

  const handleClick = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'DELETE'
    })
    const json = await response.json()
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (Kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )

}

export default WorkoutDetails