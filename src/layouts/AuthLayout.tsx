import { Outlet } from "react-router"

export default function AuthLayout(){
  return(
    <div className="flex h-screen w-full items-center justify-center bg-radial from-white via-[#f1f6f3] to-[#d7f6e5]">
      <Outlet/>
    </div>
  )
}