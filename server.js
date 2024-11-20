import express from 'express';

const posts = [
    {
        descricao: "uma foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        descricao: "Gato fazendo yoga",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        descricao: "Paisagem montanhosa",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        descricao: "Cachorro sorrindo",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        descricao: "Comida deliciosa",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        descricao: "Citação inspiradora",
        imagem: "https://placecats.com/millie/300/150"
    }
]

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('Servidor escutando...');
});

app.get('/', (req, res) => {
    res.status(200).send('Nada por aqui..');
});

app.get('/api', (req, res) => {
    res.status(200).send('Boas vindas à imersão!');
});

app.get('/api/posts', (req, res) => {
    res.status(200).json(posts);
});
