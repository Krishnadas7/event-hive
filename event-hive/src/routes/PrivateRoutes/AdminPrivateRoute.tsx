import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate,Outlet,Navigate } from "react-router-dom";

const AdminPrivateRoute:React.FC = () =>{
    const { adminInfo } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

   

    // Return Outlet if userInfo exists, otherwise return null
   return adminInfo ?<Outlet/> :  <Navigate to="/admin/login" replace />
}

export default AdminPrivateRoute;