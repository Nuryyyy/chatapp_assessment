const {connectDatabase} = require("../pool.js")
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid');


const pool = connectDatabase()

module.exports.addMsg = async (req, res) => {
    try {
        const { from, to, message } = req.body;

        const date = (new Date().toISOString())
        console.log("date", date)
        const data = await pool.query(`INSERT INTO message(msgid, content, datemsg , sender, receiver) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [uuidv4(), message, date, from, to])
        res.status(200).json(data.rows)
    } catch (error) {
        console.log(error)
    }

}
module.exports.getAllMsg = async (req, res, next) => {
    
    try {
        const { from, to } = req.body
        const messages = await pool.query(`SELECT * FROM message WHERE sender = $1 AND receiver= $2 OR sender = $2 AND receiver = $1 ORDER BY datemsg ASC`, [from, to])
        // res.status(200).json(messages.rows)
        const data = messages.rows
        const projectedMessages = data.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.content,
                time: msg.datemsg,
                msgid: msg.msgid

            }
        })
        res.json(projectedMessages)
    } catch (ex) {
        next(ex)
    }
}