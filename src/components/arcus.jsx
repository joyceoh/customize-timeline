import React, { useState, useEffect } from "react";
import Chart, { scales } from 'chart.js/auto';
import { Line } from "react-chartjs-2";

const mockdata = [
  {
    label: "First dataset",
    data: [
      { x: '2024-05-08', y: 3 },
      { x: '2024-02-09', y: 10 }
    ],
    fill: true,
    backgroundColor: "rgba(75,192,192,0.2)",
    borderColor: "rgba(75,192,192,1)"
  },
  {
    label: "Second dataset",
    data: [
      { x: '2024-02-01', y: 55 },
      { x: '2024-06-19', y: 55 }
    ],
    fill: true,
    borderColor: "blue"
  }
]

const initalData = {
  datasets: [mockdata],
  options: {
    scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day',
        tooltipFormat: 'll', // Tooltip format
        displayFormats: {
          day: 'MMM D', // Display format for the day
        }
      },
      grid: { display: false},
      display: true,
      title: {
        display: true,
        text: 'Date'
      },
      // ticks: {
      //   autoSkip: false,
      //   maxRotation: 0,
      //   major: {
      //     enabled: true
      //   }}
      // },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Steps'
        }
      }
    },
  maintainAspectRatio: false,
  }
}};

  //create a datatemplate for each res obj and push into datasets state
  const dataTemplate = (label, step, start, end, borderColor, backgroundColor) => ({
    label,
    data: [{x: start, y:step+1}, {x: end, y:step+1}],
    borderColor,
    // backgroundColor,
    fill: true,
  });

  
  export default function Arcus(){
  //useState of graph
  const [chart, setChart] = useState(initalData)

  const datasetsMaking = (data) => {
    const datasets = data.map((obj, index) => dataTemplate(obj.name, index, obj.start, obj.end, obj.color, obj.color)).reverse();
    datasets.unshift({label: 'begin', data:[{x: data[0].mainStart, y: 7}], borderColor: 'green'})
    datasets.push({label: 'fin', data:[{x: data[0].mainEnd, y: 0}], borderColor: 'purple'})
    return datasets;
  }

const updateMaxMin = (chartData) => {
  //chart max and min
  console.log('start main: ', chartData[0].mainStart)
    return {
      ...chart,
      datasets: datasetsMaking(chartData)
    };
}
  
  
  
  const dataFetch = () => {
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({arcusId: 1})
    })
    .then(res => {
      // console.log(res)
      if (!res.ok) {
        throw new Error(`HTTP error. Status: ${res.status}`);
      }
      return res.json();
    })
    .then(res => {
      console.log('second .then', res)
      setChart(updateMaxMin(res))
    })
    .catch(err => {
      console.error('Arcus Data fetch: ERROR: ', err);
    });
  }
  
  
  return (
    <div className="Arcus">
      <h4></h4>
      <button onClick={dataFetch}>Get My Arcus</button>
      <Line data={chart} />
    </div>
  )
};