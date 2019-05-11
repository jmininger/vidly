import React, {Component} from "react";
import {toast} from "react-toastify"
import {Link} from "react-router-dom"
import _ from "lodash"

import MovieTable from "./movieTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import SearchForm from "./searchForm";

import {getMovies, deleteMovie} from "../services/movieService";
import {getGenres} from "../services/genreService";

class Movies extends Component{
  pageSize = 4;

  state = {
    movies: [],
    currentPage: 1,
    genreID: 0,
    sortObj : {path: "title", order:["asc"]},
    searchQuery: "",
    genres :[]
  }

  async componentDidMount() {
    const resM = await getMovies()
    const movies = resM.data
    const resG = await getGenres()
    const genres = resG.data

    this.setState({movies, genres})
  }

  moviesToDisplay(filtered) {
    const {currentPage} = this.state
    return elemsOnPage(filtered, this.pageSize, currentPage)
  }

  handleDelete = async (elem) =>{
    try {
      deleteMovie(elem._id)
      const {data:newMovies} = await getMovies()
      this.setState({movies:newMovies})

    } catch(ex) {
      if(ex.response && ex.response.status===404)
        toast.error("movie has already been deleted")
    }
  } 

  handleLike = (elem) =>{
    const movies = [...this.state.movies];
    const index = movies.indexOf(elem);
    let movie = {...movies[index]};
    movie.liked = (!movie.liked)
    movies[index] = movie
    this.setState({ movies });
  } 

  // handleGenreFilter(genreID) {
  //   this.setState({genre: genreID, searchQuery: ""})
  // }

  handlePageChange = pageIdx => {
    this.setState({currentPage: pageIdx})
  }

  handleGenreChange = genreID => {
    this.setState({genreID: genreID, currentPage:1, searchQuery:""})
  }

  handleSort = sortObj => {
    this.setState({sortObj:sortObj})
  }

  getPageData(filtered) {
    const {sortObj} = this.state
    const sorted = _.orderBy(filtered, sortObj.path, sortObj.order)

    return this.moviesToDisplay(sorted);
  }

  handleSearchChange = (val) => {
    this.setState({searchQuery: val, genreID: 0, currentPage:1})
  }

  // handleSearchClick = () => {
  //   this.setState({genreID: null})
  // }

  filterData = () => {
    const {movies: allMovies, searchQuery, genreID} = this.state
    if(searchQuery === "") {
      return allMovies.filter(elem => {
        return genreID === 0 || elem.genre._id === genreID;
      })
    }
    else {
      return allMovies.filter(elem => {
         return elem.title.toLowerCase().startsWith(searchQuery)
      });
    }
  }

  render() {
    const {
      movies, currentPage, genreID, sortObj, searchQuery, genres
    } = this.state;

    const {user} = this.props
    
    const filtered = this.filterData()
    const displayed = this.getPageData(filtered)

    return (
      <div className="container row">
        <div className="col-2">
          <ListGroup 
            activeElem={genreID} 
            elements={genres}
            iDField="_id"
            valueField="name"
            onGenreChange={this.handleGenreChange}
          />
        </div>
        <div className="col">
          {
            user && 
              (<Link 
                to="/movies/new"
                className="btn btn-primary">New Movie</Link>)
          }
          
          <SearchForm
            value={searchQuery}
            onChange={this.handleSearchChange}
            />
          <p>Showing {filtered.length} movie{filtered.length===1?null:"s"}</p>
          <MovieTable 
            movies={displayed}
            currentSort={sortObj}
            onDelete={this.handleDelete}
            onLike = {this.handleLike}
            onSort = {this.handleSort}
          />
          {
            movies.length !== 0 ?
              (<Pagination 
                pageSize={this.pageSize}
                currentPage={currentPage}
                numElements={filtered.length}
                onPageChange={this.handlePageChange}/>):
              (<div/>)
          }
        </div>
      </div>
          
      );
  }
}

export default Movies;

function elemsOnPage(elems, pageSize, currentPage) {
  const startIdx = (currentPage-1)*pageSize;
  const endIdx = (startIdx + pageSize) > elems.length ? 
                  elems.length : 
                  startIdx + pageSize;
  return elems.slice(startIdx, endIdx)
}

