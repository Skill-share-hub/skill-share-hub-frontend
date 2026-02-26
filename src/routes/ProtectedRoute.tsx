import {Outlet,Navigate,} from 'react-router-dom'
import { useAppSelector } from '../shared/hooks/redux';

function ProtectedRoute({allowedRole}:{allowedRole?:string}){

  const {login,role,loading} = useAppSelector(state => state.user);

  if(loading) return <h1>Loading...</h1>

  if(!login) return <Navigate to={"/login"} replace/>

  if(allowedRole && role !== allowedRole) return <Navigate to="/" />

  return <Outlet/>
}

export default ProtectedRoute ;