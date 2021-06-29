const sql = require('mssql');

const config = {
    user: 'sa',
    password: '!@#123QWEqwe',
    database: 'SmartSub',
    options: {
        enableArithAbort: true
    }
}

const run = async () => {
    let pool;
    try {
        console.log('Connection Opening...');
        pool = await sql.connect(config);
        const { recordset } = await sql.query`select * from users;`;

        console.log(recordset);

    } catch (err) {
        console.log(err);
    } finally {
        await pool.close();
        console.log('Connection closed');
    }
}

run();