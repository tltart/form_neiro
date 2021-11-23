const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 3333

const app = express();
app.use(cors());
app.use(bodyParser());

const o = {
    id: "gsdjkb35ag2",
    activity: {
        rates: 4
    },
    comments: {
        length: 253,
        data: [
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


const mm = {
    comments:
    {
        data: [
            {
                id: 1,
                page_id: 1,
                text: `kflgkflgПОожыбмжыьмабмьюбмсыздлмыдаьмыамьдыалмьдалмтадмтыадмлkflgkflgkf
                ПОожыбмжыьмабмьюбм
                сыздлмыдаьмыамьдыалмьдалмтадмтыадмл`
            },
            {
                id: 2,
                page_id: 1,
                text: `Парам-парам-пам`
            },
            {
                id: 3,
                page_id: 1,
                text: `Парам-парам-пам`
            },
            {
                id: 4,
                page_id: 1,
                text: `Парам-парам-пам`
            },
            {
                id: 5,
                page_id: 1,
                text: `Парам-парам-пам`
            },
            {
                id: 6,
                page_id: 1,
                text: `Парам-парам-пам`
            }
        ]

    }
}

const info = {
    comments: {
        current_page: 1, data: Array(0), first_page_url: 'https://test.neiros.ru/api/comments/getInfo?page=1', from: null, last_page: 1},
        dislike: 0,
        like: 0,
        page_id: 4,
        rating: 4,
        views: 1,
}

app.get('/', (req, res) => {
        res.json(o)
    })
app.get('/m', (req, res) => {
        res.json(mm)
    })
app.post('/getinfo', (req, res) => {
        res.json(info)
    })
app.post('/sendRaiting', (req, res) => {
        // console.log(req.body.raiting.value);
        info.rating = req.body.raiting.value;
        console.log(info);
        res.json(info);
    })


app.listen(PORT, () => {
        console.log(`Сервер работает на порту: ${PORT}`);
    })