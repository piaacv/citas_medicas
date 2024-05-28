import moment from 'moment';
import chalk from 'chalk';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import axios from 'axios';

//INSTANCIA SERVIDO
const app = express();

//SERVIDOR ACTIVO
app.listen(3000, (req, res) =>{
    console.log(chalk.blue("Servidor escuchando en puerto http://localhost:3000"))
});

//REGISTRO USUARIOS
let nuevoUsuario = [];

//FECHA
moment.locale('es');
let fecha = moment().format("MMMM DD YYYY, HH:mm:ss a");



//DATA
app.get("/usuarios", (req, res) => {
    const getData = async () => {
        let url = "https://randomuser.me/api/";
        let result = await axios.get(url);
        let users = result.data.results;
         users.forEach(user => {
                
         nuevoUsuario.push({
            Nombre: user.name.first,
            Apellido: user.name.last,
            Género: user.gender,
            ID: uuidv4().slice(0,6),
            Timestamp: fecha
    
        });

        const usuariosFemeninos = _.filter(nuevoUsuario, { Género: 'female' });
        const usuariosMasculinos = _.filter(nuevoUsuario, { Género: 'male' });
        
        console.log(chalk.yellow("Nuevo Usuario:", JSON.stringify(nuevoUsuario)));
        console.log(chalk.bgWhite.blue("Usuarios femeninos:", JSON.stringify(usuariosFemeninos)));
        console.log(chalk.bgWhite.blue("Usuarios masculinos:", JSON.stringify(usuariosMasculinos)));
            });
    };


    getData();


    const response = {
        nuevoUsuario,
        message: "Carga completada"
    }
    res.json(response);
})


