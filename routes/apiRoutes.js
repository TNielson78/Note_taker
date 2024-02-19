const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');


router.get('/notes', (req, res) => {
    let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(data);
});

router.post('/notes', (req, res) => {
    let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let newNote = req.body;
    newNote.id = uuidv4();
    data.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    res.json(data);
});

router.delete('/notes/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let newData = data.filter(note => note.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(newData));
    res.json(newData);
});
module.exports = router;


