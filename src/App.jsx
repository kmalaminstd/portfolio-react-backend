import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import AddWork from "./pages/AddWork" 
import AllItems from "./pages/AllItems"
import Navmenu from "./components/shared/Navmenu"
import Login from "./pages/Login"
import Private from "./routes/Private"
import Public from "./routes/Public"
import EditItem from "./pages/EditItem"

function App (){

  const DynamicRouter = ()=>{
    return(
      <div className="dynamicPage">
        <Navmenu />
        <main>
          <Outlet />
        </main>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element:(
        <Private>
          <DynamicRouter />
        </Private>),
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'add-item',
          element: <AddWork />
        },
        {
          path: 'all-item',
          element: <AllItems />
        },
        {
          path: 'edit-item/:id',
          element: <EditItem />
        }
      ]
    },
    {
      path: 'login',
      element: (
        <Public>
          <Login />
        </Public>
      )
    }
  ])

  

  return(
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App