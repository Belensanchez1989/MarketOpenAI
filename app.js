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


 //servir el backend
 app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:"+ PORT);
}) ;          