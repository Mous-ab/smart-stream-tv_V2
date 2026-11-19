const API_URL = "https://https://6afb2ebd730c1d152f3342ee.mockapi.io/channels";

//Lire les chaines
export const getChannels = async () => {
    const response = await fetch (API_URL);
    if (!response.ok) throw new Error(`Erreur ${response.status}`);
    return response.json();
}

// POST pour ajouter une chaîne
export const createChannel = async (channel) => {
    const response = await fetch (API_URL, {
        method : "POST",
        headers : { "Content-Type": "application/json" },
        body: JSON.stringify(channel),
    });
    if (!response.ok) throw new Error(`Erreur ${response.status}`);
    return response.json();
}

//PUT: pour les modifications
export const updateChannel = async (id, changes) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
    });
    if (!responseok) throw new Error(`Erreur ${response.status}`);
    return response.json();
};

//DELETE: supprimer une chaîne
export const deleteChannel = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {method: "DELETE" });
    if (!response.ok) throw new Error(`Erreur ${response.status}`);
    return response.json;
}