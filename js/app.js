// Master Application Orchestrator for Sporets Live
class SporetsApp {
  constructor() {
    this.activeTab = 'commentary'; // commentary | scorecard | lineups | h2h | chat
  }

  init() {
    this.renderTopTicker();
    this.renderSportsNav();
    this.renderMatchesSidebar();
    this.setupEventListeners();
    this.setupSearch();

    // Initialize player, commentary, chat
    const initialMatch = window.SPORTS_DATA.matches[0];
    this.selectMatch(initialMatch.id);

    window.sportsPlayer.init();
    window.commentaryManager.init();
    window.chatAndPolls.init();
  }

  // ----------------- TOP LIVE TICKER -----------------
  renderTopTicker() {
    const ticker = document.getElementById('live-ticker-track');
    if (!ticker) return;

    const matches = window.SPORTS_DATA.matches;
    ticker.innerHTML = matches.map(m => {
      const isCur = m.id === window.SPORTS_DATA.currentMatchId;
      const isLive = m.status === 'live';
      return `
        <div class="ticker-pill ${isCur ? 'active' : ''} ${isLive ? 'is-live' : ''}" onclick="window.sporetsApp.selectMatch('${m.id}')">
          <span class="ticker-sport-icon">${this.getSportIcon(m.sport)}</span>
          <div class="ticker-score-block">
            <div class="ticker-team-line">
              <span class="team-name">${m.teams.teamA.short}</span>
              <span class="team-pts">${m.teams.teamA.score}</span>
            </div>
            <div class="ticker-team-line">
              <span class="team-name">${m.teams.teamB.short}</span>
              <span class="team-pts">${m.teams.teamB.score}</span>
            </div>
          </div>
          ${isLive ? '<span class="live-dot-ping"></span>' : '<span class="status-sub-pill">' + (m.status === 'upcoming' ? 'UPCOMING' : 'FT') + '</span>'}
        </div>
      `;
    }).join('');
  }

  getSportIcon(sport) {
    switch (sport) {
      case 'cricket': return '🏏';
      case 'football': return '⚽';
      case 'basketball': return '🏀';
      case 'tennis': return '🎾';
      case 'f1': return '🏎️';
      default: return '🏆';
    }
  }

  // ----------------- SPORTS FILTER NAVIGATION -----------------
  renderSportsNav() {
    const container = document.getElementById('sports-categories-nav');
    if (!container) return;

    container.innerHTML = window.SPORTS_DATA.sportsCategories.map(cat => `
      <button class="sport-cat-btn ${cat.id === window.SPORTS_DATA.currentSport ? 'active' : ''}" onclick="window.sporetsApp.filterBySport('${cat.id}')">
        <span class="cat-icon">${cat.icon}</span>
        <span class="cat-name">${cat.name}</span>
      </button>
    `).join('');
  }

  filterBySport(sportId) {
    window.SPORTS_DATA.currentSport = sportId;
    this.renderSportsNav();
    this.renderMatchesSidebar();
    window.soundFX.playClick();
  }

  filterByStatus(status) {
    window.SPORTS_DATA.filterStatus = status;
    document.querySelectorAll('.status-filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.status === status);
    });
    this.renderMatchesSidebar();
    window.soundFX.playClick();
  }

  // ----------------- MATCHES SIDEBAR / CARDS -----------------
  renderMatchesSidebar() {
    const list = document.getElementById('matches-list-container');
    if (!list) return;

    let matches = window.SPORTS_DATA.matches;

    // Filter by Sport
    if (window.SPORTS_DATA.currentSport !== 'all') {
      matches = matches.filter(m => m.sport === window.SPORTS_DATA.currentSport);
    }

    // Filter by Status
    if (window.SPORTS_DATA.filterStatus !== 'all') {
      matches = matches.filter(m => m.status === window.SPORTS_DATA.filterStatus);
    }

    // Search query
    if (window.SPORTS_DATA.searchQuery) {
      const q = window.SPORTS_DATA.searchQuery.toLowerCase();
      matches = matches.filter(m => 
        m.title.toLowerCase().includes(q) ||
        m.teams.teamA.name.toLowerCase().includes(q) ||
        m.teams.teamB.name.toLowerCase().includes(q) ||
        m.tournament.toLowerCase().includes(q)
      );
    }

    if (matches.length === 0) {
      list.innerHTML = `<div class="empty-state-card">No matches found for this filter.</div>`;
      return;
    }

    list.innerHTML = matches.map(m => {
      const isSelected = m.id === window.SPORTS_DATA.currentMatchId;
      const isLive = m.status === 'live';
      return `
        <div class="match-card-item ${isSelected ? 'active-match' : ''}" onclick="window.sporetsApp.selectMatch('${m.id}')">
          <div class="match-card-top">
            <span class="match-tournament-tag">${this.getSportIcon(m.sport)} ${m.tournament}</span>
            ${isLive 
              ? '<span class="live-pill"><span class="pulse-dot"></span> LIVE</span>' 
              : `<span class="status-tag-neutral">${m.status.toUpperCase()}</span>`}
          </div>

          <div class="match-card-teams">
            <div class="team-row">
              <span class="team-badge">${m.teams.teamA.badge}</span>
              <span class="team-fullname">${m.teams.teamA.name}</span>
              <span class="team-score-val">${m.teams.teamA.score}</span>
            </div>
            <div class="team-row">
              <span class="team-badge">${m.teams.teamB.badge}</span>
              <span class="team-fullname">${m.teams.teamB.name}</span>
              <span class="team-score-val">${m.teams.teamB.score}</span>
            </div>
          </div>

          <div class="match-card-footer">
            <span class="match-summary-snippet">${m.teams.teamA.subtext || m.matchStateSummary.slice(0, 48) + '...'}</span>
            <span class="watch-now-cta">
              ${isLive ? 'Watch Live ⚡' : 'View Scores 📊'}
            </span>
          </div>
        </div>
      `;
    }).join('');
  }

  // ----------------- SELECT & LOAD MATCH -----------------
  selectMatch(matchId) {
    window.SPORTS_DATA.currentMatchId = matchId;
    const match = window.SPORTS_DATA.matches.find(m => m.id === matchId);
    if (!match) return;

    this.renderTopTicker();
    this.renderMatchesSidebar();

    // Update Header Hero Banner
    this.updateMatchHeader(match);

    // Update Player
    window.sportsPlayer.loadMatchStream(match);

    // Render active tab content
    this.renderActiveTab(match);

    window.soundFX.playClick();
  }

  updateMatchHeader(match) {
    const titleEl = document.getElementById('match-header-title');
    const tourneyEl = document.getElementById('match-header-tournament');
    const venueEl = document.getElementById('match-header-venue');
    const statusBanner = document.getElementById('match-status-banner-text');

    if (titleEl) titleEl.textContent = `${match.teams.teamA.name} vs ${match.teams.teamB.name}`;
    if (tourneyEl) tourneyEl.textContent = `${this.getSportIcon(match.sport)} ${match.tournament}`;
    if (venueEl) venueEl.textContent = `📍 ${match.venue}`;
    if (statusBanner) statusBanner.textContent = match.matchStateSummary;
  }

  // ----------------- MATCH CENTER TABS -----------------
  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll('.match-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabId);
    });

    const views = ['commentary', 'scorecard', 'lineups', 'h2h', 'chat'];
    views.forEach(v => {
      const el = document.getElementById(`tab-view-${v}`);
      if (el) el.style.display = (v === tabId) ? 'block' : 'none';
    });

    const match = window.SPORTS_DATA.matches.find(m => m.id === window.SPORTS_DATA.currentMatchId);
    if (match) this.renderActiveTab(match);

    window.soundFX.playClick();
  }

  renderActiveTab(match) {
    if (this.activeTab === 'commentary') {
      window.commentaryManager.render(match);
    } else if (this.activeTab === 'scorecard') {
      window.scorecardManager.render(match);
    } else if (this.activeTab === 'lineups') {
      this.renderLineupsTab(match);
    } else if (this.activeTab === 'h2h') {
      this.renderH2HTab(match);
    } else if (this.activeTab === 'chat') {
      window.chatAndPolls.renderChat();
      window.chatAndPolls.renderPoll();
    }
  }

  renderLineupsTab(match) {
    const container = document.getElementById('tab-view-lineups');
    if (!container) return;

    if (!match.lineups) {
      container.innerHTML = `<div class="empty-state-card">Lineups & squads information will be updated closer to match time.</div>`;
      return;
    }

    if (match.sport === 'cricket') {
      container.innerHTML = `
        <div class="lineups-dual-container">
          <div class="lineup-column">
            <div class="lineup-col-header">
              <span class="team-badge-icon">${match.teams.teamA.badge}</span>
              <h4>${match.teams.teamA.name} Playing XI</h4>
            </div>
            <div class="lineup-player-list">
              ${match.lineups.teamA.map(p => `
                <div class="lineup-player-row">
                  <span class="player-num">#${p.num}</span>
                  <span class="player-fullname">${p.name}</span>
                  <span class="player-role-badge">${p.role}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="lineup-column">
            <div class="lineup-col-header">
              <span class="team-badge-icon">${match.teams.teamB.badge}</span>
              <h4>${match.teams.teamB.name} Playing XI</h4>
            </div>
            <div class="lineup-player-list">
              ${match.lineups.teamB.map(p => `
                <div class="lineup-player-row">
                  <span class="player-num">#${p.num}</span>
                  <span class="player-fullname">${p.name}</span>
                  <span class="player-role-badge">${p.role}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    } else {
      // Football uses scorecard manager lineup visualizer
      window.scorecardManager.render(match);
      container.innerHTML = document.querySelector('.lineups-section-wrapper')?.outerHTML || '<div class="empty-state-card">Lineups ready</div>';
    }
  }

  renderH2HTab(match) {
    const container = document.getElementById('tab-view-h2h');
    if (!container) return;

    const probA = match.winProbability ? match.winProbability.teamA : 60;
    const probB = match.winProbability ? match.winProbability.teamB : 40;

    container.innerHTML = `
      <div class="h2h-container">
        <!-- Win Probability Predictor -->
        <div class="win-prob-card">
          <div class="card-table-header">
            <h3>⚡ Live AI Win Predictor</h3>
            <span class="badge-accent">Dynamic Probability</span>
          </div>
          <div class="prob-labels-row">
            <div class="prob-team">
              <span class="team-badge">${match.teams.teamA.badge}</span>
              <strong>${match.teams.teamA.name}</strong>
              <span class="prob-pct-big">${probA}%</span>
            </div>
            <div class="prob-vs">VS</div>
            <div class="prob-team text-right">
              <span class="prob-pct-big">${probB}%</span>
              <strong>${match.teams.teamB.name}</strong>
              <span class="team-badge">${match.teams.teamB.badge}</span>
            </div>
          </div>
          <div class="prob-bar-track">
            <div class="prob-fill-a" style="width: ${probA}%"></div>
            <div class="prob-fill-b" style="width: ${probB}%"></div>
          </div>
        </div>

        <!-- Form Guide & Head-to-Head Records -->
        <div class="form-guide-card">
          <div class="card-table-header">
            <h3>📈 Recent Form Guide (Last 5 Games)</h3>
          </div>
          <div class="form-dual-rows">
            <div class="form-row-item">
              <span class="team-name">${match.teams.teamA.name}</span>
              <div class="form-badges">
                <span class="form-badge win">W</span>
                <span class="form-badge win">W</span>
                <span class="form-badge win">W</span>
                <span class="form-badge loss">L</span>
                <span class="form-badge win">W</span>
              </div>
            </div>
            <div class="form-row-item">
              <span class="team-name">${match.teams.teamB.name}</span>
              <div class="form-badges">
                <span class="form-badge win">W</span>
                <span class="form-badge loss">L</span>
                <span class="form-badge win">W</span>
                <span class="form-badge win">W</span>
                <span class="form-badge loss">L</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ----------------- SEARCH -----------------
  setupSearch() {
    const searchInput = document.getElementById('global-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      window.SPORTS_DATA.searchQuery = e.target.value.trim();
      this.renderMatchesSidebar();
    });
  }

  setupEventListeners() {
    // Sound FX Master Toggle
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const isEnabled = window.soundFX.toggle();
        soundBtn.classList.toggle('muted', !isEnabled);
        soundBtn.title = isEnabled ? 'Sound Effects Enabled' : 'Sound Effects Muted';
        soundBtn.innerHTML = isEnabled ? '🔊' : '🔇';
      });
    }
  }
}

window.sporetsApp = new SporetsApp();
window.addEventListener('DOMContentLoaded', () => {
  window.sporetsApp.init();
});
