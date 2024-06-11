import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate,Outlet,Navigate } from "react-router-dom";

const UserPrivateRoute:React.FC = () =>{
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

   

    // Return Outlet if userInfo exists, otherwise return null
   return userInfo ?<Outlet/> :  <Navigate to="/" replace />
}

export default UserPrivateRoute;