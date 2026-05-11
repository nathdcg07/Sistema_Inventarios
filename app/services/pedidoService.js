import { db } from "@/app/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const guardarSimulacion = async (datosSimulacion) =>{
    try{
        await addDoc(collection(db, "simulaciones"),{
            ...datosSimulacion,
            fecha: serverTimestamp()
        });
    }catch(error){
        console.error("Error al guardar el resumen: ", error)
    }
};

export const guardarPedidoSimulado = async (pedido) => {
    try{
        await addDoc(collection(db, "pedidos"),{
            ...pedido,
            fecha: new serverTimestamp(), //indica la hora del server
            tipo: "simulado"
        });

        console.log("Pedido guardado con éxito");

    }catch(error){
        console.error("Error al guardar el pedido: ", error);
    }
};

