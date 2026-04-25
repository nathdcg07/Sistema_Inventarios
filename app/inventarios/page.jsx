"use client"; // 1. Indica que es un componente de cliente
import { useState } from "react"; // 2. Importa el hook useState
import Grafico from "../components/grafico"; // 3. Importa el componente Grafico
import Inventario from "../components/inventarios";


import {
  bazar,
  decoracion,
  jugueteria,
  libreria,
  destilados
} from "../data/productos";

export default function InventariosPage() {
  return (
    <Inventario
      bazar={bazar}
      decoracion={decoracion}
      jugueteria={jugueteria}
      libreria={libreria}
      destilados={destilados}
    />
  );
}