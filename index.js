const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Sert ton fichier HTML (remplace 'ton_fichier.html' par le vrai nom du tien)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ton_fichier.html'));
});

io.on('connection', (socket) => {
    console.log('Un élève s\'est connecté');

    // Le serveur reçoit l'ordre de l'admin
    socket.on('admin_attack', (data) => {
        console.log("Attaque lancée contre : " + data.target);
        
        // Le serveur renvoie l'ordre à TOUT LE MONDE (io.emit)
        // L'élève qui a le bon pseudo verra son écran changer
        io.emit('recevoir_attaque', data);
    });
});

http.listen(3000, () => {
    console.log('Serveur lancé sur http://localhost:3000');
});