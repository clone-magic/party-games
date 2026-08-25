// ============================================================
//  SPIN THE WHEEL - Fully Integrated with data.json + GM
// ============================================================

(function() {
    'use strict';

    const GAME_ID = 'wheel';
    const GAME_EMOJI = '🎡';
    const GAME_TITLE = 'SPIN THE WHEEL';
    const GAME_DESC = 'Spin & win!';
    const GAME_COLOR = 'game-wheel';

    let isSpinning = false;
    let currentRotation = 0;
    let animationFrame = null;

    // ---- REGISTER GAME ----
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
                main: '#FF6B6B',
                light: '#FF8E8E',
                text: '#FFFFFF',
                glow: 'rgba(255,107,107,0.4)'
            };
        }
    }

    // ---- GET SEGMENTS FROM GM ----
    function getSegments() {
        if (window.spinWheelSegments && window.spinWheelSegments.length > 0) {
            return window.spinWheelSegments;
        }
        // Fallback
        return [
            { label: '+1', value: 1, color: '#2ECC71' },
            { label: '+3', value: 3, color: '#3498DB' },
            { label: '+5', value: 5, color: '#9B59B6' },
            { label: '−1', value: -1, color: '#E74C3C' },
            { label: '−3', value: -3, color: '#E67E22' },
            { label: 'STEAL', value: 'steal', color: '#F1C40F' },
            { label: 'SKIP', value: 'skip', color: '#95A5A6' },
            { label: '+10', value: 10, color: '#1ABC9C' }
        ];
    }

    // ---- RENDER WHEEL ----
    function renderWheel(container) {
        const currentPlayer = window.getCurrentPlayer ? window.getCurrentPlayer() : null;
        const playerName = currentPlayer ? currentPlayer.name : 'No player';
        const segments = getSegments();

        container.innerHTML = `
            <div style="text-align:center;padding:0.5rem 0;">
                <p style="font-size:0.7rem;font-weight:600;color:var(--theme-text-secondary);margin-bottom:0.3rem;">
                    🎡 ${playerName}'s spin
                </p>
                <canvas id="wheelCanvas" width="280" height="280" style="max-width:100%;height:auto;cursor:pointer;touch-action:manipulation;border-radius:50%;box-shadow:0 0 40px rgba(255,107,107,0.3);"></canvas>
                <div style="margin-top:0.5rem;display:flex;gap:0.5rem;justify-content:center;flex-wrap:wrap;">
                    <button id="spinBtn" style="padding:0.5rem 2rem;border-radius:30px;border:none;font-weight:700;font-size:0.8rem;cursor:pointer;background:var(--theme-blue-bright);color:white;box-shadow:0 0 20px var(--theme-glow-blue);font-family:var(--font-body);min-height:44px;">
                        🎰 SPIN
                    </button>
                    <button onclick="window.nextTurn ? window.nextTurn() : null" style="padding:0.5rem 1.5rem;border-radius:30px;border:none;font-weight:700;font-size:0.65rem;cursor:pointer;background:var(--theme-blue-electric);color:var(--blue-dark);font-family:var(--font-body);min-height:44px;">
                        ⏭️ NEXT TURN
                    </button>
                </div>
                <div id="wheelResult" style="margin-top:0.3rem;min-height:2rem;font-size:0.9rem;font-weight:700;color:var(--theme-blue-electric);"></div>
                <div style="margin-top:0.5rem;">
                    ${window.createScoringUI ? window.createScoringUI() : ''}
                </div>
            </div>
        `;

        drawWheel(segments);
        document.getElementById('spinBtn').addEventListener('click', () => spinWheel(segments));
        document.getElementById('wheelCanvas').addEventListener('click', () => spinWheel(segments));
    }

    // ---- DRAW WHEEL ----
    function drawWheel(segments, rotation = 0) {
        const canvas = document.getElementById('wheelCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const size = canvas.width;
        const radius = size / 2 - 8;
        const centerX = size / 2;
        const centerY = size / 2;
        const segmentAngle = (2 * Math.PI) / segments.length;

        ctx.clearRect(0, 0, size, size);

        segments.forEach((seg, i) => {
            const startAngle = i * segmentAngle + rotation;
            const endAngle = startAngle + segmentAngle;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();

            const grad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius);
            grad.addColorStop(0, '#FFFFFF');
            grad.addColorStop(0.3, seg.color);
            grad.addColorStop(1, seg.color);
            ctx.fillStyle = grad;
            ctx.fill();

            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + segmentAngle / 2);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 14px Nunito, sans-serif';
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 4;
            ctx.fillText(seg.label, radius * 0.65, 0);
            ctx.restore();
        });

        // Center circle
        const grad = ctx.createRadialGradient(centerX - 5, centerY - 5, 5, centerX, centerY, 25);
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.7, '#F0F0F0');
        grad.addColorStop(1, '#CCCCCC');
        ctx.beginPath();
        ctx.arc(centerX, centerY, 22, 0, 2 * Math.PI);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#333';
        ctx.font = 'bold 12px Nunito, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('SPIN', centerX, centerY);

        // Pointer
        const pointerX = centerX;
        const pointerY = 12;
        ctx.beginPath();
        ctx.moveTo(pointerX - 12, pointerY);
        ctx.lineTo(pointerX, pointerY - 28);
        ctx.lineTo(pointerX + 12, pointerY);
        ctx.closePath();
        ctx.fillStyle = '#E74C3C';
        ctx.fill();
    }

    // ---- SPIN WHEEL ----
    function spinWheel(segments) {
        if (isSpinning) return;
        if (window.players && window.players.length === 0) {
            alert('Add players first!');
            return;
        }

        isSpinning = true;
        document.getElementById('spinBtn').disabled = true;
        document.getElementById('wheelResult').textContent = '🎰 Spinning...';

        const totalRotation = 5 + Math.random() * 10;
        const extraAngle = Math.random() * (2 * Math.PI);
        const targetRotation = totalRotation * 2 * Math.PI + extraAngle;
        const startRotation = currentRotation;
        const duration = 3000 + Math.random() * 1000;
        const startTime = performance.now();

        function animate(time) {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const currentAngle = startRotation + targetRotation * ease;
            currentRotation = currentAngle;
            drawWheel(segments, currentAngle);
            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                currentRotation = currentAngle;
                drawWheel(segments, currentAngle);
                finishSpin(segments);
            }
        }

        animationFrame = requestAnimationFrame(animate);
    }

    // ---- FINISH SPIN ----
    function finishSpin(segments) {
        isSpinning = false;
        document.getElementById('spinBtn').disabled = false;

        const segmentAngle = (2 * Math.PI) / segments.length;
        let normalized = currentRotation % (2 * Math.PI);
        if (normalized < 0) normalized += 2 * Math.PI;

        let index = 0;
        for (let i = 0; i < segments.length; i++) {
            const start = i * segmentAngle + normalized;
            const end = start + segmentAngle;
            let startNorm = start % (2 * Math.PI);
            if (startNorm < 0) startNorm += 2 * Math.PI;
            let endNorm = end % (2 * Math.PI);
            if (endNorm < 0) endNorm += 2 * Math.PI;
            if (startNorm < endNorm) {
                if (0 >= startNorm && 0 < endNorm) { index = i; break; }
            } else {
                if (0 >= startNorm || 0 < endNorm) { index = i; break; }
            }
        }
        if (index >= segments.length) index = 0;

        const result = segments[index];
        const resultEl = document.getElementById('wheelResult');
        applyResult(result);
        resultEl.textContent = `🎯 ${result.label}!`;
        if (result.value === 'steal') {
            resultEl.textContent = '🤑 STEAL! Take 2 from the leader!';
        } else if (result.value === 'skip') {
            resultEl.textContent = '⏭️ SKIP! Lose your next turn!';
        } else if (result.value > 0) {
            resultEl.style.color = '#2ECC71';
            window.createConfetti ? window.createConfetti(25) : null;
            window.playSound ? window.playSound('success') : null;
        } else if (result.value < 0) {
            resultEl.style.color = '#E74C3C';
            window.playSound ? window.playSound('error') : null;
        }
        if (result.value === 'steal' || result.value === 10 || result.value === 5) {
            window.createConfetti ? window.createConfetti(40) : null;
            window.playSound ? window.playSound('levelup') : null;
        }
    }

    // ---- APPLY RESULT ----
    function applyResult(result) {
        const current = window.getCurrentPlayer ? window.getCurrentPlayer() : null;
        if (!current) return;
        const idx = window.players ? window.players.findIndex(p => p.name === current.name) : -1;
        if (idx === -1) return;

        if (result.value === 'steal') {
            const sorted = [...window.players].sort((a, b) => b.points - a.points);
            if (sorted.length > 1 && sorted[0].name !== current.name) {
                const victim = sorted[0];
                const victimIdx = window.players.findIndex(p => p.name === victim.name);
                if (victimIdx !== -1) {
                    window.addPoints ? window.addPoints(victimIdx, -2) : null;
                    window.addPoints ? window.addPoints(idx, 2) : null;
                    window.showChangeToast ? window.showChangeToast(`🤑 Stole 2 from ${victim.name}!`) : null;
                }
            } else {
                window.showChangeToast ? window.showChangeToast('🤷 No one to steal from!') : null;
            }
        } else if (result.value === 'skip') {
            window.showChangeToast ? window.showChangeToast('⏭️ Skipping next turn!') : null;
            setTimeout(() => { window.nextTurn ? window.nextTurn() : null; }, 500);
        } else {
            window.addPoints ? window.addPoints(idx, result.value) : null;
        }
    }

    // ---- EXPOSE ----
    window.GAME_MODULES = window.GAME_MODULES || {};
    window.GAME_MODULES[GAME_ID] = {
        render: renderWheel,
        id: GAME_ID,
        title: GAME_TITLE
    };

    registerGame();
    console.log(`🎡 ${GAME_TITLE} loaded!`);
})();
