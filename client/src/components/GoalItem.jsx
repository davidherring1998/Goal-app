import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";


function GoalItem({ goal }) {

  const dispatch = useDispatch()
  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleDateString("en-US")}</div>
      <div>
        {new Date(goal.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
      <h2>{goal.text}</h2>
      <button className="close" onClick={() => dispatch(deleteGoal(goal._id))}>
        <FaTrashAlt />
      </button>
    </div>
  );
}

export default GoalItem;
