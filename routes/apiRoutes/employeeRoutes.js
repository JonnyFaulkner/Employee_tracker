const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employee ORDER BY first_name`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ err: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows,
        })
    })
});

router.post('/employee', (req, res) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`;
    const params = [req.body.first_name, req.body.last_name, req.body.role_id, req.body.manager_id];

    db.query(sql, params, (err, res) => {
        if (err) {
            res.status(400).json(err)
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

router.delete('/employee/:id', (req, res) => {
    const sql = `DELETE FROM employee WHERE id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
            });
        }
    });
});

router.put('/employee/:id', (req, res) => {
    const sql = `UPDATE employee SET role_id = ?
        WHERE id = ?`

    const params = [req.body, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            })
        }
    })
})

module.exports = router;