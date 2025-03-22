const tracks = [
  { title: "I Write Bron Not Bronigies", duration: "1:09", src: "I write bron not bronigies.mp3" },
  { title: "I'd Catch a LeNade for You", duration: "1:04", src: "I'd catch a LeNade for you.mp3" },
  { title: "LeBron Hour", duration: "0:40", src: "LeBron Hour.mp3" },
  { title: "Let LeBron Know", duration: "0:41", src: "Let LeBron Know.mp3" },
  { title: "Marry Bron", duration: "1:05", src: "Marry Bron.mp3" },
  { title: "That's Bron", duration: "1:33", src: "That's Bron.mp3" },
  { title: "The LeBron That I Used to Know", duration: "0:29", src: "The LeBron that I used to know.mp3" },
  { title: "Thinking Bout LeBron", duration: "1:07", src: "Thinking Bout LeBron.mp3" },
  { title: "This Bron", duration: "1:08", src: "This Bron.mp3" },
  { title: "Towards The Bron", duration: "1:05", src: "Towards The Bron.mp3" }
];

// (Rest of your existing logic should follow below this array)


let currentTrack = null;
const trackContainer = document.getElementById('tracks');
const audio = document.getElementById('audioPlayer');
const progressFill = document.getElementById('progressFill');
const currentTimeText = document.getElementById('currentTime');
const durationText = document.getElementById('duration');
const nowTitle = document.getElementById('now-title');
const footerPlayBtn = document.querySelector('.main-play');

tracks.forEach((track, i) => {
  const trackDiv = document.createElement('div');
  trackDiv.className = 'track';
  trackDiv.setAttribute('data-index', i);

  trackDiv.innerHTML = `
    <div class="track-left">
      <button class="play-btn" data-index="${i}">▶</button>
      <span class='track-title'>${track.title}</span>
    </div>
    <div>${track.duration}</div>
  `;

  trackContainer.appendChild(trackDiv);
});

// Add event listener after tracks are rendered
document.querySelectorAll('.play-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const index = parseInt(btn.getAttribute('data-index'));
    const track = tracks[index];
    const isSameTrack = currentTrack === index;
    const isPlaying = !audio.paused;
    const footerBtn = document.querySelector('.main-play');

    document.querySelectorAll('.play-btn').forEach(b => b.textContent = '▶');

    if (isSameTrack && isPlaying) {
      audio.pause();
      btn.textContent = '▶';
      if (footerBtn) footerBtn.textContent = '▶';
    } else if (isSameTrack && !isPlaying) {
      audio.play();
      btn.textContent = '⏸';
      if (footerBtn) footerBtn.textContent = '⏸';
    } else {
      audio.src = track.src;
      audio.play();
      nowTitle.textContent = track.title;
      currentTrack = index;

      btn.textContent = '⏸';
      if (footerBtn) footerBtn.textContent = '⏸';
    }
  });
});

function togglePlay() {
  const footerBtn = document.querySelector('.main-play');

  if (audio.paused) {
    audio.play();
    footerBtn.textContent = '⏸';

    // Update current song button
    const currentBtn = document.querySelector(`.play-btn[data-index="${currentTrack}"]`);
    if (currentBtn) currentBtn.textContent = '⏸';
  } else {
    audio.pause();
    footerBtn.textContent = '▶';

    const currentBtn = document.querySelector(`.play-btn[data-index="${currentTrack}"]`);
    if (currentBtn) currentBtn.textContent = '▶';
  }
}

// Optional: Update the icon when the track ends
audio.addEventListener("ended", () => {
  const footerBtn = document.querySelector('.main-play');
  if (footerBtn) footerBtn.textContent = '▶';
});

function updateProgress() {
  const percentage = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = percentage + '%';
  currentTimeText.textContent = formatTime(audio.currentTime);
}

function setDuration() {
  durationText.textContent = formatTime(audio.duration);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

function shufflePlay() {
  const randomIndex = Math.floor(Math.random() * tracks.length);
  const randomTrack = tracks[randomIndex];
  audio.src = randomTrack.src;
  audio.play();
  nowTitle.textContent = randomTrack.title;
  document.querySelectorAll('.play-btn').forEach((b, i) => {
    b.textContent = (i === randomIndex) ? '⏸' : '▶';
  });
}


function prevTrack() {
  if (currentTrack > 0) {
    const prev = tracks[currentTrack - 1];
    const btn = document.querySelector(`.play-btn[data-index='${currentTrack - 1}']`);
    playSpecificTrack(currentTrack - 1, btn);
  }
}

function nextTrack() {
  if (currentTrack < tracks.length - 1) {
    const next = tracks[currentTrack + 1];
    const btn = document.querySelector(`.play-btn[data-index='${currentTrack + 1}']`);
    playSpecificTrack(currentTrack + 1, btn);
  }
}

function playSpecificTrack(index, btn) {
  const track = tracks[index];
  const isSameTrack = currentTrack === index;
  const isPlaying = !audio.paused;
  const footerBtn = document.querySelector('.main-play');

  if (isSameTrack && isPlaying) {
    audio.pause();
    btn.textContent = '▶';
    if (footerBtn) footerBtn.textContent = '▶';
  } else {
    if (!audio.src.includes(track.src)) {
      audio.src = track.src;
    }

    audio.play();
    nowTitle.textContent = track.title;
    currentTrack = index;

    document.querySelectorAll('.play-btn').forEach(b => b.textContent = '▶');
    btn.textContent = '⏸';
    if (footerBtn) footerBtn.textContent = '⏸';
  }
}

