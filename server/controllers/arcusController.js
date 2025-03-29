const db = require('../models/mockDbConnect');
const moment = require('moment');

// Mock data to replace database queries
const mockArcusData = [
  {
    id: 1,
    arcus_id: 1,
    name: "Initial Diagnosis",
    start: "2023-01-15T00:00:00.000Z",
    end: "2023-02-01T00:00:00.000Z",
    color: "rgba(102, 51, 153, 0.7)", // RebeccaPurple
    master_topic: "Diagnosis",
    mainStart: "2023-01-01T00:00:00.000Z",
    mainEnd: "2024-12-31T00:00:00.000Z"
  },
  {
    id: 2,
    arcus_id: 1,
    name: "First Consultation",
    start: "2023-02-05T00:00:00.000Z",
    end: "2023-02-05T00:00:00.000Z",
    color: "rgba(102, 51, 153, 0.7)", // RebeccaPurple
    master_topic: "Medical Appointments",
    mainStart: "2023-01-01T00:00:00.000Z",
    mainEnd: "2024-12-31T00:00:00.000Z"
  },
  {
    id: 3,
    arcus_id: 1,
    name: "Surgery Scheduled",
    start: "2023-02-20T00:00:00.000Z",
    end: "2023-02-20T00:00:00.000Z",
    color: "rgba(102, 51, 153, 0.7)", // RebeccaPurple
    master_topic: "Surgery",
    mainStart: "2023-01-01T00:00:00.000Z",
    mainEnd: "2024-12-31T00:00:00.000Z"
  },
  {
    id: 4,
    arcus_id: 1,
    name: "Pre-Surgery Tests",
    start: "2023-03-01T00:00:00.000Z",
    end: "2023-03-10T00:00:00.000Z",
    color: "rgba(102, 51, 153, 0.7)", // RebeccaPurple
    master_topic: "Tests",
    mainStart: "2023-01-01T00:00:00.000Z",
    mainEnd: "2024-12-31T00:00:00.000Z"
  },
  {
    id: 5,
    arcus_id: 1,
    name: "Surgery",
    start: "2023-03-15T00:00:00.000Z",
    end: "2023-03-15T00:00:00.000Z",
    color: "rgba(102, 51, 153, 0.7)", // RebeccaPurple
    master_topic: "Surgery",
    mainStart: "2023-01-01T00:00:00.000Z",
    mainEnd: "2024-12-31T00:00:00.000Z"
  },
  {
    id: 6,
    arcus_id: 1,
    name: "Recovery Period",
    start: "2023-03-16T00:00:00.000Z",
    end: "2023-04-15T00:00:00.000Z",
    color: "rgba(102, 51, 153, 0.7)", // RebeccaPurple
    master_topic: "Recovery",
    mainStart: "2023-01-01T00:00:00.000Z",
    mainEnd: "2024-12-31T00:00:00.000Z"
  },
  {
    id: 7,
    arcus_id: 1,
    name: "First Chemotherapy",
    start: "2023-04-20T00:00:00.000Z",
    end: "2023-04-20T00:00:00.000Z",
    color: "rgba(102, 51, 153, 0.7)", // RebeccaPurple
    master_topic: "Treatment",
    mainStart: "2023-01-01T00:00:00.000Z",
    mainEnd: "2024-12-31T00:00:00.000Z"
  },
  {
    id: 8,
    arcus_id: 1,
    name: "Chemotherapy Cycle 1",
    start: "2023-04-20T00:00:00.000Z",
    end: "2023-05-20T00:00:00.000Z",
    color: "rgba(102, 51, 153, 0.5)", // RebeccaPurple (lighter)
    master_topic: "Treatment",
    mainStart: "2023-01-01T00:00:00.000Z",
    mainEnd: "2024-12-31T00:00:00.000Z"
  },
  {
    id: 9,
    arcus_id: 1,
    name: "Chemotherapy Cycle 2",
    start: "2023-05-21T00:00:00.000Z",
    end: "2023-06-21T00:00:00.000Z",
    color: "rgba(102, 51, 153, 0.5)", // RebeccaPurple (lighter)
    master_topic: "Treatment",
    mainStart: "2023-01-01T00:00:00.000Z",
    mainEnd: "2024-12-31T00:00:00.000Z"
  },
  {
    id: 10,
    arcus_id: 1,
    name: "Chemotherapy Cycle 3",
    start: "2023-06-22T00:00:00.000Z",
    end: "2023-07-22T00:00:00.000Z",
    color: "rgba(102, 51, 153, 0.5)", // RebeccaPurple (lighter)
    master_topic: "Treatment",
    mainStart: "2023-01-01T00:00:00.000Z",
    mainEnd: "2024-12-31T00:00:00.000Z"
  },
  {
    id: 11,
    arcus_id: 1,
    name: "Follow-up Scan",
    start: "2023-08-01T00:00:00.000Z",
    end: "2023-08-01T00:00:00.000Z",
    color: "rgba(102, 51, 153, 0.7)", // RebeccaPurple
    master_topic: "Tests",
    mainStart: "2023-01-01T00:00:00.000Z",
    mainEnd: "2024-12-31T00:00:00.000Z"
  },
  {
    id: 12,
    arcus_id: 1,
    name: "Radiation Therapy",
    start: "2023-09-01T00:00:00.000Z",
    end: "2023-10-15T00:00:00.000Z",
    color: "rgba(102, 51, 153, 0.7)", // RebeccaPurple
    master_topic: "Treatment",
    mainStart: "2023-01-01T00:00:00.000Z",
    mainEnd: "2024-12-31T00:00:00.000Z"
  },
  {
    id: 13,
    arcus_id: 1,
    name: "Three-Month Checkup",
    start: "2023-12-01T00:00:00.000Z",
    end: "2023-12-01T00:00:00.000Z",
    color: "rgba(102, 51, 153, 0.7)", // RebeccaPurple
    master_topic: "Tests",
    mainStart: "2023-01-01T00:00:00.000Z",
    mainEnd: "2024-12-31T00:00:00.000Z"
  },
  {
    id: 14,
    arcus_id: 1,
    name: "Six-Month Checkup",
    start: "2024-03-01T00:00:00.000Z",
    end: "2024-03-01T00:00:00.000Z",
    color: "rgba(102, 51, 153, 0.7)", // RebeccaPurple
    master_topic: "Tests",
    mainStart: "2023-01-01T00:00:00.000Z",
    mainEnd: "2024-12-31T00:00:00.000Z"
  },
  {
    id: 15,
    arcus_id: 1,
    name: "One-Year Milestone",
    start: "2024-01-15T00:00:00.000Z",
    end: "2024-01-15T00:00:00.000Z",
    color: "rgba(102, 51, 153, 0.7)", // RebeccaPurple
    master_topic: "Milestone",
    mainStart: "2023-01-01T00:00:00.000Z",
    mainEnd: "2024-12-31T00:00:00.000Z"
  }
];

const arcusController = {};

// Mock getChartData function
arcusController.getChartData = (req, res, next) => {
  const arcusId = req.body.arcusId;
  console.log("Getting chart data for Arcus ID:", arcusId);
  
  // Filter the mockArcusData based on arcusId if needed
  const filteredData = mockArcusData.filter(item => item.arcus_id === arcusId);
  
  res.locals.arcusData = filteredData;
  return next();
};

// Format dates using moment
arcusController.sortDate = (req, res, next) => {
  console.log('arcusdata:', res.locals.arcusData);
  const arcusData = res.locals.arcusData;
  
  // We'll preserve the original date format since it's in ISO format which works well with Chart.js
  // This prevents the "Invalid date" errors when using moment's format
  
  // If you need to display formatted dates elsewhere, use this function instead:
  // arcusData.map(data => {
  //   data.displayStart = moment(data.start).format('MMM D, YYYY');
  //   data.displayEnd = moment(data.end).format('MMM D, YYYY');
  // });
  
  return next();
};

// Other controller methods can be stubbed out as needed
arcusController.create = (req, res, next) => {
  return next();
};

arcusController.delete = (req, res, next) => {
  return next();
};

arcusController.addTopic = (req, res, next) => {
  return next();
};

arcusController.deleteTopic = (req, res, next) => {
  return next();
};

arcusController.editTopic = (req, res, next) => {
  return next();
};

module.exports = arcusController;
