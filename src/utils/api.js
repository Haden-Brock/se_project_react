import { baseUrl } from "./constants";

const handleResponse = (res) => {
    if(res.ok) {
        console.log(res);
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


const addClothingItem = ({ id, name, weather, imageUrl }) => {
    return fetch(`${baseUrl}/items`, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, name, weather, imageUrl }),
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
            },
        }
    )
        .then(handleResponse)
};

export {getClothingData, addClothingItem, deleteClothingItem};


