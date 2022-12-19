import { baseUrl } from "./constants";

const handleResponse = (res) => {
  if(res.ok) {
      return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
};

const register = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`,
    {
      method: "POST",
      headers: {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({ name, avatar, email, password }),
    }
  )
    .then(handleResponse)
    .then((res) => {return {email: res.data.email, password}})
    .catch((err) => console.log(err));
};

const authorize = (user) => {
  const { email, password } = user;
  return fetch(`${baseUrl}/signin`, 
  {
    method: "POST", 
    headers: {
      "Accept" : "application/json",
      "Content-Type" : "application/json",
    },
    body: JSON.stringify({ email, password })
  })
    .then(handleResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token); 
        
        return {...user, token: data.token};
      }
    })
    .catch((err) => console.log(err));
}

const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, 
  {
    method: "GET",
    headers: {
      "Accept" : "application/json",
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`,
    }
  })
    .then(handleResponse)
}

export { register, authorize, checkToken };