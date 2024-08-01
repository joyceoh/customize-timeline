const db = require('../models/dbConnect');
const moment = require('moment');

const arcusController = {};

//get Arcus data
arcusController.getChartData = (req, res, next) => {
    const ArcusId = req.body.arcusId 
    console.log(ArcusId)
    const queryString = {
    text: `SELECT topics.*, arcus_graph."mainEnd", arcus_graph."mainStart" 
    FROM topics INNER JOIN arcus_graph ON topics.arcus_id = arcus_graph.id
    WHERE topics.arcus_id = $1
    ORDER BY start DESC`,
    values: [ArcusId]
    }
    db.query(queryString)
    .then(data => {
        res.locals.arcusData = data.rows;
        console.log(data.rows)
        return next();
    })
}

//sort arcus data
arcusController.sortDate = (req, res, next) => {
    console.log('arcusdata:', res.locals.arcusData)
    const arcusData = res.locals.arcusData
    // arcusData = arcusData.sort((a, b) => a.start - b.start);
    // console.log('after sort: ', arcusData)
    arcusData.map(data => {
            data.start = moment(data.start).format('MMM Do YY'),
            data.end = moment(data.end).format('MMM Do YY'),
            data.mainStart = moment(data.mainStart).format('MMM Do YY'),
            data.mainEnd = moment(data.mainEnd).format('MMM Do YY')
      })
      console.log('dataformatted: ',res.locals.arcusData)
      next();
};

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