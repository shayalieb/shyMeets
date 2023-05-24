import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
//import './EventGenre.css'

const EventGenre = ({ events }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = () => {
            const genres = ['Family', 'Finance', 'Gigs', 'Reminders', 'Tasks'];
            const data = genres.map((genre) => {
                const value = events.filter((event) => event.summary.indexOf(genre) >= 0).length;
                return { name: genre, value };
            });
            return data
        }
        setData(() => getData());
    }, [events])


    const colors = ['#5a303b', '#118d7e', '#f28500', '#4f86f7', '0047ab']

    return (
        <ResponsiveContainer className="pie-chart" height={400}>
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