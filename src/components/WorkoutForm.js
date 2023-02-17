import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {

  const { dispatch } = useWorkoutsContext()
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [errors, setErrors] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const workout = { title, load, reps }
    const response = await fetch('api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    // error
    if (!response.ok) {
      setErrors(json.error)
      setEmptyFields(json.emptyFields)
    }
    // success
    if (response.ok) {
      setTitle('')
      setLoad('')
      setReps('')
      setErrors(null)
      setEmptyFields([])
      dispatch({ type: 'CREATE_WORKOUT', payload: json })
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>

      <h3>Add a new <strong>Workout</strong></h3>

      <label htmlFor="">Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => { setTitle(e.target.value) }}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label htmlFor="">Exercise Load:</label>
      <input
        type="number"
        onChange={(e) => { setLoad(e.target.value) }}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label htmlFor="">Exercise Reps:</label>
      <input
        type="text"
        onChange={(e) => { setReps(e.target.value) }}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>

      {errors && <div className="error">{errors}</div>}

    </form>
  )

}

export default WorkoutForm