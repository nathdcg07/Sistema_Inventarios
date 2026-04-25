import ListaPedidos from "../components/listaPedidos";
import { pedidos as datosPedidos } from "../data/pedidos"; 
import NavBar from "../components/navbar";


export default function PedidosPage({pedidos}) {
    return(
        <div className="p-4 border-amber-100 rounded-xl shadow-md mt-4 hover:scale-[1.02] transition-all duration-300">
             <ListaPedidos pedidos={datosPedidos} />
                {/* <h2 className="text-2xl font-bold mb-4 text-black/50 text-center">Lista de Pedidos</h2>
            <div className="grid grid-cols-4 gap-4 pb-2 border-b">
                <h3 className="text-lg font-semibold mb-2 text-black/50">Producto</h3>
                <h3 className="text-lg font-semibold mb-2 text-black/50">Unidades</h3>
                <h3 className="text-lg font-semibold mb-2 text-black/50">Estado</h3>
                <h3 className="text-lg font-semibold mb-2 text-black/50">Tiempo de Entrega</h3>
            </div>
            {pedidos.map((p)=>(
                <div key={p.id} className="border-b py-2 justify-center grid grid-cols-4 gap-4 rounded-lg hover:bg-amber-100 transition-color sitems-center">
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
            ))} */}
        </div>
    );
}