import http from "./httpService"
// import * as genresAPI from "./genreService";

const endpoint = "http://localhost:3900/api/movies"

export function getMovies() {
  return http.get(endpoint)
}

export function getMovie(id) {
  return http.get(`${endpoint}/${id}`)
}

export function saveMovie(movie) {
  if(movie._id) {
    const body = {...movie}
    delete body._id
    return http.put(`${endpoint}/${movie._id}`, body)
  }
  return http.post(endpoint, movie)
}
  


export function deleteMovie(id) {
  return http.delete(`${endpoint}/${id}`)
  // return movieInDb;
}
