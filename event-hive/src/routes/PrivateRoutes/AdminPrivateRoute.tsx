import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Outlet,Navigate } from "react-router-dom";

const AdminPrivateRoute:React.FC = () =>{
    const { adminInfo } = useSelector((state: RootState) => state.auth);
   

   

    // Return Outlet if userInfo exists, otherwise return null
   return adminInfo ?<Outlet/> :  <Navigate to="/admin/login" replace />
}

export default AdminPrivateRoute;