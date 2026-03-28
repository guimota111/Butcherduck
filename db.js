const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const DEFAULT_SISTEMAS = require('./data');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('Caminho do Banco de Dados:', dbPath);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS sistemas (
        sysKey TEXT PRIMARY KEY,
        nome TEXT,
        icon TEXT,
        cor TEXT,
        desc TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS protocolos (
        itemKey TEXT,
        sysKey TEXT,
        nome TEXT,
        icon TEXT,
        conteudo TEXT,
        PRIMARY KEY (sysKey, itemKey),
        FOREIGN KEY(sysKey) REFERENCES sistemas(sysKey)
    )`);

    // Verify if database needs seeding
    db.get('SELECT COUNT(*) as count FROM sistemas', (err, row) => {
        if (!err && row.count === 0) {
            console.log('Seeding inicial: Carregando protocolos estáticos de data.js para o SQLite...');
            const insertSys = db.prepare('INSERT INTO sistemas (sysKey, nome, icon, cor, desc) VALUES (?, ?, ?, ?, ?)');
            const insertItem = db.prepare('INSERT INTO protocolos (itemKey, sysKey, nome, icon, conteudo) VALUES (?, ?, ?, ?, ?)');

            db.serialize(() => {
                db.run('BEGIN TRANSACTION');
                for (const [sysKey, sysData] of Object.entries(DEFAULT_SISTEMAS)) {
                    insertSys.run(sysKey, sysData.nome, sysData.icon, sysData.cor, sysData.desc);
                    if (sysData.itens) {
                        for (const [itemKey, itemData] of Object.entries(sysData.itens)) {
                            insertItem.run(itemKey, sysKey, itemData.nome, itemData.icon, itemData.conteudo || '');
                        }
                    }
                }
                insertSys.finalize();
                insertItem.finalize();
                db.run('COMMIT', () => console.log('✅ Banco de dados SQLite criado e populado com sucesso!'));
            });
        }
    });
});

module.exports = db;
