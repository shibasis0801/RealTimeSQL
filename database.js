'use strict';

const { Server } = require('ws');
const ws = new Server({port : 2345});

const TriggerEmitter = require('./lib/triggerEmitter')

const { Client } = require('pg');
const client = new Client({
    user: 'overlord',
    host: 'localhost',
    database: 'dev',
    password: 'postgres',
    port: 5432,
});

client.connect();

client.query("SELECT * FROM friends;", (err, res) => {
    console.log(err ? err.stack : res.rows);
})

client.query("LISTEN new_friend", (error, _) => {
    if (error) {
        console.error(error);
        throw error;
    }
});

client.on('notification', message => {
    console.log(message);
})

const triggerEmitter = TriggerEmitter.connect(client);


ws.on('connection', socket => {
    console.log('Starting websockets server');
    triggerEmitter.on('new_friend', message => {
        console.log(`Made a new friend named ${message.name}, aged ${message.age}`);
        ws.clients.forEach(client => {
            client.send(JSON.stringify(message));
        });
    });
});


