import React from 'react'
import {Container, Logo, LogoutBtn} from "../index"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const authStatus = useSelector((state) => state.auth.status)

    console.log("auth status: ", authStatus)

    console.log("authStatus from header: ", authStatus)
    const navigate = useNavigate()
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: authStatus
        },
        {
            name: "Login",
            slug: "/login",
            sctive: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "add-post",
            active: authStatus
        }
    ]
  return (
    <div>
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='70px'></Logo>
                        </Link>
                    </div>


                    <ul className='flex ml-auto'>
                        {navItems.map((item)=>(
                            item.active? <>
                               <li key={item.name}>
                                <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={()=>{
                                    navigate(item.slug)
                                }}>
                                    {item.name}
                                </button>
                               </li> 
                            </>: null
                        ))}
                        {authStatus && (
                            <li>
                                <LogoutBtn></LogoutBtn>
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    </div>
  )
}

export default Header
