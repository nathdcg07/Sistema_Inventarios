"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

export default function Grafico({ data }) {
    // Si no hay datos todavía, no dibujamos nada
    if (!data || data.length === 0) return null;

    return (
        <div className='bg-white p-4 rounded-xl shadow-sm'>
            <h3 className='text-center font-bold text-gray-600 mb-4'>Evolucion de Inventario vs Demanda</h3>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="dia" label={{value:'Dia', position: 'insideBottom', offset:-5}}/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>

                    <Line type="monotone" dataKey="stock" stroke='#8884d8' name='Stock Total' strokeWidth={3}/>
                    <Line type="monotone" dataKey="demanda" stroke='#ff7300' name="Demanda (Pedidos)" strokeDasharray="5 5"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
