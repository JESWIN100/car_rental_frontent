// src/components/admin/BookingsChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

// Register required components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const BookingsChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Bookings',
        data: [50, 75, 100, 125, 80, 95, 110, 120, 130, 85, 90, 100],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Bookings: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Bookings',
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default BookingsChart;
