import React, { Component } from "react";
import {Link} from "react-router-dom";

import propTypes from "prop-types";

import Table from "./common/table";
import Like from "./like";
import {getCurrentUser} from "../services/authService";

export default class MovieTable extends Component {

  constructor() {
    super();
    const user = getCurrentUser();
    if(user && user.isAdmin)
      this.columns.push(this.deleteColumn);
  }
  
  deleteComponent = (id) => (
    <button 
      className="btn btn-danger btn-sm" 
      onClick={()=>this.props.onDelete(id)}>
    Delete 
    </button>)

  deleteColumn = {
      sortable: false, 
      key: "delete", 
      content: movie => this.deleteComponent(movie)
    }

  columns = [
    { path: "title", label: "Title", sortable: true,
      content: movie => (<Link to={"/movies/" + movie._id}>{movie.title}</Link>)
    },
    { path: "genre.name", label: "Genre", sortable: true },
    { path: "numberInStock", label: "Stock", sortable: true},
    { path: "dailyRentalRate", label: "Rate", sortable: true },
    {
      key: "liked",
      sortable: false, 
      content: movie => (
        <Like 
          liked={movie.liked} 
          handleLike={() => this.props.onLike(movie)}
        />)
    }
  ]

  render() {
    const movies = this.props.movies
    return ( 
      <div className="Table">     
        <Table 
          columns={this.columns} 
          data={movies} 
          onSort={this.props.onSort}
          currentSort={this.props.currentSort}
        />
      </div>
    );
  }
}

MovieTable.propTypes = {
  movies: propTypes.array.isRequired,
  currentSort: propTypes.object.isRequired,
  onDelete: propTypes.func.isRequired,
  onSort: propTypes.func.isRequired
};

// ListGroup.defaultProps = {
//   idProperty: "_id",
//   valueProperty: "name"
// };