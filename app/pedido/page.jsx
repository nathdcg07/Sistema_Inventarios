"use client";

import { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import {db} from "@/app/firebase";
import ListaPedidos from "../components/listaPedidos";
import { pedidos as datosPedidos } from "../data/pedidos"; 


export default function PedidosPage() {
    const [productosFirebase, setProductosFirebase] = useState([]);

    useEffect(()=>{
        //traemos a todos los productos reales de la nube

        const q = query(collection(db, "productos"));
        const unsuscribe = onSnapshot(q, (snapshot)=>{
            const lista = snapshot.docs.map(doc=>({
                id: doc.id,
                ...doc.data(),

                //aseguramos que el stock y # de repo sean números
                stock: Number(doc.data().stock) || 0,
                punto_reposicion: Number(doc.data().punto_reposicion) || 0,
            }));
            setProductosFirebase(lista);
        });
        return ()=>unsuscribe();
    }, []);


    return(
        <div className="p-4 border-amber-100 rounded-xl shadow-md mt-4 hover:scale-[1.02]">
             <ListaPedidos 
             pedidos={datosPedidos} 
             productos={productosFirebase}
             />
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