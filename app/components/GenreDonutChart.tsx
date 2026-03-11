'use client';

import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function GenreDonutChart({
  data,
}: {
  data: { name: string; count: number }[];
}) {
  const COLORS = ['#6366F1', '#22C55E', '#F59E0B', '#EF4444', '#14B8A6'];

  const coloredData = data.map((entry, index) => ({
    ...entry,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={coloredData}
          dataKey="count"
          nameKey="name"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          animationDuration={800}
          animationEasing="ease-out"
        >
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
            <tspan x="50%" dy="-2em" className="fill-gray-400 text-sm">
              Género top
            </tspan>
            <tspan
              x="50%"
              dy="1.2em"
              className="fill-white text-lg font-semibold"
            >
              {data[0]?.name}
            </tspan>
          </text>
          <Tooltip
            contentStyle={{
              backgroundColor: '#EEE',
              border: '1px solid #334155',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#CBD5F5' }}
          />
          <Legend verticalAlign="bottom" height={30} iconType="circle" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
