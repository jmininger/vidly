import React from "react";
import Joi from "joi-browser"

import Form from "./common/form";
import {register} from "../services/userService"
import {loginWithJwt} from "../services/authService"

class RegistrationForm extends Form {
  state: {
    data: {username: "", password:"", name: ""},
    errors: {}
  }
  schema = {
    username: Joi.string().trim().required().email(),
    password: Joi.string().trim().required().min(5),
    name: Joi.string().trim().required()
  }

  doSubmit = async () => {
    try {
      const {headers} = await register(this.state.data);
      loginWithJwt(headers["x-auth-token"]);
      window.location = "/";

    } catch(ex) {
      if(ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }

  }

  render() {
    return (
      <div>
        <h1> Registration </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("register")}
        </form>
      </div>
    );
  }
}


export default RegistrationForm;