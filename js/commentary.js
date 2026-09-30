// Sporets Live Commentary Engine (Real-Time Ball-by-Ball Feed + Speech Narration + Sound FX)
class CommentaryManager {
  constructor() {
    this.filter = 'all'; // 'all' | 'boundaries' | 'wickets'
    this.autoSimulate = true;
    this.timer = null;
    this.isSpeaking = false;
    this.autoNarrate = false;
  }

  init() {
    this.startLiveSimulation();
    this.setupSpeechToggle();
  }

  render(match) {
    const container = document.getElementById('commentary-feed-list');
    if (!container) return;

    if (!match.commentary || match.commentary.length === 0) {
      container.innerHTML = `<div class="empty-state-card">Live commentary will commence when the match starts.</div>`;
      return;
    }

    let items = match.commentary;
    if (this.filter === 'boundaries') {
      items = items.filter(c => c.type === 'boundary' || c.type === 'six' || c.type === 'goal');
    } else if (this.filter === 'wickets') {
      items = items.filter(c => c.type === 'wicket' || c.type === 'card');
    }

    container.innerHTML = items.map(c => this.renderCommentaryItem(c, match.sport)).join('');
  }

  renderCommentaryItem(c, sport) {
    let typeClass = 'comm-normal';
    let badgeColor = 'badge-gray';

    if (c.type === 'six' || c.type === 'goal') {
      typeClass = 'comm-highlight-gold';
      badgeColor = 'badge-gold';
    } else if (c.type === 'boundary') {
      typeClass = 'comm-highlight-blue';
      badgeColor = 'badge-blue';
    } else if (c.type === 'wicket' || c.type === 'card') {
      typeClass = 'comm-highlight-red';
      badgeColor = 'badge-red';
    }

    return `
      <div class="commentary-card ${typeClass}">
        <div class="comm-meta-line">
          <span class="comm-over-pill">${c.over}</span>
          ${c.badge ? `<span class="comm-event-badge ${badgeColor}">${c.badge}</span>` : ''}
          <span class="comm-time-ago">${c.time || 'Live'}</span>
          <button class="comm-speak-btn" onclick="window.commentaryManager.speakCommentary('${this.escapeQuotes(c.title + '. ' + c.text)}')" title="Listen to Commentary">
            🔊
          </button>
        </div>
        <h4 class="comm-title">${c.title}</h4>
        <p class="comm-text">${c.text}</p>
        ${c.audioTag ? `
          <div class="comm-audio-tag">
            <span class="sound-wave-icon"></span>
            <span>SFX: ${c.audioTag}</span>
          </div>
        ` : ''}
      </div>
    `;
  }

  escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  setFilter(filterType) {
    this.filter = filterType;
    document.querySelectorAll('.comm-filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.filter === filterType);
    });
    const match = window.SPORTS_DATA.matches.find(m => m.id === window.SPORTS_DATA.currentMatchId);
    if (match) this.render(match);
  }

  // ----------------- SPEECH SYNTHESIS BROADCASTER -----------------
  speakCommentary(text) {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick English Voice if available
    const voices = window.speechSynthesis.getVoices();
    const engVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David') || v.name.includes('George')));
    if (engVoice) utterance.voice = engVoice;

    this.isSpeaking = true;
    utterance.onend = () => { this.isSpeaking = false; };
    utterance.onerror = () => { this.isSpeaking = false; };

    window.speechSynthesis.speak(utterance);
  }

  toggleAutoNarrate() {
    this.autoNarrate = !this.autoNarrate;
    const btn = document.getElementById('toggle-speech-narrate-btn');
    if (btn) {
      btn.classList.toggle('active', this.autoNarrate);
      btn.innerHTML = this.autoNarrate ? '🎙️ Radio Narration: ON' : '🎙️ Radio Narration: OFF';
    }
  }

  setupSpeechToggle() {
    const btn = document.getElementById('toggle-speech-narrate-btn');
    if (btn) {
      btn.addEventListener('click', () => this.toggleAutoNarrate());
    }
  }

  // ----------------- REAL-TIME SIMULATION ENGINE -----------------
  startLiveSimulation() {
    if (this.timer) clearInterval(this.timer);

    this.timer = setInterval(() => {
      if (!this.autoSimulate) return;
      this.generateNewLiveEvent();
    }, 12000); // New event every 12 seconds
  }

  toggleSimulation() {
    this.autoSimulate = !this.autoSimulate;
    const btn = document.getElementById('toggle-sim-btn');
    if (btn) {
      btn.classList.toggle('paused', !this.autoSimulate);
      btn.innerHTML = this.autoSimulate 
        ? '<span class="status-dot-pulse"></span> Live Sync: ON' 
        : '<span class="status-dot-paused"></span> Live Sync: PAUSED';
    }
  }

  generateNewLiveEvent() {
    const match = window.SPORTS_DATA.matches.find(m => m.id === window.SPORTS_DATA.currentMatchId);
    if (!match || match.status !== 'live') return;

    if (match.sport === 'cricket') {
      this.generateCricketEvent(match);
    } else if (match.sport === 'football') {
      this.generateFootballEvent(match);
    } else if (match.sport === 'basketball') {
      this.generateBasketballEvent(match);
    }

    this.render(match);
    window.scorecardManager.render(match);
  }

  generateCricketEvent(match) {
    const events = [
      {
        type: 'boundary',
        title: 'FOUR! Slashed through backward point!',
        text: 'Short and wide, Hardik Pandya pounces in a flash! Cuts it aerially over backward point, bounces twice and hits the fence! Pure timing!',
        badge: '4 RUNS',
        sound: 'bat'
      },
      {
        type: 'run',
        title: '2 Runs - Superb running between wickets',
        text: 'Nudged softly into the gap at deep mid-wicket. Called early for two and Rinku charges back to beat the flat throw with ease.',
        badge: '2 RUNS'
      },
      {
        type: 'six',
        title: 'SIX! MONSTROUS HIT INTO THE ROOF!',
        text: 'Dispatched! In the arc and out of the park! Rinku Singh sends it 102 meters deep into the Great Southern Stand! The crowd is in sheer delirium!',
        badge: '6 RUNS',
        sound: 'crowd'
      },
      {
        type: 'event',
        title: 'Play of the Day: Direct hit miss!',
        text: 'Starc fires a yorker at the toes, Pandya digs it out towards mid-on. David gathers cleanly and shies at the non-striker stumps, but misses by a whisker!',
        badge: 'DOT BALL'
      }
    ];

    const pick = events[Math.floor(Math.random() * events.length)];
    const newComm = {
      over: '18.' + (Math.floor(Math.random() * 5) + 3),
      type: pick.type,
      title: pick.title,
      text: pick.text,
      badge: pick.badge,
      time: 'Just now'
    };

    match.commentary.unshift(newComm);
    if (match.commentary.length > 25) match.commentary.pop();

    if (pick.sound === 'bat') window.soundFX.playBatCrack();
    if (pick.sound === 'crowd') window.soundFX.playCrowdRoar();

    if (this.autoNarrate) {
      this.speakCommentary(newComm.title + '. ' + newComm.text);
    }
  }

  generateFootballEvent(match) {
    const events = [
      {
        type: 'event',
        title: '79\' - Blistering Counterattack!',
        text: 'Vinícius turns Walker inside out and delivers a tantalizing cross into the 6-yard box! Dias clears under tremendous pressure!',
        badge: 'PRESSURE'
      },
      {
        type: 'event',
        title: '81\' - Crucial tackle by Rodri',
        text: 'Bellingham was driving straight towards goal until Rodri stretched a leg to time a textbook tackle in the middle of the pitch.',
        badge: 'TACKLE'
      }
    ];

    const pick = events[Math.floor(Math.random() * events.length)];
    const newComm = {
      over: (78 + Math.floor(Math.random() * 4)) + '\'',
      type: pick.type,
      title: pick.title,
      text: pick.text,
      badge: pick.badge,
      time: 'Just now'
    };

    match.commentary.unshift(newComm);
    if (match.commentary.length > 25) match.commentary.pop();

    if (this.autoNarrate) {
      this.speakCommentary(newComm.title + '. ' + newComm.text);
    }
  }

  generateBasketballEvent(match) {
    const newComm = {
      over: '1:45 Q4',
      type: 'event',
      title: 'AD CLUTCH BLOCK AT THE RIM!',
      text: 'Curry drove into the paint, dished to Kuminga, but Anthony Davis met him at the rim with a monstrous block! Staples Center erupts!',
      badge: 'BLOCK 🛡️',
      time: 'Just now'
    };
    match.commentary.unshift(newComm);
  }
}

window.commentaryManager = new CommentaryManager();
