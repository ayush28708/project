// Sporets Broadcast Video Player & 2D Tactical Pitch Radar Engine
class SportsPlayer {
  constructor() {
    this.videoEl = null;
    this.canvasEl = null;
    this.canvasCtx = null;
    this.currentMode = 'video'; // 'video' | 'radar' | 'audio'
    this.isPlaying = true;
    this.isMuted = false;
    this.volume = 0.8;
    this.isTheater = false;
    this.radarAnimFrame = null;
    this.ballPos = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, progress: 1 };
    this.particles = [];
  }

  init() {
    this.videoEl = document.getElementById('broadcast-video');
    this.canvasEl = document.getElementById('radar-canvas');
    if (this.canvasEl) {
      this.canvasCtx = this.canvasEl.getContext('2d');
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
    }

    if (this.videoEl) {
      this.videoEl.volume = this.volume;
      this.videoEl.addEventListener('play', () => {
        this.isPlaying = true;
        this.updatePlayPauseBtn();
      });
      this.videoEl.addEventListener('pause', () => {
        this.isPlaying = false;
        this.updatePlayPauseBtn();
      });
    }

    this.startRadarAnimation();
    this.setupFloatingReactions();
  }

  resizeCanvas() {
    if (!this.canvasEl) return;
    const rect = this.canvasEl.parentElement.getBoundingClientRect();
    this.canvasEl.width = rect.width;
    this.canvasEl.height = rect.height;
  }

  loadMatchStream(match) {
    if (!this.videoEl) return;
    this.videoEl.src = match.streamUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
    this.videoEl.load();
    const playPromise = this.videoEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented playback, keep paused until user interaction
        this.isPlaying = false;
        this.updatePlayPauseBtn();
      });
    }

    // Update Player Overlay details
    const titleEl = document.getElementById('player-match-title');
    const badgeEl = document.getElementById('player-score-bug');
    const viewersEl = document.getElementById('player-viewers-count');
    const qualityEl = document.getElementById('stream-quality-badge');

    if (titleEl) titleEl.textContent = match.title;
    if (badgeEl) {
      if (match.sport === 'cricket') {
        badgeEl.innerHTML = `<span class="team-tag">${match.teams.teamA.short}</span> <strong>${match.teams.teamA.score}</strong> (${match.teams.teamA.overs}) vs <span class="team-tag">${match.teams.teamB.short}</span> ${match.teams.teamB.score}`;
      } else {
        badgeEl.innerHTML = `<span class="team-tag">${match.teams.teamA.short}</span> <strong>${match.teams.teamA.score} - ${match.teams.teamB.score}</strong> <span class="team-tag">${match.teams.teamB.short}</span> <span class="clock-tag">${match.teams.teamB.subtext || 'LIVE'}</span>`;
      }
    }
    if (viewersEl) viewersEl.textContent = `${match.viewers} Watching`;
    if (qualityEl) qualityEl.textContent = match.streamQuality || '1080p 60fps';

    // Populate server switcher
    const serverSelect = document.getElementById('stream-server-select');
    if (serverSelect) {
      serverSelect.innerHTML = '';
      const streams = match.alternateStreams || [
        { name: 'Server 1 - Main Feed (HD)', url: match.streamUrl },
        { name: 'Server 2 - Fast Buffer', url: match.streamUrl }
      ];
      streams.forEach((stream, idx) => {
        const opt = document.createElement('option');
        opt.value = stream.url;
        opt.textContent = stream.name;
        if (idx === 0) opt.selected = true;
        serverSelect.appendChild(opt);
      });
    }
  }

  switchServer(url) {
    if (!this.videoEl || !url) return;
    const curTime = this.videoEl.currentTime;
    this.videoEl.src = url;
    this.videoEl.currentTime = curTime;
    this.videoEl.play();
  }

  togglePlayPause() {
    if (!this.videoEl) return;
    if (this.videoEl.paused) {
      this.videoEl.play();
      this.isPlaying = true;
    } else {
      this.videoEl.pause();
      this.isPlaying = false;
    }
    this.updatePlayPauseBtn();
  }

  updatePlayPauseBtn() {
    const btn = document.getElementById('player-play-btn');
    if (!btn) return;
    btn.innerHTML = this.isPlaying 
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
  }

  toggleMute() {
    if (!this.videoEl) return;
    this.isMuted = !this.isMuted;
    this.videoEl.muted = this.isMuted;
    const btn = document.getElementById('player-mute-btn');
    if (!btn) return;
    btn.innerHTML = this.isMuted
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
  }

  setVolume(val) {
    this.volume = parseFloat(val);
    if (this.videoEl) {
      this.videoEl.volume = this.volume;
      this.videoEl.muted = false;
      this.isMuted = false;
    }
  }

  toggleFullscreen() {
    const container = document.getElementById('player-wrapper');
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen().catch(err => console.log(err));
    }
  }

  toggleTheaterMode() {
    const appEl = document.getElementById('app-body');
    this.isTheater = !this.isTheater;
    if (appEl) {
      appEl.classList.toggle('theater-active', this.isTheater);
    }
    setTimeout(() => this.resizeCanvas(), 300);
  }

  togglePiP() {
    if (!this.videoEl) return;
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
      this.videoEl.requestPictureInPicture();
    }
  }

  switchMode(mode) {
    this.currentMode = mode;
    const videoWrapper = document.getElementById('video-screen');
    const radarWrapper = document.getElementById('radar-screen');
    const audioWrapper = document.getElementById('audio-screen');
    const tabs = document.querySelectorAll('.mode-switch-btn');

    tabs.forEach(t => t.classList.toggle('active', t.dataset.mode === mode));

    if (videoWrapper) videoWrapper.style.display = mode === 'video' ? 'block' : 'none';
    if (radarWrapper) radarWrapper.style.display = mode === 'radar' ? 'block' : 'none';
    if (audioWrapper) audioWrapper.style.display = mode === 'audio' ? 'flex' : 'none';

    if (mode === 'radar') {
      this.resizeCanvas();
    }
  }

  // ----------------- 2D TACTICAL PITCH RADAR CANVAS ANIMATION -----------------
  startRadarAnimation() {
    const loop = () => {
      if (this.currentMode === 'radar' && this.canvasCtx && this.canvasEl) {
        this.drawPitchRadar();
      }
      this.radarAnimFrame = requestAnimationFrame(loop);
    };
    loop();
  }

  drawPitchRadar() {
    const ctx = this.canvasCtx;
    const w = this.canvasEl.width;
    const h = this.canvasEl.height;
    if (!w || !h) return;

    const match = window.SPORTS_DATA.matches.find(m => m.id === window.SPORTS_DATA.currentMatchId) || window.SPORTS_DATA.matches[0];
    const sport = match.sport;

    ctx.clearRect(0, 0, w, h);

    if (sport === 'cricket') {
      this.drawCricketPitch(ctx, w, h, match);
    } else if (sport === 'football') {
      this.drawFootballPitch(ctx, w, h, match);
    } else if (sport === 'basketball') {
      this.drawBasketballCourt(ctx, w, h, match);
    } else {
      this.drawGenericArena(ctx, w, h, match);
    }

    // Render animated reaction particles if any
    this.renderCanvasParticles(ctx);
  }

  drawCricketPitch(ctx, w, h, match) {
    const cx = w / 2;
    const cy = h / 2;
    const rx = Math.min(w * 0.44, 380);
    const ry = Math.min(h * 0.42, 240);

    // Outfield Grass gradient
    const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, rx);
    grad.addColorStop(0, '#10391d');
    grad.addColorStop(0.7, '#0a2613');
    grad.addColorStop(1, '#05140a');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();

    // Boundary Rope
    ctx.strokeStyle = '#2fd06f';
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 30-Yard Circle
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx * 0.52, ry * 0.52, 0, 0, Math.PI * 2);
    ctx.stroke();

    // The 22-Yard Pitch Strip in Center
    const pitchW = rx * 0.16;
    const pitchH = ry * 0.6;
    ctx.fillStyle = '#bda56f';
    ctx.fillRect(cx - pitchW / 2, cy - pitchH / 2, pitchW, pitchH);
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 1.5;
    // Crease lines
    ctx.beginPath();
    ctx.moveTo(cx - pitchW / 2, cy - pitchH * 0.38);
    ctx.lineTo(cx + pitchW / 2, cy - pitchH * 0.38);
    ctx.moveTo(cx - pitchW / 2, cy + pitchH * 0.38);
    ctx.lineTo(cx + pitchW / 2, cy + pitchH * 0.38);
    ctx.stroke();

    // Wickets dots
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 3, cy - pitchH * 0.45, 6, 3);
    ctx.fillRect(cx - 3, cy + pitchH * 0.45, 6, 3);

    // Striker & Non-Striker
    ctx.fillStyle = '#00e5ff'; // India blue
    ctx.beginPath();
    ctx.arc(cx, cy + pitchH * 0.34, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px Outfit, sans-serif';
    ctx.fillText('Hardik (42*)', cx + 9, cy + pitchH * 0.35);

    // Bowler
    ctx.fillStyle = '#ffd600'; // Aussie yellow
    ctx.beginPath();
    ctx.arc(cx, cy - pitchH * 0.42, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText('Starc', cx + 9, cy - pitchH * 0.41);

    // Fielders positioning dots
    const fielders = [
      { a: 0.1, d: 0.85, name: 'Deep Point' },
      { a: 0.4, d: 0.9, name: 'Deep Cover' },
      { a: 0.7, d: 0.88, name: 'Long Off' },
      { a: 1.0, d: 0.9, name: 'Long On' },
      { a: 1.3, d: 0.85, name: 'Deep Midwkt' },
      { a: 1.6, d: 0.88, name: 'Deep Square' },
      { a: 1.85, d: 0.7, name: 'Short Fine' },
      { a: -0.2, d: 0.4, name: 'Slip' },
      { a: -0.4, d: 0.35, name: 'Wicketkeeper' }
    ];

    fielders.forEach(f => {
      const fx = cx + Math.cos(f.a * Math.PI) * rx * f.d;
      const fy = cy + Math.sin(f.a * Math.PI) * ry * f.d;
      ctx.fillStyle = '#ffd600';
      ctx.beginPath();
      ctx.arc(fx, fy, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Animated Ball Flight trajectory
    const t = (Date.now() % 2400) / 2400;
    const startX = cx;
    const startY = cy + pitchH * 0.34;
    const endX = cx + rx * 0.78;
    const endY = cy - ry * 0.65;

    ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo((startX + endX) / 2, startY - 120, endX, endY);
    ctx.stroke();

    // Ball
    const bx = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * ((startX + endX) / 2) + t * t * endX;
    const by = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * (startY - 120) + t * t * endY;
    ctx.fillStyle = '#ff1744';
    ctx.beginPath();
    ctx.arc(bx, by, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Radar Header HUD
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(cx - 150, 16, 300, 32);
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.5)';
    ctx.strokeRect(cx - 150, 16, 300, 32);
    ctx.fillStyle = '#00e5ff';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('LIVE RADAR • 18.2 OV: 94m SIX TO LONG-ON', cx, 36);
  }

  drawFootballPitch(ctx, w, h, match) {
    const padX = 35;
    const padY = 25;
    const pw = w - padX * 2;
    const ph = h - padY * 2;

    // Grass
    ctx.fillStyle = '#0d2818';
    ctx.fillRect(padX, padY, pw, ph);

    // Mowing stripes
    const stripes = 8;
    for (let i = 0; i < stripes; i++) {
      if (i % 2 === 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.fillRect(padX + (pw / stripes) * i, padY, pw / stripes, ph);
      }
    }

    // Pitch markings
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.strokeRect(padX, padY, pw, ph);

    // Halfway line
    const midX = padX + pw / 2;
    ctx.beginPath();
    ctx.moveTo(midX, padY);
    ctx.lineTo(midX, padY + ph);
    ctx.stroke();

    // Center circle
    ctx.beginPath();
    ctx.arc(midX, padY + ph / 2, Math.min(pw * 0.12, 60), 0, Math.PI * 2);
    ctx.stroke();

    // Penalty Boxes
    const boxW = Math.min(pw * 0.16, 90);
    const boxH = Math.min(ph * 0.55, 140);
    const boxY = padY + (ph - boxH) / 2;
    // Left Box (Real Madrid)
    ctx.strokeRect(padX, boxY, boxW, boxH);
    // Right Box (Man City)
    ctx.strokeRect(padX + pw - boxW, boxY, boxW, boxH);

    // Animated Ball
    const t = (Date.now() % 3000) / 3000;
    const bx = midX + Math.sin(t * Math.PI * 2) * (pw * 0.32);
    const by = padY + ph / 2 + Math.cos(t * Math.PI * 2) * (ph * 0.25);

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(bx, by, 5, 0, Math.PI * 2);
    ctx.fill();

    // HUD Header
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(w / 2 - 140, 10, 280, 28);
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('TACTICAL RADAR • 78\' RMA 2 - 2 MCI', w / 2, 28);
  }

  drawBasketballCourt(ctx, w, h, match) {
    const pad = 30;
    const cw = w - pad * 2;
    const ch = h - pad * 2;

    ctx.fillStyle = '#3a2312'; // Hardwood
    ctx.fillRect(pad, pad, cw, ch);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.strokeRect(pad, pad, cw, ch);

    // Half court line
    ctx.beginPath();
    ctx.moveTo(pad + cw / 2, pad);
    ctx.lineTo(pad + cw / 2, pad + ch);
    ctx.stroke();

    // Center circle
    ctx.beginPath();
    ctx.arc(pad + cw / 2, pad + ch / 2, 45, 0, Math.PI * 2);
    ctx.stroke();

    // 3-point lines on both ends
    ctx.beginPath();
    ctx.arc(pad, pad + ch / 2, ch * 0.42, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(pad + cw, pad + ch / 2, ch * 0.42, Math.PI / 2, 3 * Math.PI / 2);
    ctx.stroke();

    // Ball
    ctx.fillStyle = '#ff7a00';
    ctx.beginPath();
    ctx.arc(pad + cw * 0.65, pad + ch * 0.5, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  drawGenericArena(ctx, w, h, match) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#00e5ff';
    ctx.font = 'bold 16px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LIVE TRACKING & TELEMETRY STREAM', w / 2, h / 2);
  }

  // ----------------- FLOATING LIVE EMOJI REACTIONS -----------------
  setupFloatingReactions() {
    const reactionButtons = document.querySelectorAll('.reaction-pill-btn');
    reactionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const emoji = btn.dataset.emoji || '🔥';
        this.spawnReaction(emoji);
        window.soundFX.playClick();
      });
    });
  }

  spawnReaction(emoji) {
    const container = document.getElementById('floating-reactions-layer');
    if (!container) return;

    const el = document.createElement('div');
    el.className = 'floating-reaction-bubble';
    el.textContent = emoji;

    // Random horizontal start within bottom 20% to 80%
    const startX = 20 + Math.random() * 60;
    el.style.left = `${startX}%`;
    el.style.bottom = '15%';

    container.appendChild(el);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 2200);
  }

  renderCanvasParticles(ctx) {
    // Optional particle updates inside canvas if needed
  }
}

window.sportsPlayer = new SportsPlayer();
