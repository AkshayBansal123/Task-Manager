import React from 'react'
import tasklogo from './task-list.png'
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg " style={{backgroundColor:'purple'}} >
  <a className="navbar-brand" href="#"><img src={tasklogo} style={{height:'50px',width:'50px',marginLeft:'50px'}}></img></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#" style={{fontSize:'18px',color:'white'}}>My Tasks<span className="sr-only"></span></a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="#" style={{fontSize:'18px',color:'white'}}>Progress tracker<span className="sr-only"></span></a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="#" style={{fontSize:'18px',color:'white'}}>Recources<span className="sr-only"></span></a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="#" style={{fontSize:'18px',color:'white'}}>Know more<span className="sr-only"></span></a>
      </li>
     

      
    </ul>

  </div>
</nav>
  )
}

export default Navbar
