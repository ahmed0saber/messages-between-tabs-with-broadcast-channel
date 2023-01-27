const sendBtn = document.querySelector(".send-btn")
const messageInput = document.querySelector(".message-input")
const messagesContainer = document.querySelector(".messages")
const bc = new BroadcastChannel("test")
let isMessageFound = false

bc.onmessage = (msg) => {
    addMessageToContainer("Another tab", msg.data)
}

const sendMessage = () => {
    if (messageInput.value.trim().length === 0) {
        alert("message field is required")
        return
    }

    addMessageToContainer("Current tab", messageInput.value)
    bc.postMessage(messageInput.value)
    messageInput.value = ""
}

const addMessageToContainer = (tab, msg) => {
    if (!isMessageFound) {
        isMessageFound = true
        messagesContainer.innerHTML = ""
    }
    messagesContainer.innerHTML += `
    <div class="message">
        <p>${tab} : ${msg}</p>
    </div>
    `
}

sendBtn.addEventListener("click", sendMessage)