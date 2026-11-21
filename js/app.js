import { getChannels, updateChannel } from "./api.js";
import { renderChannelList, updatePreview, setActiveChannel } from "./ui.js";
import { initSearch } from "./search.js";
import { epgData } from "../data/data.js"

const message = document.querySelector("#message");
// le div parent qui contient toutes les chaines
const list = document.querySelector("#channel-list");
let channels = [];

// Gestion des clics par delegation d'evenements
list.addEventListener("click", async (event) => {
    // cherchons le bouton cliqué
    const button = event.target.closest("button");
    if (!button) return;

    const id = button.closest("[data-id]").dataset.id;
    const action = button.dataset.action;

    const channel = channels.find((c) => c.id === id);

    if (!channel) return;

    if (action === "favorite") {
        try {
            const newValue = !channel.isFavorite;
            await updateChannel(id, { isFavorite: newValue});
            channel.isFavorite = newValue;
            // renderChannelList(channels, 'channel-list', onChannelClick);

            applyFilter();

            message.textContent = "Favori enregistré ✔";
            message.classList.replace("text-gray-300", "text-green-400");
        } catch (error) {
            message.textContent = "Erreur : le favori n'est pas enregistré.";
            message.classList.replace("text-green-400", "text-red-500");
        }
    }
});

// Clic sur une chaîne
const onChannelClick = (channel, element) => {
    updatePreview(channel);
    setActiveChannel(element);
    localStorage.setItem('lastChannelId', channel.id);
    window.scrollTo({ top:0, behavior: 'smooth' });
};

// Logique de Filtre
let currentFilter = "all";

const applyFilter = () => {
    let channelsToDisplay = channels;

    if (currentFilter === "favorites") {
        channelsToDisplay = channels.filter(c => c.isFavorite === true);
    }

    renderChannelList(channelsToDisplay, "channel-list", onChannelClick);
}

const filterAllBtn = document.getElementById("filter-all");
const filterFavBtn = document.getElementById("filter-favorites");

filterAllBtn.addEventListener("click", () => {
    currentFilter = "all";
    filterAllBtn.classList.add("bg-[#2F6FED]", "text-white");
    filterAllBtn.classList.remove('bg-transparent', 'text-gray-300', 'border');
    filterFavBtn.classList.remove('bg-[#2F6FED]', 'text-white');
    filterFavBtn.classList.add('bg-transparent', 'text-gray-300', 'border');
    applyFilter();
})

filterFavBtn.addEventListener("click", () => {
    currentFilter = "favorites";
    filterFavBtn.classList.add("bg-[#2F6FED]", "text-white");
    filterFavBtn.classList.remove("bg-transparent", "text-gray-300", "border");
    filterAllBtn.classList.remove("bg-[#2F6FED]", "text-white");
    filterAllBtn.classList.add("bg-transparent", "text-gray-300", "border");
    applyFilter();
})

// Chargement initial
const loadChannels = async () => {
    try {
        message.textContent = "Chargement...";

        const apichannels = await getChannels();

        channels = apichannels.map(apichannel => {
            const localEpg = epgData[apichannel.id] || {
                currentProgram: "Programme non disponible",
                startTime: "--:--",
                endTime: "--:--",
                progressPercentage: 0
            };
            return { ...apichannel, epg: localEpg };
        });

        message.textContent = "";

        applyFilter();
        initSearch(channels, renderChannelList, onChannelClick);

        // renderChannelList(channels, 'channel-list', onChannelClick);
        // initSearch(channels, renderChannelList, onChannelClick);

        const savedId = localStorage.getItem('lastChannelId');
        const initialChannel = channels.find(channel => channel.id === savedId) || channels[0];

        if (initialChannel) {
            const initialElement = document.querySelector(`#channel-list > [data-id="${initialChannel.id}"]`);
            if (initialElement) {
                updatePreview(initialChannel);
                setActiveChannel(initialElement);
            }
        }
    } catch (error) {
        console.error(error);
        message.textContent = "Impossible de charger les chaînes.";
        message.classList.add("text-red-500", "font-bold");
        message.classList.remove("text-gray-300");
    }
};

loadChannels();