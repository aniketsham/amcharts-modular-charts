
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/layout'
import Home from './pages/home'
import TabsPage from './pages/tabs-page'

const App = () => {
  

  const router =createBrowserRouter([
    {
      path: "/",
      element:<Layout />,

      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:"/tabs",
          element:<TabsPage/>
        }
      ]
    }
  ])
  return (
    <div >
      <RouterProvider  router={router} />
    </div>
  )
}

export default App
