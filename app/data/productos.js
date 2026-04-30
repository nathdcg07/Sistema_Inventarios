import { db } from "@/app/firebase";
import { collection, addDoc } from "firebase/firestore";
import { exp } from "firebase/firestore/pipelines";

// Dejamos los arreglos vacíos pero EXPORTADOS para que no den error 404
export const bazar = [];
export const decoracion = [];
export const jugueteria = [];
export const libreria = [];
export const destilados = [];
export const licores=[];
export const readyToDrink=[];
export const vinos=[];
export const cervezas=[];
export const aguas=[];
export const aguasSab=[];
export const aperitivos=[];
export const bebDep=[];
export const gaseosas=[];
export const jugos=[];
export const cuidado=[];
export const papillas=[];
export const panales=[];
export const carbones=[];
export const cerdo=[];
export const pescados=[];