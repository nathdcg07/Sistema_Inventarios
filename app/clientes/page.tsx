"use client"

import { useEffect, useState } from "react";
import ImportadorClientes from "../components/importadorClientes";
import { db } from "@/app/firebase";
import { collection, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";

export default function ClientesPage() {
    const [clientesFirebase, setClientesFirebase] = useState<any[]>([]);

    useEffect(() => {
        const q = query(collection(db, "clientes"));
        
        // Forma unificada y moderna de escuchar Firestore
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const lista = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setClientesFirebase(lista);
        });

        return () => unsubscribe();
    }, []);

    const [borrando, setBorrando] = useState(false);
        const limpiarBDClientes = async ()=>{
            const confirmacion1 = window.confirm("¿Estás seguro de que quieres eliminar TODOS los clientes? Esta acción no se puede deshacer.");
            if (!confirmacion1) return;

            const  confirmacion2 = window.confirm("!ESTA ES LA ÚLTIMA ADVERTENCIA! ¿Realmente quieres eliminar TODOS los clientes? Esta acción es irreversible.");
            if (!confirmacion2) return;
            setBorrando(true);

            try {
                let contador = 0;
                const total = clientesFirebase.length;

                for (const cliente of clientesFirebase) {
                    if (cliente.id) {
                        const clienteRef = doc(db, "clientes", cliente.id);
                        await deleteDoc(clienteRef);
                        contador++;
                        console.log(`Eliminando cliente ${contador} de ${total}...`);
                    }
            }
            alert(`¡Clientes eliminados exitosamente! Total eliminados: ${contador}`);
        }catch (error) {
            console.error("Error al eliminar clientes:", error);
            alert("Ocurrió un error al eliminar los clientes. Revisa la consola para más detalles.");
        } finally {
            setBorrando(false);
        }
    }

    return (
        <div className="container mx-auto p-6 bg-white min-h-screen text-gray-800">
            <h1 className="text-3xl font-black mb-6 text-center text-purple-800 uppercase tracking-wider">
                Gestión de Clientes Masivos
            </h1>

            {/* El importador no necesita propiedades, hace su trabajo directo a la nube */}
            <ImportadorClientes />

            {/* LISTA DE CLIENTES EN TIEMPO REAL */}
            <div className="mt-8 bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex justify-end mb-4">
                {clientesFirebase.length > 0 && (
                            <button
                                onClick={limpiarBDClientes}
                                disabled={borrando}
                                className="w-full sm:w-auto bg-red-700 text-white font-bold px-4 py-2 rounded-xl shadow-md transition-all active:scale-95 disabled::bg-gray-400 text-sm cursor-pointer"
                                >
                                    {borrando ? "Eliminando clientes..." : "Limpiar Base de Datos de Clientes"}
                                </button>
                        )}
                    </div>
                <h2 className="text-xl font-bold mb-4 text-gray-600">
                    Clientes en la Base de Datos ({clientesFirebase.length})
                </h2>

                {clientesFirebase.length === 0 ? (
                    <p className="text-sm text-gray-400 italic text-center py-4">
                        No hay clientes registrados. Sube un archivo Excel para comenzar.
                    </p>
                    
                    
                ) : (
                    <div className="overflow-x-auto max-h-96">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b text-gray-400 text-sm font-semibold uppercase">
                                    <th className="pb-2">Nombre / Razón Social</th>
                                    <th className="pb-2">Teléfono</th>
                                    <th className="pb-2">Dirección</th>
                                    <th className="pb-2">Ciudad</th>    
                                </tr>
                            </thead>
                            <tbody className="divide-y text-sm text-gray-600">
                                {clientesFirebase.map((c) => (
                                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-2">{c.nombre}</td>
                                        <td className="py-2">{c.telefono}</td>
                                        <td className="py-2">{c.direccion}</td>
                                        <td className="py-2">{c.ciudad}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                
            </div>
            
        </div>
    );
}
