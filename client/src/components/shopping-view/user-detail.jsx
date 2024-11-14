import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

export const UserDetail = () => {
  const {user} = useSelector((state) => state.auth);
  const {userId} = useParams()
  
  return(
   <div>This user {user?.userName}</div>
  )
  
};