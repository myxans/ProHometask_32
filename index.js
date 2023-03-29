/*const requestURL = 'https://jsonplaceholder.typicode.com/posts';

function sendRequest(method, url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.responseType = 'json';


        xhr.onload = () => {
            resolve(xhr.response)
        };
        xhr.onerror = () => {
            reject(xhr.response)
        }

        xhr.send();
    })
};

sendRequest('GET', requestURL)
    .then(data => console.log(data))
    .catch(err => console.log(err))*/

const requestURL = 'https://jsonplaceholder.typicode.com/posts';

function sendRequest(url) {
    return fetch(url).then(response => {
        return response.json()
    }
    )
};

function TFun() {
    let input = document.getElementById('name').value;
    console.log(input);
    return input
}

sendRequest(requestURL)
    .then(data => console.log(data[TFun()]))
    .catch(err => console.log(err))