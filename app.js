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
app.use("/",express.static('public'));

//middelware para procesar json
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//instancia de openai y pasar el api key

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

//Ruta /endpoint/url 
app.post("/api/traducir", async (req, res) => {
    const { text, targetLang } = req.body;
    
    const promptSystem1 = "Eres un traductor profesional. Traduce el texto del usuario al idioma especificado, incluso si el texto parece estar ya en ese idioma.";
    const promptSystem2 = "RESPONDE EXCLUSIVAMENTE CON LA TRADUCCIÓN DIRECTA. Está prohibido añadir comentarios, explicaciones, notas sobre idiomas, puntuación extra o saltos de línea. Si el texto no es traducible, devuelve el mismo texto sin modificar.";

const promtUser = `IMPORTANTE: EL IDIOMA OBJETIVO ES ${targetLang.toUpperCase()}. 
SI EL TEXTO PARECE INGLÉS PERO EL OBJETIVO ES "de", TRADÚCELO IGUAL. 
Traduce rigorosamente este texto al ${targetLang} ("${text}"). 
Identifica primero el idioma de origen y asegúrate de que la traducción sea exacta. 
Ejemplo: Si el objetivo es "de" y el texto es "hello", devuelve "hallo". 
Solo responde con la traducción. Está prohibido añadir comentarios o explicaciones.`;
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: promptSystem1 },
                { role: "system", content: promptSystem2 },
                { role: "user", content: promtUser }
            ],
            max_tokens: 500,
            temperature: 0 // Reduce la creatividad para respuestas más literales.
        });

        const translatedText = completion.choices[0].message.content;
        return res.status(200).json({ translatedText });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al traducir el texto" });
    }
});
 //funcionalidad para introducir la IA

 //servir el backend
 app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:"+ PORT);
}) ;          