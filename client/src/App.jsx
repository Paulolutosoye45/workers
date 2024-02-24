import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./components/Dashboard";
import Home from "./components/page/Home";
import SignUpdirectory from "./components/directory/SignUpdirectory";
import Signindirectory from "./components/directory/Signindirectory";

function App() {
  const routes = createBrowserRouter([
    {
      path:'/',
      element: <Dashboard/>,
      children: [
        {
          path: 'Home',
          element:<Home/>
        },
        {
          path: 'signin',
          element:<Signindirectory/>
        },
        {
          path: 'signup',
          element:<SignUpdirectory/>
        },
      ]
    }
  ])
  return (
    <>
       <RouterProvider router={routes} />
       <ToastContainer />
    </>
  )
}

export default App
