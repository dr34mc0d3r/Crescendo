require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const db = require("./db/users.js");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// try catch for db file connection

// could have created a routes directory with the routing files in it...
// routes/users, recipes, specials
app.get('/api/v1/users', async (req, res) => {
    try {
        const results = await db.getAllUsers();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send({message: "Cant get all users!"});
    }
});

app.post('/api/v1/users', async (req, res) => {
    try {
        const results = await db.createUser(req.body);
        res.status(201).json({ id: results[0] });
    } catch (error) {
        res.status(500).send({message: "Cant create new user!"});
    }
});

app.patch('/api/v1/users/:id', async (req, res) => {
    try {
        const id = await db.updateUser(req.param.id, req.body);
        res.status(200).json({ id });
    } catch (error) {
        res.status(500).send({message: "Cant update user!"});
    }
});

app.delete('/api/v1/users/:id', async (req, res) => {
    try {
        const id = await db.deleteUser(req.param.id);
        res.status(200).send({message: "User deleted successfully!"});
    } catch (error) {
        res.status(500).send({message: "Cant delete user!"});
    }
});

// users/login
// JWT would be a good thing to have on the user as well - this is just a quick through together.
app.post('/api/v1/login', async (req, res) => {
    try {
        const results = await db.login(req.body);
        console.log("results-----", results);
        res.status(201).json({ id: results[0].id });
    } catch (error) {
        res.status(500).send({message: "Cant login user!"});
    }
});













app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});
