import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export const guardarPedido = async (pedido) => {
    try{
        await addDoc(collection(db, "pedidos"), pedido);
        console.log("Pedido guardado con éxito");
    }catch(error){
        console.error("Error al guardar el pedido: ", error);
    }
};