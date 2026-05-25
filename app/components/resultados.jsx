"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, User, Phone, MapPin, Clock, ShoppingBag } from "lucide-react";

export default function Resultados({ data }) {
    // Estado para saber qué fila de pedido está abierta (guarda el index, null significa todas cerradas)
    const [idFilaAbierta, setIdFilaAbierta] = useState(null);

    // Si no hay datos de simulación listos, no mostramos nada
    if (!data || !data.pedidosPorCliente || data.pedidosPorCliente.length === 0) return null;

    const toggleFila = (index) => {
        // Si haces clic en la misma que está abierta, la cierra; si no, abre la nueva
        setIdFilaAbierta(idFilaAbierta === index ? null : index);
    };

    return (
        <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg text-gray-700 border border-gray-100 animate-in fade-in duration-300">
            <h2 className="text-2xl font-black mb-2 text-center text-purple-900 uppercase tracking-wider">
                Trazabilidad de Entregas Simuladas
            </h2>
            <p className="text-xs text-center text-gray-400 mb-6 italic">
                * Haz clic en cualquier pedido para desplegar los detalles de la orden y del cliente.
            </p>

            {/* CABECERA DE LA TABLA */}
            <div className="grid grid-cols-12 gap-4 pb-3 font-bold text-gray-500 border-b border-gray-100 text-xs uppercase tracking-wider px-4">
                <span className="col-span-2 text-center">Día</span>
                <span className="col-span-5">Producto Solicitado</span>
                <span className="col-span-2 text-center">Cantidad</span>
                <span className="col-span-2 text-center">Estado</span>
                <span className="col-span-1 text-right">Detalle</span>
            </div>

            {/* LISTA DE PEDIDOS CON ACORDEÓN DESPLEGABLE */}
            <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto pr-2 mt-2">
                {data.pedidosPorCliente.map((item, index) => {
                    const estaAbierto = idFilaAbierta === index;

                    return (
                        <div key={item.id_pedido || index} className="py-1">
                            {/* FILA PRINCIPAL CLICKEABLE */}
                            <div
                                onClick={() => toggleFila(index)}
                                className={`grid grid-cols-12 gap-4 py-3 px-4 items-center text-sm rounded-xl cursor-pointer transition-all select-none
                                    ${estaAbierto ? "bg-purple-50/70 shadow-sm" : "hover:bg-gray-50"}`}
                            >
                                <span className="col-span-2 text-center font-mono font-bold text-purple-700 bg-purple-100/50 py-0.5 px-2 rounded-lg w-max mx-auto">
                                    Día {item.dia}
                                </span>
                                <span className="col-span-5 font-medium text-gray-900 truncate" title={item.producto}>
                                    {item.producto}
                                </span>
                                <span className="col-span-2 text-center font-mono font-semibold text-gray-600">{item.unidades} u.</span>
                                
                                {/* Badge de Estado */}
                                <div className="col-span-2 flex justify-center">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black text-white text-center w-24 shadow-sm uppercase tracking-wide
                                        ${item.estado === "en_camino" ? "bg-cyan-500" : ""}  
                                        ${item.estado === "entregado" ? "bg-green-500" : ""}
                                        ${item.estado === "preparando" ? "bg-amber-500" : ""}
                                        ${item.estado === "solo_queda_1_unidad" ? "bg-yellow-400 text-gray-800" : ""}
                                        ${item.estado === "sin_stock" ? "bg-red-600" : ""}
                                    `}>
                                        {item.estado ? item.estado.replace("_", " ") : "entregado"}
                                    </span>
                                </div>

                                {/* Icono de flechita */}
                                <span className="col-span-1 flex justify-end text-gray-400">
                                    {estaAbierto ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </span>
                            </div>

                            {/* --- LISTA DESPLEGABLE (DETALLES DEL CLIENTE) --- */}
                            {estaAbierto && (
                                <div className="mx-4 my-2 p-4 bg-gray-50 rounded-xl border border-purple-100/60 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-200">
                                    
                                    {/* Bloque Izquierdo: Ficha del Cliente */}
                                    <div className="space-y-2 border-r border-gray-200/60 pr-2">
                                        <p className="text-xs font-bold uppercase tracking-wider text-purple-800 flex items-center gap-1">
                                            <User size={12} /> Información del Cliente
                                        </p>
                                        <p className="text-sm font-semibold text-gray-800">{item.clienteNombre}</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            <Phone size={12} /> {item.clienteTelefono}
                                        </p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1 truncate" title={item.clienteDireccion}>
                                            <MapPin size={12} /> {item.clienteDireccion} ({item.clienteCiudad})
                                        </p>
                                    </div>

                                    {/* Bloque Derecho: Ficha Logística */}
                                    <div className="space-y-2 flex flex-col justify-center">
                                        <p className="text-xs font-bold uppercase tracking-wider text-purple-800 flex items-center gap-1">
                                            <Clock size={12} /> Logística de Despacho
                                        </p>
                                        <p className="text-xs text-gray-600 flex items-center gap-1">
                                            <ShoppingBag size={12} /> <span className="font-medium">Volumen solicitado:</span> {item.unidades} unidades físicas.
                                        </p>
                                        <p className="text-xs text-gray-600 flex items-center gap-1">
                                            <Clock size={12} /> <span className="font-medium">Tiempo de viaje estimado:</span> {item.tiempoEntrega}
                                        </p>
                                        <p className="text-xs italic text-gray-400 font-medium">
                                            * ID de tracking único: {item.id_pedido}
                                        </p>
                                    </div>

                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
