import {db} from "@/app/firebase";
import {collection, addDoc} from "firebase/firestore";

export const guardarSimulacion = async (datos) => {
    try{
        await addDoc(collection(db, "simulaciones"), {
            resultado,
            fecha: new Date()
        });
        
        console.log("Simulación guardada con éxito");

    } catch (error) {
        console.error("Error al guardar la simulación:", error);
    }
};