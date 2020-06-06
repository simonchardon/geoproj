const pgClient = require('../db')

exports.index = (req, res,next) => {

    pgClient.query("SELECT * FROM persons", (error, results) => {

        if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
}

exports.create = (req,res,next) => {
    console.log(req.body.name)
    pgClient.query("INSERT INTO persons (name) VALUES ($1)", [req.body.name], (error) => {
        if (error) {
            throw error
        }
        res.status(201).redirect('/api/persons');
    })
}