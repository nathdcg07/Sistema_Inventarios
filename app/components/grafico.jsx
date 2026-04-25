"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function Grafico({ data }) {
    // Si no hay datos todavía, no dibujamos nada
    if (!data || data.length === 0) return null;

    return (
        <LineChart width={700} height={500} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dia" />
            <YAxis />
            <Tooltip />
            {/* Cambié 'inventario' por 'stock', que es lo que saca tu simulador */}
            <Line type="monotone" dataKey="stock" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
    );
}
