import { baseUrl } from "./constants";

const handleResponse = (res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
};

const getClothingData = () => {
    return fetch(`${baseUrl}/items`, 
        {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
        .then(handleResponse)
};


const addClothingItem = ({ name, weather, imageUrl }) => {
    return fetch(`${baseUrl}/items`, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({ name, weather, imageUrl }),
        }
    )
        .then(handleResponse)
};

const deleteClothingItem = (id) => {
    return fetch(`${baseUrl}/items/${id}`, 
        {
        method: "DELETE", 
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
            },
        }
    )
        .then(handleResponse)
};

const editProfile = ({ name, avatar }) => {
    return fetch(`${baseUrl}/users/me`, 
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json", 
            "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({ name, avatar }),
    })
    .then(handleResponse)
};

const likeCard = (cardId, userId) => {
    return fetch(`${baseUrl}/items/${cardId}/likes`, 
    {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({ userId }),
    })
    .then(handleResponse)
};

const dislikeCard = (cardId, userId) => {
    return fetch(`${baseUrl}/items/${cardId}/likes`,
    {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({ userId })
    })
    .then(handleResponse)
}

export {getClothingData, addClothingItem, deleteClothingItem, editProfile, likeCard, dislikeCard};


