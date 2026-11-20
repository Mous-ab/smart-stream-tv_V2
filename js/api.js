// api.js: pour parler au serveur MockAPI

// C'est l'adresse de la ressource channels sur MockAPI
const API_URL = "https://6afb2ebd730c1d152f3342ee.mockapi.io/channels";

// GET: Lire toutes les chaines
// export: pour rendre la fonction visible dans d'autres fichiers et peut etre recuperée par import
// async: elle renvoie une promise et on a le droit d'utiliser await
export const getChannels = async () => {
// On cree response qui nous recupere la promise d'objet Response renvoyé par la requête HTTP
// await qui met en pause la fonction tant que la Promise n'est pas encore terminée
    const response = await fetch (API_URL); // par defaut fetch fait un GET
// si response.ok si le code n'est pas entre 200 et 299, throw new error arrete tout et affiche response.status qui est le code HTTP correspondant
    if (!response.ok) throw new Error(`Erreur ${response.status}`);
// Pour pouvoir lire la reponse du serveur qui arrive sous forme de text: .json convertit le text en tableau ou objet JS
    return response.json();
};

// POST pour ajouter une chaîne
export const createChannel = async (channel) => {
// on stock dans response le fetch de la ressource channels
    const response = await fetch (API_URL, {
// pour envoyer des données: on utilise le type d'action POST pour dire d'ajouter
        method : "POST",
// Le serveur comprend que ce qui est envoyé est du json
        headers : { "Content-Type": "application/json" },
// les données envoyées doivent etre du text(string)
        body: JSON.stringify(channel),
    });
// si response.ok si le code n'est pas entre 200 et 299, throw new error arrete tout et affiche response.status qui est le code HTTP correspondant
    if (!response.ok) throw new Error(`Erreur ${response.status}`);
// Pour pouvoir lire la reponse du serveur qui arrive sous forme de text: .json convertit le text en tableau ou objet JS
    return response.json();
};

//PUT: pour les modifications
export const updateChannel = async (id, changes) => {
// on stock dans response le fetch de la ressource channels
    const response = await fetch(`${API_URL}/${id}`, {
// pour envoyer des données: on utilise le type d'action PUT pour dire de modifier une chaine
        method : "PUT",
// Le serveur comprend que ce qui est envoyé est du json
        headers: { "Content-Type": "application/json" },
// les données envoyées doivent etre du text(string)
        body: JSON.stringify(changes),
    });
// si response.ok si le code n'est pas entre 200 et 299, throw new error arrete tout et affiche response.status qui est le code HTTP correspondant
    if (!response.ok) throw new Error(`Erreur ${response.status}`);
// Pour pouvoir lire la reponse du serveur qui arrive sous forme de text: .json convertit le text en tableau ou objet JS
    return response.json();
};

//DELETE: supprimer une chaîne
export const deleteChannel = async (id) => {
// on stock dans response le fetch de la ressource channels
    const response = await fetch(`${API_URL}/${id}`, {method: "DELETE" });
// Si la reponse du serveur n'est pas OK, on arrête et on lance une erreur que le catch de app.js va attraper
    if (!response.ok) throw new Error(`Erreur ${response.status}`);
// Pour pouvoir lire la reponse du serveur qui arrive sous forme de text: .json convertit le text en tableau ou objet JS
    return response.json();
};