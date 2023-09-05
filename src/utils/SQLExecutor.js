import initSqlJs from 'sql.js';

// SQL执行器

let SQL;

// 可以直接远程加载 db 文件
// const buf = await fetch("/sql1.db").then((res) => res.arrayBuffer());
// const db = new SQL.Database(new Uint8Array(buf));

// 获取初始化DB
export const initDB = async (initSql) => {
    if (!SQL) {
        SQL = await initSqlJs({
            locateFile: () =>
                'https://cdn.bootcdn.net/ajax/libs/sql.js/1.8.0/sql-wasm.wasm',
        });
    }
    const db = new SQL.Database();
    if (initSql) {
        db.run(initSql);
    }
    return db;
};

// 执行SQL
export const runSQL = (db, sql) => {
    return db.exec(sql);
};

// 在关卡加载时，会先执行关卡对应的初始化 SQL 语句完成建表和导入示例数据，然后用户就可以编写 SQL 查询表中的数据了
