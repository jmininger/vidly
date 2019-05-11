import axios from "axios"

export async function genreLookup(id) {
  const genres = await getGenres()
  const matchingNames =
    genres.filter(genre => { return id === genre["_id"]; })
          .map(genre => { return genre.name; });
  const genreName = matchingNames[0];
  return Object.is(undefined) ? null : genreName;
}

export function getGenres() {
  // const res = await axios.get("http://localhost:3900/api/genres")
  // return res.data
  return axios.get("http://localhost:3900/api/genres")
}
