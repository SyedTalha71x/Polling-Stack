import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const logout = () => {
        localStorage.removeItem('token');
        setTimeout(() => {
            window.location.href = 'http://localhost:5173/'
        }, 1000);
    }
    return (
        <div className='navbar flex justify-around cursor-pointer items-center shadow-full p-4 h-full w-full font-semibold text-black bg-white shadow-md'>
            <div className="left-nav">
                <h1 className='text-xl font-extrabold uppercase tracking-normal'>Poling System</h1>
            </div>
            <div className="middle-nav">
                <ul className='flex text-[17px] justify-center items-center'>
                    <Link to={"/"} className='p-2'>Home</Link>
                    <Link to={"/Create"} className='p-2'>Create</Link>
                    <Link to={"/"} className='p-2'>About</Link>
                    <Link to={"/"} className='p-2'>Contact</Link>
                </ul>
            </div>
            <div className="right-nav">
                {localStorage.getItem('token') ?
                    <button onClick={logout} className='bg-blue-900 text-white py-2 px-8 text-center rounded-md'>Logout</button>
                    : <Link to={"/Login"}>
                        <button className='bg-blue-900 text-white py-2 px-8 text-center rounded-md'>Login</button>
                    </Link>}
            </div>
        </div>
    )
}

export default Navbar