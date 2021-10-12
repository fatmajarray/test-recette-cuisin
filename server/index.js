const express = require('express');
const mongoose = require('mongoose');
const Recette = require('./models/recette');
const cors = require('cors');

const app = express();

mongoose
    .connect(`mongodb://localhost:27017`, {
        dbName: 'test_technique',
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: true,
    })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

app.use(express.json())
app.use(cors())

app.get('/', async (req, res, next) => {
    try {
        const result = await Recette.find();
        res.status(200).json({
            result
        })
    } catch (error) {
        res.status(400).json(error)
    }

})
app.post('/recette', async (req, res, next) => {
    try {
        const doc = new Recette({
            titre: req.body.titre,
            sous_titre: req.body.sous_titre,
            listes: req.body.listes,
        });
        const result = await doc.save();
        res.status(200).json({
            result
        })
    } catch (error) {
        res.status(400).json(error)
    }
})
app.get('/recette/:id', async (req, res, next) => {
    try {
        const result = await Recette.findById(req.params.id);
        res.status(200).json({
            result
        })
    } catch (error) {
        res.status(400).json(error)
    }

})
app.put('/recette/:id', async (req, res, next) => {
    try {
        const result = await Recette.findOneAndUpdate({
            _id: req.params.id
        }, {
            titre: req.body.titre,
            sous_titre: req.body.sous_titre,
            listes: req.body.listes,
        },
        {new:true});
        res.status(200).json({
            result
        })
    } catch (error) {
        res.status(400).json(error)
    }

});
app.delete('/recette/:id', async (req, res, next) => {
    try {
        await Recette.findByIdAndDelete(req.params.id);
        res.status(200).json({
            result: `La recette avec l'id ${req.params.id} est supprimé`
        })
    } catch (error) {
        res.status(400).json(error)
    }

});


app.listen(8080, () => {
    console.log(`Server is running`);
})