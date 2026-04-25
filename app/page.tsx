"use client";

import ListaPedidos from "./components/listaPedidos";
import { pedidos } from "./data/pedidos";
import Inventario from "./inventarios/page";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 text-black">

      {/* <ListaPedidos pedidos={pedidos} />

      <Inventario
        bazar={bazar}
        decoracion={decoracion}
        jugueteria={jugueteria}
        libreria={libreria}
        destilados={destilados}
      /> */}
    </main>
  );
}