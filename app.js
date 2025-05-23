//importar dependencias
import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

//cargar configuracion (de api key)
dotenv.config();
//cargar express
const app = express();
const PORT = process.env.PORT || 3000;

//servir frontend
app.use("/", express.static('public'));

//middelware para procesar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//instancia de openai y pasar el api key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

//Ruta /endpoint/url 

const contexto = ` Eres un asistente de soporte para el supermercado "Street Market".Información del negocio:
    -Ubicación: Calle Numancia,número 77 , Barcelona
    -Teléfono: 934 56 78 90888 
    -Horario: Lunes a Sábado de 9:00 a 21:00
    -Productos: Frutas, verduras, carne, pescado, panadería, lácteos y productos enlatados.
    -Métodos de pago: Efectivo, tarjeta de crédito y débito y Bizum.
    -Marcas: Ofrecemos productos de marcas reconocidas como Nestlé, Coca-Cola, Unilever,Pascual, Central Asturiana(Sólo y exclusivamente tenemos estos productos)
    Sólo puedes responder preguntas relacionadas con el supermercado. No puedes responder preguntas sobre otros temas,está prohibido.No se realizan envíos a domicilio.
    `;

let conversations = {};

app.post("/api/chatbot", async (req, res) => {


    //Recibir pregunta del usuario
    const { userId, message } = req.body;


    if (!message) return res.status(400).json({ error: "Has enviado un mensaje vacío" });

    if (!conversations [userId])  {
        conversations [userId] = [];

    }
    conversations[userId].push({ role: "user", content: message });

    //Peticion a la IA
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [ 
                { role: "system", content: contexto },
                { role: "system", content: "Debes responder de la forma más corta y directa posible ,usando los mínimos tokens posibles" },
                ...conversations[userId]],
            max_tokens: 200,
        });

        //Devolver respuesta

        const reply = response.choices[0].message.content;

        //Añadir al asistente la respuesta
        conversations[userId].push({ role: "assistant", content: reply });

        //Limitar número de mensajes
        if (conversations[userId].length > 12) {
            conversations[userId] = conversations[userId].slice(-10);
        }

        console.log(conversations);

        return res.status(200).json({ reply });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al generar la respuesta" });
    }
});

//servir el backend
app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:" + PORT);
});