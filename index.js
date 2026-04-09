const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// 1. SERVIR LE HTML (Vérifie bien que ton fichier s'appelle index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});

io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    // 2. GESTION DU VIRUS
    socket.on('admin_attack', (data) => {
        console.log("Attaque virus sur : " + data.target);
        io.emit('recevoir_attaque', data); 
    });

    // 3. GESTION DES SONS (Pour que ça refonctionne)
    socket.on('send_sound', (data) => {
        console.log("Son envoyé à : " + data.to);
        io.emit('receive_sound', data);
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log('Serveur actif sur le port ' + PORT);
});
