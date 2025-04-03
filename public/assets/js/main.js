let translateButton = document.getElementById("translateButton");

translateButton.addEventListener("click", async () => {
    let inputText = document.querySelector("#inputText");

    //valor a traducir
    const text = inputText.value.trim();

    //lenguaje de destino 
    const targetLang = document.querySelector("#targetLang").value;

    if (!text) return false;


    //mensaje del usuario a la caja de mensaje 

    const userMessage = document.createElement("div");
    userMessage.className = "chat__message chat__message--user";
    userMessage.textContent = text;

    const messagesContainer = document.querySelector(".chat__messages");
    messagesContainer.appendChild(userMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; //desplazar la barra de desplazamiento hacia abajo

    //Peticion ajax al backend 
    try {

        const response = await fetch("/api/traducir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text, targetLang })
        });

        const data = await response.json(); //esperar la respuesta del servidor 
        //alertar el texto traducido

        //agregar el mensaje de la ia al chat 
const botMessage = document.createElement("div");
        botMessage.className = "chat__message chat__message--bot";
        botMessage.textContent = data.translatedText;
        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; //desplazar la barra de desplazamiento hacia abajo
        


    } catch (error) {
        console.log("Error al traducir el texto", error);
    }
    // Vaciar el input después de enviar
    inputText.value = "";

});