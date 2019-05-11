import React from "react";
import {NavLink, Link} from "react-router-dom";
// import propTypes from "prop-types";

const Navbar = ({user}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link" to="/rentals">
            Rentals
          </NavLink>
          {
            !user &&
              ( <React.Fragment>
                  <NavLink className="nav-item nav-link" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/register">
                    Registration
                  </NavLink>
                </React.Fragment>)
          }
          {
            user &&
              ( <React.Fragment>
                  <NavLink className="nav-item nav-link" to="/profile">
                    {user.name}
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/logout">
                    Logout
                  </NavLink>
                </React.Fragment>)
          }

        </div>
      </div>
    </nav>
  );
};



// const Navbar = (props) => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
//       <div className="navbar-nav">
//         <ul>
//           <li><NavLink to="/" className="navbar-brand">Vidly</NavLink></li>
//           <li><NavLink to="/movies" className="nav-item nav-link" >Movies</NavLink></li>
//           <li><NavLink to="/customers" className="nav-item nav-link">Customers</NavLink></li>
//           <li><NavLink to="/rentals" className="nav-item nav-link">Rentals</NavLink></li>
//         </ul>
//       </div>
//     </nav>
//   );
// };


export default Navbar;
