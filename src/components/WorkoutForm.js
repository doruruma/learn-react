import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {

  const { dispatch } = useWorkoutsContext()
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [errors, setErrors] = useState(null)

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
    if (!response.ok)
      setErrors(json.error)
    // success
    if (response.ok) {
      setTitle('')
      setLoad('')
      setReps('')
      setErrors(null)
      dispatch({ type: 'CREATE_WORKOUT', payload: json })
      console.info('new workout added', json)
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
      />

      <label htmlFor="">Exercise Load:</label>
      <input
        type="number"
        onChange={(e) => { setLoad(e.target.value) }}
        value={load}
      />

      <label htmlFor="">Exercise Reps:</label>
      <input
        type="text"
        onChange={(e) => { setReps(e.target.value) }}
        value={reps}
      />

      <button>Add Workout</button>

    </form>
  )

}

export default WorkoutForm