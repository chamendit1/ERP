// import express from 'express'
import pool from '../db.js'


export const createTodo = async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
          "INSERT INTO todo (description) VALUES($1) RETURNING *",
          [description]
        );
    
        res.json(newTodo.rows[0]);
      } catch (err) {
        console.error(err.message);
      }
};

