import { actualizarProducto } from "./productosService";

export function simularSistema(productos, dias=30) {
    if(!Array.isArray(productos) || productos.length === 0){
        console.error("Simulador recibió datos inválidos o algo que no es un array", productos);
        return{ datosGrafico: [], datosTabla: []};
    }

    // let stock = 100;
    // let pedidos = [];
    let reposicionGlobal = null;
    let historial = [];
    let inventario = productos.map(p=> ({
        ...p, 
        stockInicial:p.stock, 
        pedidosEnPreparacion: 0,
        estado: p.stock > 0 ? "en_camino" : "sin_stock" }));

    for (let dia = 1; dia <= dias; dia++) {
        // 1. Simula cantidad de pedidos del día
        const pedidosHoy = Math.floor(Math.random() * 10) + 5;
        let demandaDelDia=0;

        // 2. Creamos los pedidos del día
        for (let i = 0; i < pedidosHoy; i++) {
            const index = Math.floor(Math.random()*inventario.length);
            const producto=inventario[index];

            const unidadesPedidas=Math.floor(Math.random()*3)+1;
            demandaDelDia+=unidadesPedidas;

            // producto.ultimoTiempoEntrega = Math.floor(Math.random()*41)+20;

            if (producto.stock >= unidadesPedidas) {
                producto.stock -= unidadesPedidas;
            //     producto.estado=Math.random()>0.5 ? "entregado": "preparando";
                
            // } else  {
            //     producto.estado = "sin_stock";
                if(Math.random()<0.3){
                    producto.pedidosEnPreparacion++;
                }else{
                    producto.estado="sin_stock";
                }
            }

            //estados
            inventario.forEach(p=>{
                if(p.stock===0){
                    p.estado="sin_stock";
                }else if (p.stock===1){
                    p.estado="solo_queda_1_unidad";
                }else if(p.pedidosEnPreparacion>0){
                    p.estado="preparando";
                    p.pedidosEnPreparacion=0;
                }else if(p.stock <= p.punto_reposicion){
                    p.estado="en_camino";
                }else{
                    p.estado="entregado";
                }
            });

            //alerta de repo
            if (producto.stock <= producto.punto_reposicion &&
                 producto.stock >0
            ){
                producto.estado = "solo_queda_1_unidad";
            }

            // if (producto.stock > producto.punto_reposicion){
            //     producto.estado = "en_camino";
            // }

            if (producto.stock===0){
                producto.estado = "sin_stock";
            }
        }

        const stockActualTotal = inventario.reduce((acc, p)=>acc+p.stock,0)

        if(!reposicionGlobal && stockActualTotal < 50){
            reposicionGlobal={
                diasRestantes: Math.floor(Math.random()*3)+1,
                cantidad: 100
            };
        }
        
        if(reposicionGlobal){
            reposicionGlobal.diasRestantes--;
                if(reposicionGlobal.diasRestantes<=0){
                    // inventario[0].stock+= reposicionGlobal.cantidad;
                    inventario.forEach(p=>{if(p.stock===0) p.stock+=20;})
                    reposicionGlobal=null;
                }
        }


    historial.push({
        dia:dia,
        stock: stockActualTotal,
        demanda: demandaDelDia
    });
    }

    // inventario.forEach(async (p)=>{
    //     if (p.id){
    //         await actualizarProducto(p.id, {
    //             stock: p.stock,
    //             estado: p.estado
    //         });
    //     }
    // });

    return{ 
    datosGrafico: historial,
    datosTabla: inventario.map(p=>({
        producto: p.nombre,
        stockInicial: p.stockInicial,
        demandaSimulada: p.stockInicial - p.stock,
        stockFinal: p.stock,
        estado:p.estado
    }))
};

}