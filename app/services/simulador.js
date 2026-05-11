export function simularSistema(productos, dias = 30) {
    if (!Array.isArray(productos) || productos.length === 0) return { datosGrafico: [], datosTabla: [], metricasGlobales: {} };

    let reposicionGlobal = null;
    let historial = [];
    let inventario = productos.map(p => ({
        ...p,
        stockInicial: p.stock,
        faltantes: 0,
        completados: 0,
        pedidosEnPreparacion: 0
    }));

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

            if (producto.stock >= unidadesPedidas) {
                producto.stock -= unidadesPedidas;
                producto.completados += unidadesPedidas;
                producto.estado = tiempoEntrega > 50 ? "preparando" : "entregado";
            } else {
                producto.faltantes += unidadesPedidas;
                producto.estado = "sin_stock";
                producto.esperaReposicion = Math.floor(Math.random() * 3) + 1;
            }

            // Validaciones de alertas críticas inmediatas
            if (producto.stock > 0 && producto.stock <= producto.punto_reposicion) {
                producto.estado = "solo_queda_1_unidad";
            }
            if (producto.stock === 0) producto.estado = "sin_stock";
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
            esperaReposicion: p.stock <= 0 ? `${p.esperaReposicion || 0} días` : "N/A"
        })),
        metricasGlobales: {
            totalCompletados: inventario.reduce((acc, p) => acc + p.completados, 0),
            totalFaltantes: inventario.reduce((acc, p) => acc + p.faltantes, 0),
            tiempoPromedioGral: Math.floor(historial.reduce((acc, h) => acc + h.tiempoEntregaPromedio, 0) / dias)
        }
    };
}
