const express = require('express');
const cors = require('cors')

const PORT = 3333

const app = express();
app.use(cors());


const o = {
    id: "gsdjkb35ag2",
    activity: {
        rates: 4
    },
    comments: {
        length: 253,
        data:[
        {
            id: "id1",
            user: {
                id: "cvxb452ghk6978",
                name: "Петрова Г.",
                auth: "ok"
            },
            text: "hello world!",
            time: 1631355290,
            likes: [13, 543],
            resp: [
                {
                    id: "id2",
                    user: {
                        id: "c56xcvbs423",
                        name: "Иванов И.",
                        auth: "ok"
                    },
                    text: "Inside",
                    time: 1631355590,
                    likes: [6, 1],
                    parent: {
                        id: "id1",
                        name: "Петрова Г."
                    },
                    attachment: {
                        caption: "Screenshot.jpg",
                        link: "https://url.to/attachment/goes/here.ext"
                    },
                    resp: []
                }
            ]
        },
        {
            id: "id3",
            user: {
                id: "xcvb43523sdgh",
                name: "Сергей",
                auth: "ok"
            },
            text: "hello world 2!",
            time: 1631355490,
            likes: [3, 0],
            resp: []
        }
    ],
    end: false
    },
    rates: [124, 5432, 132, 3421, 5453],
    views: 42153
};


app.get('/', (req, res) => {
    console.log(req);
    res.json(o)
})

app.listen(PORT, ()=>{
    console.log(`Сервер работает на порту: ${PORT}`);
})