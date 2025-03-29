import React, { useState, useEffect } from "react";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

// Enhanced Chart.js configuration with Rebecca Purple theme
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 13;
Chart.defaults.color = "#2c3e50";
Chart.defaults.plugins.tooltip.backgroundColor = "rgba(255, 255, 255, 0.95)";
Chart.defaults.plugins.tooltip.titleColor = "#663399"; // Rebecca Purple
Chart.defaults.plugins.tooltip.bodyColor = "#2c3e50";
Chart.defaults.plugins.tooltip.borderColor = "rgba(102, 51, 153, 0.3)"; // Rebecca Purple
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.padding = 12;
Chart.defaults.plugins.tooltip.cornerRadius = 6;
Chart.defaults.plugins.tooltip.boxPadding = 6;
Chart.defaults.plugins.tooltip.titleFont = { weight: 'bold' };

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
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Hide the legend at the top of the chart
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: function(tooltipItems) {
            return 'Date: ' + tooltipItems[0].label;
          }
        }
      }
    },
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
        grid: { 
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        display: true,
        title: {
          display: true,
          text: 'Timeline',
          color: '#663399', // Rebecca Purple
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          autoSkip: true,
          maxRotation: 45,
        }
      },
      y: {
        display: true,
        grid: { 
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        title: {
          display: true,
          text: 'Health Events',
          color: '#663399', // Rebecca Purple
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          display: false // Hide Y-axis ticks for cleaner look
        }
      }
    },
  }
};

// Create a data template for each response object and push into datasets state
const dataTemplate = (label, step, start, end, borderColor, backgroundColor) => ({
  label,
  data: [{x: start, y:step+1}, {x: end, y:step+1}],
  borderColor,
  backgroundColor: backgroundColor || 'rgba(255, 255, 255, 0)',
  fill: true,
});

export default function Arcus() {
  // useState for chart data
  const [chart, setChart] = useState(initalData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasData, setHasData] = useState(false);

  const datasetsMaking = (data) => {
    // Create datasets from the data, reverse to maintain proper order
    const datasets = data.map((obj, index) => dataTemplate(obj.name, index, obj.start, obj.end, obj.color, obj.color)).reverse();
    
    // Add start and end markers with RebeccaPurple
    datasets.unshift({
      label: 'begin', 
      data:[{x: data[0].mainStart, y: 7}], 
      borderColor: '#663399' // RebeccaPurple
    });
    
    datasets.push({
      label: 'fin', 
      data:[{x: data[0].mainEnd, y: 0}], 
      borderColor: '#663399' // RebeccaPurple
    });
    
    return datasets;
  }

  const updateMaxMin = (chartData) => {
    console.log('Processing chart data:', chartData.length, 'items');
    return {
      ...chart,
      datasets: datasetsMaking(chartData)
    };
  }
  
  const dataFetch = () => {
    setLoading(true);
    setError(null);
    
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({arcusId: 1})
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error. Status: ${res.status}`);
      }
      return res.json();
    })
    .then(res => {
      console.log('Timeline data received:', res.length, 'events');
      setChart(updateMaxMin(res));
      setHasData(true);
      setLoading(false);
    })
    .catch(err => {
      console.error('Arcus Data fetch: ERROR: ', err);
      setError('Failed to load your health timeline. Please try again.');
      setLoading(false);
    });
  }
  
  // Optionally load data on component mount
  useEffect(() => {
    // Uncomment to auto-load data when component mounts
    // dataFetch();
  }, []);
  
  return (
    <div className="Arcus">
      <h4>Your Health Journey Timeline</h4>
      <button onClick={dataFetch}>Get My Arcus</button>
      <Line data={chart} />
    </div>
  );
};
