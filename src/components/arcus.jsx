import React, { useState, useEffect } from "react";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

const initalData = {
  datasets: [
    {
      label: "First dataset",
      data: [{x: '2024-05-08 06:06:24+00', y: 3}, {x: '2024-02-09 07:04:37+00', y: 10}],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Second dataset",
      data: [{x:'2024-02-01 07:03:52+00', y:55}, {x:'2024-06-19 06:06:31+00', y:55}],
      fill: true,
      // backgroundColor: "blue",
      borderColor: "blue"
    }
  ],
  options: {
    scales: {
    x: {
      type: 'time',
      time: { unit: 'day'},
      display: true,
      title: {
        display: true,
        text: 'Date'
      },
      ticks: {
        autoSkip: false,
        maxRotation: 0,
        major: {
          enabled: true
        },
        // color: function(context) {
          //   return context.tick && context.tick.major ? '#FF0000' : 'rgba(0,0,0,0.1)';
          // },
          font: function(context) {
            if (context.tick && context.tick.major) {
              return {
                weight: 'bold',
              };
            }
          }
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Steps'
        }
      }
    }
  }
  
};

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
  useEffect(() => {
    console.log(chart)
  }, [chart])

  const datasetsMaking = (data) => {
    const datasets = data.map((obj, index) => dataTemplate(obj.name, index, obj.start, obj.end, obj.color, obj.color)).reverse();
    console.log('datasets:', datasets)
    datasets.unshift({label: 'begin', data:[{x: data[0].mainStart, y: 10}], borderColor: 'green'})
    datasets.push({label: 'fin', data:[{x: data[0].mainEnd, y: 0}], borderColor: 'green'})
    return datasets;
  }

const updateMaxMin = (chartData) => {
  //chart max and min
  console.log('start main: ', chartData[0].mainStart)
    return {
      ...chart,
      // labels: [chartData[0].mainStart, chartData[0].mainEnd],
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
      <button onClick={dataFetch}>Get My Arcus</button>
      <Line data={chart} />
    </div>
  )
};