const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const path = url.parse(req.url).pathname;

    if (path === '/player' || path === '/player.html') {
        fs.readFile('player.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('player.html not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
        return;
    }

    if (path === '/' || path === '/host') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=/"></head><body>Redirecting...</body></html>`);
        return;
    }

    res.writeHead(404);
    res.end('Not found');
});

const wss = new WebSocket.Server({ server });
const rooms = {};

wss.on('connection', (ws, req) => {
    console.log('🔌 New WebSocket connection');

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            handleMessage(ws, data);
        } catch (e) {
            console.log('Invalid message:', message);
        }
    });

    ws.on('close', () => {
        for (const roomCode in rooms) {
            const room = rooms[roomCode];
            for (const playerId in room.players) {
                if (room.players[playerId].ws === ws) {
                    const playerName = room.players[playerId].name;
                    delete room.players[playerId];
                    broadcastToRoom(roomCode, {
                        type: 'bg-player-left',
                        playerId: playerId,
                        playerName: playerName
                    });
                    console.log(`👋 Player ${playerName} left room ${roomCode}`);
                }
            }
        }
    });
});

function handleMessage(ws, data) {
    switch (data.type) {
        case 'bg-host-create':
            const roomCode = data.roomCode || generateRoomCode();
            if (!rooms[roomCode]) {
                rooms[roomCode] = {
                    host: ws,
                    players: {},
                    questions: data.questions || [],
                    currentQuestion: 0,
                    gameActive: false
                };
                ws.send(JSON.stringify({
                    type: 'bg-room-created',
                    roomCode: roomCode
                }));
                console.log(`🏠 Room ${roomCode} created with ${rooms[roomCode].questions.length} questions`);
            } else {
                ws.send(JSON.stringify({
                    type: 'bg-error',
                    message: 'Room already exists'
                }));
            }
            break;

        case 'bg-player-join':
            const room = rooms[data.roomCode];
            if (!room) {
                ws.send(JSON.stringify({
                    type: 'bg-error',
                    message: 'Room not found'
                }));
                return;
            }

            const existing = Object.values(room.players).find(p => p.name === data.playerName);
            if (existing) {
                ws.send(JSON.stringify({
                    type: 'bg-error',
                    message: 'Username already taken'
                }));
                return;
            }

            room.players[data.playerId] = {
                name: data.playerName,
                ws: ws,
                score: 0,
                answered: false
            };

            broadcastToRoom(data.roomCode, {
                type: 'bg-player-joined',
                playerId: data.playerId,
                playerName: data.playerName,
                players: getPlayerList(data.roomCode)
            });

            console.log(`👤 ${data.playerName} joined room ${data.roomCode}`);
            break;

        case 'bg-question':
            const qRoom = rooms[data.roomCode];
            if (qRoom) {
                qRoom.currentQuestion = data.number || 0;
                broadcastToRoom(data.roomCode, {
                    type: 'bg-question',
                    question: data.question,
                    number: data.number,
                    total: data.total,
                    timer: data.timer || 20
                });
            }
            break;

        case 'bg-player-answer':
            const aRoom = rooms[data.roomCode];
            if (aRoom && aRoom.players[data.playerId]) {
                aRoom.players[data.playerId].answered = true;
                aRoom.players[data.playerId].answer = data.answer;
                aRoom.players[data.playerId].timeTaken = data.timeTaken || 0;

                broadcastToRoom(data.roomCode, {
                    type: 'bg-player-answer',
                    playerId: data.playerId,
                    playerName: aRoom.players[data.playerId].name,
                    answer: data.answer,
                    timeTaken: data.timeTaken || 0
                });
            }
            break;

        case 'bg-end':
            const eRoom = rooms[data.roomCode];
            if (eRoom) {
                broadcastToRoom(data.roomCode, {
                    type: 'bg-end'
                });
                Object.values(eRoom.players).forEach(p => {
                    p.answered = false;
                    p.answer = undefined;
                });
                eRoom.currentQuestion = 0;
                eRoom.gameActive = false;
            }
            break;

        case 'bg-leaderboard':
            const lRoom = rooms[data.roomCode];
            if (lRoom) {
                const scores = {};
                Object.entries(lRoom.players).forEach(([id, p]) => {
                    scores[id] = { name: p.name, score: p.score || 0 };
                });
                broadcastToRoom(data.roomCode, {
                    type: 'bg-leaderboard-update',
                    players: scores
                });
            }
            break;
    }
}

function broadcastToRoom(roomCode, data) {
    const room = rooms[roomCode];
    if (!room) return;

    const message = JSON.stringify(data);

    if (room.host && room.host.readyState === WebSocket.OPEN) {
        room.host.send(message);
    }

    Object.values(room.players).forEach(p => {
        if (p.ws && p.ws.readyState === WebSocket.OPEN) {
            p.ws.send(message);
        }
    });
}

function getPlayerList(roomCode) {
    const room = rooms[roomCode];
    if (!room) return {};
    const players = {};
    Object.entries(room.players).forEach(([id, p]) => {
        players[id] = { name: p.name, score: p.score || 0 };
    });
    return players;
}

function generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🎮 ARCADE PARTY Server running on port ${PORT}`);
    console.log(`📱 Host: http://localhost:${PORT}/host`);
    console.log(`📱 Players join at: http://localhost:${PORT}/player`);
    console.log(`📱 Or use your local IP for other devices`);
});