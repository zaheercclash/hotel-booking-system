"use client";

import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
} from "chart.js";
import { FC } from "react";
import { Bar } from "react-chartjs-2";

import { Booking } from "@/models/booking";

ChartJS.register(Tooltip, CategoryScale, LinearScale, BarElement, Legend);

const Chart: FC<{ userBookings: Booking[] }> = ({ userBookings }) => {
  const sortedBookings = [...userBookings].sort(
    (a, b) => b.totalPrice - a.totalPrice
  );
  const labels = sortedBookings.map((booking) => {
    const roomName = booking.hotelRoom?.name || "Unknown Room";
    return roomName.length > 20 ? roomName.substring(0, 20) + "..." : roomName;
  });
  const amountSpent = sortedBookings.map((booking) => booking.totalPrice);
  const totalAmount = amountSpent.reduce((sum, amount) => sum + amount, 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Amount Spent",
        data: amountSpent,
        backgroundColor: "#3B82F6",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `$${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return `$${value}`;
          },
        },
      },
    },
  };

  if (userBookings.length === 0) {
    return (
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">No booking data available for charts.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Amount Spent</h2>
        <p className="text-gray-600">
          Total: <span className="font-bold">${totalAmount}</span>
        </p>
      </div>
      <div className="h-80">
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
};

export default Chart;
