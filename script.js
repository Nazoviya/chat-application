//creation of localhost port to serve server that included web folders 
const socket = io('http://localhost:3000')
//declaration of containers by using specific div and form values 
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

//declaration of prompt to get name of the user 
const name = prompt('What is your name?')
appendMessage(`${name} joined`)
socket.emit('new-user', name)

//declaration of chat-message content to take name of the person and message sended
socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

//declaration of user-connected event by displaying name of sender and connected string
socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

//declaration of user-disconnected event by displaying name fo sender and connected string
socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

//declaration of addEventListener() function for sending text messages to the server
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`${name}: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

//declaration of appendMesasge() function for appending text with given content
function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
  //window.scrollBy() function is needed because of the type of the program that used,
  //scrolling down page for every printed messages in the display
  window.scrollBy(0,1000);
}