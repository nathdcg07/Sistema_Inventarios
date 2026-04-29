export default function Resultados({data}) {
    if (!data || data.length === 0) return null;

    return(
        <div className ="mt-6 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Resultados de la Simulación</h2>
            <div className="grid grid-cols-5 gap-4 border-none pb-2 font-semibold text-gray-500">
                <span>Producto</span>
                <span>Stock Inicial</span>
                <span>Demanda Simulada</span>
                <span>Stock Final</span>
                <span>Estado</span>
            </div>
            {data.map((item, index)=>(
                <div
                    key={index} 
                    className="grid grid-cols-5 gap-4 border-none py-3 rounded-lg transition-colors items-center justify-center hover:bg-gray-50 text-gray-500">
                    <span>{item.producto}</span>
                    <span>{item.stockInicial}</span>
                    <span>{item.demandaSimulada}</span>
                    <span>{item.stockFinal}</span>
                    <span
                        className={`
                                font-semibold px-2 py-1 rounded-lg border-none  text-sm items-center justify-center w-max
                                ${item.estado === "en_camino" ? "text-cyan-500":""}  
                                ${item.estado === "entregado" ? "text-green-500":""}
                                ${item.estado === "solo_queda_1_unidad" ? "text-yellow-400":""}
                                ${item.estado === "sin_stock" ? "text-red-700":""}
                                `}   
                    >{item.estado}</span>
                </div>
            ))}
        </div>
    );

}