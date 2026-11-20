import { getChannels } from "./api.js";
import { renderChannelList, updatePreview, setActiveChannel } from "./ui.js";
import { initSearch } from "./search.js";

const message = document.querySelector("#message");
let channels = [];

const onChannelClick = (channel, element) => {
    updatePreview(channel);
    setActiveChannel(element);
    localStorage.setItem('lastChannelId', channel.id);
    window.scrollTo({ top:0, behavior: 'smooth' });
};

const loadChannels = async () => {
    try {
        message.textContent = "Chargement...";

        channels = await getChannels();
        message.textContent = "";

        renderChannelList(channels, 'channel-list', onChannelClick);
        initSearch(channels, renderChannelList, onChannelClick);

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