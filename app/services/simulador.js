export function simularSistema(dias) {
    let stock = 100;
    let pedidos = [];
    let reposicion = null;
    let historial = [];

    // Aseguramos que 'dias' sea un número válido
    const totalDias = Number(dias) || 30;

    for (let dia = 1; dia <= totalDias; dia++) {
        // 1. Simula demandas aleatorias de clientes
        const pedidosHoy = Math.floor(Math.random() * 10) + 5;

        // 2. Creamos los pedidos del día
        for (let i = 0; i < pedidosHoy; i++) {
            if (stock > 1) {
                stock--;
                pedidos.push({
                    id: Date.now() + Math.random(), // Evitamos IDs duplicados
                    estado: "en_camino",
                    tiempoRestante: Math.floor(Math.random() * 40) + 20
                });
            } else if (stock === 1) {
                stock--;
                pedidos.push({
                    id: Date.now() + Math.random(),
                    estado: "solo_queda_1_unidad",
                    tiempoRestante: Math.floor(Math.random() * 40) + 20
                });
            } else {
                pedidos.push({
                    id: Date.now() + Math.random(),
                    estado: "sin_stock",
                    tiempoRestante: null
                });
            }
        }

        // 3. ACTUALIZAMOS LOS PEDIDOS EXISTENTES (Fuera del bucle de creación)
        pedidos = pedidos.map(p => {
            if (p.estado === "en_camino" || p.estado === "solo_queda_1_unidad") {
                let nuevoTiempo = p.tiempoRestante - 20;
                if (nuevoTiempo <= 0) {
                    return { ...p, estado: "entregado", tiempoRestante: 0 };
                }
                return { ...p, tiempoRestante: nuevoTiempo };
            }
            return p; // <-- MUY IMPORTANTE: Retornar el pedido intacto si no está en camino
        });

        // 4. GESTIÓN DE REPOSICIÓN DE STOCK
        if (!reposicion && stock < 20) {
            reposicion = {
                cantidad: 50,
                diasRestantes: Math.floor(Math.random() * 3) + 1
            };
        }

        if (reposicion) {
            reposicion.diasRestantes--;
            if (reposicion.diasRestantes <= 0) {
                stock += reposicion.cantidad;
                reposicion = null;
            }
        }

        // 5. GUARDAMOS EL HISTORIAL DEL DÍA
        historial.push({
            dia,
            stock,
            pedivosActivos: pedidos.filter(p => p.estado === "en_camino" || p.estado === "solo_queda_1_unidad").length,
            entregados: pedidos.filter(p => p.estado === "entregado").length
        });
    }

    return historial; // Retornamos el arreglo completo para la gráfica
}
