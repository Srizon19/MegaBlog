
import { useDispatch } from 'react-redux'
import './App.css'
import { useEffect, useState } from 'react';
import authService from './appwrite/auth';
import { login,logout } from './store/authSlice';
import { Header,Footer } from './components';


function App() {
  // for create react app: process.env.REACT_APP_VAR_NAME


  // for vite create app: import.meta.env.VITE_SOME_KEY


  const dispatch = useDispatch();
  console.log(dispatch)

  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    authService.getCurrentUser()
    .then(userData => {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout());
      }
    })
    .finally(()=>setLoading(false))
  },[dispatch]);



  
  return !loading? (
    <>
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          <Header></Header>
          <main>
            TODO: {/* {outlet} */}
          </main>
          {/* <Footer></Footer> */}
        </div>
      </div>
    </>
  ) : (<>loading......</>)
}

export default App
