export function simularSistema(productos, dias = 30, clientes=[]) {
    if (!Array.isArray(productos) || productos.length === 0) return { datosGrafico: [], datosTabla: [], metricasGlobales: {} };

    let reposicionGlobal = null;
    let historial = [];
    let registroPedidosDetallados=[];

    let inventario = productos.map(p => ({
        ...p,
        stockInicial: p.stock,
        faltantes: 0,
        completados: 0,
        pedidosEnPreparacion: 0,

        //garantizando el stock al iniciar el mes
        estado: p.stock > 0 ? "entregado" : "sin_stock"
    }));

    const clientePorDefecto ={
        nombre: "Consumidor Final", 
        ciudad: "General",
        telefono:"S/N",
        direccion: "Mostrador"
    };

    for (let dia = 1; dia <= dias; dia++) {
        const pedidosHoy = Math.floor(Math.random() * 10) + 5;
        let demandaDelDia = 0;
        let sumaTiemposEntrega = 0;

        for (let i = 0; i < pedidosHoy; i++) {
            const index = Math.floor(Math.random() * inventario.length);
            const producto = inventario[index];
            const unidadesPedidas = Math.floor(Math.random() * 3) + 1;
            demandaDelDia += unidadesPedidas;

            const tiempoEntrega = Math.floor(Math.random() * 41) + 20;
            sumaTiemposEntrega += tiempoEntrega;

            //implementando monte carlo para los clientes aleatorios

            const clienteAleatorio = clientes.length > 0
                ? clientes[Math.floor(Math.random()*clientes.length)]
                : clientePorDefecto;

            if (producto.stock >= unidadesPedidas) {
                producto.stock -= unidadesPedidas;
                producto.completados += unidadesPedidas;
                producto.estado = tiempoEntrega > 50 ? "preparando" : "entregado" ; 
                // producto.pedidosEnPreparacion += unidadesPedidas ? "en_camino" : "";  
                
                registroPedidosDetallados.push({
                    id_pedido: `PED-${dia}-${Date.now()}-${i}`,
                    dia:dia,
                    producto:producto.nombre,
                    unidades:unidadesPedidas,
                    tiempoEntrega: `${tiempoEntrega} min`,
                    clienteNombre: clienteAleatorio.nombre || "Anónimo",
                    clienteCiudad: clienteAleatorio.ciudad || "Cochabamba",
                    clienteTelefono: clienteAleatorio.telefono || "S/T",
                    clienteDireccion: clienteAleatorio.direccion || "S/D",
                    estado: producto.estado
                });

                
                
                if (producto.stock === 1){
                    producto.estado = "solo_queda_1_unidad";
                }else if (producto.stock >0 && producto.stock <= producto.punto_reposicion){
                    producto.estado="en_camino";
                }else{
                    producto.estado = tiempoEntrega > 50 ? "preparando": "entregado";
                }    
            } else {
                producto.faltantes += unidadesPedidas;
                producto.estado = "sin_stock";
                producto.esperaReposicion = Math.floor(Math.random() * 3) + 1;
            
                registroPedidosDetallados.push({
                    id_pedido: `PED-${dia}-${Date.now()}-${i}`,
                    dia: dia,
                    producto: producto.nombre,
                    unidades: unidadesPedidas,
                    tiempoEntrega: "Pendiente",
                    clienteNombre: clienteAleatorio.nombre || "Anónimo",
                    clienteCiudad: clienteAleatorio.ciudad || "Cochabamba",
                    clienteTelefono: clienteAleatorio.telefono || "S/T",
                    clienteDireccion: clienteAleatorio.direccion || "S/D",
                    estado: "sin_stock"
                });
            
            }

            // Validaciones de alertas críticas inmediatas
            if (producto.stock === 1){
                    producto.estado = "solo_queda_1_unidad";
                }else if (producto.stock >0 && producto.stock <= producto.punto_reposicion){
                    producto.estado="en_camino";
                }else{
                    producto.estado = tiempoEntrega > 50 ? "preparando": "entregado";
                } 
        }

        const stockActualTotal = inventario.reduce((acc, p) => acc + p.stock, 0);

        // Reposición
        if (!reposicionGlobal && stockActualTotal < 50) {
            reposicionGlobal = {
                diasRestantes: Math.floor(Math.random() * 3) + 1,
                cantidad: 100
            };
        }

        let mensajeRepo = "";
        if (reposicionGlobal) {
            reposicionGlobal.diasRestantes--;
            mensajeRepo = `Reponiendo (${reposicionGlobal.diasRestantes + 1}d)`;
            if (reposicionGlobal.diasRestantes <= 0) {
                inventario.forEach(p => { if (p.stock === 0) p.stock += 20; });
                reposicionGlobal = null;
                mensajeRepo = "¡Stock repuesto!";
            }
        }

        historial.push({
            dia,
            stock: stockActualTotal,
            demanda: demandaDelDia,
            tiempoEntregaPromedio: Math.floor(sumaTiemposEntrega / pedidosHoy),
            infoRepo: mensajeRepo
        });
    }

    return {
        datosGrafico: historial,
        datosTabla: inventario.map(p => ({
            producto: p.nombre,
            stockInicial: p.stockInicial,
            demandaSimulada: p.stockInicial - p.stock,
            stockFinal: p.stock,
            estado: p.estado,
            faltantes: p.faltantes,
            completados: p.completados,
            esperaReposicion: p.stock <= 0 ? `${p.esperaReposicion || 0} días` : (p.estado === "en_camino" ? "Pedido enviado" : "N/A")
        })),
        pedidosPorCliente: registroPedidosDetallados, //agregando registro de los clientes
        metricasGlobales: {
            totalCompletados: inventario.reduce((acc, p) => acc + p.completados, 0),
            totalFaltantes: inventario.reduce((acc, p) => acc + p.faltantes, 0),
            tiempoPromedioGral: Math.floor(historial.reduce((acc, h) => acc + h.tiempoEntregaPromedio, 0) / dias)
        }
    };
}
