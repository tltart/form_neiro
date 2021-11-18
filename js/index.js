
const likeEl = document.getElementById('LikeId');
const showEl = document.getElementById('ShowId');
const formEl = document.getElementById('FormId');


const like = document.createElement('div');
like.className = "like-wrap";
likeEl.appendChild(like);

const show = document.createElement('div');
show.className = "show-wrap";
showEl.appendChild(show);

const form = document.createElement('div');
form.className = "form-wrap";
formEl.appendChild(form);


let responseOnLoad;

// Функция получения данных после полной загрузки страницы
window.onload = async () =>{
    let r = await fetch('http://127.0.0.1:3333/')
    .then(res => res.json());
    console.log(r);
    document.getElementById("li").innerHTML = `${r.rates[0]}`
    document.getElementById("dis").innerHTML = `${r.rates[1]}`
    document.getElementById("show-data").innerHTML = `${r.views}`

}

like.innerHTML = `
    <div>
        <div class="like-icon like">
            <svg class="icon"><use xlink:href="#icon-like"></use></svg>
            <span id="li"></span>
        </div>
        <div class="like-icon dislike">
            <svg class="icon" ><use xlink:href="#icon-dislike"></use></svg>
            <span id="dis"></span>
        </div>
    </div>
`
show.innerHTML = `
    <div>
        <div class="show">
            <div class="show-icon">
                <svg class="icon"><use xlink:href="#icon-eye"></use></svg>
                <span id="show-data"></span>
            </div>
        </div>
    </div>
`
form.innerHTML = `
    <div class="form">
        <h3 class="s-review-title">
            Комментарии
        </h3>

        <div class="form-group">
            <textarea name="message" rows="4" class="form-control" placeholder="Введите текст комментария"></textarea>

            <div class="form-control-settings">
                <div>
                    <svg class="icon icon-paperclip"><use xlink:href="#icon-paperclip"></use></svg>
                </div>

                <div>
                    <svg class="icon icon-smile"><use xlink:href="#icon-smile"></use></svg>
                </div>
            </div>
        </div>
    </div>

`
