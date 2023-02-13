import { WorkoutsContext } from "../context/WorkoutContext"
import { useContext } from "react"

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)
    if (!context)
        throw Error("this context must be use inside WorkoutsContextProvider")
    return context
}