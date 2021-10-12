const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: [true, `Cette valeur ne doit etre vide`]
    },
    sous_titre: {
        type: String,
    },
    listes: {
        type: [String]
    }
});

const Recette = mongoose.model('recettes', recetteSchema);

module.exports = Recette;