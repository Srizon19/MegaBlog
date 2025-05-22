import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import { AuthLayout, Login, Signup} from './components/index.js'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import Home from './pages/Home.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children:[
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login></Login>
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup></Signup>
          </AuthLayout>
        )
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout>
            {" "}
            <AllPosts></AllPosts>
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost></AddPost>
          </AuthLayout>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout>
            <EditPost></EditPost>
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element: <Post></Post>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
)
