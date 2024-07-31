const db = require('../models/dbConnect');

const arcusController = {};

//get Arcus data
arcusController.getChartData = (req, res, next) => {
    const ArcusId = req.body.arcusId 
    const queryString = {
    text: `SELECT topics.*, arcus_graph."mainEnd", arcus_graph."mainStart" 
FROM topics INNER JOIN arcus_graph ON topics.arcus_id = arcus_graph.id
WHERE topics.arcus_id = $1
ORDER BY start`,
    values: [ArcusId]
    }
    db.query(queryString)
    .then(data => {
        console.log(data.rows);
        return next();
    })
}

//creating a new Arcus
arcusController.create = (req, res, next) => {

};

//delete entire Arcus
arcusController.delete = (req, res, next) => {

}

//changing existing Arcus
arcusController.addTopic = (req, res, next) => {

};

arcusController.deleteTopic = (req, res, next) => {

};

arcusController.editTopic = (req, res, next) => {

};




module.exports = arcusController;