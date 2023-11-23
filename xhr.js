const requestUrl = 'http://91.107.127.117:8082/api/analysis/yt';

function sendRequest(method, url, params = {}) {
    const queryString = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    const fullUrl = queryString ? `${url}?${queryString}` : url;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, fullUrl);

        xhr.responseType = 'json';

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.onerror = () => {
            reject(xhr.response);
        };

        xhr.send();
    });
}

const videoUrl = 'https://www.youtube.com/watch?v=KruSUqLdxQA'; // Replace VIDEO_ID with the actual YouTube video ID

const params = {
    url: videoUrl,
};

sendRequest('GET', requestUrl, params)
    .then(data => console.log(data))
    .catch(err => console.log(err));
