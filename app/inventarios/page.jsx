"use client"; // 1. Indica que es un componente de cliente
import { useState } from "react"; // 2. Importa el hook useState
import Grafico from "../components/grafico"; // 3. Importa el componente Grafico
import Inventario from "../components/inventarios";


import {
  bazar,
  // decoracion,
  jugueteria,
  libreria,
  destilados,
  licores,
  ready_To_Drink,
  vinos,
  cervezas,
  aguas,
  aguas_Saborizadas,
  aperitivos_sin_alcohol,
  bebidas_Deportivas,
  gaseosas,
  jugos,
  cuidado,
  papillas,
  panales,
  carbones,
  cerdo,
  pescados
} from "../data/productos";

export default function InventariosPage() {
  return (
    <Inventario
      bazar={bazar}
      // decoracion={decoracion}
      jugueteria={jugueteria}
      libreria={libreria}
      destilados={destilados}
      licores={licores}
      ready_To_Drink={ready_To_Drink}
      vinos={vinos}
      cervezas={cervezas}
      aguas={aguas}
      aguas_Saborizadas={aguas_Saborizadas}
      aperitivos_sin_alcohol={aperitivos_sin_alcohol}
      bebidas Deportivas={bebidas_Deportivas}
      gaseosas={gaseosas}
      jugos={jugos}
      cuidado={cuidado}
      papillas={papillas}
      pañales={panales}
      carbones={carbones}
      cerdo={cerdo}
      pescados={pescados}
    />
  );
}