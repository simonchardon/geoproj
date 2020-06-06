const pgClient = require('../db')

exports.show = (req,res,next) => {
    const id = req.params.id;

    pgClient.query("SELECT" +
        " position.*,ST_AsGeoJSON(geom) FROM persons, " +
        "  (SELECT" +
        "     person_id, MAX(datetime) AS datetime " +
        "   FROM" +
        "     position " +
        "   WHERE person_id = $1 " +
        "   GROUP BY " +
        "     person_id) AS latest_position " +
        "INNER JOIN " +
        "  position " +
        "ON " +
        "  position.person_id = latest_position.person_id AND " +
        "  position.datetime = latest_position.datetime LIMIT 1",[id], (error, results) => {

        if (error){
            throw error;
        }
        res.status(200).json(results.rows);

    })
}


exports.index = (req, res, next) => {
    const id = req.params.id;
    pgClient.query("SELECT position.*, ST_AsGeoJSON(geom) FROM position WHERE person_id = $1 " +
        "ORDER BY datetime DESC", [id], (error, results) => {

        if (error) {
            throw error;
        }

        res.status(200).json(results.rows);
    } )
}

exports.update = (req, res, next) => {
    const id = req.body.id;
    const lat = req.body.lat;
    const long = req.body.long;
    const date = new Date();
    pgClient.query("INSERT INTO position (datetime,geom, person_id)" +
        "VALUES ($1,$2,$3)",[date,`POINT(${long} ${lat})`, id],(error,results) => {

        if (error) {
            throw error
        }

        res.status(200).redirect(`/api/persons/${id}/position`)
    })
}