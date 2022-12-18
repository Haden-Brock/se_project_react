import { baseUrl } from "./constants";

const handleResponse = (res) => {
  if(res.ok) {
      return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
};

const register = ({ name, avatar, email, password }) => {
  const user = {email: email, password: password};
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
    .then(() => {return user})
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
    .then(res => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token); 
        
        return {...user, token: data.token};
      }
    })
    .catch((err) => console.log(err));
}

const getContent = (token) => {
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

export { register, authorize, getContent };