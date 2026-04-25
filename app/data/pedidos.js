import {db} from "@/app/firebase";
import { collection, addDoc } from "firebase/firestore";


export const pedidos =[
    {   
        id: 1,
        producto: "Paracetamol - 100 mg",
        unidades: 20,
        estado: "en_camino",
        tiempoEntrega: 30
    }, 
    {
        id:2, 
        producto: "Fernet Branca 750 ml + Coca Cola 2 L",
        unidades: 3,
        estado: "entregado",
        tiempoEntrega: 0 
    },
    {
        id: 3, 
        producto: "Fernet Branca 1 L",
        unidades: 5,
        estado: "sin_stock",
        tiempoEntrega: null
    },
    {
        id: 4, 
        producto: "Bebida Four Loko Rose 695 ml",
        unidades: 10,
        estado: "preparando",
        tiempoEntrega: 15
    },
];