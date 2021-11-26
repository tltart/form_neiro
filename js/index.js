const Cookie = 'XSRF-TOKEN=eyJpdiI6Imh3NGlUZjcvUStIT3J5d252a203TUE9PSIsInZhbHVlIjoiOXRmU01NQ1RPZzlZdzVEZHNNNEtBUEVWZ0RZTWdjbk9jdE1rK3hieUlLd3Fka1oyc1VBYmEvTURiVXEzRERBUDgxSDRwYS9mWXViOHoycXMxTjVka3pzSUE1VHhxSFUxQzdodFFKSVFiTEVBR21LYmdaSUh1RE54L2NwblZ4cUEiLCJtYWMiOiI2ZWY0ZDdkMDY4MWM0YmM1YjRjOTRkMjA5YzU3YzY2NWFkOGE5MTU4ODA1MmI3OTJjYzc1YTY0ODg4YzZlM2JmIn0%253D; neiros_session=eyJpdiI6Im51ODB3cDFSbSs0SFUwQmF2aktnTmc9PSIsInZhbHVlIjoieStyY2plQlJTMnJkaXV1L2ZETHNRajlsZ3A5N085MGVOS2RpcmNNNjNmK3duNEExbTZscjEzK1lCVzFFbHo0WmIrS0VkQlJZTFJ0MGd5clpOVm16QXZhV2NBc0dpM3o2R1FBbjVaNjZCanVYa25taitaQVc4Wi85dGVteHJZUC8iLCJtYWMiOiIwMmU1MGVhMGM0YmNkMzU3ZjY0OGNkNjM0OWE4MzhhNzc1NjlhMzhmODZlMDg5YTY4ZDUzYWRiYmViYTlmMTljIn0%253D';

const api_http = {
    like: 'https://test.neiros.ru/api/comments/add_like',
    sendMessage: 'https://test.neiros.ru/api/comments/add_comment',
    getMessage: 'https://test.neiros.ru/api/comments/getInfo',
    initPage: 'https://test.neiros.ru/api/comments/getInfo',
    sendRating: 'https://test.neiros.ru/api/comments/sendRaiting'
}


function addLinks() {

    let fa = document.createElement('link');
    fa.setAttribute('rel', 'stylesheet');
    fa.setAttribute('type', 'text/css');
    fa.setAttribute('href', '/css/style.css');
    document.getElementsByTagName('head')[0].appendChild(fa);

    fa = document.createElement('link');
    fa.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/fontawesome.min.css');
    fa.setAttribute('crossorigin', 'anonymous');
    fa.setAttribute('rel', 'stylesheet');
    document.getElementsByTagName('head')[0].appendChild(fa);

    fa = document.createElement('script');
    fa.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js');
    fa.setAttribute('crossorigin', 'anonymous');
    fa.setAttribute('referrerpolicy', 'no-referrer');
    document.getElementsByTagName('head')[0].appendChild(fa);

}

addLinks();

if (document.getElementById('LikeId')) {
    const likeEl = document.getElementById('LikeId');           // Ищем элемент чтобы вставить лайки
    const like = document.createElement('div');
    like.className = "like-wrap";
    likeEl.appendChild(like);
    likeHtml(like);
}


if (document.getElementById('ShowId')) {
    const showEl = document.getElementById('ShowId');           // Ищем название элемента чтобы вставить просмотры
    const show = document.createElement('div');
    show.className = "show-wrap";
    showEl.appendChild(show);
    showHtml(show);
}


let raitings;
if (document.getElementById('RaitingId')) {
    const raitingEl = document.getElementById('RaitingId');     // Ищем название элемента чтобы вставить рейтинг
    const raiting = document.createElement('div');
    raiting.className = "raiting";
    raiting.classList.add("rating-set");
    raitingEl.appendChild(raiting);
    raitings = document.querySelectorAll('.raiting');
    raitingHtml(raiting);
}


if (document.getElementById('FormId')) {
    const formEl = document.getElementById('FormId');
    const form = document.createElement('div');
    form.className = "form-wrap";
    formEl.appendChild(form);
    let [formhtml, isVisit] = formHtml();
    form.innerHTML = formhtml;
    if (!isVisit) {
        let name = form.querySelector('#form-name');
        name.required = true;
        let mail = form.querySelector('#form-email');
        mail.required = true;
    }
    let tt = formEl.querySelector('#form-message');
    tt.addEventListener('submit', handleFormSubmit.bind({ tt, isVisit }));

    isVisit ? form.querySelector('.guest-wrap').style.display = 'none' : form.querySelector('.guest-wrap').style.display = 'block';
    isVisit ? form.querySelector('.social').style.display = 'none' : form.querySelector('.social').style.display = 'block';
}

let messageEl;
let mess;
let count_page = 1;      // Пагинация


/// Отправка лайков и дизлайков
async function clickLike(e) {
    let data = {
        widget_id: CBU_GLOBAL.config.widget.tip_33.widget_id,
        page_id: 1,
        neiros_visit: neiros_visit,
        like: "",
        dislike: "",
    }
    if (e.classList.contains('like')) {                                       /// Записываем лайк 1 в data, если нажали лайк
        data.like = Number(e.childNodes[3].innerHTML) + 1;
    }
    else data.dislike = Number(e.childNodes[3].innerHTML) + 1;               /// Записываем в data дизлайк в 1   

    let response = await fetch(api_http.like, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        cookie: Cookie,
        body: JSON.stringify(data)
    });

    if (response.ok) {
        let res = await response.json();
        initElements(res);                                                    /// Получаем ответ от сервера и из ответа берем кол-во лайков и дизлайков и устанавливаем на страницу
    }
}

/// Отправка сообщения на сервер 
async function handleFormSubmit(e) {
    e.preventDefault();

    let data = {
        widget_id: CBU_GLOBAL.config.widget.tip_33.widget_id,
        page_id: 1,
        neiros_visit: neiros_visit,
        message: "",
        name: "",
        email: ""
    }

    let name = this.tt.querySelector('#form-name').value;
    let mail = this.tt.querySelector('#form-email').value;
    let mess = this.tt.querySelector('#form-message').value;
    data.name = name;
    data.email = mail;
    data.message = mess;

    let response = await fetch(api_http.sendMessage, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        cookie: Cookie,
        body: JSON.stringify(data)
    });

    if (response.ok) {
        // let res = await response.json()         Что-то делаем с ответом сервера?
        this.isVisit = true;
        localStorage.setItem('isVisit', true);
        name = "";
        mail = "";
        mess = "";
        location.reload();

    }
    else alert("Нет соединения с сервером...");

}

// Инициализация рейтинга
function initRaiting(raitingServ) {
    // Проверим есть ли на странице рейтинги
    if (raitings.length) {
        initRaitings();

    }
    // Установка рейтингов
    function initRaitings() {
        let raitingActive, raitingValue;

        for (let i = 0; i < raitings.length; i++) {
            const raiting = raitings[i];
            // raiting.classList.remove('rating-set')                 /// Установка класса для возможности редактирования рейтинга
            firstInit(raiting, raitingServ);
            initRaitingItem(raiting);
        }
        // Инициализация рейтинга при загрузке страницы
        function firstInit(raiting, raitingServ) {
            initRaitingVars(raiting, raitingServ);
        }

        // Инициализация рейтинга в процессе работы и их изменении
        function initRaitingItem(raiting) {
            initRaitingVars(raiting);
            setRaitingActiveWidth(raitingServ);
            if (raiting.classList.contains('rating-set')) {
                setRaiting(raiting)
            }
        }
        // Установка значений рейтинга
        function initRaitingVars(raiting, first = 0) {
            raitingActive = raiting.querySelector('.raiting-active');
            raitingValue = raiting.querySelector('.raiting-value');
            if (first) {
                raitingValue.innerHTML = first;
            }
        }
        function setRaitingActiveWidth(index = raitingValue.innerHTML) {
            const raitingActiveWidth = index / 0.05;
            raitingActive.style.width = `${raitingActiveWidth}%`
        }
        // Установка рейтинга при срабатывании слушателей (наведение, клик)
        function setRaiting(raiting) {
            const raitingItems = raiting.querySelectorAll('.raiting-item');
            for (let i = 0; i < raitingItems.length; i++) {
                const raitingItem = raitingItems[i];
                raitingItem.addEventListener("mouseenter", mouseEnter);
                raitingItem.addEventListener("mouseleave", mouseLeave);
                raitingItem.addEventListener("click", sendServer);
            }
            function mouseEnter(e) {
                initRaitingVars(raiting);
                setRaitingActiveWidth(e.target.value);
            }
            function mouseLeave(e) {
                initRaitingVars(raiting);
                setRaitingActiveWidth();
            }

            function sendServer(e) {
                for (let i = 0; i < e.path[1].children.length; i++) {
                    e.path[1].children[i].removeEventListener("mouseenter", mouseEnter);
                    e.path[1].children[i].removeEventListener("mouseleave", mouseLeave);
                    e.path[1].children[i].removeEventListener("click", sendServer);
                }
                sendRaitingOnServer(raiting, e.target.value);
            }

        }
        // Отправка рейтинга на сервер, получение и установка на стороне клиента
        async function sendRaitingOnServer(raiting, value) {
            let data = {
                widget_id: CBU_GLOBAL.config.widget.tip_33.widget_id,
                page_url: window.location.href,
                metrika_id: NEIROS_METRIKA_ID,
                neiros_visit: neiros_visit,
                page: 1,
                raiting: { raiting, value }
            }

            let response = await fetch(api_http.sendRating, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                cookie: Cookie,
                body: JSON.stringify(data)
            });

            if (response.ok) {
                let res = await response.json();
                raiting.classList.remove('pending');                                           // Сюда можно навесить лоадер
                raiting.classList.remove('rating-set');                                        // Если не удалять этот класс, то рейтинг можно отправить снова
                let rr = raiting.querySelectorAll('.raiting-item');
                rr.forEach(el => el.style.cursor = 'auto');                                    // Удаляем указатель 

                initRaiting(res.rating)                                                        // Установка рейтинга на страницу от сервера
            }
        }
    }
}

////// Функция получения сообщений с сервера по клику на кнопку "Следующие сообщения"
async function getMessage() {
    count_page++;

    let data = {
        widget_id: CBU_GLOBAL.config.widget.tip_33.widget_id,
        page_url: window.location.href,
        metrika_id: NEIROS_METRIKA_ID,
        neiros_visit: neiros_visit,
        page: 1
    }

    data.page = count_page;

    let response = await fetch(api_http.getMessage, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        cookie: Cookie,
        body: JSON.stringify(data)
    });
    if (response.ok) {
        let result = await response.json();

        // console.log(result.comments.data);                                      /// Сообщения лежат здесь в ответе 

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
                        <svg class="icon" viewBox="0 0 32 32">
                            <path d="M31.004 3.894l-2.9-2.9c-1.325-1.325-3.481-1.325-4.805 0-1.247 1.248-20.301 20.302-21.574 21.576-0.136 0.136-0.226 0.316-0.259 0.492l-1.45 7.83c-0.056 0.304 0.041 0.615 0.259 0.834s0.53 0.315 0.834 0.259l7.829-1.45c0.181-0.034 0.359-0.125 0.492-0.259l21.574-21.576c1.328-1.328 1.328-3.478 0-4.806zM2.108 29.892l0.877-4.736 3.859 3.859-4.736 0.877zM8.767 28.287l-5.054-5.054 18.451-18.452 5.054 5.054-18.451 18.452zM29.678 7.374l-1.135 1.135-5.054-5.054 1.135-1.135c0.594-0.594 1.56-0.594 2.154 0l2.9 2.9c0.595 0.595 0.595 1.559 0 2.154z" />
                        </svg>
                        Редактировать
                    </div>
                    <div class="reply-message-icon">
                        <svg class="icon" viewBox="0 0 407.5 407.5">
                            <path d="M335.9,114.9H71.6c-2.9-0.2-5.7,0.7-7.8,2.6c-2.1,2-3.1,5-2.6,7.8l27.2,236.7c3.2,26.1,25.4,45.6,51.7,45.5h131.7 c27,0.4,49.8-20.1,52.2-47l22.5-236.1c0.1-2.5-0.8-5-2.6-6.8C341.6,115.6,338.8,114.7,335.9,114.9z M303,359.5 c-1.6,15.9-15.4,27.8-31.3,27.2H140c-15.7,0.6-29.2-11-30.8-26.6L83.1,135.8h241.4L303,359.5z"/>
                            <path d="M374.1,47H266.5V30.3c0.6-16.1-12-29.7-28.2-30.3c-0.5,0-1.1,0-1.6,0h-65.8c-16.2-0.3-29.5,12.6-29.8,28.7 c0,0.5,0,1.1,0,1.6V47H33.4C27.7,47,23,51.7,23,57.5s4.7,10.4,10.4,10.4h340.6c5.8,0,10.4-4.7,10.4-10.4S379.8,47,374.1,47z M245.6,30.3V47H162V30.3c-0.6-4.6,2.6-8.8,7.2-9.4c0.5-0.1,1.1-0.1,1.7,0h65.8c4.6-0.3,8.6,3.1,8.9,7.7 C245.6,29.2,245.6,29.8,245.6,30.3z"/>
                        </svg>
                            Удалить
                    </div>
                    <div class="like-icon like reply-message-icon">
                        <svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                            <path opacity="0.5" d="M0 12v16c0 1.106 0.894 2 2 2h6v-20h-6c-1.106 0-2 0.894-2 2z"></path>
                            <path opacity="0.5"
                                d="M28.306 12h-5.906c-0.519 0-0.775-0.344-0.863-0.494s-0.262-0.544-0.012-0.994l2.081-3.75c0.456-0.819 0.506-1.787 0.131-2.65s-1.113-1.487-2.025-1.712l-1.469-0.369c-0.356-0.087-0.738 0.025-0.988 0.3l-7.975 8.856c-0.825 0.919-1.281 2.106-1.281 3.344v10.469c0 2.756 2.244 5 5 5h9.95c2.244 0 4.231-1.512 4.825-3.675l2.137-9.8c0.063-0.275 0.094-0.55 0.094-0.831-0.006-2.037-1.663-3.694-3.7-3.694v0z">
                            </path>
                        </svg>
                        <span id="rm-like">0</span>
                    </div>
                    <div class="like-icon dislike reply-message-icon">
                        <svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                            <path opacity="0.5" d="M2 22h6v-20h-6c-1.106 0-2 0.894-2 2v16c0 1.106 0.894 2 2 2z"></path>
                            <path opacity="0.5"
                                d="M28.306 20c2.038 0 3.694-1.656 3.694-3.694 0-0.281-0.031-0.556-0.094-0.831l-2.137-9.794c-0.594-2.169-2.575-3.681-4.819-3.681h-9.95c-2.756 0-5 2.244-5 5v10.463c0 1.238 0.456 2.425 1.281 3.344l7.975 8.863c0.25 0.275 0.625 0.394 0.988 0.3l1.469-0.369c0.913-0.225 1.65-0.856 2.025-1.719s0.325-1.831-0.131-2.65l-2.081-3.75c-0.25-0.45-0.075-0.844 0.012-0.994s0.344-0.494 0.863-0.494l5.906 0.006z">
                            </path>
                        </svg>
                        <span id="rm-dislike">0</span>
                    </div>
                </div>
                `;
            messageParent.insertBefore(messageFromServer, messageParent.firstElementChild);
        })
    }
    else alert("Нет соединения...")

}

//// Функция проверки модулей на наличие и присваивание значений
function initElements(res) {
    document.getElementById("li").innerHTML = `${res.like}`;
    document.getElementById("dis").innerHTML = `${res.dislike}`;
    document.getElementById("show-data").innerHTML = `${res.views}`;
}

// Функция получения данных после полной загрузки страницы
window.onload = async () => {
    let data = {
        widget_id: CBU_GLOBAL.config.widget.tip_33.widget_id,
        page_url: window.location.href,
        metrika_id: NEIROS_METRIKA_ID,
        neiros_visit: neiros_visit,
        page: 1
    }
    
    let response = await fetch(api_http.initPage, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        cookie: Cookie,
        body: JSON.stringify(data)
    });
    if (response.ok) {
        let result = await response.json();
        initElements(result);
        initRaiting(result.rating);
    }
    else alert("Нет соединения с сервером....")

}

function editMessage(e) {
    document.getElementById(`mess-body${e.id.slice(4)}`).setAttribute("contenteditable", "true");
}

function likeHtml(like) {
    return (
        like.innerHTML = `
        <div class="like-icon like" onclick=clickLike(this)>
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
        <path opacity="0.5" d="M0 12v16c0 1.106 0.894 2 2 2h6v-20h-6c-1.106 0-2 0.894-2 2z"></path>
        <path opacity="0.5"
            d="M28.306 12h-5.906c-0.519 0-0.775-0.344-0.863-0.494s-0.262-0.544-0.012-0.994l2.081-3.75c0.456-0.819 0.506-1.787 0.131-2.65s-1.113-1.487-2.025-1.712l-1.469-0.369c-0.356-0.087-0.738 0.025-0.988 0.3l-7.975 8.856c-0.825 0.919-1.281 2.106-1.281 3.344v10.469c0 2.756 2.244 5 5 5h9.95c2.244 0 4.231-1.512 4.825-3.675l2.137-9.8c0.063-0.275 0.094-0.55 0.094-0.831-0.006-2.037-1.663-3.694-3.7-3.694v0z">
        </path>
            </svg>
            <span id="li"></span>
        </div>
        <div class="like-icon dislike" onclick=clickLike(this)>
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
        <path opacity="0.5" d="M2 22h6v-20h-6c-1.106 0-2 0.894-2 2v16c0 1.106 0.894 2 2 2z"></path>
        <path opacity="0.5"
            d="M28.306 20c2.038 0 3.694-1.656 3.694-3.694 0-0.281-0.031-0.556-0.094-0.831l-2.137-9.794c-0.594-2.169-2.575-3.681-4.819-3.681h-9.95c-2.756 0-5 2.244-5 5v10.463c0 1.238 0.456 2.425 1.281 3.344l7.975 8.863c0.25 0.275 0.625 0.394 0.988 0.3l1.469-0.369c0.913-0.225 1.65-0.856 2.025-1.719s0.325-1.831-0.131-2.65l-2.081-3.75c-0.25-0.45-0.075-0.844 0.012-0.994s0.344-0.494 0.863-0.494l5.906 0.006z">
        </path>
            </svg>
            <span id="dis"></span>
        </div>
        `
    )
}

function showHtml(show) {
    return (
        show.innerHTML = `
        <div>
            <div class="show">
                <div class="show-icon">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                <path opacity="0.5"
                    d="M15.997 6.46c-6.113 0-11.657 3.345-15.748 8.777-0.334 0.445-0.334 1.067 0 1.512 4.091 5.439 9.635 8.784 15.748 8.784s11.657-3.345 15.748-8.777c0.334-0.445 0.334-1.067 0-1.512-4.091-5.439-9.635-8.784-15.748-8.784zM16.435 22.712c-4.058 0.255-7.409-3.089-7.154-7.154 0.209-3.351 2.926-6.067 6.277-6.277 4.058-0.255 7.409 3.089 7.154 7.154-0.216 3.345-2.932 6.061-6.277 6.277zM16.232 19.61c-2.186 0.137-3.993-1.663-3.849-3.849 0.111-1.806 1.577-3.266 3.384-3.384 2.186-0.137 3.993 1.662 3.849 3.849-0.118 1.813-1.584 3.273-3.384 3.384z">
                </path>
                    </svg>
                    <span id="show-data"></span>
                </div>
            </div>
        </div>
        `
    )
}

function raitingHtml(raiting) {
    return (
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
        <div class="raiting-value"> 0 </div>
    ` )
}

function formHtml() {
    let isVisit = false;
    isVisit = localStorage.getItem('isVisit');

    return ([
        `
        <form method="post" class="form-wrapper" id="form-message">
            <div class="form">
                <h3 class="s-review-title">
                    Комментарии
                </h3>

                <div class="form-group">
                    <textarea id="form-message" name="message" rows="4" class="form-control" placeholder="Введите текст комментария" required minlength=5></textarea>

                    <div class="form-control-settings">
                        <div>
                            <svg class="icon icon-paperclip"><use xlink:href="#icon-paperclip"></use></svg>
                        </div>

                        <div>
                            <svg class="icon icon-smile"><use xlink:href="#icon-smile"></use></svg>
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
                                <input type="text" name="Name" id="form-name" class="form-control" placeholder="Ваше имя *">
                            </div>
                            <div class="form-group form-email">
                                <input type="email" name="Email" id="form-email" class="form-control" placeholder="Email *">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn-wrap">
                <button type="submit" class="btn btn-primary">
                    <span>Отправить комментарий</span>
                </button>
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
        `, isVisit]
    )
}

