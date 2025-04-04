const sendButton = document.querySelector('#sendButton');
const inputText = document.querySelector('#inputText');
const messagesContainer = document.querySelector('.chat__messages');

const sendMessage =  async () => {
    //Sacar el valor del input (pregunta)
    
    const myMessage = inputText.value.trim(); 
    if(!myMessage) return false; 


//incorporar el mensaje del usuario a la caja de mensajes
messagesContainer.innerHTML += `<div class="chat__message chat__message--user">Yo: ${myMessage}</div>`;

    //vaciar el input del usuario(pregunta)
    inputText.value = '';

    //Peticionn al backend para que responda la IA
try { 
    const response =await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: myMessage })
    });
    const data = await response.json();

    messagesContainer.innerHTML += `<div class="chat__message chat__message--bot">Montse: ${data.reply}</div>`;

 //Incorporar mensaje del bot al chat
}catch (error) {
    console.log("error:" , error);
}
   

    //Mover el scroll hacia abajo para ver el mensaje del bot
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

sendButton.addEventListener('click', sendMessage) ;
inputText.addEventListener("keypress" , (event) => {
    if(event.key === 'Enter'){
        event.preventDefault(); 
        sendMessage();
    }
});
