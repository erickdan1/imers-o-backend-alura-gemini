import express from 'express';

const posts = [
    {
        id: 1,
        descricao: "uma foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Gato fazendo yoga",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 3,
        descricao: "Paisagem montanhosa",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 4,
        descricao: "Cachorro sorrindo",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 5,
        descricao: "Comida deliciosa",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 6,
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


function getPostById(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
};


app.get('/api/posts/:id', (req, res) => {
    const index = getPostById(req.params.id);
    res.status(200).json(posts[index]);
});
