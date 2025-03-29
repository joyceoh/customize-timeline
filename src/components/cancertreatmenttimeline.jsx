import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const CancerTreatmentTimeline = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (!chartRef.current || !data || data.length === 0) return;

    const ctx = chartRef.current.getContext('2d');
    
    // Process data to create a stepwise treatment journey
    const processData = () => {
      // Sort data chronologically by start date
      const sortedData = [...data].sort((a, b) => new Date(a.start) - new Date(b.start));
      
      // Group treatments by type to avoid legend clutter
      const topicGroups = {};
      
      sortedData.forEach(treatment => {
        if (!topicGroups[treatment.master_topic]) {
          topicGroups[treatment.master_topic] = {
            label: treatment.master_topic,
            backgroundColor: treatment.color,
            borderColor: treatment.color,
            borderWidth: 2,
            fill: false,
            stepped: 'after',
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: treatment.color,
            data: []
          };
        }
      });
      
      // Group treatments by their start dates and assign decreasing Y values (stepwise down)
      const totalTreatments = sortedData.length;
      
      sortedData.forEach((treatment, index) => {
        const startDate = new Date(treatment.start);
        const endDate = new Date(treatment.end);
        const yValue = totalTreatments - index; // Decreasing y-value for stepwise down effect
        
        // Add the treatment point to its topic group
        topicGroups[treatment.master_topic].data.push({
          x: startDate,
          y: yValue,
          name: treatment.name,
          topic: treatment.master_topic,
          startDate: treatment.start,
          endDate: treatment.end,
          duration: startDate.getTime() === endDate.getTime() ? "Single day" : 
                   `${new Date(treatment.start).toLocaleDateString()} to ${new Date(treatment.end).toLocaleDateString()}`
        });
        
        // For treatments that span multiple days, add an end point as well
        if (startDate.getTime() !== endDate.getTime()) {
          topicGroups[treatment.master_topic].data.push({
            x: endDate,
            y: yValue,
            name: treatment.name + " (End)",
            topic: treatment.master_topic,
            startDate: treatment.start,
            endDate: treatment.end,
            duration: `${new Date(treatment.start).toLocaleDateString()} to ${new Date(treatment.end).toLocaleDateString()}`
          });
        }
      });
      
      // Extract datasets for Chart.js
      const datasets = Object.values(topicGroups);
      
      return { datasets };
    };

    const { datasets } = processData();

    // Configure options for the Chart.js timeline
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'month',
            displayFormats: {
              month: 'MMM yyyy'
            }
          },
          title: {
            display: true,
            text: 'Treatment Timeline'
          }
        },
        y: {
          reverse: false, // We're manually decreasing y-values
          min: 0,
          max: data.length,
          title: {
            display: true,
            text: 'Treatment Progress'
          },
          ticks: {
            stepSize: 1,
            callback: function(value) {
              if (value === 0) return 'End of Treatment';
              if (value === data.length) return 'Start of Journey';
              return '';
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: function(context) {
              const data = context[0].raw;
              return data.name;
            },
            label: function(context) {
              const data = context.raw;
              return [
                `Topic: ${data.topic}`,
                `Date: ${new Date(data.x).toLocaleDateString()}`,
                `Duration: ${data.duration}`
              ];
            }
          }
        },
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            usePointStyle: true
          }
        }
      },
      interaction: {
        mode: 'nearest',
        intersect: false
      }
    };

    // Create new chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: { datasets },
      options: options
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="w-full h-96">
      <canvas ref={chartRef} />
    </div>
  );
};

// Example usage with sample data
const TreatmentTimelineContainer = () => {
  // Sample treatment journey data - replace with your actual data
  const sampleData = [
    {
      id: 1,
      arcus_id: 1,
      name: "Initial Diagnosis",
      start: "2023-01-15T00:00:00.000Z",
      end: "2023-01-15T00:00:00.000Z",
      color: "rgba(255, 99, 132, 0.8)",
      master_topic: "Medical Appointments",
      mainStart: "2023-01-01T00:00:00.000Z",
      mainEnd: "2023-12-31T00:00:00.000Z"
    },
    {
      id: 2,
      arcus_id: 1,
      name: "Surgery",
      start: "2023-02-05T00:00:00.000Z",
      end: "2023-02-07T00:00:00.000Z",
      color: "rgba(54, 162, 235, 0.8)",
      master_topic: "Procedures",
      mainStart: "2023-01-01T00:00:00.000Z",
      mainEnd: "2023-12-31T00:00:00.000Z"
    },
    {
      id: 3,
      arcus_id: 1,
      name: "Chemotherapy",
      start: "2023-03-01T00:00:00.000Z",
      end: "2023-08-30T00:00:00.000Z",
      color: "rgba(255, 206, 86, 0.8)",
      master_topic: "Treatments",
      mainStart: "2023-01-01T00:00:00.000Z",
      mainEnd: "2023-12-31T00:00:00.000Z"
    },
    {
      id: 4,
      arcus_id: 1,
      name: "Oncologist Follow-up",
      start: "2023-04-15T00:00:00.000Z",
      end: "2023-04-15T00:00:00.000Z",
      color: "rgba(147, 112, 219, 0.8)",
      master_topic: "Medical Appointments",
      mainStart: "2023-01-01T00:00:00.000Z",
      mainEnd: "2023-12-31T00:00:00.000Z"
    },
    {
      id: 5,
      arcus_id: 1,
      name: "Radiation Therapy",
      start: "2023-05-01T00:00:00.000Z",
      end: "2023-06-15T00:00:00.000Z",
      color: "rgba(75, 192, 192, 0.8)",
      master_topic: "Treatments",
      mainStart: "2023-01-01T00:00:00.000Z",
      mainEnd: "2023-12-31T00:00:00.000Z"
    },
    {
      id: 38,
      arcus_id: 1,
      name: "Oncologist Consultation",
      start: "2023-12-18T00:00:00.000Z",
      end: "2023-12-18T00:00:00.000Z",
      color: "rgba(147, 112, 219, 0.8)",
      master_topic: "Medical Appointments",
      mainStart: "2023-01-01T00:00:00.000Z",
      mainEnd: "2023-12-31T00:00:00.000Z"
    }
  ];

  return (
    <div className="w-full p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Cancer Treatment Journey Timeline</h2>
      <div className="w-full h-full">
        <CancerTreatmentTimeline data={sampleData} />
      </div>
    </div>
  );
};

export default TreatmentTimelineContainer;
