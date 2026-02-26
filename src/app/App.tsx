import { useEffect } from "react"
import { checkAuth } from "../features/profile/userSlice";
import { useAppDispatch } from "../shared/hooks/redux";

function App() {
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[])

  return (
    <>
      
    </>
  )
}

export default App
