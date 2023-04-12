import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import GoalFrom from '../components/GoalForm'

function Dashboard() {
  // initialize navigate 
  const navigate = useNavigate();

  // Gets current state to see if user is logged in or not. Takes in a function 
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // checks to see if there is a user, if not user will be redirected to login page 
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return <>
    <section className="heading">
      <h1>Welcome {user && user.name}</h1>
      <p>Your Goals: </p>
    </section>
    <GoalFrom />
  </>;
}

export default Dashboard;
