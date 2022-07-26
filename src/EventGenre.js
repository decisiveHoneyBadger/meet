import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);
  const colors = ['#0000FF', '#D2691E', '#008000', '#FFD700', '#00ffff'];

  const getData = () => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    const filterEvents = genres.map((genre) => {
      const value = events.filter((event) =>
        event.summary.split(' ').includes(genre),
      ).length;
      return {
        name: genre,
        value: value || 1,
      };
    });
    setData(filterEvents);
  };

  useEffect(() => {
    getData();
  }, [events]);
  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
              name={entry.name}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
