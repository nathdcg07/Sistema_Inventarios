export default function Resultados({data}) {
    if (!data) return null;

    return(
        <div className ="mt-4 p-4 bg-red rounded-xl shadow-md">
            <h2 className="font-bold">Resultados</h2>
            <p>Pedidos realizados: {data.pedidos}</p>
            <p>Faltantes: {data.faltantes}</p>
        </div>
    );

}