import React, { Component } from "react";
import Joi from "joi-browser"
import Input from "./input"

class Form extends Component {
  state = {
    data: {}, // represents the data contained in each input
    errors: {}
  }

  // Type: e.currentTarget -> errorMsg | null
  validateProperty = ({name, value}) => {
    const obj = {[name]: value};
    const schema = {[name]: this.schema[name]}
    const {error} = Joi.validate(obj, schema);
    return error ? error.details[0].message : null
  }

  // Return type of Joi.validate -> 
  //      {...otherFields, 
  //        error: {
  //            ...otherFields, 
  //            details: [
  //              {...other, 
  //                  path, 
  //                  message: string}
  //              ]}}

  // Confirms that all fields in form contain valid data; return null | error object 
  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {abortEarly:false})
    if(!result.error) 
      return null;
    const errors = {}
    for(let item of result.error.details) 
      errors[item.path[0]] = item.message
    return errors;
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({errors: errors || {}});
    if(errors) return;
    this.doSubmit();
  }

  handleChange = e => {
    const data = {...this.state.data};
    const errors = {...this.state.errors};
    const errorMsg  = this.validateProperty(e.currentTarget)
    if(errorMsg) errors[e.currentTarget.name] = errorMsg
    else delete errors[e.currentTarget.name]
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({data, errors})
  }

  renderButton = (label) => {
    return (
      <button 
        disabled={this.validate()} 
        type="submit" 
        className="btn btn-primary"
      >
      {label}</button>)
  }
  renderInput = (id, label, type="text") => {
    const {data, errors} = this.state;
    return (
      <Input 
        id={id} 
        value={data[id]}
        label={label}
        type={type}
        onChange={this.handleChange}
        error={errors[id]}
      />
      )
  }

  // renderSelect = (options) => {
  //   return (
  //     <select>
  //       {
  //         options.map(opt => (<option value={opt}>{opt}</option>))
  //       }
  //     </select>
  //     )
  // }


}

export default Form;