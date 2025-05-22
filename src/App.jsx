
import { useDispatch } from 'react-redux'
import './App.css'
import { useEffect, useState } from 'react';
import authService from './appwrite/auth';
import { login,logout } from './store/authSlice';
import { Header,Footer } from './components';
import { Outlet } from 'react-router-dom';


function App() {
  // for create react app: process.env.REACT_APP_VAR_NAME


  // for vite create app: import.meta.env.VITE_SOME_KEY


  const dispatch = useDispatch();
  

  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    console.log("use Effect executed")
    authService.getCurrentUser()
    .then(userData => {
      console.log(userData)
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout());
      }
    })
    .finally(()=>{
      setLoading(false)
      console.log("inside finally: ", loading)
    })
  },[]);




  console.log("loading: ", loading)
  
  return !loading? (
    <>
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          <Header></Header>
          <main>
            <Outlet></Outlet>
          </main>
          <Footer></Footer>
        </div>
      </div>
    </>
  ) : (<>loading......</>)
}

export default App
