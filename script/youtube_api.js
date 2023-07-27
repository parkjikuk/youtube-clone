const regionCode = "KR";

console.log('hi');

async function fetchVideos() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=28&regionCode=${regionCode}&key=${apiKey}`) 
        const data = await response.json();

        console.log(data);

        const videosContainer = document.getElementById('videos-container');
        

    data.items.forEach(async (item) => {
      const thumbnailUrl = item.snippet.thumbnails.high.url;
      const title = item.snippet.title;
      const channelName = item.snippet.channelTitle;
      const videoId = item.id;
      const channelId = item.snippet.channelId;
      
      const channelData = await fetchChannelData(channelId);
      if(channelId) {
        const channelProfile = channelData.items[0].snippet.thumbnails.default.url;
      

      const videoElement = document.createElement('div');
      videoElement.className = 'video';

      function handleClick() {
        window.location.href = `detail.html?videoId=${videoId}`;
        localStorage.setItem('videoTitle', title);
      }

      videoElement.innerHTML = `
        <div class="video-thumbnail">
          <img src="${thumbnailUrl}" alt="youtube thumbnail">
        </div>
        <div class="video-description">
          <div class="video-meta-data">
            <div class="channel-image">
            <img src="${channelProfile}" alt="channel profile">
            </div>
            <div class="video-info">
              <div class="video-title">${title}</div>
              <div class="channel-name">${channelName}</div>
            </div>
          </div>
          <i class="fa-solid fa-ellipsis-vertical" style="color: #ffffff; right: 0;"></i>
        </div>
      `;
    

        const thumbnailElement = videoElement.querySelector('.video-thumbnail img');
        const titleElement = videoElement.querySelector('.video-title');
        thumbnailElement.addEventListener('click', handleClick);
        titleElement.addEventListener('click', handleClick);


      videosContainer.appendChild(videoElement);
    }
    });
    } catch (error) {
        console.error('데이터를 불러오는데 오류가 있습니다.', error);
    }
}

async function fetchChannelData(channelId) {
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching channel data:', error);
    return null;
  }
}


window.onload = fetchVideos;