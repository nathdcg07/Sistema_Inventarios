"use client"; // 1. Indica que es un componente de cliente
import { useState } from "react"; // 2. Importa el hook useState
import Grafico from "../components/grafico"; // 3. Importa el componente Grafico
import { pedidos } from "../data/pedidos";
import {simularSistema} from "../services/simulador";
import Resultados from "../components/resultados";
import guardarProducto, { actualizarProducto } from "../services/productosService";
import {guardarSimulacion, guardarPedidoSimulado} from "../services/pedidoService"

export default function ListaPedidos({pedidos, onSimular, productos, clientes}) {
    // const [stock, setStock] = useState("");
    // const [demanda, setDemanda] = useState("");
    const [dias, setDias] = useState("");
    const [data, setData] = useState([]);
    
    //para la barra de tiempos de entrega y dias repo
    const [progreso, setProgreso] = useState(0);
    const [estaSincronizando, setEstaSincronizando] = useState(false);

    // 2. Modifica la función handleSimular para guardar el resultado
    const handleSimular = async () => {
        console.log("Productos recibidos:", typeof productos, Array.isArray(productos));

        // valida los productos dispinibles
        if(!productos || !Array.isArray(productos)){
            alert("No hay productos cargados para simular");
            return;
        }
        
        const numDias = Number(dias) || 30;
        // Le pasamos los días que el usuario escribió
        const resultado = simularSistema(productos,numDias, clientes); // Asegúrate de pasar también los clientes si el simulador los necesita
        
        // Guardamos los datos simulados aquí para que la gráfica los tome
        setData(resultado); 
        
        if (typeof onSimular === "function") { 
            onSimular({ dias:numDias, productos, resultado });
        }
        
    };

    const handleSincronizarBD = async ()=>{
            //simula una validacion previa 
            if(!data || !data.datosTabla || data.datosTabla.length === 0){
                alert("Primero ejecuta una simulación para tener datos que sincronizar!");
                return;
            }

            try{
                //recorre los datos de nuestra tabla resultante y usamos for para las actualizaciones esten en orden
                for(const p of data.datosTabla){
                    const productoOriginal=productos.find(prod => prod.nombre === p.producto);

                    if(productoOriginal && productoOriginal.id){
                        await actualizarProducto(productoOriginal.id, {
                            stock: p.stockFinal,
                            estado: p.estado
                        });
                    }
                }
                alert("Base de datos sincronizada con los resultados de la simulacion!");
            }catch (error){
                console.error("Error! sincronizando:", error);
                alert("Hubo un problema al sincronizar productos.");
            }
        };


    return (
        <div className="p-4 border-none">
            <div className="flex flex-col sm:flex-row items-center gap-4">
                    <input
                        type="number"
                        value={dias}
                        onChange={e => setDias(e.target.value)}
                        placeholder="Días a simular (Ej:30)"
                        className="flex-1 text-gray-700 p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                    />
                    <button
                        onClick={handleSimular}
                        disabled={estaSincronizando}
                        className="w-full sm:w-auto bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 font-bold disabled:bg-gray-400"
                    >
                        Ejecutar Simulación
                    </button>
                    <button 
                        onClick={handleSincronizarBD}
                        disabled={estaSincronizando}
                        className="w-full sm:w-auto bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 font-bold disabled:bg-gray-400"
                    >
                        {estaSincronizando ? "Procesando..." : "Sincronizar con BD"}
                    </button>
                </div>

                {/* RESULTADOS VISUALES OPTIMIZADOS */}
                    {data && !estaSincronizando && (
                        // 1. DEPURE: Quitamos los efectos de hover:scale y transiciones de este div contenedor
                        <div className="space-y-12 mt-10">
                            
                            {/* El Gráfico */}
                            <Grafico data={data.datosGrafico} />

                            {/* Las Métricas Globales */}
                            {data?.metricasGlobales && (
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-green-100 p-4 rounded-xl text-center border border-green-200">
                                        <p className="text-sm text-green-600 font-bold uppercase">Pedidos Completados</p>
                                        <p className="text-3xl font-black text-green-700">{data.metricasGlobales.totalCompletados}</p>
                                    </div>
                                    <div className="bg-red-100 p-4 rounded-xl text-center border border-red-200">
                                        <p className="text-sm text-red-600 font-bold uppercase">Pedidos Faltantes</p>
                                        <p className="text-3xl font-black text-red-700">{data.metricasGlobales.totalFaltantes}</p>
                                    </div>
                                </div>
                            )}

                            {/* 2. DEPURE: Encapsulamos la tabla en un contenedor con scroll propio */}
                            {/* Esto evita que las miles de filas recarguen el scroll de la ventana principal */}
                            <div className="max-h-[600px] overflow-y-auto border border-gray-100 rounded-2xl p-2 bg-white shadow-sm">
                                <Resultados data={data} />
                            </div>
                        </div>
                    )}

            </div>   
    );
}