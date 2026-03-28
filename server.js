const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Set ADMIN_PASSWORD in your environment to override the default
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'patologia2024';

const activeSessions = new Set();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Auth middleware — validates Bearer token
function requireAuth(req, res, next) {
    const auth = req.headers['authorization'];
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Não autorizado.' });
    }
    const token = auth.slice(7);
    if (!activeSessions.has(token)) {
        return res.status(401).json({ error: 'Sessão inválida ou expirada.' });
    }
    next();
}

// POST /api/auth — Login com senha
app.post('/api/auth', (req, res) => {
    const { password } = req.body;
    if (!password || password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Senha incorreta.' });
    }
    const token = crypto.randomBytes(32).toString('hex');
    activeSessions.add(token);
    res.json({ token });
});

// GET /api/auth/check — Verifica se token ainda é válido
app.get('/api/auth/check', requireAuth, (req, res) => {
    res.json({ valid: true });
});

// Serve all static files from root directory
app.use(express.static(path.join(__dirname)));

// API: Restful Fetch of complete JSON payload mapped from SQLite
app.get('/api/sistemas', (req, res) => {
    db.serialize(() => {
        db.all('SELECT * FROM sistemas', [], (err, sistemasRows) => {
            if (err) return res.status(500).json({ error: err.message });

            db.all('SELECT * FROM protocolos', [], (err, protocolosRows) => {
                if (err) return res.status(500).json({ error: err.message });

                const result = {};

                sistemasRows.forEach(sys => {
                    result[sys.sysKey] = {
                        nome: sys.nome,
                        icon: sys.icon,
                        cor: sys.cor,
                        desc: sys.desc,
                        itens: {}
                    };
                });

                protocolosRows.forEach(item => {
                    if (result[item.sysKey]) {
                        result[item.sysKey].itens[item.itemKey] = {
                            nome: item.nome,
                            icon: item.icon,
                            conteudo: item.conteudo
                        };
                    }
                });

                res.json(result);
            });
        });
    });
});

// API: Sync local state entirely back to the server — Protected
app.post('/api/sistemas/sync', requireAuth, (req, res) => {
    const data = req.body;

    db.serialize(() => {
        db.run('BEGIN TRANSACTION');

        // INSERT OR REPLACE supports both updates and new records
        const upsertSys = db.prepare('INSERT OR REPLACE INTO sistemas (sysKey, nome, icon, cor, desc) VALUES (?, ?, ?, ?, ?)');
        const upsertItem = db.prepare('INSERT OR REPLACE INTO protocolos (itemKey, sysKey, nome, icon, conteudo) VALUES (?, ?, ?, ?, ?)');

        let hasError = false;

        for (const [sysKey, sysData] of Object.entries(data)) {
            upsertSys.run(sysKey, sysData.nome, sysData.icon, sysData.cor, sysData.desc, function(err) {
                if (err) hasError = true;
            });

            if (sysData.itens) {
                for (const [itemKey, itemData] of Object.entries(sysData.itens)) {
                    upsertItem.run(itemKey, sysKey, itemData.nome, itemData.icon, itemData.conteudo, function(err) {
                        if (err) hasError = true;
                    });
                }
            }
        }

        upsertSys.finalize();
        upsertItem.finalize();

        db.run('COMMIT', (err) => {
            if (err || hasError) {
                return res.status(500).json({ success: false, error: 'Falha durante transação na API de Patologia.' });
            }
            res.json({ success: true, message: 'Arquivos gravados com super precisão no SQLite 🦆' });
        });
    });
});

// Fallback para SPA e arquivos não encontrados na raiz
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`🦆 BUTCHER DUCK - PLATAFORMA DE PATOLOGIA`);
    console.log(`========================================`);
    console.log(`✅ Servidor API habilitado!`);
    console.log(`🔗 Interface principal: http://localhost:${PORT}`);
    console.log(`⚙️ Painel do Diretor:  http://localhost:${PORT}/admin.html`);
    console.log(`🔒 Senha admin padrão: patologia2024`);
    console.log(`   (Defina ADMIN_PASSWORD no ambiente para alterar)`);
    console.log(`========================================\n`);
});
