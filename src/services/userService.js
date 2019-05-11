import http from "./httpService";
import {apiEndpoint} from "../config.json";

export function register(user) {
  const {username: email, password, name} = user;
  return http.post(`${apiEndpoint}/users`, {email, name, password});
}