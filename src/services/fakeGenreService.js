export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" }
];

export function genreLookup(id) {
  const matchingNames =
    genres.filter(genre => { return id === genre["_id"]; })
          .map(genre => { return genre.name; });
  const genreName = matchingNames[0];
  return Object.is(undefined) ? null : genreName;
}

export function getGenres() {
  return genres.filter(g => g);
}
