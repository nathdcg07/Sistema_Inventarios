import {db} from "@/app/firebase";
import { collection, addDoc } from "firebase/firestore";

export const bazar =[
    {
        id: 2,
        nombre: "Vasos Belen Desechables  (150 ml) 100 Unidades",
        precio: "Bs 11,4",
        punto_reposicion: 20,
        stock: 15
    },
    {
        id: 3,
        nombre: "Cubierto Cuchara Belén Blanco 10 unidades",
        precio: "Bs 3,1",
        punto_reposicion: 30,
        stock: 25
    },
    {
        id: 4,
        nombre: "Espuma Rey Momo Nieve Artificial 500 cm3",
        precio: "Bs 20",
        punto_reposicion: 10,
        stock: 5
    },
    {
        id: 5,
        nombre: "Encendedor Blacorp Sencillo Pequeño 1 Unidad",
        precio: "Bs 3,24",
        punto_reposicion: 50,
        stock: 40
    },
    {
        id: 6,
        nombre: "Mondadientes Paraná Bambú 100 Unidades",
        precio: "Bs 3,5",
        punto_reposicion: 30,
        stock: 20
    },
    {
        id: 7,
        nombre: "Plato Económico Belén Desechable 10 unidades",
        precio: "Bs 8,8",
        punto_reposicion: 15,
        stock: 10
    },
    {
        id: 8,
        nombre: "Papel Aluminio Diamond",
        precio: "Bs 42",
        punto_reposicion: 30,
        stock: 1
    },
    {
        id: 9,
        nombre: "Bombilla Corrugada Belén Multicolor (6 x 23 cm) 100 Unidades",
        precio: "Bs 6,9",
        punto_reposicion: 30,
        stock: 25
    },
    {
        id: 10,
        nombre: "Cubierto Belén Tenedor Blanco 10 unidades",
        precio: "Bs 3,5",
        punto_reposicion: 30,
        stock: 2
    },
    {
        id: 11,
        nombre: "Cubierto Belén Cuchillo Blanco 10 unidades",
        precio: "Bs 3",
        punto_reposicion: 20,
        stock: 15
    },
    {
        id: 12,
        nombre: "Encendedor Portátil Ronson Brillante Chispero 1 Unidad",
        precio: "Bs 27,5",
        punto_reposicion: 30,
        stock: 7
    },
    {
        id: 13,
        nombre: "Recipiente De Aluminio Capacidad Genérico 1050 ml",
        precio: "Bs 39,8",
        punto_reposicion: 30,
        stock: 1
    },
    {
        id: 14,
        nombre: "Papel Manteca Wyda (7.5 m x 29 cm) 1 Unidad",
        precio: "Bs 16,2",
        punto_reposicion: 20,
        stock: 15
    },
    {
        id: 15,
        nombre: "Recipiente De Aluminio Capacidad 220 ml Genérica 1 Unidad",
        precio: "Bs 14,4",
        punto_reposicion: 30,
        stock: 1
    },
    {
        id: 16,
        nombre: "Filme De Pvc Wyda (15 m) 1 Unidad",
        precio: "Bs 12,8",
        punto_reposicion: 20,
        stock: 1
    },
    {
        id: 17,
        nombre: "Papel Aluminio Diamond Trabajos Pesados (7.6 m) 1 Unidad",
        precio: "Bs 68",
        punto_reposicion: 30,
        stock: 1
    },
    {
        id: 18,
        nombre: "Recipiente De Aluminio Capacidad 500 ml Genérica 1 Unidad",
        precio: "Bs 25,4",
        punto_reposicion: 20,
        stock: 4
    },
    {
        id: 19,
        nombre: "Papel Aluminio Wyda Rollo (30 cm x 7.5 m) 1 Unidad",
        precio: "Bs 20,4",
        punto_reposicion: 20,
        stock: 2
    },
    {
        id: 20,
        nombre: "Recipiente Desechable Capacidad 500 ml Genérica 1 Unidad",
        precio: "Bs 27,5",
        punto_reposicion: 20,
        stock: 1
    },
    {
        id: 21,
        nombre: "Recipiente Desechable Capacidad 750ml Genérica 1 Unidad",
        precio: "Bs 37,7",
        punto_reposicion: 20,
        stock: 1
    },
    {
        id: 22,
        nombre: "Recipiente Desechable Capacidad 1000 ml Genérica 1 Unidad",
        precio: "Bs 37,4",
        punto_reposicion: 20,
        stock: 1
    },
    {
        id: 23,
        nombre: "6 Pack Espuma Rey Momo 500 Ml",
        precio: "Bs 120",
        punto_reposicion: 10,
        stock: 1
    },

];

export const decoracion = [
    {
        id: 24,
        nombre: "Sobre Con 1 Tarjeta Coleccionable De La Selección Boliviana",
        precio: "Bs 5",
        punto_reposicion: 50,
        stock: 30
    },
    {
        id: 25,
        nombre: "Caja Con 50 Sobres Coleccionables De La Selección Boliviana",
        precio: "Bs 250",
        punto_reposicion: 50,
        stock: 3
    },
];

export const jugueteria=[
    {
        id: 26,
        nombre: "Juegos De Cartas Uno 1 Unid",
        precio: "Bs 25,4",
        punto_reposicion: 20,
        stock: 1
    },
    {
        id: 27,
        nombre: "Juegos De Cartas Uno",
        precio: "Bs 24",
        punto_reposicion: 20,
        stock: 1
    },
];

export const libreria =[
    {
        id: 28,
        nombre: "Álbum De Figuritas Panini Copa América 2024 1 Unidad",
        precio: "Bs 14,5",
        punto_reposicion: 20,
        stock: 1
    },
];

export const destilados=[
    {
        id: 29,
        nombre: "Gin Queen Royale Dry 1 L",
        precio: "Bs 66,3",
        punto_reposicion: 10,
        stock: 10
    },
    {
        id: 30,
        nombre: "Gin Tónica Du Royale 275 ml",
        precio: "Bs 16,2",
        punto_reposicion: 30,
        stock: 10
    },
    {
        id: 31,
        nombre: "Pack Fernet Branca 1 L + Coca Cola 2 L",
        precio: "Bs 187",
        punto_reposicion: 20,
        stock: 10
    },
    {
        id: 32,
        nombre: "Pack Ron 37 Lenguas 1 L + Coca Cola 2 L",
        precio: "Bs 107",
        punto_reposicion: 20,
        stock: 15
    },
    {
        id: 33,
        nombre: "Combo Ron Havana 7 Años 700Ml + Coca Cola 2 L.",
        precio: "Bs 244,5",
        punto_reposicion: 40,
        stock: 25
    },
    {
        id: 34,
        nombre: "Vodka 1825 700 ml + 2 Latas Ginger Beer Doña María",
        precio: "Bs 157",
        punto_reposicion: 40,
        stock: 25
    },
    {
        id: 35,
        nombre: "Pack Gin Theros Dry Gin (1 L) + Sante Sport Frambuesa (1 L)",
        precio: "Bs 173,4",
        punto_reposicion: 10,
        stock: 5
    },
    {
        id: 36,
        nombre: "Bebida Flow Hard Zalzer Chuflay Botella 300 ml",
        precio: "Bs 19,7",
        punto_reposicion: 40,
        stock: 50
    },
    {
        id: 37,
        nombre: "Ginebra Gin Capitains 1 Litro + Sprite 2 L",
        precio: "Bs 157",
        punto_reposicion: 50,
        stock: 30
    },
    {
        id: 38,
        nombre: "Singani Casa Real Etiqueta Azul 750 ml",
        precio: "Bs 39,2",
        punto_reposicion: 40,
        stock: 25
    },
    {
        id: 39,
        nombre: "Bebida Flow Nene Sunrise Botella 300 ml",
        precio: "Bs 16,47",
        punto_reposicion: 50,
        stock: 35
    },
    {
        id: 40,
        nombre: "Singani Casa Real Etiqueta Negra 750 ml",
        precio: "Bs 102",
        punto_reposicion: 40,
        stock: 25
    },
];