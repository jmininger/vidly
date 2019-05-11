import React, {Component} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import Movies from "./components/movies";
import NotFound from "./components/common/notFound";
import LoginForm from "./components/loginForm";
import RegistrationForm from "./components/registrationForm";
import NewMovieForm from "./components/newMovieForm";
import Logout from "./components/logout";
import Navbar from "./components/common/navbar";
import ProtectedRoute from "./components/common/protectedRoute";
import EmptyPage from "./components/common/emptyPage";
import {getCurrentUser} from "./services/authService"

class App extends Component{
  state = {}

  componentDidMount() {
    this.setState({user:getCurrentUser()});
  }

  render() {
    const user = this.state.user
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={this.state.user}/>
        <div className="container">
          <Switch>
            <Route path="/login" component={LoginForm}/>
            <ProtectedRoute path="/movies/:id" component={NewMovieForm}/>
            <Route 
              path="/movies" 
              render={(props)=>(<Movies user={user} {...props}/>)}
            />
            <Route
              path="/customers"
              render={(props) => (<EmptyPage value="Customers" {...props}/>)}
            />
            <Route
              path="/rentals"
              render={(props) => (<EmptyPage value="Rentals" {...props}/>)}
            />
            <Route path="/register" component={RegistrationForm}/>
            <Route path="/logout" component={Logout}/>            
            <Route path="/notFound" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/notFound" />
          </Switch>
        </div>
      </React.Fragment>

      );
  }
}

export default App;