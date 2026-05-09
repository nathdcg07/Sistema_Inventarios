import { db } from "@/app/firebase"
import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";

// --- CREATE (Guardar con validaciones y duplicados) ---
export const guardarProducto = async (datos, id=null) => {
    const { nombre, precio } = datos;

    // 1. Validación básica
    if (!nombre.trim() || !precio.trim()) {
        alert("¡El nombre y el precio son obligatorios!");
        return;
    }

    try {
        const productosRef = collection(db, "productos");

        if(id){
            const productRef = doc (db, "productos", id);
            await updateDoc (productRef, datos);
            alert("Producto Actualizado!");
            return;
        }

        // 2. Validación de DUPLICADOS
        const q = query(productosRef, where("nombre", "==", nombre.trim()));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            alert("¡Ya existe un producto con este nombre!");
            return;
        }

        // 3. Guardar si todo está bien
        await addDoc(productosRef, {
            ...datos,
            fechaCreacion: new Date()
        });
        alert("¡Guardado con éxito!");

    } catch (error) {
        console.error("Error:", error);
    }
};

// --- UPDATE (Actualizar datos) ---
export const actualizarProducto = async (id, nuevosDatos) => {
    try {
        const productoRef = doc(db, "productos", id);
        await updateDoc(productoRef, nuevosDatos);
        //alert("¡Actualizado con éxito!");
    } catch (error) {
        console.error("Error al actualizar:", error);
    }
};

// --- DELETE (Borrar producto) ---
export const borrarProducto = async (id) => {
    if (window.confirm("¿Estás segura de que quieres eliminar este producto?")) {
        try {
            const productoRef = doc(db, "productos", id);
            await deleteDoc(productoRef);
            alert("¡Eliminado!");
        } catch (error) {
            console.error("Error al borrar:", error);
        }
    }
};


export default guardarProducto;
