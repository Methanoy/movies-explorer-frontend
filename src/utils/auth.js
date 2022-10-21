import { MAIN_API_URL, handleResponse } from './utils';

export const signup = (name, email, password) => fetch(`${MAIN_API_URL}/signup`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name,
    email,
    password,
  }),
}).then(handleResponse);

export const login = (email, password) => fetch(`${MAIN_API_URL}/signin`, {
  method: 'POST',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email,
    password,
  }),
}).then(handleResponse);

export const signout = () => fetch(`${MAIN_API_URL}/signout`, {
  method: 'GET',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}).then(handleResponse);

export const checkToken = () => fetch(`${MAIN_API_URL}/users/me`, {
  method: 'GET',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}).then(handleResponse);
