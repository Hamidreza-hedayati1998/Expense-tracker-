import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#F44336', '#43A047', '#29B6F6', '#F4511E'];

const PiCharts = ({ data, totalValue }) => {
  return (
    <div>
      <PieChart width={400} height={400} >
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length > 0) {
              const { name, value } = payload[0];
              const percentage = ((value / totalValue) * 100).toFixed(2);
              return (
                <div className="bg-[#1b1648] p-2 border rounded shadow">
                  <p>{`${name}: ${value}$ (${percentage}%)`}</p>
                </div>
              );
            }
            return null;
          }}
        />
      </PieChart>
    </div>
  );
};

export default PiCharts;