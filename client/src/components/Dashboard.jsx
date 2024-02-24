import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

function Dashboard() {
  return (
    <div>
        <Navbar/>
        <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard