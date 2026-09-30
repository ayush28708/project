// Comprehensive Sports Data Store for Sporets Live Hub
window.SPORTS_DATA = {
  currentSport: 'all',
  currentMatchId: 'cricket-1',
  filterStatus: 'all', // all | live | upcoming | finished
  searchQuery: '',

  sportsCategories: [
    { id: 'all', name: 'All Sports', icon: '🏆', count: 12 },
    { id: 'cricket', name: 'Cricket', icon: '🏏', count: 4 },
    { id: 'football', name: 'Football', icon: '⚽', count: 3 },
    { id: 'basketball', name: 'Basketball', icon: '🏀', count: 2 },
    { id: 'tennis', name: 'Tennis', icon: '🎾', count: 2 },
    { id: 'f1', name: 'Formula 1', icon: '🏎️', count: 1 }
  ],

  matches: [
    // ----------------- CRICKET 1: IND vs AUS (LIVE) -----------------
    {
      id: 'cricket-1',
      sport: 'cricket',
      title: 'ICC Men\'s T20 World Cup 2026 - 2nd Semi-Final',
      tournament: 'ICC T20 World Cup',
      status: 'live', // live | upcoming | finished
      venue: 'Melbourne Cricket Ground, Melbourne',
      date: 'Today, Live Broadcast',
      viewers: '2.4M',
      streamQuality: '4K Ultra HDR • 60fps',
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      alternateStreams: [
        { name: 'Server 1 - 4K Ultra (Direct)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
        { name: 'Server 2 - 1080p 60fps (Fast)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
        { name: 'Spider Cam / Pitch Tactical', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
        { name: 'Dugout & Player Cam', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4' }
      ],
      teams: {
        teamA: {
          id: 'ind',
          name: 'India',
          short: 'IND',
          badge: '🇮🇳',
          color: '#0085CA',
          score: '185/4',
          overs: '18.2 ov',
          crr: '10.09',
          target: 'Target: 181 (Won by 6 wkts)',
          badgeImg: 'assets/ind.svg'
        },
        teamB: {
          id: 'aus',
          name: 'Australia',
          short: 'AUS',
          badge: '🇦🇺',
          color: '#FFCD00',
          score: '180/7',
          overs: '20.0 ov',
          crr: '9.00',
          badgeImg: 'assets/aus.svg'
        }
      },
      matchStateSummary: 'India need 0 runs to win! India won by 6 wickets (with 10 balls remaining) to storm into the Final!',
      toss: 'India won the toss and elected to bowl first',
      pitchReport: 'Even bounce, slight dew in the outfield, lightning fast outfield. High scoring thriller.',
      winProbability: { teamA: 98, teamB: 2 },
      activeInnings: 2,

      // Live on-crease info
      liveOnCrease: {
        striker: { name: 'Hardik Pandya', runs: 42, balls: 19, fours: 3, sixes: 3, sr: '221.05' },
        nonStriker: { name: 'Rinku Singh', runs: 14, balls: 7, fours: 1, sixes: 1, sr: '200.00' },
        currentBowler: { name: 'Mitchell Starc', overs: '3.2', maidens: 0, runs: 38, wickets: 2, econ: '11.40' },
        recentBalls: ['1', '4', '1', '6', '2', '6']
      },

      scorecard: {
        innings1: {
          teamName: 'Australia Innings',
          score: '180/7 (20.0 Overs)',
          batting: [
            { name: 'Travis Head', dismissal: 'c Rohit b Bumrah', runs: 68, balls: 41, fours: 7, sixes: 4, sr: '165.85' },
            { name: 'David Warner', dismissal: 'c Pant b Arshdeep', runs: 18, balls: 14, fours: 2, sixes: 1, sr: '128.57' },
            { name: 'Mitchell Marsh (c)', dismissal: 'b Kuldeep Yadav', runs: 24, balls: 19, fours: 2, sixes: 1, sr: '126.32' },
            { name: 'Glenn Maxwell', dismissal: 'c Jadeja b Bumrah', runs: 38, balls: 21, fours: 3, sixes: 2, sr: '180.95' },
            { name: 'Marcus Stoinis', dismissal: 'c & b Hardik Pandya', runs: 12, balls: 9, fours: 1, sixes: 0, sr: '133.33' },
            { name: 'Tim David', dismissal: 'c Kohli b Arshdeep', runs: 9, balls: 8, fours: 1, sixes: 0, sr: '112.50' },
            { name: 'Matthew Wade (wk)', dismissal: 'not out', runs: 6, balls: 5, fours: 0, sixes: 0, sr: '120.00' },
            { name: 'Pat Cummins', dismissal: 'run out (Siraj/Pant)', runs: 2, balls: 3, fours: 0, sixes: 0, sr: '66.67' }
          ],
          bowling: [
            { name: 'Arshdeep Singh', overs: '4.0', maidens: 0, runs: 34, wickets: 2, econ: '8.50', dots: 11 },
            { name: 'Mohammed Siraj', overs: '4.0', maidens: 0, runs: 42, wickets: 0, econ: '10.50', dots: 8 },
            { name: 'Jasprit Bumrah', overs: '4.0', maidens: 0, runs: 21, wickets: 2, econ: '5.25', dots: 15 },
            { name: 'Hardik Pandya', overs: '4.0', maidens: 0, runs: 36, wickets: 1, econ: '9.00', dots: 9 },
            { name: 'Kuldeep Yadav', overs: '4.0', maidens: 0, runs: 41, wickets: 1, econ: '10.25', dots: 7 },
            { name: 'Ravindra Jadeja', overs: '0.0', maidens: 0, runs: 0, wickets: 0, econ: '0.00', dots: 0 }
          ],
          fallOfWickets: [
            { wkt: '1-38', player: 'David Warner', over: '4.1 ov' },
            { wkt: '2-89', player: 'Mitchell Marsh', over: '9.4 ov' },
            { wkt: '3-132', player: 'Travis Head', over: '14.2 ov' },
            { wkt: '4-159', player: 'Marcus Stoinis', over: '16.5 ov' },
            { wkt: '5-168', player: 'Glenn Maxwell', over: '17.6 ov' },
            { wkt: '6-174', player: 'Tim David', over: '18.4 ov' },
            { wkt: '7-180', player: 'Pat Cummins', over: '19.6 ov' }
          ]
        },
        innings2: {
          teamName: 'India Innings (Target 181)',
          score: '185/4 (18.2 Overs) - Won',
          batting: [
            { name: 'Rohit Sharma (c)', dismissal: 'c Maxwell b Cummins', runs: 44, balls: 26, fours: 5, sixes: 2, sr: '169.23' },
            { name: 'Virat Kohli', dismissal: 'c Warner b Starc', runs: 54, balls: 36, fours: 6, sixes: 1, sr: '150.00' },
            { name: 'Rishabh Pant (wk)', dismissal: 'c Wade b Hazlewood', runs: 16, balls: 11, fours: 2, sixes: 0, sr: '145.45' },
            { name: 'Suryakumar Yadav', dismissal: 'c David b Zampa', runs: 28, balls: 14, fours: 3, sixes: 2, sr: '200.00' },
            { name: 'Hardik Pandya', dismissal: 'not out', runs: 42, balls: 19, fours: 3, sixes: 3, sr: '221.05' },
            { name: 'Rinku Singh', dismissal: 'not out', runs: 14, balls: 7, fours: 1, sixes: 1, sr: '200.00' }
          ],
          bowling: [
            { name: 'Mitchell Starc', overs: '3.2', maidens: 0, runs: 38, wickets: 2, econ: '11.40', dots: 6 },
            { name: 'Josh Hazlewood', overs: '4.0', maidens: 0, runs: 32, wickets: 1, econ: '8.00', dots: 10 },
            { name: 'Pat Cummins', overs: '4.0', maidens: 0, runs: 36, wickets: 1, econ: '9.00', dots: 9 },
            { name: 'Adam Zampa', overs: '4.0', maidens: 0, runs: 44, wickets: 1, econ: '11.00', dots: 7 },
            { name: 'Glenn Maxwell', overs: '2.0', maidens: 0, runs: 22, wickets: 0, econ: '11.00', dots: 3 },
            { name: 'Marcus Stoinis', overs: '1.0', maidens: 0, runs: 13, wickets: 0, econ: '13.00', dots: 1 }
          ],
          fallOfWickets: [
            { wkt: '1-62', player: 'Rohit Sharma', over: '6.2 ov' },
            { wkt: '2-94', player: 'Rishabh Pant', over: '9.5 ov' },
            { wkt: '3-138', player: 'Virat Kohli', over: '14.1 ov' },
            { wkt: '4-152', player: 'Suryakumar Yadav', over: '15.4 ov' }
          ]
        }
      },

      commentary: [
        {
          over: '18.2',
          type: 'six',
          title: 'SIX! INDIA ARE IN THE FINAL!',
          text: 'Mitchell Starc bowls full on middle, Hardik Pandya clears his front leg and sends it soaring 94 meters over long-on! What an emphatic finish! The MCG erupts into a sea of blue and firecrackers! Hardik punches the air with a roaring grin! India chase down 181 with 10 balls to spare!',
          audioTag: 'Crowd Roar & Boundary',
          badge: 'MATCH FINISHER',
          time: 'Just now'
        },
        {
          over: '18.1',
          type: 'boundary',
          title: 'FOUR! Smashed with authority!',
          text: 'Starc tries the yorker, misses by an inch and Pandya drills it past extra cover! Pierces the boundary like a laser beam. The scores are level!',
          audioTag: 'Bat Crack',
          badge: '4 RUNS',
          time: '1 min ago'
        },
        {
          over: '17.6',
          type: 'run',
          title: '1 Run',
          text: 'Cummins serves a dipping slower bouncer, Rinku Singh hops back and dabs it into the vacant point pocket for an easy single. Retains the strike.',
          audioTag: 'Single',
          badge: '1 RUN',
          time: '2 mins ago'
        },
        {
          over: '17.5',
          type: 'six',
          title: 'SIX! RINKU MAGIC AT MCG!',
          text: 'Cummins misses the blockhole, slot delivery and Rinku Singh swings through the line with immaculate timing! Flat and brutal over deep square leg into the 2nd tier! What clutch hitting!',
          audioTag: 'Crowd Roar',
          badge: '6 RUNS',
          time: '3 mins ago'
        },
        {
          over: '17.4',
          type: 'boundary',
          title: 'FOUR! Inventive and audacious!',
          text: 'Rinku ramps Cummins over short third man. Deliberately opened the bat face and used the pace to glide it to the rope.',
          audioTag: 'Boundary',
          badge: '4 RUNS',
          time: '3 mins ago'
        },
        {
          over: '16.5',
          type: 'event',
          title: '2 Runs - Great sprint between wickets',
          text: 'Pandya turns Zampa off his pads towards deep midwicket, called early for two and Rinku responds with high octane speed to beat the throw easily.',
          badge: '2 RUNS',
          time: '5 mins ago'
        },
        {
          over: '15.4',
          type: 'wicket',
          title: 'WICKET! SKY departs trying to clear long-off!',
          text: 'Adam Zampa gets the big fish! Full, floated outside off, Suryakumar Yadav looks for the inside-out aerial loft, doesn\'t get under it enough and Tim David takes a safe reverse cup at long off boundary! SKY c David b Zampa 28 (14b).',
          audioTag: 'Wicket Alarm',
          badge: 'OUT',
          time: '8 mins ago'
        },
        {
          over: '14.1',
          type: 'wicket',
          title: 'WICKET! King Kohli caught behind!',
          text: 'Starc strikes in his return spell! Angled across on a good length, Kohli pushes at it with hard hands, gets a faint outside feather through to Matthew Wade who leaps to his right to hold on! A masterclass 54 comes to an end. Kohli receives a standing ovation from 90,000 fans!',
          badge: 'OUT',
          time: '12 mins ago'
        },
        {
          over: '12.3',
          type: 'boundary',
          title: 'FIFTY FOR VIRAT KOHLI!',
          text: 'Pushes Hazlewood through mid-off, punches the air and raises the bat! 39th T20I half-century for the run machine in World Cup knockouts!',
          badge: '50 MILESTONE',
          time: '16 mins ago'
        }
      ],

      lineups: {
        teamA: [
          { name: 'Rohit Sharma', role: 'Captain / Batter', num: 45 },
          { name: 'Virat Kohli', role: 'Top Order Batter', num: 18 },
          { name: 'Rishabh Pant', role: 'Wicketkeeper', num: 17 },
          { name: 'Suryakumar Yadav', role: 'Batter (Vice Captain)', num: 63 },
          { name: 'Hardik Pandya', role: 'All-Rounder', num: 33 },
          { name: 'Rinku Singh', role: 'Finisher', num: 35 },
          { name: 'Ravindra Jadeja', role: 'All-Rounder', num: 8 },
          { name: 'Kuldeep Yadav', role: 'Wrist Spinner', num: 23 },
          { name: 'Arshdeep Singh', role: 'Fast Bowler', num: 2 },
          { name: 'Jasprit Bumrah', role: 'Fast Bowler', num: 93 },
          { name: 'Mohammed Siraj', role: 'Fast Bowler', num: 73 }
        ],
        teamB: [
          { name: 'Travis Head', role: 'Opening Batter', num: 62 },
          { name: 'David Warner', role: 'Opening Batter', num: 31 },
          { name: 'Mitchell Marsh', role: 'Captain / Batter', num: 8 },
          { name: 'Glenn Maxwell', role: 'All-Rounder', num: 32 },
          { name: 'Marcus Stoinis', role: 'All-Rounder', num: 17 },
          { name: 'Tim David', role: 'Finisher', num: 85 },
          { name: 'Matthew Wade', role: 'Wicketkeeper', num: 13 },
          { name: 'Pat Cummins', role: 'Fast Bowler', num: 30 },
          { name: 'Mitchell Starc', role: 'Fast Bowler', num: 56 },
          { name: 'Adam Zampa', role: 'Leg Spinner', num: 88 },
          { name: 'Josh Hazlewood', role: 'Fast Bowler', num: 38 }
        ]
      }
    },

    // ----------------- FOOTBALL 1: REAL MADRID vs MAN CITY (LIVE) -----------------
    {
      id: 'football-1',
      sport: 'football',
      title: 'UEFA Champions League - Quarter-Final 2nd Leg',
      tournament: 'UEFA Champions League',
      status: 'live',
      venue: 'Santiago Bernabéu, Madrid',
      date: 'Today, Live Broadcast',
      viewers: '3.8M',
      streamQuality: '1080p 60fps Ultra HD',
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      alternateStreams: [
        { name: 'UCL Main Feed (English)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
        { name: 'Tactical Drone View', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
        { name: 'Dugout & Ancelotti Cam', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' }
      ],
      teams: {
        teamA: {
          id: 'rma',
          name: 'Real Madrid',
          short: 'RMA',
          badge: '👑',
          color: '#00529F',
          score: '2',
          subtext: 'Agg: 5 - 5 (78\')',
          badgeImg: 'assets/rma.svg'
        },
        teamB: {
          id: 'mci',
          name: 'Manchester City',
          short: 'MCI',
          badge: '🦅',
          color: '#6CABDD',
          score: '2',
          subtext: '78\' 2nd Half',
          badgeImg: 'assets/mci.svg'
        }
      },
      matchStateSummary: '78\' - LEVEL! Bellingham equalized in the 71st minute! Pulsating Champions League drama at the Bernabéu!',
      winProbability: { teamA: 52, teamB: 48 },

      footballStats: {
        possession: [48, 52],
        expectedGoals: ['1.92', '2.15'],
        shotsTotal: [15, 17],
        shotsOnTarget: [6, 8],
        corners: [5, 7],
        fouls: [11, 9],
        yellowCards: [2, 1],
        offsides: [2, 3],
        passesAccuracy: ['87%', '91%']
      },

      goalsList: [
        { team: 'rma', player: 'Vinícius Júnior', minute: '12\'', assist: 'Valverde' },
        { team: 'mci', player: 'Kevin De Bruyne', minute: '36\'', assist: 'Bernardo Silva' },
        { team: 'mci', player: 'Erling Haaland', minute: '54\'', assist: 'Foden' },
        { team: 'rma', player: 'Jude Bellingham', minute: '71\'', assist: 'Rodrygo' }
      ],

      commentary: [
        {
          over: '78\'',
          type: 'event',
          title: '78\' - WHAT A SAVE BY COURTOIS!',
          text: 'De Bruyne whips a devastating inswinging free kick towards the far post. Haaland rises like a colossus and powers a header downward, but Courtois reflexively claws it off the goal line with fingertip wonder! Corner for Manchester City!',
          badge: 'BIG CHANCE',
          time: 'Just now'
        },
        {
          over: '75\'',
          type: 'event',
          title: '75\' - Substitution Real Madrid',
          text: 'Luka Modrić comes on to thunderous applause replacing Toni Kroos. Experience to control the midfield tempo.',
          badge: 'SUB',
          time: '3 mins ago'
        },
        {
          over: '71\'',
          type: 'goal',
          title: '71\' - GOOOOALLL! JUDE BELLINGHAM! 2-2!',
          text: 'THE BERNABÉU EXPLODES! Rodrygo glides past Gvardiol down the right channel and cuts a razor-sharp ball back across the penalty box. Jude Bellingham arrives with surging momentum and side-foots it into the roof of the net! Open arms celebration in front of the South Stand!',
          badge: 'GOAL ⚽',
          time: '7 mins ago'
        },
        {
          over: '64\'',
          type: 'card',
          title: '64\' - Yellow Card for Rüdiger',
          text: 'Tactical foul right on the center circle. Rüdiger tugs Haaland\'s shirt as City mounted a 3-on-2 counterattack. Clear booking.',
          badge: 'YELLOW CARD 🟨',
          time: '14 mins ago'
        },
        {
          over: '54\'',
          type: 'goal',
          title: '54\' - GOOOOALLL! ERLING HAALAND STRIKES!',
          text: 'City take the lead! Phil Foden with magical footwork between lines, slips Haaland through on goal. One touch to settle, second touch a venomous left-foot laser into the bottom corner!',
          badge: 'GOAL ⚽',
          time: '24 mins ago'
        },
        {
          over: '36\'',
          type: 'goal',
          title: '36\' - GOOOOALLL! KEVIN DE BRUYNE MAGIC!',
          text: 'Pure genius from the Belgian maestro! 25 yards out, unleashes a curling thunderbolt that dips right into the top postage stamp corner! Unstoppable!',
          badge: 'GOAL ⚽',
          time: '42 mins ago'
        },
        {
          over: '12\'',
          type: 'goal',
          title: '12\' - GOOOOALLL! VINÍCIUS JÚNIOR LIGHTNING BREAK!',
          text: 'Real Madrid strike first on the break! Valverde hits a 60-yard diagonal, Vini Jr controls on the chest, burns past Kyle Walker with sheer supersonic pace and curls it past Ederson!',
          badge: 'GOAL ⚽',
          time: '66 mins ago'
        }
      ],

      lineups: {
        teamA: {
          formation: '4-3-1-2',
          players: [
            { name: 'Thibaut Courtois', pos: 'GK', num: 1, rating: 8.2 },
            { name: 'Dani Carvajal', pos: 'RB', num: 2, rating: 7.1 },
            { name: 'Antonio Rüdiger', pos: 'CB', num: 22, rating: 7.4 },
            { name: 'Éder Militão', pos: 'CB', num: 3, rating: 7.2 },
            { name: 'Ferland Mendy', pos: 'LB', num: 23, rating: 7.0 },
            { name: 'Federico Valverde', pos: 'CM', num: 15, rating: 8.0 },
            { name: 'Eduardo Camavinga', pos: 'CDM', num: 12, rating: 7.6 },
            { name: 'Toni Kroos', pos: 'CM', num: 8, rating: 7.8 },
            { name: 'Jude Bellingham', pos: 'CAM', num: 5, rating: 8.8 },
            { name: 'Rodrygo', pos: 'ST', num: 11, rating: 7.9 },
            { name: 'Vinícius Júnior', pos: 'ST', num: 7, rating: 8.6 }
          ]
        },
        teamB: {
          formation: '4-1-4-1',
          players: [
            { name: 'Ederson', pos: 'GK', num: 31, rating: 7.3 },
            { name: 'Kyle Walker', pos: 'RB', num: 2, rating: 7.2 },
            { name: 'Rúben Dias', pos: 'CB', num: 3, rating: 7.5 },
            { name: 'Manuel Akanji', pos: 'CB', num: 25, rating: 7.0 },
            { name: 'Josko Gvardiol', pos: 'LB', num: 24, rating: 7.3 },
            { name: 'Rodri', pos: 'CDM', num: 16, rating: 8.4 },
            { name: 'Bernardo Silva', pos: 'RM', num: 20, rating: 8.1 },
            { name: 'Kevin De Bruyne', pos: 'CAM', num: 17, rating: 8.9 },
            { name: 'Phil Foden', pos: 'CAM', num: 47, rating: 8.3 },
            { name: 'Jack Grealish', pos: 'LM', num: 10, rating: 7.4 },
            { name: 'Erling Haaland', pos: 'ST', num: 9, rating: 8.5 }
          ]
        }
      }
    },

    // ----------------- BASKETBALL 1: LAKERS vs WARRIORS (LIVE) -----------------
    {
      id: 'basketball-1',
      sport: 'basketball',
      title: 'NBA Western Conference - Primetime Showdown',
      tournament: 'NBA Regular Season',
      status: 'live',
      venue: 'Crypto.com Arena, Los Angeles',
      date: 'Today, Live Broadcast',
      viewers: '1.9M',
      streamQuality: '1080p 60fps',
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
      alternateStreams: [
        { name: 'ESPN Broadcast 1', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
        { name: 'Courtside VIP Cam', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
      ],
      teams: {
        teamA: {
          id: 'lal',
          name: 'Los Angeles Lakers',
          short: 'LAL',
          badge: '🏀',
          color: '#552583',
          score: '112',
          subtext: 'Q4 2:15 Left',
          badgeImg: 'assets/lal.svg'
        },
        teamB: {
          id: 'gsw',
          name: 'Golden State Warriors',
          short: 'GSW',
          badge: '🌉',
          color: '#1D428A',
          score: '108',
          subtext: '4th Quarter',
          badgeImg: 'assets/gsw.svg'
        }
      },
      matchStateSummary: 'Q4 2:15 remaining - Lakers lead by 4! LeBron James has 34 PTS, Steph Curry keeping Warriors alive with 38 PTS!',
      quarters: [
        { name: 'Q1', teamA: 28, teamB: 26 },
        { name: 'Q2', teamA: 31, teamB: 33 },
        { name: 'Q3', teamA: 26, teamB: 24 },
        { name: 'Q4', teamA: 27, teamB: 25 }
      ],
      boxscore: {
        teamA: [
          { name: 'LeBron James', pts: 34, reb: 9, ast: 11, fg: '13-21', threes: '4-7', min: '36' },
          { name: 'Anthony Davis', pts: 26, reb: 15, ast: 4, fg: '11-18', threes: '0-1', min: '34' },
          { name: 'Austin Reaves', pts: 18, reb: 4, ast: 7, fg: '6-12', threes: '3-6', min: '31' },
          { name: 'D\'Angelo Russell', pts: 16, reb: 3, ast: 6, fg: '6-14', threes: '4-9', min: '29' },
          { name: 'Rui Hachimura', pts: 12, reb: 6, ast: 1, fg: '5-9', threes: '2-4', min: '25' }
        ],
        teamB: [
          { name: 'Stephen Curry', pts: 38, reb: 5, ast: 8, fg: '13-24', threes: '8-15', min: '37' },
          { name: 'Klay Thompson', pts: 21, reb: 4, ast: 2, fg: '8-17', threes: '5-11', min: '33' },
          { name: 'Jonathan Kuminga', pts: 19, reb: 7, ast: 3, fg: '7-13', threes: '1-3', min: '28' },
          { name: 'Draymond Green', pts: 8, reb: 10, ast: 9, fg: '3-6', threes: '1-2', min: '32' },
          { name: 'Andrew Wiggins', pts: 14, reb: 6, ast: 2, fg: '5-11', threes: '2-5', min: '29' }
        ]
      },
      commentary: [
        {
          over: '2:15 Q4',
          type: 'event',
          title: 'LEBRON POSTER SLAM IN TRANSITION!',
          text: 'Davis swats Kuminga at the rim! LeBron pushes the break all by himself, takes off from inside the free throw line and hammers it down over two defenders with two hands! Timeout Warriors! Lakers up 112-108!',
          badge: 'DUNK 🔥',
          time: 'Just now'
        },
        {
          over: '2:48 Q4',
          type: 'event',
          title: 'CURRY FROM WAY DOWNTOWN!',
          text: 'Steph Curry off the screen, pulls up from 32 feet out... BANG! Absolutely cold-blooded! That is his 8th three-pointer of the night!',
          badge: '3-POINTER 🎯',
          time: '1 min ago'
        },
        {
          over: '3:20 Q4',
          type: 'event',
          title: 'AD blocks Green',
          text: 'Draymond tries a floater in the paint, but Anthony Davis met him at the summit with a resounding rejection out of bounds.',
          badge: 'BLOCK 🛡️',
          time: '2 mins ago'
        }
      ]
    },

    // ----------------- TENNIS 1: ALCARAZ vs SINNER (LIVE) -----------------
    {
      id: 'tennis-1',
      sport: 'tennis',
      title: 'Wimbledon Men\'s Singles Final 2026',
      tournament: 'Wimbledon Championships',
      status: 'live',
      venue: 'Centre Court, All England Club, London',
      date: 'Today, Live Broadcast',
      viewers: '1.6M',
      streamQuality: '1080p 60fps Grass Court HDR',
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      alternateStreams: [
        { name: 'Centre Court Broadcast 1', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { name: 'Hawk-Eye 3D Cam', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' }
      ],
      teams: {
        teamA: {
          id: 'alc',
          name: 'Carlos Alcaraz',
          short: 'ALC',
          badge: '🇪🇸',
          color: '#E02020',
          score: '2',
          subtext: '6-4, 3-6, 7-6(5), 4-4 (30-40)',
          badgeImg: 'assets/alc.svg'
        },
        teamB: {
          id: 'sin',
          name: 'Jannik Sinner',
          short: 'SIN',
          badge: '🇮🇹',
          color: '#008C45',
          score: '1',
          subtext: 'Set 4, Game 9 Serving',
          badgeImg: 'assets/sin.svg'
        }
      },
      matchStateSummary: 'Set 4: 4-4 (30-40) - BREAK POINT for Alcaraz! Sinner serving in a monumental Centre Court epic!',
      setsScore: [
        { set: 'Set 1', teamA: '6', teamB: '4' },
        { set: 'Set 2', teamA: '3', teamB: '6' },
        { set: 'Set 3', teamA: '7 (7)', teamB: '6 (5)' },
        { set: 'Set 4', teamA: '4', teamB: '4', currentPoint: '30 - 40 (Break Pt)' }
      ],
      tennisStats: {
        aces: ['14', '17'],
        doubleFaults: ['2', '3'],
        firstServePct: ['68%', '65%'],
        winners: ['48', '51'],
        unforcedErrors: ['28', '31'],
        breakPointsWon: ['3/8', '2/6'],
        netPointsWon: ['24/32', '18/27']
      },
      commentary: [
        {
          over: 'Set 4 (4-4)',
          type: 'event',
          title: '30-40: INCREDIBLE 28-SHOT RALLY!',
          text: 'Sensational court coverage from both titans! Sinner corners Alcaraz with a devastating inside-out forehand, but Alcaraz slides into a squash-shot forehand passing winner down the line! Break point Alcaraz!',
          badge: 'BREAK POINT ⚡',
          time: 'Just now'
        },
        {
          over: 'Set 4 (4-4)',
          type: 'event',
          title: '30-30: Sinner Ace out wide',
          text: '131 mph bullet on the painted chalk out wide. Alcaraz lunges but cannot get racket on it.',
          badge: 'ACE 🎾',
          time: '2 mins ago'
        },
        {
          over: 'Set 4 (4-3)',
          type: 'event',
          title: 'Alcaraz holds to love',
          text: 'Four rapid first serves, backed by a clinical drop shot-lob combo. Holds easily.',
          badge: 'GAME HOLD',
          time: '5 mins ago'
        }
      ]
    },

    // ----------------- FORMULA 1: MONACO GRAND PRIX (LIVE) -----------------
    {
      id: 'f1-1',
      sport: 'f1',
      title: 'Formula 1 Grand Prix de Monaco 2026',
      tournament: 'Formula 1 World Championship',
      status: 'live',
      venue: 'Circuit de Monaco, Monte Carlo',
      date: 'Today, Live Broadcast',
      viewers: '2.1M',
      streamQuality: '4K Ultra 60fps Onboard',
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      alternateStreams: [
        { name: 'World Feed 4K', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
        { name: 'Max Verstappen Onboard', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
        { name: 'Charles Leclerc Onboard', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
      ],
      teams: {
        teamA: {
          id: 'rb',
          name: 'Red Bull Racing',
          short: 'RBR',
          badge: '🏎️',
          color: '#0600EF',
          score: 'P1',
          subtext: 'Verstappen (Leader)',
          badgeImg: 'assets/rb.svg'
        },
        teamB: {
          id: 'fer',
          name: 'Ferrari',
          short: 'FER',
          badge: '🐎',
          color: '#E80020',
          score: 'P2',
          subtext: 'Leclerc (+1.412s)',
          badgeImg: 'assets/fer.svg'
        }
      },
      matchStateSummary: 'Lap 58 / 78 - Verstappen leads by 1.4s! Leclerc hunting him through the Swimming Pool chicane on fresher Hard tyres!',
      f1Leaderboard: [
        { pos: '1', driver: 'Max Verstappen', team: 'Red Bull', gap: 'LEADER', tyre: 'HARD (32 laps)', pit: 1, fastest: false },
        { pos: '2', driver: 'Charles Leclerc', team: 'Ferrari', gap: '+1.412s', tyre: 'HARD (18 laps)', pit: 1, fastest: true },
        { pos: '3', driver: 'Lewis Hamilton', team: 'Ferrari', gap: '+5.620s', tyre: 'MEDIUM (21 laps)', pit: 1, fastest: false },
        { pos: '4', driver: 'Lando Norris', team: 'McLaren', gap: '+7.115s', tyre: 'HARD (25 laps)', pit: 1, fastest: false },
        { pos: '5', driver: 'George Russell', team: 'Mercedes', gap: '+12.890s', tyre: 'HARD (28 laps)', pit: 1, fastest: false },
        { pos: '6', driver: 'Oscar Piastri', team: 'McLaren', gap: '+15.200s', tyre: 'MEDIUM (15 laps)', pit: 2, fastest: false }
      ],
      commentary: [
        {
          over: 'Lap 58',
          type: 'event',
          title: 'Lap 58 - Leclerc within DRS range!',
          text: 'Leclerc cuts the gap down to 0.890 seconds heading into the tunnel! Verstappen reports graining on his front-left tyre over the team radio: "Front tyres are beginning to vibrate".',
          badge: 'DRS ACTIVE 🚀',
          time: 'Just now'
        },
        {
          over: 'Lap 54',
          type: 'event',
          title: 'Fastest Lap by Charles Leclerc: 1:12.421',
          text: 'Purple in sector 1 and sector 3! Leclerc lights up the timing screens in front of his home crowd!',
          badge: 'PURPLE LAP 🟣',
          time: '4 mins ago'
        },
        {
          over: 'Lap 48',
          type: 'event',
          title: 'Yellow Flag in Sector 2 cleared',
          text: 'Perez had a brief lock-up at Mirabeau, reversed and rejoined safely without damage.',
          badge: 'YELLOW FLAG',
          time: '12 mins ago'
        }
      ]
    },

    // ----------------- UPCOMING & OTHER MATCHES -----------------
    {
      id: 'cricket-2',
      sport: 'cricket',
      title: 'England vs Pakistan - 3rd Test, Day 4',
      tournament: 'Test Series 2026',
      status: 'live',
      venue: 'Lord\'s Cricket Ground, London',
      date: 'Today, Day 4',
      viewers: '850K',
      streamQuality: '1080p 50fps',
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      teams: {
        teamA: { id: 'eng', name: 'England', short: 'ENG', badge: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '#002B49', score: '428 & 85/1', subtext: 'Target: 215' },
        teamB: { id: 'pak', name: 'Pakistan', short: 'PAK', badge: '🇵🇰', color: '#006629', score: '312 & 240', subtext: 'ENG need 130 to win' }
      },
      matchStateSummary: 'England need 130 runs with 9 wickets in hand. Joe Root 42*, Zak Crawley 36*.',
      commentary: [
        { over: '24.1', type: 'boundary', title: 'Root creams it through cover', text: 'Classic Joe Root punch off the backfoot for four.', badge: '4 RUNS', time: '5 mins ago' }
      ]
    },
    {
      id: 'football-2',
      sport: 'football',
      title: 'Arsenal vs Liverpool - Premier League Super Sunday',
      tournament: 'Premier League',
      status: 'live',
      venue: 'Emirates Stadium, London',
      date: 'Today, Live',
      viewers: '2.9M',
      streamQuality: '4K Ultra HDR',
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      teams: {
        teamA: { id: 'ars', name: 'Arsenal', short: 'ARS', badge: '🔴', color: '#EF0107', score: '1', subtext: 'Saka 21\'' },
        teamB: { id: 'liv', name: 'Liverpool', short: 'LIV', badge: '🦅', color: '#C8102E', score: '0', subtext: '41\' 1st Half' }
      },
      matchStateSummary: '41\' - Arsenal 1 - 0 Liverpool. Saka scored a solo curler in the 21st minute.',
      commentary: [
        { over: '41\'', type: 'event', title: 'Salah shot deflected', text: 'Saliba makes a crucial block to preserve Arsenal\'s lead.', badge: 'BLOCK', time: '1 min ago' }
      ]
    },
    {
      id: 'cricket-3',
      sport: 'cricket',
      title: 'South Africa vs West Indies - 1st ODI',
      tournament: 'ODI Bilateral Series',
      status: 'upcoming',
      venue: 'SuperSport Park, Centurion',
      date: 'Starts in 2 hours (18:30 GMT)',
      viewers: 'Upcoming',
      streamQuality: '1080p 60fps',
      teams: {
        teamA: { id: 'sa', name: 'South Africa', short: 'SA', badge: '🇿🇦', color: '#007A3D', score: 'Upcoming', subtext: 'Starts 18:30 GMT' },
        teamB: { id: 'wi', name: 'West Indies', short: 'WI', badge: '🌴', color: '#7B002C', score: 'Upcoming', subtext: 'Starts 18:30 GMT' }
      },
      matchStateSummary: 'Match begins at 18:30 GMT. Toss scheduled in 1 hour 30 mins.',
      commentary: []
    },
    {
      id: 'football-3',
      sport: 'football',
      title: 'Barcelona vs Paris Saint-Germain',
      tournament: 'UEFA Champions League',
      status: 'finished',
      venue: 'Estadi Olímpic Lluís Companys, Barcelona',
      date: 'Full Time Result',
      viewers: 'Finished',
      streamQuality: 'Replay Available',
      teams: {
        teamA: { id: 'bar', name: 'Barcelona', short: 'BAR', badge: '🔵🔴', color: '#004D98', score: '3', subtext: 'Full Time' },
        teamB: { id: 'psg', name: 'Paris Saint-Germain', short: 'PSG', badge: '🗼', color: '#002B49', score: '2', subtext: 'Full Time' }
      },
      matchStateSummary: 'Full Time: Barcelona 3 - 2 PSG. Lewandowski brace and Yamal wonder goal seal victory.',
      commentary: []
    },
    {
      id: 'tennis-2',
      sport: 'tennis',
      title: 'Novak Djokovic vs Alexander Zverev - Semi-Final',
      tournament: 'Wimbledon Championships',
      status: 'finished',
      venue: 'Centre Court, London',
      date: 'Completed',
      viewers: 'Finished',
      streamQuality: 'Full Match Replay',
      teams: {
        teamA: { id: 'djo', name: 'Novak Djokovic', short: 'DJO', badge: '🇷🇸', color: '#0C4076', score: '3', subtext: 'Winner (6-3, 7-6, 6-4)' },
        teamB: { id: 'zve', name: 'Alexander Zverev', short: 'ZVE', badge: '🇩🇪', color: '#000000', score: '0', subtext: 'Straight sets' }
      },
      matchStateSummary: 'Djokovic won 6-3, 7-6(4), 6-4 in 2 hours 38 minutes.',
      commentary: []
    }
  ],

  // Live Community Chat & Fan Reactions
  communityChat: [
    { user: 'CricketGuru_99', team: 'IND', avatar: '🏏', text: 'HARDIK PANDYA IS THE GREATEST CLUTCH PLAYER EVER! 🔥🔥🔥', time: '1m ago', isVip: true },
    { user: 'AussieFanatic', team: 'AUS', avatar: '🇦🇺', text: 'Great match India, Starc missed the length there. What a semi-final!', time: '1m ago' },
    { user: 'Madridista_Vini', team: 'RMA', avatar: '👑', text: 'Bellingham in UCL is inevitable! Now get the winner!', time: '2m ago', isVip: true },
    { user: 'CityzenKev', team: 'MCI', avatar: '🦅', text: 'Courtois save on Haaland was illegal... how did he reach that?!', time: '3m ago' },
    { user: 'KingCurryChef', team: 'GSW', avatar: '🏀', text: 'Steph for three! Don\'t count out Golden State yet!!', time: '4m ago' }
  ],

  // Interactive Live Poll
  activePoll: {
    question: 'Who will win the ICC T20 World Cup 2026 Final?',
    votesTeamA: 84210,
    votesTeamB: 24190,
    teamAName: 'India 🇮🇳',
    teamBName: 'Opponent 🏆'
  }
};
