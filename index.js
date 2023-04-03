const inputNumberPost = document.querySelector('.search__input');
const buttonInput = document.querySelector('.search__button');
const postBlock = document.querySelector('.post_block');
const commentsBlock = document.querySelector('.comments_block');
const baseUrl = 'https://jsonplaceholder.typicode.com';


function buttonInputClickHandler() {
    const id = inputNumberPost.value;
    if (id && id <= 100 && id > 0) {
        getData(urlPost())
            .then(data => renderPostBlock(data));
    } else {
        inputNumberPost.value = '';
        inputNumberPost.placeholder = 'Введіть від 1 до 100';
    }
}

function urlPost() {
    const urlPostRes = new URL(`/posts/${inputNumberPost.value}`, baseUrl);
    return urlPostRes;
}

function getData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Код помилки: ' + response.status);
                }
                return response;
            })
            .then(response => resolve(response.json()))
            .catch(error => {
                rerenderGetError(error);
                console.log(error);
            })
    })
}

function rerenderGetError (error){
    postBlock.innerHTML = '';
    commentsBlock.innerHTML ='';
    postBlock.insertAdjacentHTML('beforeend',`<p> Вибачте виникла помилка ${error} </p>`);
}

function renderPostBlock(post) {
    const title = document.createElement('h1');
    const content = document.createElement('p');
    const buttonComments = document.createElement('button');
    postBlock.innerHTML = '';
    commentsBlock.innerHTML = '';
    title.innerText = post.title;
    title.classList.add('post_block__title');
    content.innerHTML = post.body;
    content.classList.add('post_block__content');
    buttonComments.innerText = 'Коментарі';
    buttonComments.classList.add('post_block__button');
    buttonComments.dataset.id = post.id;
    postBlock.prepend(content);
    postBlock.prepend(title);
    postBlock.append(buttonComments);
    buttonComments.addEventListener('click', buttonCommentsClickHandler);
}

function buttonCommentsClickHandler(e) {
    const urlComments = new URL(`/comments`, baseUrl);
    const id = e.target.dataset.id;
    urlComments.searchParams.set('id', id);
    getData(urlComments)
        .then((data) => {renderComments(data)})
}

function renderComments(arr) {
    for (const el of arr) {
        let res = '';
        res += `<h2>${el.name}</h2>
        <p>${el.body}</p>
        <p>${el.email}</p>`;
        commentsBlock.insertAdjacentHTML('beforeend', res);
    }
}

buttonInput.addEventListener('click', buttonInputClickHandler);