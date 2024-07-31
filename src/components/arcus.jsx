import React from "react";
import Chart from 'chart.js/auto';

import { Line } from "react-chartjs-2";

//grab start and end dates 


const data = {
  labels: [1, 5, 20, 10, 6, 50].sort((a,b) => a-b),
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Second dataset",
      data: [{x:5, y:55}, {x:10, y:55}],
      fill: true,
      // backgroundColor: "blue",
      borderColor: "blue"
    }
  ]
};

export default function Arcus() {
  return (
    <div className="Arcus">
      <Line data={data} />
    </div>
  );
}