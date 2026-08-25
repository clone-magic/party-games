// ============================================================
//  BEAT THE METER - Fully Integrated with data.json + GM
// ============================================================

(function() {
    'use strict';

    const GAME_ID = 'meter';
    const GAME_EMOJI = '📊';
    const GAME_TITLE = 'BEAT THE METER';
    const GAME_DESC = 'Stop at the sweet spot!';
    const GAME_COLOR = 'game-meter';

    let meterValue = 0;
    let meterDirection = 1;
    let meterInterval = null;
    let isStopped = false;
    let attempts = 0;
    let bestScore = 0;

    // ---- GET SETTINGS FROM GM ----
    function getSettings() {
        if (window.meterSettings) {
            return window.meterSettings;
        }
        return {
            targetMin: 70,
            targetMax: 85,
            perfectZone: 2,
            perfectPoints: 5,
            goodPoints: 3,
            okPoints: 1,
            attemptsPerTurn: 3,
            defaultTimer: 8
        };
    }

    function registerGame() {
        if (!window.GAMES) window.GAMES = [];
        if (!window.GAMES.find(g => g.id === GAME_ID)) {
            window.GAMES.push({
                id: GAME_ID,
                emoji: GAME_EMOJI,
                title: GAME_TITLE,
                desc: GAME_DESC,
                color: GAME_COLOR
            });
        }
        if (!window.GAME_COLORS) window.GAME_COLORS = {};
        if (!window.GAME_COLORS[GAME_ID]) {
            window.GAME_COLORS[GAME_ID] = {
                main: '#2ECC71',
                light: '#58D68D',
                text: '#FFFFFF',
                glow: 'rgba(46,204,113,0.4)'
            };
        }
    }

    function renderMeter(container) {
        const current = window.getCurrentPlayer ? window.getCurrentPlayer() : null;
        const name = current ? current.name : 'No player';
        const settings = getSettings();

        attempts = 0;
        bestScore = 0;
        isStopped = false;

        container.innerHTML = `
            <div style="text-align:center;padding:0.5rem 0;">
                <p style="font-size:0.7rem;font-weight:600;color:var(--theme-text-secondary);">
                    📊 ${name} — Stop in the <span style="color:#2ECC71;">GREEN</span> zone!
                </p>
                <div style="position:relative;width:100%;max-width:320px;margin:0.3rem auto;height:40px;background:var(--theme-bg-input);border-radius:20px;overflow:hidden;border:3px solid var(--theme-border-color);">
                    <div id="meterFill" style="position:absolute;left:0;top:0;height:100%;width:0%;background:var(--theme-blue-bright);transition:none;border-radius:20px;"></div>
                    <div style="position:absolute;left:${settings.targetMin}%;right:${100 - settings.targetMax}%;top:0;height:100%;background:rgba(46,204,113,0.25);border-left:2px solid #2ECC71;border-right:2px solid #2ECC71;pointer-events:none;"></div>
                    <div style="position:absolute;left:${settings.targetMin}%;top:0;height:100%;border-left:2px solid #2ECC71;pointer-events:none;"></div>
                    <div style="position:absolute;right:${100 - settings.targetMax}%;top:0;height:100%;border-right:2px solid #2ECC71;pointer-events:none;"></div>
                    <div style="position:absolute;left:50%;top:-4px;width:4px;height:48px;background:#E74C3C;transform:translateX(-50%);pointer-events:none;"></div>
                    <div style="position:absolute;left:0;top:0;width:100%;height:100%;display:flex;justify-content:space-between;padding:0 6px;font-size:0.35rem;color:var(--theme-text-muted);line-height:40px;pointer-events:none;font-weight:700;">
                        <span>0%</span>
                        <span style="color:#2ECC71;">${settings.targetMin}%</span>
                        <span style="color:#2ECC71;">${settings.targetMax}%</span>
                        <span>100%</span>
                    </div>
                    <div id="meterValue" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:0.6rem;font-weight:800;color:white;text-shadow:0 1px 4px rgba(0,0,0,0.5);pointer-events:none;z-index:2;">0%</div>
                </div>
                <div style="display:flex;gap:0.5rem;justify-content:center;flex-wrap:wrap;margin-top:0.3rem;">
                    <button id="stopBtn" style="padding:0.5rem 2rem;border-radius:30px;border:none;font-weight:700;font-size:0.9rem;cursor:pointer;background:#E74C3C;color:white;box-shadow:0 0 20px rgba(231,76,60,0.3);font-family:var(--font-body);min-height:44px;">
                        ✋ STOP
                    </button>
                    <button onclick="window.nextTurn ? window.nextTurn() : null" style="padding:0.5rem 1.5rem;border-radius:30px;border:none;font-weight:700;font-size:0.65rem;cursor:pointer;background:var(--theme-blue-electric);color:var(--blue-dark);font-family:var(--font-body);min-height:44px;">
                        ⏭️ NEXT TURN
                    </button>
                </div>
                <div id="meterResult" style="margin-top:0.3rem;min-height:2rem;font-size:0.8rem;font-weight:700;color:var(--theme-text-secondary);">
                    Attempt ${attempts + 1}/${settings.attemptsPerTurn}
                </div>
                ${window.createScoringUI ? window.createScoringUI() : ''}
            </div>
        `;

        isStopped = false;
        meterValue = 0;
        meterDirection = 1;
        document.getElementById('stopBtn').addEventListener('click', stopMeter);
        startMeter();
    }

    function startMeter() {
        if (meterInterval) clearInterval(meterInterval);
        meterInterval = setInterval(() => {
            if (isStopped) return;
            meterValue += meterDirection * 1.2;
            if (meterValue >= 100) { meterValue = 100; meterDirection = -1; }
            if (meterValue <= 0) { meterValue = 0; meterDirection = 1; }
            updateMeter();
        }, 30);
    }

    function updateMeter() {
        const fill = document.getElementById('meterFill');
        const value = document.getElementById('meterValue');
        if (fill) fill.style.width = meterValue + '%';
        if (value) value.textContent = Math.round(meterValue) + '%';
    }

    function stopMeter() {
        if (isStopped) return;
        isStopped = true;
        if (meterInterval) clearInterval(meterInterval);

        const value = meterValue;
        const settings = getSettings();
        const result = document.getElementById('meterResult');

        let points = 0;
        let message = '';

        if (value >= settings.targetMin && value <= settings.targetMax) {
            const center = (settings.targetMin + settings.targetMax) / 2;
            if (Math.abs(value - center) <= settings.perfectZone) {
                points = settings.perfectPoints;
                message = `🎯 PERFECT! +${points} points!`;
                window.createConfetti ? window.createConfetti(40) : null;
                window.playSound ? window.playSound('levelup') : null;
            } else {
                points = settings.goodPoints;
                message = `✅ GOOD! +${points} points!`;
                window.createConfetti ? window.createConfetti(20) : null;
                window.playSound ? window.playSound('success') : null;
            }
        } else if ((value >= 40 && value < settings.targetMin) || (value > settings.targetMax && value <= 95)) {
            points = settings.okPoints;
            message = `👍 OK! +${points} point${points > 1 ? 's' : ''}!`;
            window.playSound ? window.playSound('point') : null;
        } else {
            message = '❌ Miss! 0 points';
            window.playSound ? window.playSound('error') : null;
        }

        if (points > bestScore) bestScore = points;

        const current = window.getCurrentPlayer ? window.getCurrentPlayer() : null;
        if (current && points > 0) {
            const idx = window.players ? window.players.findIndex(p => p.name === current.name) : -1;
            if (idx !== -1 && window.addPoints) {
                window.addPoints(idx, points);
            }
        }

        result.innerHTML = `${message} (${Math.round(value)}%)`;

        attempts++;
        if (attempts >= settings.attemptsPerTurn) {
            document.getElementById('stopBtn').disabled = true;
            result.innerHTML += `<br>🏆 Best: ${bestScore} points — Click NEXT TURN!`;
        } else {
            setTimeout(() => {
                if (!isStopped) return;
                document.getElementById('stopBtn').disabled = false;
                result.innerHTML = `Attempt ${attempts + 1}/${settings.attemptsPerTurn}`;
                isStopped = false;
                startMeter();
            }, 1200);
        }
    }

    window.GAME_MODULES = window.GAME_MODULES || {};
    window.GAME_MODULES[GAME_ID] = {
        render: renderMeter,
        id: GAME_ID,
        title: GAME_TITLE
    };

    registerGame();
    console.log(`📊 ${GAME_TITLE} loaded!`);
})();
