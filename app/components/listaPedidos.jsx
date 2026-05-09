"use client"; // 1. Indica que es un componente de cliente
import { useState } from "react"; // 2. Importa el hook useState
import Grafico from "../components/grafico"; // 3. Importa el componente Grafico
import { pedidos } from "../data/pedidos";
import {simularSistema} from "../services/simulador";
import Resultados from "../components/resultados";
import { actualizarProducto } from "../services/productosService";

export default function ListaPedidos({pedidos, onSimular, productos}) {
    // const [stock, setStock] = useState("");
    // const [demanda, setDemanda] = useState("");
    const [dias, setDias] = useState("");
    // 1. Agrega este estado arriba con los demás
    const [data, setData] = useState([]);

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
        const resultado = simularSistema(productos,numDias); 
        
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



    return(
        <div className="p-4 border-amber-100 rounded-xl shadow-md mt-4 hover:scale-[1.02] transition-all duration-300  border-none">
             {/*   <h2 className="text-2xl font-bold mb-4 text-black/50 text-center">Lista de Pedidos</h2>
             <div className="grid grid-cols-4 gap-4 pb-2 border-b ">
                <h3 className="text-lg font-semibold mb-2 text-black/50">Producto</h3>
                <h3 className="text-lg font-semibold mb-2 text-black/50">Unidades</h3>
                <h3 className="text-lg font-semibold mb-2 text-black/50">Estado</h3>
                <h3 className="text-lg font-semibold mb-2 text-black/50">Tiempo de Entrega</h3>
            </div> */}

            
            {pedidos?.map((p)=>(
                <div key={p.id} className="border-b py-2 justify-center grid grid-cols-4 gap-4 rounded-lg border-amber-50 transition-colorsitems-center">
                    {/* <span className="text-gray-500"> {p.producto} </span>
                    <span className="text-gray-500 text-center"> {p.unidades} </span> */}
                    <div className="flex justify-center">
                    <span className={`px-3 py-1 rounded-lg border-none text-sm items-center justify-center w-max
                            ${p.estado === "en_camino" ? "bg-cyan-400":""}
                            ${p.estado === "entregado" ? "bg-green-500":""}
                            ${p.estado === "preparando" ? "bg-yellow-300": ""}
                            ${p.estado === "sin_stock" ? "bg-red-700":""}
                        `}> {p.estado.replace ("_", " ")} </span>
                        </div>
                    <span className="text-sm text-gray-500"> Tiempo de entrega: {p.tiempoEntrega} </span>
                </div>
            ))}

            
            <div className="mt-8 p-6 hover:scale-[1.02] transition-all duration-300  rounded-lg border-none">
                <h2 className="text-2xl font-bold mb-4 text-gray-500 text-center">Simulación de Inventario</h2>

                <div className="flex items-center gap-4">
                    <input
                        type="number"
                        value={dias}
                        onChange={e => setDias(e.target.value)}
                        placeholder="Días a simular (Ej:30)"
                        className="flex-1 text-gray-500 p-2 border rounded-lg focus:ring-purple-400 outline-none"
                    />
                <button
                    onClick={handleSimular}
                    className="w-full sm:w-auto mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-300 justify-between items-center cursor-pointer"
                >
                    Ejecutar Simulación
                </button>
                <button 
                    onClick={handleSincronizarBD}
                    className="w-full sm:w-auto mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-color duration-300 justify-between items-center cursor-pointer"
                >
                    Sincronizar con BD
                </button>
                </div>
                {data &&(
                    <div className="space-y-12 animate-in fade-in duration-500">
                        <Grafico data={data.datosGrafico} />
                        <Resultados data={data.datosTabla} />
                    </div>
                )}
            </div>   
            </div>

    );
}