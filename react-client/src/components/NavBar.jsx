import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const NavBar = ({path, handleLogout, isLoggedIn, studentRedirect, ownerRedirect, buildRedirect}) => (
  <div>
    <AppBar
      zDepth={0}
      style={{"backgroundColor":"rgba(0,0,0,0.3)"}}
      showMenuIconButton={false}
      iconElementRight={
        <div>
          {(path !== '/' && !isLoggedIn) 
            && <Link to='/'><FlatButton label="Login" style={{"color":"white"}}/></Link>}

          {(path !== '/registration' && !isLoggedIn) 
            && <Link to='/registration'><FlatButton label="Sign Up" style={{"color":"white"}}/></Link>}

          {(isLoggedIn && buildRedirect) 
            && <Link to='/owner/build'><FlatButton label="Make Playlist" style={{"color":"white"}}/></Link>}

          {(isLoggedIn && studentRedirect) 
            && <Link to='/student'><FlatButton label="All Videos" style={{"color":"white"}}/></Link>}

          {(isLoggedIn && ownerRedirect) 
            && <Link to='/owner'><FlatButton label="All Videos" style={{"color":"white"}}/></Link>}

          {(isLoggedIn) 
            && <FlatButton onClick={handleLogout} label="Log Out" style={{"color":"white"}}/>}
        </div>
      }
    />
  </div>
)

export default NavBar;