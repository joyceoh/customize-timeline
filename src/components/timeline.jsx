import React from "react";
import Chart from 'chart.js/auto';
import "../style/styles.css";

import { Line } from "react-chartjs-2";

const data = {
  labels: [1, 5, 20, 10, 6, 50],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    }
  ]
};

export default function Timeline() {
  return (
    <div className="Timeline">
      <Line data={data} />
    </div>
  );
}