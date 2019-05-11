import React from "react";
import Joi from "joi-browser"

import Form from "./common/form";
import {getGenres} from "../services/genreService";
import {saveMovie, getMovie} from "../services/movieService";

class NewMovieForm extends Form {
  state: {
    data: {
      _id: "",
      title: "", 
      genre:"", 
      stock: "",
      rate:""
    },
    genres: [],
    errors: {}
  }
  schema = {
    _id: Joi.string(),
    title: Joi.string().trim().min(5).required(),
    genre: Joi.string().trim().required(),
    stock: Joi.number().required().min(0).max(100),
    rate: Joi.number().required().min(0).max(10)
  }

  mapMovieToData(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genre: movie.genre.name,
      stock: movie.numberInStock,
      rate: movie.dailyRentalRate
    }
  }

  async componentDidMount() {
    const {data:genres} = await getGenres()
    this.setState({genres})
    const idParam = this.props.match.params.id
    if(idParam !== "new") {
      try {
        const {data:movie} = await getMovie(idParam)
        const data = this.mapMovieToData(movie);
        this.setState({data});
      } catch(ex) {
        this.props.history.replace("/notFound")
      }      
    }
  }

  doSubmit = async () => {
    const {_id, title, genre, stock, rate } = this.state.data;
    const newMovie = {
      _id: _id,
      title: title,
      genreId: this.state.genres.find((g) => g.name === genre)._id,
      numberInStock: stock,
      dailyRentalRate: rate
    };
    try {
      await saveMovie(newMovie);
      this.props.history.push("/movies")
    }
    catch(ex){}
   
  }

  render() {
    return (
      <div>
        <h1> New Movie </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("genre", "Genre")}
          {this.renderInput("stock", "Number In Stock")}
          {this.renderInput("rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}


export default NewMovieForm;