import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase.config'

function Navmenu() {
  const [toggle, setToggle] = useState(false)
  const navigate = useNavigate()

  const toggleHandler = ()=> setToggle(!toggle)

  const userLogOut = ()=>{
    signOut(auth)
      .then(()=>{
        navigate("/login")
      }).catch((err)=>{
        console.log(err.message);
        console.log(err.code);
        
      })
  }

  return (
    <>
      <div className="topnav">
        <div className="left_topnav">
          <button className="toggleBar" onClick={toggleHandler}><FontAwesomeIcon icon={faBars} /></button>
        </div>
        <div className="right_topnav">
          <h1>K.M. AL-AMIN</h1>
        </div>
      </div>
      <div className={`${!toggle ? 'sideBarToggle'  : ''} sideBar`}>
        <div className="nav_links">
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/add-item">Add Post</Link></li>
            <li><Link to="/all-item">All Posts</Link></li>
          </ul>
        </div>
        <div className="lgt_button">
          <button onClick={userLogOut}>Log Out</button>
        </div>
      </div>
    </>
  )
}

export default Navmenu