// Comprehensive Scorecard Engine for all Sports (Cricket, Football, Basketball, Tennis, F1)
class ScorecardManager {
  constructor() {
    this.selectedInnings = 2; // For cricket: 1 or 2
  }

  render(match) {
    const container = document.getElementById('scorecard-content-area');
    if (!container) return;

    if (match.sport === 'cricket') {
      container.innerHTML = this.renderCricketScorecard(match);
    } else if (match.sport === 'football') {
      container.innerHTML = this.renderFootballScorecard(match);
    } else if (match.sport === 'basketball') {
      container.innerHTML = this.renderBasketballScorecard(match);
    } else if (match.sport === 'tennis') {
      container.innerHTML = this.renderTennisScorecard(match);
    } else if (match.sport === 'f1') {
      container.innerHTML = this.renderF1Scorecard(match);
    } else {
      container.innerHTML = `<div class="empty-state-card">Scorecard format loading for ${match.title}</div>`;
    }
  }

  // ----------------- CRICKET SCORECARD -----------------
  renderCricketScorecard(match) {
    const sc = match.scorecard;
    if (!sc) {
      return `<div class="empty-state-card">Match scorecard will update once match begins.</div>`;
    }

    const inn = this.selectedInnings === 1 ? sc.innings1 : sc.innings2;

    let battingRows = '';
    inn.batting.forEach(b => {
      const isNotOut = b.dismissal.toLowerCase().includes('not out');
      battingRows += `
        <tr class="${isNotOut ? 'batter-not-out' : ''}">
          <td class="player-cell">
            <span class="player-name">${b.name} ${isNotOut ? '<span class="status-asterisk">*</span>' : ''}</span>
            <span class="dismissal-info">${b.dismissal}</span>
          </td>
          <td class="stat-highlight"><strong>${b.runs}</strong></td>
          <td>${b.balls}</td>
          <td>${b.fours}</td>
          <td>${b.sixes}</td>
          <td class="stat-mono">${b.sr}</td>
        </tr>
      `;
    });

    let bowlingRows = '';
    inn.bowling.forEach(b => {
      bowlingRows += `
        <tr>
          <td class="player-cell"><span class="player-name">${b.name}</span></td>
          <td>${b.overs}</td>
          <td>${b.maidens}</td>
          <td>${b.runs}</td>
          <td class="stat-highlight"><strong>${b.wickets}</strong></td>
          <td class="stat-mono">${b.econ}</td>
          <td>${b.dots || '-'}</td>
        </tr>
      `;
    });

    let fowPills = '';
    if (inn.fallOfWickets && inn.fallOfWickets.length > 0) {
      inn.fallOfWickets.forEach(f => {
        fowPills += `
          <div class="fow-pill">
            <span class="fow-wkt">${f.wkt}</span>
            <span class="fow-player">${f.player} (${f.over})</span>
          </div>
        `;
      });
    }

    // Active On-Crease live summary if viewing innings 2
    let liveCreaseCard = '';
    if (match.liveOnCrease && this.selectedInnings === 2) {
      const c = match.liveOnCrease;
      liveCreaseCard = `
        <div class="live-crease-widget">
          <div class="crease-header">
            <span class="pulse-dot"></span>
            <span>CURRENT BATTERS ON CREASE</span>
          </div>
          <div class="crease-grid">
            <div class="crease-batter active-striker">
              <span class="striker-badge">STRIKER</span>
              <h4>${c.striker.name}</h4>
              <div class="crease-stats">
                <span class="big-runs">${c.striker.runs}*</span>
                <span class="stat-sub">(${c.striker.balls}b, ${c.striker.fours}x4, ${c.striker.sixes}x6, SR ${c.striker.sr})</span>
              </div>
            </div>
            <div class="crease-batter">
              <span class="nonstriker-badge">NON-STRIKER</span>
              <h4>${c.nonStriker.name}</h4>
              <div class="crease-stats">
                <span class="big-runs">${c.nonStriker.runs}*</span>
                <span class="stat-sub">(${c.nonStriker.balls}b, ${c.nonStriker.fours}x4, ${c.nonStriker.sixes}x6, SR ${c.nonStriker.sr})</span>
              </div>
            </div>
            <div class="crease-bowler">
              <span class="bowler-badge">BOWLING</span>
              <h4>${c.currentBowler.name}</h4>
              <div class="crease-stats">
                <span class="big-wickets">${c.currentBowler.wickets}-${c.currentBowler.runs}</span>
                <span class="stat-sub">(${c.currentBowler.overs} ov, Econ: ${c.currentBowler.econ})</span>
              </div>
              <div class="recent-balls-row">
                <span class="recent-label">This Over:</span>
                ${c.recentBalls.map(b => `<span class="ball-circle ${b === '6' ? 'ball-six' : b === '4' ? 'ball-four' : b === 'W' ? 'ball-wkt' : ''}">${b}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="scorecard-container cricket-sc">
        <!-- Innings Switcher Tabs -->
        <div class="innings-tabs-row">
          <button class="inn-tab ${this.selectedInnings === 2 ? 'active' : ''}" onclick="window.scorecardManager.switchInnings(2)">
            ${sc.innings2.teamName} <span class="tab-score">${sc.innings2.score}</span>
          </button>
          <button class="inn-tab ${this.selectedInnings === 1 ? 'active' : ''}" onclick="window.scorecardManager.switchInnings(1)">
            ${sc.innings1.teamName} <span class="tab-score">${sc.innings1.score}</span>
          </button>
        </div>

        ${liveCreaseCard}

        <!-- Batting Table -->
        <div class="scorecard-table-card">
          <div class="card-table-header">
            <h3>🏏 Batting</h3>
            <span class="badge-accent">${inn.score}</span>
          </div>
          <div class="table-responsive">
            <table class="sports-table">
              <thead>
                <tr>
                  <th>Batter</th>
                  <th>R</th>
                  <th>B</th>
                  <th>4s</th>
                  <th>6s</th>
                  <th>SR</th>
                </tr>
              </thead>
              <tbody>
                ${battingRows}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Fall of Wickets -->
        ${fowPills ? `
          <div class="fow-card">
            <h4>Fall of Wickets</h4>
            <div class="fow-flex-container">${fowPills}</div>
          </div>
        ` : ''}

        <!-- Bowling Table -->
        <div class="scorecard-table-card">
          <div class="card-table-header">
            <h3>🎯 Bowling</h3>
          </div>
          <div class="table-responsive">
            <table class="sports-table">
              <thead>
                <tr>
                  <th>Bowler</th>
                  <th>O</th>
                  <th>M</th>
                  <th>R</th>
                  <th>W</th>
                  <th>ECON</th>
                  <th>DOTS</th>
                </tr>
              </thead>
              <tbody>
                ${bowlingRows}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Match Info Summary -->
        <div class="match-info-meta-card">
          <h4>Match Information</h4>
          <div class="meta-row"><span>Toss</span><strong>${match.toss || 'N/A'}</strong></div>
          <div class="meta-row"><span>Venue</span><strong>${match.venue}</strong></div>
          <div class="meta-row"><span>Pitch Report</span><strong>${match.pitchReport || 'Balanced sports pitch'}</strong></div>
        </div>
      </div>
    `;
  }

  // ----------------- FOOTBALL SCORECARD -----------------
  renderFootballScorecard(match) {
    const stats = match.footballStats;
    const goals = match.goalsList || [];

    let goalsHtml = goals.map(g => `
      <div class="goal-item-pill ${g.team}">
        <span class="goal-icon">⚽</span>
        <span class="goal-min">${g.minute}</span>
        <span class="goal-player"><strong>${g.player}</strong> (${g.assist ? 'ast. ' + g.assist : ''})</span>
      </div>
    `).join('');

    let statsHtml = '';
    if (stats) {
      const renderBar = (label, aVal, bVal, aNum, bNum) => {
        const total = (aNum + bNum) || 100;
        const pctA = Math.round((aNum / total) * 100);
        const pctB = 100 - pctA;
        return `
          <div class="stat-compare-item">
            <div class="stat-labels">
              <span class="stat-val-a">${aVal}</span>
              <span class="stat-title">${label}</span>
              <span class="stat-val-b">${bVal}</span>
            </div>
            <div class="stat-progress-bar">
              <div class="bar-fill-a" style="width: ${pctA}%"></div>
              <div class="bar-fill-b" style="width: ${pctB}%"></div>
            </div>
          </div>
        `;
      };

      statsHtml = `
        <div class="football-stats-card">
          <div class="card-table-header">
            <h3>📊 Match Statistics</h3>
            <div class="team-stat-legend">
              <span class="leg-a">${match.teams.teamA.short}</span>
              <span class="leg-b">${match.teams.teamB.short}</span>
            </div>
          </div>
          <div class="stats-bars-list">
            ${renderBar('Ball Possession', `${stats.possession[0]}%`, `${stats.possession[1]}%`, stats.possession[0], stats.possession[1])}
            ${renderBar('Expected Goals (xG)', stats.expectedGoals[0], stats.expectedGoals[1], parseFloat(stats.expectedGoals[0]), parseFloat(stats.expectedGoals[1]))}
            ${renderBar('Total Shots', stats.shotsTotal[0], stats.shotsTotal[1], stats.shotsTotal[0], stats.shotsTotal[1])}
            ${renderBar('Shots on Target', stats.shotsOnTarget[0], stats.shotsOnTarget[1], stats.shotsOnTarget[0], stats.shotsOnTarget[1])}
            ${renderBar('Corner Kicks', stats.corners[0], stats.corners[1], stats.corners[0], stats.corners[1])}
            ${renderBar('Fouls Committed', stats.fouls[0], stats.fouls[1], stats.fouls[0], stats.fouls[1])}
            ${renderBar('Yellow Cards', stats.yellowCards[0], stats.yellowCards[1], stats.yellowCards[0], stats.yellowCards[1])}
            ${renderBar('Passing Accuracy', stats.passesAccuracy[0], stats.passesAccuracy[1], parseInt(stats.passesAccuracy[0]), parseInt(stats.passesAccuracy[1]))}
          </div>
        </div>
      `;
    }

    // Lineups
    let lineupsHtml = '';
    if (match.lineups) {
      const renderTeamLineup = (teamObj, teamMeta) => {
        return `
          <div class="lineup-column">
            <div class="lineup-col-header">
              <span class="team-badge-icon">${teamMeta.badge}</span>
              <h4>${teamMeta.name}</h4>
              <span class="formation-tag">${teamObj.formation}</span>
            </div>
            <div class="lineup-player-list">
              ${teamObj.players.map(p => `
                <div class="lineup-player-row">
                  <span class="player-num">${p.num}</span>
                  <span class="player-pos-tag">${p.pos}</span>
                  <span class="player-fullname">${p.name}</span>
                  <span class="player-rating-badge ${p.rating >= 8.0 ? 'rating-stellar' : ''}">${p.rating}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      };

      lineupsHtml = `
        <div class="lineups-dual-container">
          ${renderTeamLineup(match.lineups.teamA, match.teams.teamA)}
          ${renderTeamLineup(match.lineups.teamB, match.teams.teamB)}
        </div>
      `;
    }

    return `
      <div class="scorecard-container football-sc">
        <!-- Goals Card -->
        <div class="goals-timeline-card">
          <div class="card-table-header">
            <h3>⚽ Goals & Key Events</h3>
            <span class="badge-accent">${match.teams.teamA.score} - ${match.teams.teamB.score} (${match.teams.teamB.subtext || '78\''})</span>
          </div>
          <div class="goals-flex-list">
            ${goalsHtml}
          </div>
        </div>

        ${statsHtml}

        <div class="lineups-section-wrapper">
          <h3 class="section-title">👥 Starting Lineups & Ratings</h3>
          ${lineupsHtml}
        </div>
      </div>
    `;
  }

  // ----------------- BASKETBALL SCORECARD -----------------
  renderBasketballScorecard(match) {
    let quartersHeader = '';
    let rowA = '';
    let rowB = '';

    if (match.quarters) {
      match.quarters.forEach(q => {
        quartersHeader += `<th>${q.name}</th>`;
        rowA += `<td>${q.teamA}</td>`;
        rowB += `<td>${q.teamB}</td>`;
      });
    }

    const renderBox = (players, teamShort) => {
      return `
        <div class="scorecard-table-card">
          <div class="card-table-header">
            <h3>🏀 ${teamShort} Box Score</h3>
          </div>
          <div class="table-responsive">
            <table class="sports-table">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>MIN</th>
                  <th>PTS</th>
                  <th>REB</th>
                  <th>AST</th>
                  <th>FG</th>
                  <th>3PT</th>
                </tr>
              </thead>
              <tbody>
                ${players.map(p => `
                  <tr>
                    <td class="player-cell"><strong>${p.name}</strong></td>
                    <td>${p.min}</td>
                    <td class="stat-highlight"><strong>${p.pts}</strong></td>
                    <td>${p.reb}</td>
                    <td>${p.ast}</td>
                    <td>${p.fg}</td>
                    <td>${p.threes}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    };

    return `
      <div class="scorecard-container basketball-sc">
        <div class="scorecard-table-card">
          <div class="card-table-header">
            <h3>Quarter-by-Quarter Breakdown</h3>
            <span class="badge-accent">${match.teams.teamA.score} - ${match.teams.teamB.score}</span>
          </div>
          <table class="sports-table quarter-table">
            <thead>
              <tr>
                <th>Team</th>
                ${quartersHeader}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>${match.teams.teamA.short}</strong></td>
                ${rowA}
                <td class="stat-highlight"><strong>${match.teams.teamA.score}</strong></td>
              </tr>
              <tr>
                <td><strong>${match.teams.teamB.short}</strong></td>
                ${rowB}
                <td class="stat-highlight"><strong>${match.teams.teamB.score}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        ${match.boxscore ? renderBox(match.boxscore.teamA, match.teams.teamA.short) : ''}
        ${match.boxscore ? renderBox(match.boxscore.teamB, match.teams.teamB.short) : ''}
      </div>
    `;
  }

  // ----------------- TENNIS SCORECARD -----------------
  renderTennisScorecard(match) {
    let setsHeaders = '';
    let setsA = '';
    let setsB = '';

    if (match.setsScore) {
      match.setsScore.forEach((s, idx) => {
        setsHeaders += `<th>${s.set}</th>`;
        setsA += `<td><strong>${s.teamA}</strong></td>`;
        setsB += `<td><strong>${s.teamB}</strong></td>`;
      });
    }

    return `
      <div class="scorecard-container tennis-sc">
        <div class="scorecard-table-card">
          <div class="card-table-header">
            <h3>🎾 Set Breakdown</h3>
            <span class="badge-accent">${match.teams.teamA.subtext}</span>
          </div>
          <table class="sports-table tennis-set-table">
            <thead>
              <tr>
                <th>Player</th>
                ${setsHeaders}
                <th>Sets Won</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>${match.teams.teamA.name}</strong></td>
                ${setsA}
                <td class="stat-highlight"><strong>${match.teams.teamA.score}</strong></td>
              </tr>
              <tr>
                <td><strong>${match.teams.teamB.name}</strong></td>
                ${setsB}
                <td class="stat-highlight"><strong>${match.teams.teamB.score}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        ${match.tennisStats ? `
          <div class="scorecard-table-card">
            <div class="card-table-header">
              <h3>🎾 Match Serving & Rally Statistics</h3>
            </div>
            <table class="sports-table">
              <thead>
                <tr>
                  <th>${match.teams.teamA.short}</th>
                  <th>Stat Category</th>
                  <th>${match.teams.teamB.short}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>${match.tennisStats.aces[0]}</td><td>Aces</td><td>${match.tennisStats.aces[1]}</td></tr>
                <tr><td>${match.tennisStats.doubleFaults[0]}</td><td>Double Faults</td><td>${match.tennisStats.doubleFaults[1]}</td></tr>
                <tr><td>${match.tennisStats.firstServePct[0]}</td><td>1st Serve %</td><td>${match.tennisStats.firstServePct[1]}</td></tr>
                <tr><td>${match.tennisStats.winners[0]}</td><td>Winners</td><td>${match.tennisStats.winners[1]}</td></tr>
                <tr><td>${match.tennisStats.unforcedErrors[0]}</td><td>Unforced Errors</td><td>${match.tennisStats.unforcedErrors[1]}</td></tr>
                <tr><td>${match.tennisStats.breakPointsWon[0]}</td><td>Break Points Won</td><td>${match.tennisStats.breakPointsWon[1]}</td></tr>
              </tbody>
            </table>
          </div>
        ` : ''}
      </div>
    `;
  }

  // ----------------- F1 SCORECARD -----------------
  renderF1Scorecard(match) {
    if (!match.f1Leaderboard) return '';
    return `
      <div class="scorecard-container f1-sc">
        <div class="scorecard-table-card">
          <div class="card-table-header">
            <h3>🏎️ Live Race Leaderboard</h3>
            <span class="badge-accent">${match.matchStateSummary.split('-')[0]}</span>
          </div>
          <table class="sports-table f1-leaderboard-table">
            <thead>
              <tr>
                <th>POS</th>
                <th>DRIVER</th>
                <th>TEAM</th>
                <th>GAP / INTERVAL</th>
                <th>TYRE</th>
                <th>PITS</th>
              </tr>
            </thead>
            <tbody>
              ${match.f1Leaderboard.map(r => `
                <tr class="${r.pos === '1' ? 'leader-row' : ''}">
                  <td class="pos-badge">P${r.pos}</td>
                  <td><strong>${r.driver}</strong> ${r.fastest ? '<span class="fastest-lap-badge">🟣 FASTEST</span>' : ''}</td>
                  <td>${r.team}</td>
                  <td class="stat-highlight">${r.gap}</td>
                  <td><span class="tyre-badge">${r.tyre}</span></td>
                  <td>${r.pit}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  switchInnings(innNum) {
    this.selectedInnings = innNum;
    const match = window.SPORTS_DATA.matches.find(m => m.id === window.SPORTS_DATA.currentMatchId);
    if (match) this.render(match);
  }
}

window.scorecardManager = new ScorecardManager();
