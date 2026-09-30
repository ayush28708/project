// Sporets Ultimate Cursed Keyboard & Creepy Chaos Engine
class AnnoyingPirateMode {
  constructor() {
    this.isActive = true;
    this.penaltiesIssued = 0;
    this.totalPopupsSpawned = 0;
    this.adsAttemptedClosed = 0;
    this.keysPressedCount = 0;
    this.lastUserActivity = Date.now();
    this.cooldownUntil = 0;
    this.idleCheckTimer = null;
    this.periodicSoundTimer = null;
    this.stormContainer = null;
    this.hasTriggeredExitTrap = false;
    this.dvdAds = [];
    this.flyEl = null;
    this.lastScrollY = 0;
    this.lastScrollTime = Date.now();
  }

  init() {
    this.createStormLayer();
    this.injectScoreboardAndControls();
    this.injectBottomBanner();
    this.injectCornerFloatingAds();
    this.injectPinnedMatchCinema();
    this.injectAfkWarningHud();
    this.injectCursedKeyboardHud();
    this.injectAnnoyingFly();
    this.setupGhostCursors();
    this.setupBouncingDvdAds();
    this.setupCursedKeyboardListener(); // <-- KEYBOARD MADNESS TRIGGER!
    this.setupGlobalClickHijacker();
    this.setupIdleDetection();
    this.setupExitIntentTrap();
    this.setupSpeedingScrollTrap();
    this.setupMuteTrap();
    this.startPeriodicSoundChaos();
    this.startPeriodicVoiceShouts();

    // Initial hilarious welcome barrage
    setTimeout(() => {
      this.spawnStormWindow('CRITICAL SYSTEM ALERT', '🚨 98 VIRUSES DETECTED IN RAM!', 'Your PC is infected with illegal cricket stream cookies! Clean now!', '🛡️ CLEAN NOW (FREE)', 'top-left');
      this.spawnStormWindow('HOT SINGLES NEAR YOU', '💘 4 LOCAL CRICKET FANS ONLINE', 'Dist: 0.2 km. They want to watch India vs Australia with you right now!', '💬 START CHAT (FREE)', 'bottom-right');
    }, 1000);
  }

  createStormLayer() {
    this.stormContainer = document.createElement('div');
    this.stormContainer.className = 'popup-storm-layer';
    this.stormContainer.id = 'popup-storm-layer';
    document.body.appendChild(this.stormContainer);
  }

  // Header Controls: Scoreboard + "😭 I'M CRYING" + Soundboard + Mode Toggle
  injectScoreboardAndControls() {
    const actionsGroup = document.querySelector('.header-actions-right');
    if (!actionsGroup) return;

    // Live Ads Scoreboard
    const scorePill = document.createElement('div');
    scorePill.className = 'ads-scoreboard-pill';
    scorePill.id = 'ads-scoreboard-pill';
    scorePill.innerHTML = `
      <span>ADS: <strong class="ads-score-spawned" id="score-spawned-num">2</strong></span>
      <span>CLOSED: <strong class="ads-score-closed" id="score-closed-num">0</strong></span>
      <span style="color:#ffcc00;">HYDRA: 2x</span>
    `;

    // Panic "I'M CRYING" Button
    const panicBtn = document.createElement('button');
    panicBtn.className = 'panic-crying-btn';
    panicBtn.id = 'panic-crying-btn';
    panicBtn.innerHTML = '😭 I\'M CRYING (Close All)';
    panicBtn.title = 'Clear all penalty ads and get 25s peace!';
    panicBtn.addEventListener('click', () => this.panicCloseAll());

    // Chaos Soundboard Bar
    const soundBar = document.createElement('div');
    soundBar.className = 'chaos-sound-strip';
    soundBar.innerHTML = `
      <button class="chaos-sound-btn" onclick="window.soundFX.playSiren()" title="Police Siren">🚨 SIREN</button>
      <button class="chaos-sound-btn" onclick="window.soundFX.playAirhorn()" title="Stadium Airhorn">🎺 HORN</button>
      <button class="chaos-sound-btn" onclick="window.soundFX.playCreepyJumpscare()" title="Jumpscare">💀 BOOM</button>
      <button class="chaos-sound-btn" onclick="window.soundFX.playCreepyLaugh()" title="Demonic Laugh">😈 LAUGH</button>
      <button class="chaos-sound-btn" onclick="window.soundFX.playMosquito()" title="Mosquito Buzz">🪰 FLY</button>
    `;

    // Toggle Button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'top-action-btn pirate-toggle-btn';
    toggleBtn.id = 'pirate-mode-toggle';
    toggleBtn.innerHTML = '🏴‍☠️ CURSED MODE: ON';
    toggleBtn.title = 'Toggle Annoying Mode';
    toggleBtn.addEventListener('click', () => this.toggleMode());

    actionsGroup.insertBefore(scorePill, actionsGroup.firstChild);
    actionsGroup.insertBefore(soundBar, scorePill);
    actionsGroup.insertBefore(panicBtn, soundBar);
    actionsGroup.insertBefore(toggleBtn, panicBtn);
  }

  updateScoreboard() {
    const spawnedEl = document.getElementById('score-spawned-num');
    const closedEl = document.getElementById('score-closed-num');
    if (spawnedEl) spawnedEl.textContent = this.totalPopupsSpawned;
    if (closedEl) closedEl.textContent = this.adsAttemptedClosed;
  }

  injectCursedKeyboardHud() {
    const pill = document.createElement('div');
    pill.className = 'cursed-keyboard-pill';
    pill.id = 'cursed-key-pill';
    pill.innerHTML = '⌨️ KEYBOARD CURSED: ANY KEY = CHAOS';
    document.body.appendChild(pill);
  }

  // AFK Warning HUD
  injectAfkWarningHud() {
    const hud = document.createElement('div');
    hud.className = 'afk-warning-banner';
    hud.id = 'afk-warning-hud';
    hud.innerHTML = '🚨 INACTIVITY DETECTED! YOU ARE NOT CHEERING! AUTO-SPAWNING ADS!';
    document.body.appendChild(hud);
  }

  // ==========================================================================
  // ⌨️ CURSED KEYBOARD EVENT LISTENER (PRESSING ANY BUTTON DOES CHAOS!)
  // ==========================================================================
  setupCursedKeyboardListener() {
    window.addEventListener('keydown', (e) => {
      if (!this.isActive || Date.now() < this.cooldownUntil) return;

      this.keysPressedCount++;
      const pill = document.getElementById('cursed-key-pill');
      if (pill) pill.innerHTML = `⌨️ CURSED KEYS: ${this.keysPressedCount} PRESSED`;

      // 1. SPACEBAR: INVERTS GRAVITY (TURNS WHOLE PAGE 180° UPSIDE DOWN!)
      if (e.code === 'Space') {
        e.preventDefault();
        window.soundFX.playSlideWhistle();
        document.body.classList.add('gravity-inverted');
        this.spawnNotice('🔄 GRAVITY MALFUNCTION! PAGE INVERTED 180°!');
        setTimeout(() => document.body.classList.remove('gravity-inverted'), 1400);
        return;
      }

      // 2. ESCAPE: ILLEGAL ESCAPE ATTEMPT (RED CARDS + SIRENS)
      if (e.code === 'Escape') {
        e.preventDefault();
        window.soundFX.playRefereeBarrage();
        window.soundFX.playSiren();
        document.body.classList.add('quake-active');
        setTimeout(() => document.body.classList.remove('quake-active'), 500);
        this.showVARPenaltyOverlay(true);
        this.spawnStormWindow('ESCAPE BLOCKED', '🚨 YOU CANNOT ESCAPE SPORETS!', 'Under international broadcast law, closing during live sports is illegal!', '⚖️ ACCEPT PENALTY', 'center');
        return;
      }

      // 3. ENTER: STARING EYES JUMPSCARE (👁️  👁️)
      if (e.code === 'Enter') {
        window.soundFX.playCreepyJumpscare();
        this.triggerCreepyEyesJumpscare();
        return;
      }

      // 4. BACKSPACE / DELETE: CRAWLING SPIDER SCURRIES ACROSS SCREEN!
      if (e.code === 'Backspace' || e.code === 'Delete') {
        window.soundFX.playMosquito();
        this.spawnCrawlingSpider();
        this.spawnNotice('🕷️ SPIDER RELEASED! DON\'T ERASE THE ADS!');
        return;
      }

      // 5. ANY OTHER KEY (LETTERS, NUMBERS, PUNCTUATION):
      // Glitch Screen Flicker + Creepy Sound + 25% Chance of Instant Popup
      const creepyEffects = ['glitch', 'laugh', 'shake', 'popup'];
      const pick = creepyEffects[Math.floor(Math.random() * creepyEffects.length)];

      if (pick === 'glitch') {
        window.soundFX.playGlitchStatic();
        document.body.classList.add('creepy-glitch-active');
        setTimeout(() => document.body.classList.remove('creepy-glitch-active'), 180);
      } else if (pick === 'laugh') {
        window.soundFX.playCreepyLaugh();
      } else if (pick === 'shake') {
        document.body.classList.add('quake-active');
        window.soundFX.playPop();
        setTimeout(() => document.body.classList.remove('quake-active'), 400);
      } else if (pick === 'popup') {
        this.spawnRandomAdWindow();
      }
    });
  }

  // ----------------- STARING EYES JUMPSCARE OVERLAY (👁️  👁️) -----------------
  triggerCreepyEyesJumpscare() {
    const overlay = document.createElement('div');
    overlay.className = 'creepy-eyes-jumpscare';
    overlay.innerHTML = `
      <div class="eyes-pair">👁️ 👁️</div>
      <div class="eyes-whisper-text">WE ARE WATCHING YOU WATCH SPORTS...</div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
      if (overlay.parentNode) overlay.remove();
    }, 1200);
  }

  // ----------------- CRAWLING SPIDER SWARM (🕷️) -----------------
  spawnCrawlingSpider() {
    const spider = document.createElement('div');
    spider.className = 'creepy-spider';
    spider.textContent = '🕷️';

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    spider.style.top = `${Math.random() * vh}px`;
    spider.style.left = `-50px`;
    document.body.appendChild(spider);

    setTimeout(() => {
      spider.style.left = `${vw + 50}px`;
      spider.style.top = `${Math.random() * vh}px`;
    }, 50);

    setTimeout(() => {
      if (spider.parentNode) spider.remove();
    }, 2000);
  }

  // ----------------- ANNOYING 🪰 FLY ON SCREEN -----------------
  injectAnnoyingFly() {
    this.flyEl = document.createElement('div');
    this.flyEl.className = 'annoying-fly';
    this.flyEl.id = 'annoying-fly-target';
    this.flyEl.textContent = '🪰';
    this.flyEl.style.top = '220px';
    this.flyEl.style.left = '320px';

    this.flyEl.addEventListener('click', (e) => {
      e.stopPropagation();
      window.soundFX.playMosquito();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      this.flyEl.style.top = `${80 + Math.random() * (vh - 180)}px`;
      this.flyEl.style.left = `${50 + Math.random() * (vw - 120)}px`;
      this.spawnNotice('🪰 BZZZ! Fly evaded your click!');
    });

    document.body.appendChild(this.flyEl);

    setInterval(() => {
      if (!this.isActive || !this.flyEl) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      this.flyEl.style.top = `${80 + Math.random() * (vh - 180)}px`;
      this.flyEl.style.left = `${50 + Math.random() * (vw - 120)}px`;
    }, 6000);
  }

  // ----------------- GHOST TRAILING CURSORS -----------------
  setupGhostCursors() {
    const ghosts = [];
    for (let i = 0; i < 3; i++) {
      const g = document.createElement('div');
      g.className = 'ghost-cursor-dot';
      g.textContent = '👆';
      g.style.opacity = `${0.6 - i * 0.18}`;
      document.body.appendChild(g);
      ghosts.push({ el: g, x: 0, y: 0 });
    }

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    setInterval(() => {
      if (!this.isActive) {
        ghosts.forEach(g => g.el.style.display = 'none');
        return;
      }
      ghosts.forEach((g, idx) => {
        g.el.style.display = 'block';
        g.x += (mouseX - g.x) * (0.35 - idx * 0.08);
        g.y += (mouseY - g.y) * (0.35 - idx * 0.08);
        g.el.style.left = `${g.x + 10 * (idx + 1)}px`;
        g.el.style.top = `${g.y + 10 * (idx + 1)}px`;
      });
    }, 30);
  }

  // ----------------- DVD SCREENSAVER BOUNCING ADS -----------------
  setupBouncingDvdAds() {
    const createBouncingAd = (title, text) => {
      const ad = document.createElement('div');
      ad.className = 'bouncing-dvd-ad';
      ad.innerHTML = `
        <div class="bouncing-dvd-title">
          <span>${title}</span>
          <button style="background:none;border:none;color:#fff;cursor:pointer;" onclick="window.annoyingMode.interceptCloseWithPenalty(this.closest('.bouncing-dvd-ad').id)">✕</button>
        </div>
        <div class="bouncing-dvd-body">${text}</div>
      `;
      ad.id = `dvd-ad-${Math.floor(Math.random() * 10000)}`;
      document.body.appendChild(ad);

      const item = {
        el: ad,
        x: 50 + Math.random() * 400,
        y: 100 + Math.random() * 300,
        vx: (Math.random() > 0.5 ? 1 : -1) * (2.5 + Math.random() * 2),
        vy: (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 2)
      };
      this.dvdAds.push(item);
    };

    createBouncingAd('⚽ BOUNCING UCL BONUS', 'Chase this ad to claim 500 free spins on Real Madrid!');
    createBouncingAd('🏏 MONSTER CRICKET AD', 'Rohit Sharma power-hit hit this ad out of the stadium!');

    setInterval(() => {
      if (!this.isActive) {
        this.dvdAds.forEach(a => a.el.style.display = 'none');
        return;
      }
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      this.dvdAds.forEach(a => {
        a.el.style.display = 'block';
        a.x += a.vx;
        a.y += a.vy;

        if (a.x <= 10 || a.x >= vw - 280) a.vx *= -1;
        if (a.y <= 60 || a.y >= vh - 140) a.vy *= -1;

        a.el.style.left = `${a.x}px`;
        a.el.style.top = `${a.y}px`;
      });
    }, 30);
  }

  // ----------------- SPEEDING SCROLL TRAP -----------------
  setupSpeedingScrollTrap() {
    window.addEventListener('scroll', () => {
      if (!this.isActive || Date.now() < this.cooldownUntil) return;

      const now = Date.now();
      const currentScrollY = window.scrollY;
      const dist = Math.abs(currentScrollY - this.lastScrollY);
      const dt = now - this.lastScrollTime;

      if (dt < 200 && dist > 550) {
        window.soundFX.playRefereeBarrage();
        this.spawnNotice('🏎️ PIT LANE SPEEDING PENALTY! Scrolling too fast! 2 Penalty Ads Deployed!');
        this.spawnRandomAdWindow();
        this.spawnRandomAdWindow();
      }

      this.lastScrollY = currentScrollY;
      this.lastScrollTime = now;
    });
  }

  // ----------------- MUTE TRAP -----------------
  setupMuteTrap() {
    const muteBtn = document.getElementById('player-mute-btn');
    if (!muteBtn) return;

    muteBtn.addEventListener('click', (e) => {
      if (!this.isActive || Date.now() < this.cooldownUntil) return;

      setTimeout(() => {
        if (window.sportsPlayer.isMuted) {
          window.soundFX.playAirhorn();
          this.spawnNotice('🚨 MUTING SPONSORS IS A BOOKABLE OFFENSE! UNMUTING AUDIO...');
          window.sportsPlayer.toggleMute();
          this.spawnRandomAdWindow();
        }
      }, 500);
    });
  }

  // ----------------- PERIODIC ROBOTIC VOICE ANNOUNCEMENTS -----------------
  startPeriodicVoiceShouts() {
    const voiceLines = [
      'Who pressed that button on the laptop... We are watching your hands...',
      'Attention sports fans! Do not touch the keyboard or five spiders will spawn!',
      'Alert: You are legally required to watch two more popups before half time.'
    ];

    setInterval(() => {
      if (!this.isActive || Date.now() < this.cooldownUntil) return;
      if (!('speechSynthesis' in window)) return;

      const pick = voiceLines[Math.floor(Math.random() * voiceLines.length)];
      const utterance = new SpeechSynthesisUtterance(pick);
      utterance.rate = 1.1;
      utterance.pitch = 0.8; // Deep, eerie tone
      window.speechSynthesis.speak(utterance);
    }, 35000);
  }

  // ----------------- AUTOMATIC IDLE / AFK PUNISHMENT ENGINE -----------------
  setupIdleDetection() {
    const recordActivity = () => {
      this.lastUserActivity = Date.now();
      const hud = document.getElementById('afk-warning-hud');
      if (hud) hud.style.display = 'none';
    };

    window.addEventListener('mousemove', recordActivity);
    window.addEventListener('keydown', recordActivity);
    window.addEventListener('scroll', recordActivity);
    window.addEventListener('click', recordActivity);

    this.idleCheckTimer = setInterval(() => {
      if (!this.isActive || Date.now() < this.cooldownUntil) return;

      const idleSeconds = (Date.now() - this.lastUserActivity) / 1000;

      if (idleSeconds >= 6) {
        const hud = document.getElementById('afk-warning-hud');
        if (hud) hud.style.display = 'block';

        window.soundFX.playRefereeBarrage();
        setTimeout(() => window.soundFX.playAirhorn(), 250);

        document.body.classList.add('quake-active');
        setTimeout(() => document.body.classList.remove('quake-active'), 500);

        this.spawnStormWindow(
          'AFK INACTIVITY PENALTY',
          '😴 WAKE UP! YOU STOPPED CHEERING!',
          'You were idle for 6 seconds! Penalty ads deployed to keep you alert for the match!',
          '⚡ I AM AWAKE! (RESUME)',
          'random',
          true
        );

        this.lastUserActivity = Date.now() - 2000;
      }
    }, 2500);
  }

  // ----------------- EXIT-INTENT TRAP -----------------
  setupExitIntentTrap() {
    document.addEventListener('mouseleave', (e) => {
      if (!this.isActive || Date.now() < this.cooldownUntil) return;

      if (e.clientY <= 5 && !this.hasTriggeredExitTrap) {
        this.hasTriggeredExitTrap = true;
        this.triggerExitTrapModal();
        setTimeout(() => { this.hasTriggeredExitTrap = false; }, 20000);
      }
    });
  }

  triggerExitTrapModal() {
    window.soundFX.playSiren();
    document.body.classList.add('quake-active');
    setTimeout(() => document.body.classList.remove('quake-active'), 600);

    const backdrop = document.createElement('div');
    backdrop.className = 'exit-trap-modal-backdrop';
    backdrop.id = 'exit-trap-modal';

    const match = window.SPORTS_DATA.matches.find(m => m.id === window.SPORTS_DATA.currentMatchId) || window.SPORTS_DATA.matches[0];

    backdrop.innerHTML = `
      <div class="exit-trap-card">
        <div class="exit-trap-title">🚨 WAIT! ILLEGAL RETREAT DETECTED!</div>
        <p class="exit-trap-sub">
          If you close this tab right now, <strong>${match.teams.teamA.name}</strong> will be disqualified from the championship!
          Stay to claim <strong>999,999 FREE VIP STREAM CREDITS</strong> and protect your team!
        </p>
        <div class="exit-trap-buttons">
          <button class="btn-stay-stream" onclick="window.annoyingMode.dismissExitTrap(true)">
            🛡️ STAY & DEFEND MY TEAM (FREE VIP)
          </button>
          <button class="btn-fake-leave" onclick="window.annoyingMode.dismissExitTrap(false)">
            I accept disqualification (Leaves anyway)
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);
  }

  dismissExitTrap(isHeroic) {
    const modal = document.getElementById('exit-trap-modal');
    if (modal) modal.remove();

    if (isHeroic) {
      window.soundFX.playCrowdRoar(2);
      this.spawnNotice('🏆 HEROIC SPORTS FAN! 2 Loyalty Ads awarded!');
      this.spawnRandomAdWindow();
      this.spawnRandomAdWindow();
    } else {
      window.soundFX.playSlideWhistle();
      this.spawnNotice('❌ RETREAT FORBIDDEN: 3 Punishment Popups Spawned!');
      this.spawnRandomAdWindow();
      this.spawnRandomAdWindow();
      this.spawnRandomAdWindow();
    }
  }

  // ----------------- FLOATING PINNED MATCH CINEMA (ALWAYS WATCH MATCH) -----------------
  injectPinnedMatchCinema() {
    let cinema = document.getElementById('pinned-match-cinema');
    if (cinema) return;

    cinema = document.createElement('div');
    cinema.className = 'pinned-match-cinema-dock';
    cinema.id = 'pinned-match-cinema';

    const match = window.SPORTS_DATA.matches.find(m => m.id === window.SPORTS_DATA.currentMatchId) || window.SPORTS_DATA.matches[0];

    cinema.innerHTML = `
      <div class="pinned-dock-header">
        <span>🔴 MATCH SECURE (CAN'T CUT APP)</span>
        <span style="cursor:pointer;" onclick="window.annoyingMode.scrollPlayerIntoView()">🔍 FOCUS</span>
      </div>
      <div class="pinned-dock-body">
        <div class="pinned-match-score-row" id="pinned-dock-score-row">
          <span>${match.teams.teamA.short} ${match.teams.teamA.score}</span>
          <span style="color:var(--accent-red);font-size:10px;">LIVE</span>
          <span>${match.teams.teamB.short} ${match.teams.teamB.score}</span>
        </div>
        <div class="pinned-dock-cta">⚡ MATCH IS STREAMING LIVE BEHIND POPUPS!</div>
      </div>
    `;

    document.body.appendChild(cinema);

    setInterval(() => {
      const curMatch = window.SPORTS_DATA.matches.find(m => m.id === window.SPORTS_DATA.currentMatchId);
      const row = document.getElementById('pinned-dock-score-row');
      if (curMatch && row) {
        row.innerHTML = `
          <span>${curMatch.teams.teamA.short} ${curMatch.teams.teamA.score}</span>
          <span style="color:var(--accent-red);font-size:10px;">LIVE</span>
          <span>${curMatch.teams.teamB.short} ${curMatch.teams.teamB.score}</span>
        `;
      }
    }, 3000);
  }

  scrollPlayerIntoView() {
    const el = document.getElementById('player-wrapper');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.soundFX.playPop();
  }

  // ----------------- THE 100% HYDRA CLOSE PENALTY (CAN'T QUIT AD!) -----------------
  interceptCloseWithPenalty(winId) {
    if (!this.isActive) {
      this.closeStormWindow(winId);
      return;
    }

    this.adsAttemptedClosed++;
    this.penaltiesIssued++;
    this.updateScoreboard();

    window.soundFX.playRefereeBarrage();
    setTimeout(() => window.soundFX.playSlideWhistle(), 300);

    document.body.classList.add('quake-active');
    setTimeout(() => document.body.classList.remove('quake-active'), 550);

    const isRed = this.penaltiesIssued % 2 === 0;
    this.showVARPenaltyOverlay(isRed);

    this.closeStormWindow(winId);
    setTimeout(() => {
      this.spawnRandomAdWindow();
      this.spawnRandomAdWindow();
    }, 350);

    this.spawnNotice(isRed 
      ? '🟥 RED CARD! GROSS AD-CLOSING FOUL! 2 BONUS ADS SPAWNED!' 
      : '🟨 YELLOW CARD! VAR REVIEW: ILLEGAL AD CLOSE! 2 ADS ADDED!');
  }

  showVARPenaltyOverlay(isRed) {
    const overlay = document.createElement('div');
    overlay.className = 'var-penalty-overlay';
    overlay.innerHTML = `
      <div class="var-card-graphic ${isRed ? 'red-card' : 'yellow-card'}">
        <div class="var-card-title">${isRed ? '🟥 RED CARD!' : '🟨 PENALTY!'}</div>
        <div class="var-card-sub">VAR REVIEW: UNLAWFUL AD CLOSE DETECTED!</div>
        <div class="var-penalty-badge">HYDRA PENALTY: +2 POPUPS</div>
      </div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
      if (overlay.parentNode) overlay.remove();
    }, 1000);
  }

  // ----------------- PANIC WIPE ALL POPUPS -----------------
  panicCloseAll() {
    window.soundFX.playCryingSound();

    if (this.stormContainer) {
      this.stormContainer.innerHTML = '';
    }

    const varOverlays = document.querySelectorAll('.var-penalty-overlay');
    varOverlays.forEach(o => o.remove());

    const exitTrap = document.getElementById('exit-trap-modal');
    if (exitTrap) exitTrap.remove();

    const eyes = document.querySelector('.creepy-eyes-jumpscare');
    if (eyes) eyes.remove();

    const spiders = document.querySelectorAll('.creepy-spider');
    spiders.forEach(s => s.remove());

    this.cooldownUntil = Date.now() + 25000;
    this.penaltiesIssued = 0;
    this.lastUserActivity = Date.now();

    this.spawnNotice('😭 FORFEIT GRANTED! Wipe your tears! 25 seconds of peace granted. Watch match!');
  }

  toggleMode() {
    this.isActive = !this.isActive;
    const btn = document.getElementById('pirate-mode-toggle');
    const bottomBanner = document.querySelector('.floating-bottom-pirate-banner');
    const corners = document.querySelectorAll('.corner-float-ad');
    const keyPill = document.getElementById('cursed-key-pill');

    if (btn) {
      btn.classList.toggle('clean-active', !this.isActive);
      btn.innerHTML = this.isActive ? '🏴‍☠️ CURSED MODE: ON' : '✨ Clean Mode';
    }

    if (keyPill) keyPill.style.display = this.isActive ? 'block' : 'none';
    if (bottomBanner) bottomBanner.style.display = this.isActive ? 'flex' : 'none';
    corners.forEach(c => c.style.display = this.isActive ? 'flex' : 'none');

    if (!this.isActive) {
      this.panicCloseAll();
    }

    window.soundFX.playClick();
  }

  // ----------------- GLOBAL CLICK HIJACKER -----------------
  setupGlobalClickHijacker() {
    let globalClicks = 0;

    document.addEventListener('click', (e) => {
      if (!this.isActive || Date.now() < this.cooldownUntil) return;

      if (e.target.closest('.storm-window') || 
          e.target.closest('.bouncing-dvd-ad') ||
          e.target.closest('#panic-crying-btn') || 
          e.target.closest('#pirate-mode-toggle') ||
          e.target.closest('.chaos-sound-btn')) {
        return;
      }

      globalClicks++;
      if (globalClicks % 3 === 0) {
        window.soundFX.playPop();
        this.spawnRandomAdWindow();
      }
    }, true);
  }

  // ----------------- POPUP STORM WINDOW GENERATOR -----------------
  spawnStormWindow(title, headline, desc, actionText, position = 'random', isRetro = false) {
    if (!this.isActive || !this.stormContainer) return;
    this.totalPopupsSpawned++;
    this.updateScoreboard();

    const win = document.createElement('div');
    win.className = `storm-window ${isRetro ? 'retro-win-xp' : ''}`;
    win.id = `storm-win-${this.totalPopupsSpawned}`;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let top = 100 + Math.random() * (vh - 420);
    let left = 40 + Math.random() * (vw - 380);

    if (position === 'top-left') { top = 90; left = 40; }
    else if (position === 'bottom-right') { top = vh - 320; left = vw - 360; }
    else if (position === 'center') { top = vh / 2 - 140; left = vw / 2 - 160; }

    win.style.top = `${Math.max(60, top)}px`;
    win.style.left = `${Math.max(20, left)}px`;
    win.style.zIndex = 99990 + this.totalPopupsSpawned;

    const currentId = `storm-win-${this.totalPopupsSpawned}`;

    win.innerHTML = `
      <div class="storm-titlebar">
        <span>${title}</span>
        <button class="storm-close-btn-hydra" onclick="window.annoyingMode.interceptCloseWithPenalty('${currentId}')" title="Close Ad (Penalty Warning!)">✕</button>
      </div>
      <div class="storm-body">
        <div class="storm-icon">${isRetro ? '💻' : '⚡'}</div>
        <div class="storm-headline">${headline}</div>
        <p>${desc}</p>
        <button class="storm-btn-action" onclick="window.annoyingMode.handleAdAction('${currentId}')">${actionText}</button>
        <span class="penalty-warning-text">⚠️ Caution: Closing this ad spawns 2 more ads!</span>
      </div>
    `;

    this.stormContainer.appendChild(win);
    window.soundFX.playPop();

    setTimeout(() => {
      if (win.parentNode) win.remove();
    }, 45000);
  }

  spawnRandomAdWindow() {
    const ads = [
      {
        title: 'PENALTY SHOOTOUT CASINO',
        headline: '⚽ BET $500 ON HAALAND TO CLOSE AD!',
        desc: 'Spin the Champions League roulette wheel to double your streaming speed!',
        action: '🎰 CLAIM $500 CHIPS',
        isRetro: false
      },
      {
        title: 'CRICKET DUST CLEANER',
        headline: '🏏 DUST DETECTED IN UMPIRE CAMERA!',
        desc: 'Clean 8.4 GB of pitch cookies to unlock 120fps ultra slow motion replays.',
        action: '🚀 CLEAN PITCH NOW',
        isRetro: true
      },
      {
        title: 'LOCAL GOALKEEPERS LIVE',
        headline: '🧤 3 GOALKEEPERS IN YOUR CITY ONLINE',
        desc: 'They want to discuss tactical 4-3-3 pressing traps with you right now!',
        action: '💬 JOIN GOALKEEPER CHAT',
        isRetro: false
      },
      {
        title: 'FORMULA 1 TELEMETRY TROLL',
        headline: '🏎️ VERSTAPPEN ENGINE ON FIRE!',
        desc: 'Click repeatedly to blow cold air onto the Red Bull radiator!',
        action: '❄️ BLOW COLD AIR',
        isRetro: true
      },
      {
        title: 'PIZZA PIRATE STREAM',
        headline: '🍕 FREE PIZZA DELIVERED IN 10 MINS!',
        desc: 'Enter credit card CVV to receive 1 slice of cold cricket stadium pizza.',
        action: '🍕 ORDER NOW',
        isRetro: false
      },
      {
        title: 'FBI ANTI-ADBLOCK',
        headline: '👮 CEASE AND DESIST ORDER',
        desc: 'You have closed 0 ads today. Minimum quota is 15 ads per match.',
        action: '⚖️ COMPLY WITH ADS',
        isRetro: true
      }
    ];

    const pick = ads[Math.floor(Math.random() * ads.length)];
    this.spawnStormWindow(pick.title, pick.headline, pick.desc, pick.action, 'random', pick.isRetro);
  }

  closeStormWindow(winId) {
    const el = document.getElementById(winId);
    if (el) el.remove();
  }

  handleAdAction(winId) {
    window.soundFX.playCashRegister();
    alert('🎉 VIP SPONSOR REWARD CLAIMED! You received 500 imaginary crypto coins!');
    this.closeStormWindow(winId);
  }

  // ----------------- FLOATING BANNERS & CORNERS -----------------
  injectBottomBanner() {
    const banner = document.createElement('div');
    banner.className = 'floating-bottom-pirate-banner';
    banner.innerHTML = `
      <div class="banner-ad-left">
        <span class="banner-ad-icon">📱</span>
        <div>
          <div class="banner-ad-title">🏆 1,000,000th VISITOR: CLAIM YOUR IPHONE 17 PRO!</div>
          <div class="banner-ad-text">Your IP was chosen! Offer expires in <strong id="ad-countdown-timer" style="color:#ff0055">00:43</strong></div>
        </div>
      </div>
      <div class="banner-ad-actions">
        <button class="banner-claim-btn" onclick="alert('🎁 Prize Reserved! Please deposit $0 to claim!')">CLAIM NOW</button>
        <button class="banner-claim-btn" style="background:#ffaa00;color:#000;" onclick="window.soundFX.playAirhorn()">🎺 HONK</button>
      </div>
    `;
    document.body.appendChild(banner);

    let secondsLeft = 45;
    setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) secondsLeft = 59;
      const timerEl = document.getElementById('ad-countdown-timer');
      if (timerEl) {
        timerEl.textContent = `00:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
      }
    }, 1000);
  }

  injectCornerFloatingAds() {
    const bl = document.createElement('div');
    bl.className = 'corner-float-ad bottom-left';
    bl.innerHTML = `
      <span>🎰</span>
      <div>
        <strong>VIP Casino 888</strong>
        <div style="font-size:9px;color:#cbd5e1;">Deposit $10, Get $500</div>
      </div>
    `;
    document.body.appendChild(bl);

    const tr = document.createElement('div');
    tr.className = 'corner-float-ad top-right';
    tr.innerHTML = `
      <span>🔥</span>
      <div>
        <strong>Local Fans Live (2)</strong>
        <div style="font-size:9px;color:#f43f5e;">Waiting in chat...</div>
      </div>
    `;
    document.body.appendChild(tr);
  }

  // ----------------- AUTONOMOUS PERIODIC SOUND DROPS -----------------
  startPeriodicSoundChaos() {
    if (this.periodicSoundTimer) clearInterval(this.periodicSoundTimer);

    // Every 16 seconds, play a random crazy sound
    this.periodicSoundTimer = setInterval(() => {
      if (!this.isActive || Date.now() < this.cooldownUntil) return;

      const sounds = ['siren', 'horn', 'whistle', 'slide', 'disco'];
      const pick = sounds[Math.floor(Math.random() * sounds.length)];

      if (pick === 'siren') window.soundFX.playSiren();
      else if (pick === 'horn') window.soundFX.playAirhorn();
      else if (pick === 'whistle') window.soundFX.playRefereeBarrage();
      else if (pick === 'slide') window.soundFX.playSlideWhistle();
      else if (pick === 'disco') window.soundFX.playDiscoChaos();

      window.sportsPlayer.spawnReaction('😱');
    }, 16000);
  }

  spawnNotice(text) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.top = '70px';
    el.style.left = '50%';
    el.style.transform = 'translateX(-50%)';
    el.style.background = '#ef4444';
    el.style.color = '#fff';
    el.style.padding = '8px 20px';
    el.style.borderRadius = '30px';
    el.style.fontWeight = '800';
    el.style.zIndex = '999999';
    el.style.boxShadow = '0 0 25px #ef4444';
    el.textContent = text;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }
}

window.annoyingMode = new AnnoyingPirateMode();
window.addEventListener('DOMContentLoaded', () => {
  window.annoyingMode.init();
});
