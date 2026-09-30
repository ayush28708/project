// Community Live Chat & Interactive Fan Polls
class ChatAndPolls {
  constructor() {
    this.userHasVoted = false;
  }

  init() {
    this.renderChat();
    this.renderPoll();
    this.setupChatInput();
  }

  renderChat() {
    const list = document.getElementById('chat-messages-container');
    if (!list) return;

    list.innerHTML = window.SPORTS_DATA.communityChat.map(c => `
      <div class="chat-message-row">
        <span class="chat-avatar">${c.avatar}</span>
        <div class="chat-msg-body">
          <div class="chat-msg-header">
            <span class="chat-username">${c.user}</span>
            <span class="chat-team-badge">${c.team}</span>
            ${c.isVip ? '<span class="vip-badge">PRO</span>' : ''}
            <span class="chat-time">${c.time}</span>
          </div>
          <p class="chat-msg-text">${c.text}</p>
        </div>
      </div>
    `).join('');

    list.scrollTop = list.scrollHeight;
  }

  setupChatInput() {
    const form = document.getElementById('chat-input-form');
    const input = document.getElementById('chat-text-input');
    if (!form || !input) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      const newMsg = {
        user: 'You',
        team: 'FAN',
        avatar: '⚡',
        text: text,
        time: 'Just now',
        isVip: true
      };

      window.SPORTS_DATA.communityChat.push(newMsg);
      input.value = '';
      this.renderChat();
      window.soundFX.playClick();
    });
  }

  renderPoll() {
    const container = document.getElementById('match-poll-container');
    if (!container) return;

    const poll = window.SPORTS_DATA.activePoll;
    const total = poll.votesTeamA + poll.votesTeamB;
    const pctA = Math.round((poll.votesTeamA / total) * 100);
    const pctB = 100 - pctA;

    container.innerHTML = `
      <div class="poll-card">
        <div class="poll-badge">LIVE MATCH POLL</div>
        <h4 class="poll-question">${poll.question}</h4>
        <div class="poll-options">
          <button class="poll-opt-btn ${this.userHasVoted ? 'voted' : ''}" onclick="window.chatAndPolls.vote('A')">
            <span class="poll-team-name">${poll.teamAName}</span>
            <span class="poll-pct">${pctA}%</span>
          </button>
          <button class="poll-opt-btn ${this.userHasVoted ? 'voted' : ''}" onclick="window.chatAndPolls.vote('B')">
            <span class="poll-team-name">${poll.teamBName}</span>
            <span class="poll-pct">${pctB}%</span>
          </button>
        </div>
        <div class="poll-bar">
          <div class="poll-bar-a" style="width: ${pctA}%"></div>
          <div class="poll-bar-b" style="width: ${pctB}%"></div>
        </div>
        <div class="poll-meta">
          <span>${total.toLocaleString()} total fan votes</span>
          <span>${this.userHasVoted ? '✅ Your vote is recorded' : 'Click to vote'}</span>
        </div>
      </div>
    `;
  }

  vote(option) {
    if (this.userHasVoted) return;
    this.userHasVoted = true;
    if (option === 'A') {
      window.SPORTS_DATA.activePoll.votesTeamA += 1;
    } else {
      window.SPORTS_DATA.activePoll.votesTeamB += 1;
    }
    window.soundFX.playCrowdRoar(1.2);
    this.renderPoll();
  }
}

window.chatAndPolls = new ChatAndPolls();
