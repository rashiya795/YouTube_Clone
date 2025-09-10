import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import HomePage from './components/HomePage.jsx'
import SignUp from './components/SignUp.jsx'
import Content from './components/Content.jsx'
import CreateChannel from './components/CreateChannel.jsx'
import ChannelPage from './components/ChannelPage.jsx'

let routers = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        index:true,
        element:<HomePage/>
      },
      {
        path:'login',
        element:<Login/>
        
      },

       {
        path:'signup',
        element:<SignUp/>
        
      },
       {
        path:'/watch/:id',
        element:<Content/>
        
      },
      {
        path:'create-channel',
        element:<CreateChannel/>
      },
      {
  path: '/channel/:channelId',
  element: <ChannelPage />
},{
  path: '*',
  element: <p>Page not found. Check the URL!</p>
},


    ]
  }
])
createRoot(document.getElementById('root')).render(

  <RouterProvider router={routers}></RouterProvider>
  // <StrictMode>
  //   <App />
  // </StrictMode>,
)
