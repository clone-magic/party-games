// ============================================================
//  SPIN THE WHEEL - Fully Integrated Player Challenge Edition
//  Uses main player system, no turn-based, challenge modes
//  Depends on: window.players, window.addPoints, window.nextTurn
// ============================================================

(function() {
    'use strict';

    const GAME_ID = 'wheel';
    const GAME_EMOJI = '🎡';
    const GAME_TITLE = 'SPIN THE CHALLENGE WHEEL';
    const GAME_DESC = 'Spin to challenge your friends!';
    const GAME_COLOR = 'game-wheel';

    let isSpinning = false;
    let currentRotation = 0;
    let animationFrame = null;
    let usedChallenges = [];
    let currentMode = 'balanced';
    let challengeType = 'mixed';
    let isAdultModeEnabled = false;

    // ============================================================
    //  CHALLENGE DATA BANK
    // ============================================================
    const CHALLENGE_BANK = {
        office: {
            label: '💼 Office Friendly',
            icon: '💼',
            color: '#4CAF50',
            questions: [
                "What's your favorite work memory?",
                "What's the best advice you've ever received?",
                "If you could have any superpower at work, what would it be?",
                "What's a skill you wish you had?",
                "What's the most interesting thing you've learned recently?",
                "Who do you admire most and why?",
                "What's your dream job?",
                "What's a hidden talent you have?",
                "What's the best book you've ever read?",
                "What's your favorite way to relax?",
                "What's a goal you're working towards?",
                "What's the best vacation you've ever taken?",
                "What's something you're proud of?",
                "What's your favorite movie and why?",
                "What would you do with a million dollars?",
                "What's a tradition you love?",
                "What's the best meal you've ever had?",
                "What's something you'd like to learn?",
                "What's your biggest accomplishment?",
                "What makes you happy?"
            ],
            dares: [
                "Do your best celebrity impression",
                "Tell a funny story from your past",
                "Show a photo from your childhood",
                "Sing a song out loud",
                "Do a happy dance",
                "Tell a joke (make everyone laugh)",
                "Do 5 pushups",
                "Speak in an accent for 1 minute",
                "Draw something with your eyes closed",
                "Walk like a runway model",
                "Do a magic trick (or attempt one)",
                "Recite a poem from memory",
                "Make up a rap about the person to your right",
                "Do your best robot dance",
                "Act out a scene from your favorite movie",
                "Balance a book on your head",
                "Talk like a pirate for 30 seconds",
                "Do your best animal impression",
                "Tell a motivational speech",
                "Challenge someone to a thumb war"
            ]
        },
        balanced: {
            label: '⚖️ Balanced',
            icon: '⚖️',
            color: '#FF9800',
            questions: [
                "What's your biggest fear?",
                "What's the most adventurous thing you've done?",
                "What's your biggest dream?",
                "What's a secret skill you have?",
                "What's the best compliment you've ever received?",
                "What's something you'd change about your past?",
                "What makes you feel alive?",
                "What's your proudest moment?",
                "What's a belief you hold strongly?",
                "What's the best piece of advice you've given?",
                "What's a risk you want to take?",
                "What's something you're grateful for today?",
                "What's your favorite memory with friends?",
                "What's a challenge you've overcome?",
                "What would you tell your younger self?",
                "What's the most beautiful place you've seen?",
                "What's a cause you care about?",
                "What's your biggest motivation in life?",
                "What's something you'd love to create?",
                "What's a lesson life taught you?"
            ],
            dares: [
                "Do 10 pushups right now",
                "Speak in an accent for 1 minute",
                "Tell a secret about yourself",
                "Do your best impression of someone famous",
                "Sing a song in a funny voice",
                "Dance for 30 seconds",
                "Tell a story using only emojis",
                "Do a handstand (or try)",
                "Recite the alphabet backwards",
                "Act out an animal and have others guess",
                "Make up a song about the current moment",
                "Do a dramatic reading of a grocery list",
                "Walk like a robot for 1 minute",
                "Tell a joke in a different language",
                "Do your best opera singing",
                "Imitate someone in the room",
                "Create a new dance move and name it",
                "Talk without using the letter 'e' for 30 seconds",
                "Do a magic trick (even if it fails)",
                "Tell the funniest story you know"
            ]
        },
        spicy: {
            label: '🌶️ Spicy',
            icon: '🌶️',
            color: '#F44336',
            questions: [
                "Who in this room is most likely to become famous?",
                "What's the most rebellious thing you've done?",
                "What's the wildest party you've been to?",
                "Who's the most attractive person here?",
                "What's the biggest lie you've told to your parents?",
                "What's the most embarrassing thing that happened to you?",
                "Who would you swap lives with for a day?",
                "What's your biggest guilty pleasure?",
                "What's the worst date you've ever been on?",
                "Who in this room is the worst secret-keeper?",
                "What's the most spontaneous thing you've done?",
                "Who's the most dramatic person here?",
                "What's a secret talent you have?",
                "What's the most risky thing you've done?",
                "Who in this room would survive a zombie apocalypse?",
                "What's your most controversial opinion?",
                "What's the funniest thing you've done while drunk?",
                "Who's the best flirt in this room?",
                "What's the most trouble you've ever been in?",
                "What's a secret you've never told anyone here?"
            ],
            dares: [
                "Whisper something to your neighbor (must make them blush)",
                "Do your best seductive dance for 15 seconds",
                "Tell a 'never have I ever' confession",
                "Give a lap dance (air version is fine)",
                "Flirt with the person to your left",
                "Do a dramatic confession of love to someone here",
                "Talk like you're in a romance movie for 1 minute",
                "Tell a story with only body language",
                "Sensually eat a piece of food",
                "Speak in a sexy whisper for 2 minutes",
                "Give someone a massage for 30 seconds",
                "Do a strip tease (just take off your jacket/sweater)",
                "Stare deeply into someone's eyes for 30 seconds",
                "Say something flirty to everyone in the room",
                "Do your best impression of someone flirting",
                "Write your number on a napkin and give it to someone",
                "Do a slow-motion walk across the room",
                "Whisper a pickup line to someone",
                "Give a compliment that sounds like an insult",
                "Make eye contact with someone for 60 seconds without laughing"
            ]
        },
        adult: {
            label: '🔞 Adult (18+)',
            icon: '🔞',
            color: '#9C27B0',
            requiresConfirmation: true,
            questions: [
                "What's the most adventurous place you've had sex?",
                "What's your wildest sexual fantasy?",
                "What's the craziest thing you've done with an ex?",
                "What's your favorite position?",
                "What's the most embarrassing sexual experience you've had?",
                "What's a secret kink you have?",
                "What's the most spontaneous sexual encounter you've had?",
                "What's your biggest turn-on?",
                "What's something you've always wanted to try in bed?",
                "What's the worst sexual experience you've had?",
                "What's your 'number' and are you happy with it?",
                "What's the best sexual advice you've ever received?",
                "What's a fetish you find interesting?",
                "What's the longest you've gone without sex?",
                "What's your go-to move in bed?",
                "What's the most public place you've done it?",
                "What's your opinion on toys in the bedroom?",
                "What's a sexual deal-breaker for you?",
                "What's the most romantic sexual experience you've had?",
                "What's a sexual boundary you have?"
            ],
            dares: [
                "Share a screenshot of your most recent 'spicy' text",
                "Do your best impression of your partner in bed",
                "Tell a detailed sexual fantasy",
                "Describe your ideal one-night stand",
                "Reveal the naughtiest thing in your search history",
                "Share your favorite sexy song and explain why",
                "Describe your first time (if comfortable)",
                "Tell a story of your most embarrassing sexual moment",
                "Share your go-to 'move' in detail",
                "Describe what you find most attractive about someone here",
                "Reveal a secret sexual desire you've never shared",
                "Share your opinion on open relationships",
                "Describe your perfect sexual scenario",
                "Tell us your 'hall pass' celebrity",
                "Share a fantasy you've never acted on",
                "Describe the worst pickup line you've used",
                "Reveal a sexual experience you regret",
                "Share what you'd want to do to someone here (respectfully)",
                "Describe your ideal romantic getaway",
                "Tell us about a dream you've had about someone here"
            ]
        }
    };

    // ============================================================
    //  REGISTER GAME
    // ============================================================
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

    // ============================================================
    //  GET SEGMENTS (PLAYER NAMES)
    // ============================================================
    function getSegments() {
        const players = window.players || [];
        if (!players || players.length === 0) {
            return [{ label: 'No Players', value: 'none', color: '#95A5A6' }];
        }

        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
            '#FFEAA7', '#DDA0DD', '#FF8A5C', '#A29BFE',
            '#FD79A8', '#00B894', '#E17055', '#74B9FF',
            '#55EFC4', '#FDCB6E', '#E84393', '#00CEC9'
        ];

        return players.map((p, i) => ({
            label: p.name,
            value: p.name,
            color: p.color || colors[i % colors.length],
            playerId: i
        }));
    }

    // ============================================================
    //  GET CHALLENGE
    // ============================================================
    function getChallenge(mode = null, type = null) {
        const selectedMode = mode || currentMode;
        const selectedType = type || challengeType;

        let actualMode = selectedMode;
        if (actualMode === 'mixed') {
            const modes = ['office', 'balanced', 'spicy'];
            if (isAdultModeEnabled) {
                modes.push('adult');
            }
            actualMode = modes[Math.floor(Math.random() * modes.length)];
        }

        const category = CHALLENGE_BANK[actualMode];
        if (!category) return { text: 'No challenges available!', type: 'none', category: 'none' };

        let useQuestion = true;
        if (selectedType === 'questions') useQuestion = true;
        else if (selectedType === 'dares') useQuestion = false;
        else useQuestion = Math.random() < 0.5;

        const pool = useQuestion ? category.questions : category.dares;
        const challengeTypeText = useQuestion ? 'question' : 'dare';

        let available = pool;
        if (usedChallenges.length > 0) {
            available = pool.filter(c => !usedChallenges.includes(c));
            if (available.length === 0) {
                usedChallenges = [];
                available = pool;
            }
        }

        const challenge = available[Math.floor(Math.random() * available.length)];
        usedChallenges.push(challenge);

        return {
            text: challenge,
            type: challengeTypeText,
            category: actualMode,
            categoryLabel: category.label,
            categoryIcon: category.icon,
            color: category.color
        };
    }

    // ============================================================
    //  RENDER SETTINGS
    // ============================================================
    function renderSettings(container) {
        const settingsHTML = `
            <div style="margin: 0.5rem 0; padding: 0.5rem; background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; align-items: center; justify-content: center;">
                    <div style="display: flex; gap: 0.3rem; flex-wrap: wrap;">
                        ${['office','balanced','spicy','adult','mixed'].map(mode => {
                            const bank = CHALLENGE_BANK[mode];
                            if (!bank) return '';
                            const isAdult = mode === 'adult';
                            const isSelected = currentMode === mode;
                            return `
                                <button class="wheel-mode-btn" data-mode="${mode}" style="
                                    padding: 0.25rem 0.6rem;
                                    border-radius: 16px;
                                    border: 2px solid ${bank.color};
                                    background: ${isSelected ? bank.color : 'transparent'};
                                    color: ${isSelected ? 'white' : bank.color};
                                    font-weight: 700;
                                    font-size: 0.55rem;
                                    cursor: pointer;
                                    min-height: 28px;
                                    transition: all 0.2s;
                                    ${isAdult && !isAdultModeEnabled ? 'opacity:0.4;' : ''}
                                ">
                                    ${bank.icon} ${bank.label.split(' ')[0]}
                                </button>
                            `;
                        }).join('')}
                    </div>
                    <div style="display: flex; gap: 0.2rem; flex-wrap: wrap;">
                        ${['mixed','questions','dares'].map(type => {
                            const labels = { mixed: '📝+🎯', questions: '📝 Q', dares: '🎯 D' };
                            const isSelected = challengeType === type;
                            return `
                                <button class="wheel-type-btn" data-type="${type}" style="
                                    padding: 0.15rem 0.4rem;
                                    border-radius: 12px;
                                    border: 1px solid ${isSelected ? 'white' : 'rgba(255,255,255,0.2)'};
                                    background: ${isSelected ? 'rgba(255,255,255,0.15)' : 'transparent'};
                                    color: white;
                                    font-size: 0.45rem;
                                    cursor: pointer;
                                    min-height: 24px;
                                    transition: all 0.2s;
                                ">
                                    ${labels[type] || type}
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>
                <div style="text-align: center; margin-top: 0.2rem; font-size: 0.45rem; color: var(--theme-text-secondary);">
                    ${CHALLENGE_BANK[currentMode]?.label || 'Select a mode'} • ${challengeType === 'mixed' ? 'Questions & Dares' : challengeType === 'questions' ? 'Questions Only' : 'Dares Only'}
                </div>
            </div>
        `;

        // Find or create settings container
        let settingsDiv = document.getElementById('wheelSettings');
        if (!settingsDiv) {
            settingsDiv = document.createElement('div');
            settingsDiv.id = 'wheelSettings';
            container.insertBefore(settingsDiv, container.firstChild);
        }
        settingsDiv.innerHTML = settingsHTML;

        // ---- Event Listeners ----
        settingsDiv.querySelectorAll('.wheel-mode-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const mode = this.dataset.mode;

                if (mode === 'adult' && !isAdultModeEnabled) {
                    if (confirm('🔞 Adult mode contains explicit content.\n\nAre you 18+ and sure you want to enable it?')) {
                        isAdultModeEnabled = true;
                        currentMode = 'adult';
                        renderSettings(container);
                        renderWheel(container);
                        if (window.showChangeToast) {
                            window.showChangeToast('🔞 Adult mode enabled!');
                        }
                    }
                    return;
                }

                currentMode = mode;
                renderSettings(container);
                renderWheel(container);
                if (window.showChangeToast) {
                    window.showChangeToast(`Mode: ${CHALLENGE_BANK[mode]?.label || mode}`);
                }
            });
        });

        settingsDiv.querySelectorAll('.wheel-type-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                challengeType = this.dataset.type;
                renderSettings(container);
                renderWheel(container);
                if (window.showChangeToast) {
                    window.showChangeToast(`Type: ${this.textContent.trim()}`);
                }
            });
        });
    }

    // ============================================================
    //  RENDER WHEEL
    // ============================================================
    function renderWheel(container) {
        const segments = getSegments();
        const currentPlayer = window.getCurrentPlayer ? window.getCurrentPlayer() : null;
        const playerName = currentPlayer ? currentPlayer.name : 'No player';
        const players = window.players || [];

        // Render settings first
        renderSettings(container);

        // Build wheel HTML
        const wheelHTML = `
            <div style="text-align:center;padding:0.3rem 0;">
                <p style="font-size:0.65rem;font-weight:600;color:var(--theme-text-secondary);margin-bottom:0.2rem;">
                    🎡 ${players.length > 0 ? 'Spin to challenge!' : 'Add players first!'}
                </p>
                <canvas id="wheelCanvas" width="280" height="280" style="max-width:100%;height:auto;cursor:pointer;touch-action:manipulation;border-radius:50%;box-shadow:0 0 40px rgba(255,107,107,0.3);"></canvas>
                <div style="margin-top:0.5rem;display:flex;gap:0.4rem;justify-content:center;flex-wrap:wrap;">
                    <button id="spinBtn" style="padding:0.5rem 2rem;border-radius:30px;border:none;font-weight:700;font-size:0.8rem;cursor:pointer;background:var(--theme-blue-bright);color:white;box-shadow:0 0 20px var(--theme-glow-blue);font-family:var(--font-body);min-height:44px;" ${players.length < 2 ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
                        🎰 SPIN
                    </button>
                    <button id="backToGamesBtn" style="padding:0.4rem 1.2rem;border-radius:30px;border:none;font-weight:700;font-size:0.6rem;cursor:pointer;background:var(--theme-bg-input);color:var(--theme-text-secondary);border:2px solid var(--theme-border-color);font-family:var(--font-body);min-height:44px;">
                        ⬅️ BACK TO GAMES
                    </button>
                </div>
                <div id="wheelResult" style="margin-top:0.5rem;min-height:3rem;font-size:1rem;font-weight:700;color:var(--theme-text-primary);padding:0.5rem;background:rgba(255,255,255,0.05);border-radius:12px;border:1px solid rgba(255,255,255,0.05);"></div>
                ${players.length < 2 ? '<div style="color:#FF6B6B;font-size:0.55rem;margin-top:0.3rem;">⚠️ Add at least 2 players on the Home page!</div>' : ''}
                ${window.createScoringUI ? window.createScoringUI() : ''}
            </div>
        `;

        let wheelContainer = document.getElementById('wheelContainer');
        if (!wheelContainer) {
            wheelContainer = document.createElement('div');
            wheelContainer.id = 'wheelContainer';
            container.appendChild(wheelContainer);
        }
        wheelContainer.innerHTML = wheelHTML;

        if (players.length >= 2) {
            drawWheel(segments);
            document.getElementById('spinBtn').addEventListener('click', () => spinWheel(segments));
            document.getElementById('wheelCanvas').addEventListener('click', () => spinWheel(segments));
        } else {
            // Draw empty wheel
            drawWheel(segments);
        }

        // Back to Games button
        document.getElementById('backToGamesBtn').addEventListener('click', function(e) {
            e.stopPropagation();
            // Close the modal
            if (window.closeModal) {
                window.closeModal();
            } else {
                const overlay = document.getElementById('modalOverlay');
                if (overlay) {
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
            // Navigate to games page
            if (window.navigateTo) {
                window.navigateTo('games');
            }
        });
    }

    // ============================================================
    //  DRAW WHEEL
    // ============================================================
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
            ctx.font = 'bold 12px Nunito, sans-serif';
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 4;

            let label = seg.label;
            if (label.length > 10) label = label.substring(0, 9) + '…';
            ctx.fillText(label, radius * 0.65, 0);
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
        ctx.font = 'bold 11px Nunito, sans-serif';
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
        ctx.shadowColor = 'rgba(231,76,60,0.5)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'transparent';
    }

    // ============================================================
    //  SPIN WHEEL
    // ============================================================
    function spinWheel(segments) {
        if (isSpinning) return;
        const players = window.players || [];
        if (players.length < 2) {
            alert('Add at least 2 players first!');
            return;
        }

        isSpinning = true;
        const spinBtn = document.getElementById('spinBtn');
        if (spinBtn) {
            spinBtn.disabled = true;
            spinBtn.textContent = '🎰 SPINNING...';
            spinBtn.style.opacity = '0.5';
        }
        document.getElementById('wheelResult').innerHTML = '🎰 Spinning...';

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

    // ============================================================
    //  FINISH SPIN
    // ============================================================
    function finishSpin(segments) {
        isSpinning = false;
        const spinBtn = document.getElementById('spinBtn');
        if (spinBtn) {
            spinBtn.disabled = false;
            spinBtn.textContent = '🎰 SPIN';
            spinBtn.style.opacity = '1';
        }

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

        // Get a challenge
        const challenge = getChallenge();

        // Display the result
        const playerName = result.label;
        const challengeText = challenge.text;
        const categoryIcon = challenge.categoryIcon || '🎯';
        const typeIcon = challenge.type === 'question' ? '📝' : '🎯';
        const categoryLabel = challenge.categoryLabel || '';

        let resultHTML = `
            <div style="font-size:1.2rem;margin-bottom:0.3rem;color:${result.color};">
                🎯 <strong>${playerName}</strong>
            </div>
            <div style="font-size:0.9rem;padding:0.6rem;background:rgba(255,255,255,0.08);border-radius:10px;margin:0.2rem 0;border-left:4px solid ${challenge.color || '#FF6B6B'};text-align:left;">
                ${typeIcon} <span style="font-weight:600;">${challengeText}</span>
            </div>
            <div style="font-size:0.6rem;color:var(--theme-text-secondary);margin-top:0.2rem;">
                ${categoryIcon} ${categoryLabel} • ${challenge.type === 'question' ? 'Question' : 'Dare'}
            </div>
        `;

        resultEl.innerHTML = resultHTML;

        // Confetti
        if (window.createConfetti) {
            window.createConfetti(25);
        }
        if (window.playSound) {
            window.playSound('success');
        }

        // Reset used challenges occasionally
        if (usedChallenges.length > 50) {
            usedChallenges = usedChallenges.slice(-20);
        }
    }

    // ============================================================
    //  EXPOSE
    // ============================================================
    window.GAME_MODULES = window.GAME_MODULES || {};
    window.GAME_MODULES[GAME_ID] = {
        render: renderWheel,
        id: GAME_ID,
        title: GAME_TITLE
    };

    // Expose for external use
    window.CHALLENGE_BANK = CHALLENGE_BANK;
    window.getChallenge = getChallenge;

    registerGame();
    console.log(`🎡 ${GAME_TITLE} loaded!`);
    console.log('📚 Challenge modes available:', Object.keys(CHALLENGE_BANK).join(', '));
})();
