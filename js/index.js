const Cookie = 'XSRF-TOKEN=eyJpdiI6Imh3NGlUZjcvUStIT3J5d252a203TUE9PSIsInZhbHVlIjoiOXRmU01NQ1RPZzlZdzVEZHNNNEtBUEVWZ0RZTWdjbk9jdE1rK3hieUlLd3Fka1oyc1VBYmEvTURiVXEzRERBUDgxSDRwYS9mWXViOHoycXMxTjVka3pzSUE1VHhxSFUxQzdodFFKSVFiTEVBR21LYmdaSUh1RE54L2NwblZ4cUEiLCJtYWMiOiI2ZWY0ZDdkMDY4MWM0YmM1YjRjOTRkMjA5YzU3YzY2NWFkOGE5MTU4ODA1MmI3OTJjYzc1YTY0ODg4YzZlM2JmIn0%253D; neiros_session=eyJpdiI6Im51ODB3cDFSbSs0SFUwQmF2aktnTmc9PSIsInZhbHVlIjoieStyY2plQlJTMnJkaXV1L2ZETHNRajlsZ3A5N085MGVOS2RpcmNNNjNmK3duNEExbTZscjEzK1lCVzFFbHo0WmIrS0VkQlJZTFJ0MGd5clpOVm16QXZhV2NBc0dpM3o2R1FBbjVaNjZCanVYa25taitaQVc4Wi85dGVteHJZUC8iLCJtYWMiOiIwMmU1MGVhMGM0YmNkMzU3ZjY0OGNkNjM0OWE4MzhhNzc1NjlhMzhmODZlMDg5YTY4ZDUzYWRiYmViYTlmMTljIn0%253D';

const likeEl = document.getElementById('LikeId');
const showEl = document.getElementById('ShowId');
const formEl = document.getElementById('FormId');
const raitingEl = document.getElementById('RaitingId');


const like = document.createElement('div');
like.className = "like-wrap";
likeEl.appendChild(like);

const show = document.createElement('div');
show.className = "show-wrap";
// showEl.appendChild(show);

const raiting = document.createElement('div');
raiting.className = "raiting";
raiting.classList.add("rating-set");
raitingEl.appendChild(raiting);

const form = document.createElement('div');
form.className = "form-wrap";
formEl.appendChild(form);

let messageEl;
let mess;


const raitings = document.querySelectorAll('.raiting');

function initRaiting() {


    if (raitings.length > 0) {
        initRaitings();
    }

    function initRaitings() {
        let raitingActive, raitingValue;

        for (let i = 0; i < raitings.length; i++) {
            const raiting = raitings[i];

            initRaitingItem(raiting);


        }

        function initRaitingItem(raiting) {
            initRaitingVars(raiting);

            setRaitingActiveWidth();


            if (raiting.classList.contains('rating-set')){
                setRaiting(raiting)
            }
        }


        function initRaitingVars(raiting) {
            raitingActive = raiting.querySelector('.raiting-active');
            raitingValue = raiting.querySelector('.raiting-value');
        }
        function setRaitingActiveWidth(index = raitingValue.innerHTML) {
            const raitingActiveWidth = index / 0.05;
            raitingActive.style.width = `${raitingActiveWidth}%`
        }

        function setRaiting(raiting){
            const raitingItems = raiting.querySelectorAll('.raiting-item');
            for (let i = 0; i < raitingItems.length; i++) {
                const raitingItem = raitingItems[i];
                
                raitingItem.addEventListener("mouseenter", function (e) {
                    initRaitingVars(raiting);
                    setRaitingActiveWidth(raitingItem.value);
                })
                raitingItem.addEventListener("mouseleave", function (e) {
                    setRaitingActiveWidth();
                })
                raitingItem.addEventListener("click", function (e) {
                    initRaitingVars(raiting);
                    sendRaitingOnServer(raiting, raitingItem.value);
                    console.log(raiting);
                })
            }
        }
        async function sendRaitingOnServer(raiting, value){
            let data = {
                "widget_id": 10088,     /// global.config
                "page_url": "https://neiros.ru/blog/dialogs/kak-prinimat-pisma-otpravlennye-na-nesushchestvuyushchuyu-pochtu/", // windows.document.location (без параметорв)
                "metrika_id": "3",      /// global.config (от сессии завист и меняется)
                "neiros_visit": "1",    // global.config (уникальный)
                "page": "1",            // пагинация и просто номер страницы
                "raiting":raiting,
                 
        
            }
            let response = await fetch('https://test.neiros.ru/api/comments/getInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                cookie: Cookie,
                body: JSON.stringify(data)
            });
        }
    }
}

////// Функция получения сообщений с сервера по клику на кнопку "Следующие сообщения"
async function getMessage() {
    let response = await fetch('http://127.0.0.1:3333/m');
    let result = await response.json();
    console.log(result.comments.data);

    Array.from(result.comments.data).forEach(el => {
        let messageParent = document.getElementById("m-w");
        let messageFromServer = document.createElement('div');
        messageFromServer.className = "mess-item-wrap";
        messageFromServer.innerHTML = `
    <div class="mess-item">
        <div class="mess-item-icon">
            <i class="fa fa-user-circle fa-4x" aria-hidden="true"></i>
            <div class="mess-social-item">
                <div class="social-link">
                    <i class="fab fa-odnoklassniki"></i>
                </div>
            </div>
        </div>
        <div class="data-message-wrap">
            <div id="name-user">
                Имя Пользователя
            <span>2 секунды назад</span>
            </div>
            <hr color="#d1d1d1" size="1"/>
            <div class="break-line" style="width:100%"></div>
            <div class="mess-body" id="mess-body${el.id}">
            ${el.text}
            </div>
        </div>
    </div>
    <div class="reply-message-wrap">
        <div class="reply-message-icon" id="edit${el.id}" onclick = editMessage(this)>
            <svg class="icon" ><use xlink:href="#icon-pencil"></use></svg>
        
            Редактировать
        </div>
        <div class="reply-message-icon">
            <i class="fa fa-trash" aria-hidden="true"></i>
            Удалить
        </div>
        <div class="like-icon like reply-message-icon">
            <svg class="icon"><use xlink:href="#icon-like"></use></svg>
            <span id="rm-like">0</span>
        </div>
        <div class="like-icon dislike reply-message-icon">
            <svg class="icon" ><use xlink:href="#icon-dislike"></use></svg>
            <span id="rm-dislike">0</span>
        </div>
    </div>
    `;
        messageParent.insertBefore(messageFromServer, messageParent.firstElementChild);
    })
}

//// Функция проверки модулей на наличие и присваивание значений
function initElements(res) {
    document.getElementById("li").innerHTML = `${res.like}`
    document.getElementById("dis").innerHTML = `${res.dislike}`
    document.getElementById("show-data").innerHTML = `${res.views}`

}

// Функция получения данных после полной загрузки страницы
window.onload = async () => {
    let data = {
        "widget_id": 10088,     /// global.config
        "page_url": "https://neiros.ru/blog/dialogs/kak-prinimat-pisma-otpravlennye-na-nesushchestvuyushchuyu-pochtu/", // windows.document.location (без параметорв)
        "metrika_id": "3",      /// global.config (от сессии завист и меняется)
        "neiros_visit": "1",    // global.config (уникальный)
        "page": "1"             // пагинация и просто номер страницы 

    }
    // let response = await fetch('https://test.neiros.ru/api/comments/getInfo', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     cookie: Cookie,
    //     body: JSON.stringify(data)
    // });
    // let result = await response.json();
    // console.log(result);

    // initElements(result)
    initRaiting();
}

function editMessage(e) {
    document.getElementById(`mess-body${e.id.slice(4)}`).setAttribute("contenteditable", "true");
}


like.innerHTML = `
        <div class="like-icon like">
            <svg class="icon"><use xlink:href="#icon-like"></use></svg>
            <span id="li"></span>
        </div>
        <div class="like-icon dislike">
            <svg class="icon" ><use xlink:href="#icon-dislike"></use></svg>
            <span id="dis"></span>
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
raiting.innerHTML = `
    <div class="raiting-body">
        <div class="raiting-active"></div>
        <div class="raiting-items">
            <input type="radio" class="raiting-item" value="1" name="raiting">
            <input type="radio" class="raiting-item" value="2" name="raiting">
            <input type="radio" class="raiting-item" value="3" name="raiting">
            <input type="radio" class="raiting-item" value="4" name="raiting">
            <input type="radio" class="raiting-item" value="5" name="raiting">
        </div>
    </div>
    <div class="raiting-value"> 1.6 </div>

`
form.innerHTML = `
<form class="form-wrapper">
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
                    <div class="social-link">
                        <i class="fab fa-odnoklassniki"></i>
                    </div>
                </li>
                <li class="social-item">
                    <div class="social-link">
                        <i class="fab fa-vk"></i>
                    </div>
                </li>
                <li class="social-item">
                    <div class="social-link">
                        <i class="fab fa-google-plus-g"></i>
                    </div>
                </li>
                <li class="social-item">
                    <div class="social-link">
                        <i class="fab fa-yandex"></i>
                    </div>
                </li>
                                
            </ul>
        </div>

        <div class="guest-wrap">
            <div>
                <div class="entry-label">
                    Или как гость
                </div>
                <div class="f-wrap">
                    <div class="form-group form-name">
                        <input type="text" name="Name" id="" class="form-control" placeholder="Ваше имя *">
                    </div>
                    <div class="form-group form-email">
                        <input type="email" name="Email" id="" class="form-control" placeholder="Email *">
                    </div>
                </div>
            </div>
            <div class="btn-wrap">
                <div class="btn btn-primary" id="ncc">
                    <span>Отправить комментарий</span>
            </div>
        </div>
</form>
</div>
<div class="message-wrap" id="m-w">

    <div class="btn-wrap-next">
        <div class="btn btn-outline-secondary" onclick = getMessage()>
            <span>Следующие сообщения</span>
        </div>
    </div>
</div>

<hr color="#d1d1d1" size="1"/>

<div class="footer">
    <div>
        Политика конфиденциальности
    </div>
    <div>
        <img src="images/logo-neiros.svg" alt="Neiros" width="102" height="25">
    </div>
</div>
`
