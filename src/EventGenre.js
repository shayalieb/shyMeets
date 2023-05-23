import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const EventGenre = ({ events }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = () => {
            const genres = ['Music gigs', 'Finance', 'Freelance', 'Other'];
            const data = genres.map((genre) => {
                const value = events.filter((event) => event.summary.indexOf(genre) >= 0).length;
                return { name: genre, value };
            });
            return data
        }
        setData(() => getData());
    }, [events])


    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042',]

    return (
        <ResponsiveContainer height={400}>
            <PieChart width={400} height={400}>
                <Tooltip />
                <Legend verticalAlign="button" />
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}% `}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}

export default EventGenre;