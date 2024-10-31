const express = require('express');
const colecaoUf = require('./dados/dados.js');

const app = express();

const buscarUfsPorNome = (nomeUf) => {
    return colecaoUf.filter(uf => uf.nome.toLowerCase().includes(nomeUf.toLowerCase()));
}

app.get('/ufs', (req, res) => {

    const nomeut = req.query.busca;
    const resultado = nomeUf ? buscarUfsPorNome(nomeUf) : colecaoUf;
    if (resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).send({ "erro": "Nenhuma UF encontrada" });
    }
});



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
