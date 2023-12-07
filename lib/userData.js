import { getToken } from "./authenticate";

// To store the value of token in the var TOKEN
var TOKEN = getToken();

// Function for adding to favourites
export async function addToFavourites(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id: id }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `JWT ${TOKEN}`
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {
        console.log("Data:", data);
        return data;
    } else {
        return [];
    }
}

// Function for removing from favourites
export async function removeFromFavourites(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id: id }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `JWT ${TOKEN}`
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {
        console.log("Data:", data);
        return data;
    } else {
        return [];
    }
}

// Function to get all favourites
export async function getFavourites() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `JWT ${TOKEN}`
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {
        console.log("Data:", data);
        return data;
    } else {
        return [];
    }
}

// Function for adding to history
export async function addToHistory(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id: id }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `JWT ${TOKEN}`
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {
        console.log("Data:", data);
        return data;
    } else {
        return [];
    }
}

// Function for removing from history
export async function removeFromHistory(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id: id }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `JWT ${TOKEN}`
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {
        console.log("Data:", data);
        return data;
    } else {
        return [];
    }
}

// Function to get all history
export async function getHistory() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `JWT ${TOKEN}`
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {
        console.log("Data:", data);
        return data;
    } else {
        return [];
    }
}