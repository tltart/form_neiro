
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
<form>
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

    <div class="entry">
        <div class="social">
            <div class="entry-label">
                Войти через соцсеть
            </div>

            <ul class="social-list">
                <li class="social-item">
                    <div class="social-link">
                        <i class="fab fa-facebook-f"></i>
                    </div>
                </li>
                <li class="social-item">
                    <a href="#" class="social-link social-link_ok" target="_blank" rel="noopener noreferrer" aria-label="Social link">
                        <i class="fab fa-odnoklassniki"></i>
                    </a>
                </li>
                <li class="social-item">
                    <a href="#" class="social-link social-link_vk" target="_blank" rel="noopener noreferrer" aria-label="Social link">
                        <i class="fab fa-vk"></i>
                    </a>
                </li>
                <li class="social-item">
                    <a href="#" class="social-link social-link_g" target="_blank" rel="noopener noreferrer" aria-label="Social link">
                        <i class="fab fa-google-plus-g"></i>
                    </a>
                </li>
                <li class="social-item">
                    <a href="#" class="social-link social-link_yandex" target="_blank" rel="noopener noreferrer" aria-label="Social link">
                        <i class="fab fa-yandex"></i>
                    </a>
                </li>
                                
            </ul>
        </div>


        <div class="col-6 text-right">
            <div class="entry-label text-left">
                Или как гость
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <input type="text" name="Name" id="" class="form-control" placeholder="Ваше имя *">
                    </div>
                </div>
            <div class="col-6">
                <div class="form-group">
                    <input type="text" name="Email" id="" class="form-control" placeholder="Email *">
                </div>
            </div>
        </div>
    </div>

    <div class="row justify-content-end">
        <div class="btn btn-primary" id="ncc">
            <span>Отправить комментарий</span>
        </div>
    </div>
</form>
`
