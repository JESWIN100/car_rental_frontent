// src/components/admin/RevenueChart.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { fetchBookings } from '../../../services/bookingApi'; // Adjust import based on your project structure

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const RevenueChart = () => {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchAndCalculateRevenue = async () => {
      try {
        const bookings = await fetchBookings(); // Fetch booking data
        const revenueByMonth = new Array(12).fill(0); // Initialize array for 12 months

        bookings.forEach(booking => {
          const startDate = new Date(booking.startDate);
          const endDate = new Date(booking.endDate);
          const ratePerDay = parseFloat(booking.carDetails.pricePerDay); // Convert to number
          const diffInMilliseconds = endDate - startDate;
          const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24)); // Round up to the nearest day
          const total = diffInDays * ratePerDay;

          const month = startDate.getMonth(); // Get month index (0 for Jan, 1 for Feb, etc.)
          revenueByMonth[month] += total; // Add revenue to corresponding month
        });
// console.log(month);

        setRevenueData(revenueByMonth);
      } catch (error) {
        console.error("Error fetching or processing booking data:", error);
      }
    };

    fetchAndCalculateRevenue();
  }, []);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: revenueData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
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
            return `Revenue: $${context.raw}`;
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
          text: 'Revenue ($)',
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default RevenueChart;
