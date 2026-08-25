// ============================================================
//  HOT POTATO - Standalone Game Module
// ============================================================

(function() {
    'use strict';

    const GAME_ID = 'hotpotato';
    const GAME_EMOJI = '🥔';
    const GAME_TITLE = 'HOT POTATO';
    const GAME_DESC = 'Pass or explode!';
    const GAME_COLOR = 'game-hotpotato';

    let potatoTimer = 0;
    let potatoInterval = null;
    let isExploding = false;
    let passCount = 0;

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
                main: '#F39C12',
                light: '#F5B041',
                text: '#FFFFFF',
                glow: 'rgba(243,156,18,0.4)'
            };
        }
    }

    function renderHotPotato(container) {
        const current = window.getCurrentPlayer ? window.getCurrentPlayer() : null;
        const name = current ? current.name : 'No player';

        container.innerHTML = `
            <div style="text-align:center;padding:0.5rem 0;">
                <div style="font-size:4rem;animation:${isExploding ? 'shake 0.1s infinite' : 'bounce 1s infinite'};">
                    ${isExploding ? '💥' : '🥔'}
                </div>
                <p style="font-size:0.7rem;font-weight:600;color:var(--theme-text-secondary);">
                    🔥 ${name} has the potato!
                </p>
                <div style="font-size:2.5rem;font-family:var(--font-display);color:${potatoTimer <= 3 ? '#E74C3C' : 'var(--theme-blue-electric)'};">
                    ${potatoTimer || '?'}
                </div>
                <div style="display:flex;gap:0.5rem;justify-content:center;flex-wrap:wrap;margin-top:0.3rem;">
                    <button id="passBtn" style="padding:0.5rem 2rem;border-radius:30px;border:none;font-weight:700;font-size:0.9rem;cursor:pointer;background:var(--theme-blue-bright);color:white;box-shadow:0 0 20px var(--theme-glow-blue);font-family:var(--font-body);min-height:44px;">
                        🏃 PASS
                    </button>
                    <button onclick="window.nextTurn ? window.nextTurn() : null" style="padding:0.5rem 1.5rem;border-radius:30px;border:none;font-weight:700;font-size:0.65rem;cursor:pointer;background:var(--theme-blue-electric);color:var(--blue-dark);font-family:var(--font-body);min-height:44px;">
                        ⏭️ NEXT TURN
                    </button>
                </div>
                <div id="potatoStatus" style="margin-top:0.3rem;font-size:0.7rem;color:var(--theme-text-muted);">
                    Passes: ${passCount}
                </div>
                ${window.createScoringUI ? window.createScoringUI() : ''}
            </div>
        `;

        document.getElementById('passBtn').addEventListener('click', passPotato);

        if (!isExploding) startPotatoTimer();
    }

    function startPotatoTimer() {
        if (potatoInterval) clearInterval(potatoInterval);
        // Random 5-12 seconds
        potatoTimer = Math.floor(Math.random() * 7) + 6;
        const display = document.querySelector('.timer-display');
        if (display) display.textContent = potatoTimer;

        potatoInterval = setInterval(() => {
            potatoTimer--;
            const display = document.querySelector('.timer-display');
            if (display) {
                display.textContent = potatoTimer;
                if (potatoTimer <= 3) display.classList.add('warning');
            }

            if (potatoTimer <= 0) {
                clearInterval(potatoInterval);
                explodePotato();
            }
        }, 1000);
    }

    function passPotato() {
        if (isExploding) return;
        if (potatoInterval) clearInterval(potatoInterval);
        passCount++;

        const current = window.getCurrentPlayer ? window.getCurrentPlayer() : null;
        if (current) {
            window.showChangeToast ? window.showChangeToast(`🔥 ${current.name} passed!`) : null;
            window.playSound ? window.playSound('point') : null;
        }

        window.nextTurn ? window.nextTurn() : null;

        setTimeout(() => {
            if (window.selectedGameId === GAME_ID) {
                const container = document.getElementById('modalContent');
                renderHotPotato(container);
            }
        }, 300);
    }

    function explodePotato() {
        isExploding = true;
        const current = window.getCurrentPlayer ? window.getCurrentPlayer() : null;

        if (current) {
            const idx = window.players ? window.players.findIndex(p => p.name === current.name) : -1;
            if (idx !== -1 && window.addPoints) {
                window.addPoints(idx, -2);
                window.showChangeToast ? window.showChangeToast(`💥 BOOM! ${current.name} loses 2 points!`) : null;
                window.createConfetti ? window.createConfetti(30) : null;
                window.playSound ? window.playSound('error') : null;
            }
        }

        const container = document.getElementById('modalContent');
        container.innerHTML = `
            <div style="text-align:center;padding:2rem 0;">
                <div style="font-size:5rem;animation:shake 0.1s infinite;">💥</div>
                <h3 style="font-family:var(--font-display);color:#E74C3C;font-size:1.5rem;">BOOM!</h3>
                <p style="color:var(--theme-text-secondary);font-size:0.8rem;">${current ? current.name : 'Someone'} got roasted!</p>
                <button onclick="resetPotato()" style="margin-top:0.5rem;padding:0.5rem 2rem;border-radius:30px;border:none;font-weight:700;font-size:0.7rem;cursor:pointer;background:var(--theme-blue-bright);color:white;font-family:var(--font-body);">
                    🥔 NEW POTATO
                </button>
            </div>
        `;
    }

    function resetPotato() {
        isExploding = false;
        passCount = 0;
        if (potatoInterval) clearInterval(potatoInterval);
        const container = document.getElementById('modalContent');
        renderHotPotato(container);
        window.nextTurn ? window.nextTurn() : null;
    }

    window.GAME_MODULES = window.GAME_MODULES || {};
    window.GAME_MODULES[GAME_ID] = {
        render: renderHotPotato,
        id: GAME_ID,
        title: GAME_TITLE
    };

    registerGame();
    console.log(`🥔 ${GAME_TITLE} loaded!`);
})();