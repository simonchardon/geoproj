const pgClient = require('./db')

//service for auto-update person position


// return a random coordonate
const newcoordonate = () => {
    let distance = Math.floor(Math.random() * 10);
    const posOrNeg = Math.floor(Math.random() * 2);
    distance = distance / 10000
    if (posOrNeg === 0) {
        distance = distance - (distance * 2);
    }

    return distance
}


// update position
module.exports = updatePosition = () => {
    pgClient.query("SELECT * FROM persons", (error, results) => {

        if (error) {
            throw error
        }

        results.rows.forEach((person) => {
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
                "  position.datetime = latest_position.datetime LIMIT 1",[person.id], (error, results) => {

                if (error){
                    throw error;
                }
                if (results.rows[0]) {
                    const coor = JSON.parse(results.rows[0].st_asgeojson).coordinates ;
                    lng = coor[0] + newcoordonate();
                    lat = coor[1] + newcoordonate();
                    const date = new Date();
                    pgClient.query("INSERT INTO position (datetime,geom, person_id)" +
                        "VALUES ($1,$2,$3)",[date,`POINT(${lng} ${lat})`, person.id],(error,results) => {
                        if (error) {
                            throw error
                        }
                    })
                }

            })




        })
    })

}

