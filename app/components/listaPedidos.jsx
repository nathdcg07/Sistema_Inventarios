"use client"; // 1. Indica que es un componente de cliente
import { useState } from "react"; // 2. Importa el hook useState
import Grafico from "../components/grafico"; // 3. Importa el componente Grafico
import { pedidos } from "../data/pedidos";
import {simularSistema} from "../services/simulador";

export default function ListaPedidos({pedidos, onSimular}) {
    const [stock, setStock] = useState("");
    const [demanda, setDemanda] = useState("");
    const [dias, setDias] = useState("");
    // 1. Agrega este estado arriba con los demás
    const [data, setData] = useState([]);

    // 2. Modifica la función handleSimular para guardar el resultado
    const handleSimular = (params) => {
        // Le pasamos los días que el usuario escribió
        const resultado = simularSistema(Number(dias)); 
        
        // Guardamos los datos simulados aquí para que la gráfica los tome
        setData(resultado); 
        
        if (typeof onSimular === "function") {
            onSimular({ stock, demanda, dias });
        }
    };



    return(
        <div className="p-4 border-amber-100 rounded-xl shadow-md mt-4 hover:scale-[1.02] transition-all duration-300  border-none">
                <h2 className="text-2xl font-bold mb-4 text-black/50 text-center">Lista de Pedidos</h2>
            <div className="grid grid-cols-4 gap-4 pb-2 border-b ">
                <h3 className="text-lg font-semibold mb-2 text-black/50">Producto</h3>
                <h3 className="text-lg font-semibold mb-2 text-black/50">Unidades</h3>
                <h3 className="text-lg font-semibold mb-2 text-black/50">Estado</h3>
                <h3 className="text-lg font-semibold mb-2 text-black/50">Tiempo de Entrega</h3>
            </div>
            {pedidos?.map((p)=>(
                <div key={p.id} className="border-b py-2 justify-center grid grid-cols-4 gap-4 rounded-lg border-amber-50 transition-colorsitems-center">
                    <span className="text-gray-500"> {p.producto} </span>
                    <span className="text-gray-500"> {p.unidades} </span>
                    <span className={`px-2 py-1 rounded-lg border-none text-white text-sm items-center justify-center w-max
                            ${p.estado === "en_camino" ? "bg-cyan-400":""}
                            ${p.estado === "entregado" ? "bg-green-500":""}
                            ${p.estado === "preparando" ? "bg-yellow-300": ""}
                            ${p.estado === "sin_stock" ? "bg-red-700":""}
                        `}> {p.estado} </span>
                    <span className="text-sm text-gray-500"> Tiempo de entrega: {p.tiempoEntrega} </span>
                </div>
            ))}
            <div className="mt-4 hover:scale-[1.02] transition-all duration-300  p-4 rounded-lg border-none">
                <h2 className="text-2xl font-bold mb-4 text-gray-500 text-center">Simulación de Inventario</h2>
            <div className="justify-between grid grid-cols-4 gap-4 pb-2 border-b items-center">
                    <h3 className="w-full mb-4 p-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white text-gray-700">Simular</h3>
                <input type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="Stock inicial" className="w-full mb-4 p-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white text-gray-700"/>
                <input type="number" value={demanda} onChange={e => setDemanda(e.target.value)} placeholder="Demanda promedio" className="w-full mb-4 p-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white text-gray-700" />
                <input type="number" value={dias} onChange={e => setDias(e.target.value)} placeholder="Días" className="w-full mb-4 p-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white text-gray-700" />

            </div>
            <div className="flex justify-center mb-8 border-b pb-4">
                <div className="text-sm font-semibold px-4 py-2 rounded-lg border-none uppercase transition-colors duration-300 text-black/40 justify-between items-center hover:text-cyan-400 mt-4">
                <button
                    onClick={() => handleSimular({ stock: Number(stock), demanda: Number(demanda), dias: Number(dias) })}
                    className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-300 justify-between items-center cursor-pointer"
                >
                    Simular
                </button>
                <Grafico data={data} />

            </div>   
            </div>
            </div>
        </div>

    );
}