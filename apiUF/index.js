const express = require('express');
const colecaoUf = require('./dados/dados.js');

const app = express();

app.get('/ufs', (req, res) => {

    res.json(colecaoUf.colecaoUf)


})

app.get('/ufs/:iduf', (req, res) => {

    const idUF = parseInt(req.params.iduf)
    const uf = colecaoUf.colecaoUf.find(u => u.id === idUF)
    res.json(uf)

    let mensagemerro = '';

    if (!(isNaN(idUF))) {
        uf = colecaoUf.colecaoUf.find(u => u.id === idUF)
        if (!uf) {
            mensagemerro = "uf não encontrada"
        }
        else {
            mensagemerro = 'requisição invalida'
        }
    }
    if (uf) {
        res.json(uf);
    } else {
        res.status(404).json({ "erro": mensagemerro })
    }
});





app.listen(8080, () => {
    console.log("serviddor iniciado na porta 8080")

})
