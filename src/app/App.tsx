import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { checkAuth } from "../features/auth/userSlice";
import type { AppDispatch } from "../store/store";

function App() {
  const dispatch:AppDispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[])

  return (
    <>
      
    </>
  )
}

export default App
