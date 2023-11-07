const newsList = document.querySelector('.news__list');

// Function to fetch top stories
async function fetchTopStories() {
  const response = await fetch(
    'https://hacker-news.firebaseio.com/v0/topstories.json'
  );
  const topStoryIds = await response.json();
  return topStoryIds.slice(0, 12);
}

// Function to fetch story details
async function fetchStoryDetails(storyId) {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
  );
  const storyDetails = await response.json();
  return storyDetails;
}

// function to format API date & time
function unixTimestampToDateTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString('en-US', options);
}

// Function to display top stories
async function displayTopStories() {
  const topStoryIds = await fetchTopStories();

  for (const storyId of topStoryIds) {
    const storyDetails = await fetchStoryDetails(storyId);
    const listItem = document.createElement('li');
    const date = document.createElement('span');
    date.textContent = unixTimestampToDateTime(storyDetails.time);
    listItem.innerHTML = `<a href="${storyDetails.url}" target="_blank">${storyDetails.title}</a>`;
    listItem.append(date);
    newsList.appendChild(listItem);
  }
}

displayTopStories();
