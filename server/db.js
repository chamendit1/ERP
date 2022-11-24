import Pool from 'pg-pool'

console.log(Pool)

const pool = new Pool({
    user: "postgres",
    password: "admin",
    host: "localhost",
    port: 5432,
    database: "ERP"
  });

  export default pool