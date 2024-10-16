import { useCallback, useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// components
import WorkoutDetails from "../components/WorkoutDetail"
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()

  const fetchWorkout = useCallback(async () => {
    const response = await fetch("/api/workouts")
    const json = await response.json()
    if (response.ok) {
      dispatch({ type: "SET_WORKOUTS", payload: json })
    }
  }, [dispatch])

  useEffect(() => {
    fetchWorkout()
  }, [fetchWorkout])

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>

      <WorkoutForm />
    </div>
  )
}

export default Home
