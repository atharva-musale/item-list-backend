const express = require('express');
var cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

items = [
    { id: 1, name: 'Item 1', cost: 100 },
    { id: 2, name: 'Item 2', cost: 200 }
];

app.get("/", (req, res) => {
    res.send("Welcome to Itemlist-backend");
})
app.get('/api/items', (req, res) => {
    res.send(JSON.stringify(items));
});

// get a parameter, :id indicates id is a parameter
app.get('/api/items/:id', (req, res) => {
    let item = items.find(c => c.id === parseInt(req.params.id));
    if (!item) {
        res.status(404).send('Item with given id not found.');
    }
    else {
        res.send(item);
    }
});

// responding to post requests normally
app.post('/api/item', (req, res) => {
    // check or validate the input sent by client
    if (!req.body.name || req.body.name.length < 3) {
        console.log(req.body.name);
        // 400 - Bad request
        res.status(400).send('Invalid item name.');
        return;
    }
    var item = req.body;
    items.push(req.body);
    res.send(item);
});

app.post('/api/items', (req, res) => {
    items = req.body;
    res.send(items);
});

app.delete('/api/items/:id', (req, res) => {
    console.log(req.params.id);
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        res.status(404).send('Item not found.');
    }

    items.forEach((item, index) => {
        if (item.id === parseInt(req.params.id)) items.splice(index, 1);
    });

    res.send(item);
});

// set environment variable for port so that if changed they should be reflected
const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})