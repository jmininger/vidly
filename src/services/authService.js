import http from "./httpService";
import jwtDecode from "jwt-decode"
import {apiEndpoint} from "../config.json";


// import * as genresAPI from "./genreService";

const endpoint = apiEndpoint + "/auth";
const tokenKey = "token"

http.setJwt(getJwt());

export async function login(email, password) {
  const {data: jwt} = await http.post(endpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(token) {
  localStorage.setItem(tokenKey, token);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch(ex) {return null;}
}