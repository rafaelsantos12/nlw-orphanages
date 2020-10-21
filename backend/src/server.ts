import express from 'express';
import './database/connection';
 
const app = express();

app.use(express.json());


//Rotas = conjuntos
//Recurso = usuário

//Métodos HTTP = GET, POST, PUT, DELETE 
//Parâmetros

//Query Params: {webhost}/users?seach=diego
//Route Params: {webhost}/users/1 (Indentificar um recurso)
//Body Params: {webhost}/users (Indentificar um recurso)


app.get('/users', (request, response) => {

    return response.json({ message: 'Hello Word' });
});

app.listen(3333);

