// Importación de la librería express
const express = require('express');

// Se crea la aplicación
const app = express();

// Puerto donde se ejecutará el servidor
const PORT = 3000;

// Permite que el servidor pueda leer datos en formato JSON
app.use(express.json());

// Arreglo temporal donde se almacenarán los usuarios registrados
let usuarios = [];

/*
---------------------------------------------------
SERVICIO DE REGISTRO DE USUARIO
---------------------------------------------------
Este endpoint permite registrar un nuevo usuario
recibiendo nombre de usuario y contraseña.
*/

app.post('/registro', (req, res) => {

    const { usuario, password } = req.body;

    // Validación de campos obligatorios
    if (!usuario || !password) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    // Se guarda el usuario en el arreglo
    usuarios.push({ usuario, password });

    // Respuesta del servidor
    res.json({
        mensaje: "Usuario registrado correctamente"
    });

});


/*
---------------------------------------------------
SERVICIO DE INICIO DE SESIÓN
---------------------------------------------------
Este endpoint verifica las credenciales del usuario
comparando los datos ingresados con los registrados.
*/

app.post('/login', (req, res) => {

    const { usuario, password } = req.body;

    // Buscar el usuario dentro del arreglo
    const usuarioEncontrado = usuarios.find(
        u => u.usuario === usuario && u.password === password
    );

    if (usuarioEncontrado) {

        res.json({
            mensaje: "Autenticación satisfactoria"
        });

    } else {

        res.status(401).json({
            mensaje: "Error en la autenticación"
        });

    }

});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});