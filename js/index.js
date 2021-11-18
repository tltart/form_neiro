
const likeEl = document.getElementById('LikeId');
const showId = document.getElementById('ShowId');
const formId = document.getElementById('FormId');

let responseOnLoad;


const like = document.createElement('div');
like.className = "like-wrap";

likeEl.appendChild(like);


window.onload = async () =>{
    let r = await fetch('http://127.0.01:3333/')
    .then(res => res.json());
    console.log(r);
    document.getElementById("li").innerHTML = `${r.rates[0]}`
    document.getElementById("dis").innerHTML = `${r.rates[1]}`

}



like.innerHTML = `
    <div class="like">
        <div class="like-icon">
            <svg class="icon"><use xlink:href="#icon-like"></use></svg>
            <span id="li"></span>
        </div>
        <div class="like-icon">
            <svg class="icon" ><use xlink:href="#icon-dislike"></use></svg>
            <span id="dis"></span>
        </div>
    </div>
`
