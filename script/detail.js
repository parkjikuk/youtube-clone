function getQuery(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}

window.onload = function() {
    const videoId = getQuery('videoId');
    const videoTitle = localStorage.getItem('videoTitle');

    if(!videoId) {
        console.error("영상을 찾을 수 없습니다.");
        return;
    }

    const title = document.getElementById('title');
    title.innerHTML = `${videoTitle}`

    const playerElement = document.getElementById('player');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.width = '920';
    iframe.height = '600';
    iframe.allowFullscreen = true;

    playerElement.appendChild(iframe);
};
