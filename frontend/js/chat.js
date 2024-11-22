// JavaScript for MediLink Chat Page

document.addEventListener("DOMContentLoaded", function () {
    setupChatPage();
    setupContactSwitching();
});

function setupChatPage() {
    // Event listener for sending messages
    const messageInput = document.getElementById("chat-message");
    messageInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
}

function setupContactSwitching() {
    // Event listeners for switching between different doctors
    const contacts = document.querySelectorAll(".contact");
    contacts.forEach(contact => {
        contact.addEventListener("click", function () {
            switchChat(contact);
        });
    });
}

let chatHistory = {};

function switchChat(contact) {
    const chatHeaderInfo = document.querySelector(".chat-header-info");
    const messagesContainer = document.getElementById("messages-container");

    // Update chat header with selected doctor's info
    const doctorName = contact.querySelector(".contact-info h4").textContent;
    const doctorStatus = contact.querySelector(".contact-info p").textContent;
    const doctorImage = contact.querySelector("img").src;

    chatHeaderInfo.querySelector("h4").textContent = doctorName;
    chatHeaderInfo.querySelector("p").textContent = doctorStatus;
    document.querySelector(".chat-header img").src = doctorImage;

    // Save current chat before switching
    const currentDoctor = chatHeaderInfo.querySelector("h4").textContent;
    if (currentDoctor && messagesContainer.innerHTML.trim() !== "") {
        chatHistory[currentDoctor] = messagesContainer.innerHTML;
    }

    // Load chat history for the selected doctor
    messagesContainer.innerHTML = chatHistory[doctorName] || "";

    // If no history, add placeholder for new conversation
    if (!chatHistory[doctorName]) {
        const placeholderMessage = document.createElement("div");
        placeholderMessage.classList.add("message", "received");
        placeholderMessage.innerHTML = `<p>${doctorName}: How can I assist you today?</p>`;
        messagesContainer.appendChild(placeholderMessage);
    }
}

function sendMessage() {
    const messageInput = document.getElementById("chat-message");
    const messageText = messageInput.value.trim();
    const chatHeaderInfo = document.querySelector(".chat-header-info");
    const doctorName = chatHeaderInfo.querySelector("h4").textContent;

    if (messageText !== "") {
        // Add sent message to the chat window
        const messagesContainer = document.getElementById("messages-container");
        const sentMessage = document.createElement("div");
        sentMessage.classList.add("message", "sent");
        sentMessage.innerHTML = `<p>${messageText}</p>`;
        messagesContainer.appendChild(sentMessage);

        // Scroll to the bottom of the messages container
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Clear the input field
        messageInput.value = "";

        // Save updated chat history
        chatHistory[doctorName] = messagesContainer.innerHTML;

        // Simulate doctor reply after 1-3 seconds for more dynamic response
        setTimeout(function () {
            receiveMessage(doctorName);
        }, Math.floor(Math.random() * 2000) + 1000);
    }
}

function receiveMessage(doctorName) {
    const messagesContainer = document.getElementById("messages-container");
    const receivedMessage = document.createElement("div");
    receivedMessage.classList.add("message", "received");
    receivedMessage.innerHTML = `<p>${doctorName}: Thank you for your message. I will get back to you shortly.</p>`;
    messagesContainer.appendChild(receivedMessage);

    // Scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Save updated chat history
    chatHistory[doctorName] = messagesContainer.innerHTML;
}

function toggleEmojiPicker() {
    const emojiContainer = document.getElementById("emoji-container");
    if (emojiContainer.style.display === "none" || emojiContainer.style.display === "") {
        emojiContainer.style.display = "flex";
    } else {
        emojiContainer.style.display = "none";
    }
}

function addEmoji(emoji) {
    const messageInput = document.getElementById("chat-message");
    messageInput.value += emoji;
    messageInput.focus();
}
