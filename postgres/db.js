import pg from 'pg'

const URL = "postgres://rufjdjxv:QZpPK1a5wlz_a8_P66rO4wYzf2e257um@rosie.db.elephantsql.com/rufjdjxv" //Can be found in the Details page

const pool = new pg.Client(URL);

export default pool
