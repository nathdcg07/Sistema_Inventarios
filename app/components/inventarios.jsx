"use client"; // 1. Indica que es un componente de cliente
import { useState, useEffect } from "react"; // 2. Importa el hook useState
import  guardarProducto, { borrarProducto }  from "../services/productosService";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase"; // Asegúrate de tener tu configuración de Firebase aquí
import { aguas, aguas_Saborizadas, aperitivos_sin_alcohol, bebidas_Deportivas, carbones, cerdo, cervezas, cuidado, gaseosas, jugos, licores, panales, papillas, pescados, ready_To_Drink, vinos } from "../data/productos";
import { Trash2, Edit, Eraser } from "lucide-react";

export default function Inventario({bazar, jugueteria, libreria, destilados, licores, ready_To_Drink, vinos, cervezas, aguas, aguas_Saborizadas, aperitivos_sin_alcohol, gaseosas, jugos, cuidado, papillas, pañales, carbones, cerdo, pescados}) {
    // 1. PRIMERO declaramos todos los estados
    const [idEditando, setIdEditando] = useState(null);
    const [categoria, setCategoria] = useState("bazar");
    const [stock, setStock] = useState("");
    const [punto_reposicion, setPunto] = useState("");
    const [precio, setPrecio] = useState("Bs ");
    const [nombre, setNombre] = useState("");
    
    // AQUÍ DEBE ESTAR DECLARADO 'productosFirebase'
    const [productosFirebase, setProductosFirebase] = useState([]);

    // 2. SEGUNDO dejamos el useEffect para cargar los datos
    useEffect(() => {
        const q = query(collection(db, "productos"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const lista = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProductosFirebase(lista);
        });
        return () => unsubscribe();
    }, []);

    // 3. TERCERO (¡Esto va abajo de todo lo anterior!): Creamos el diccionario de datos
    const datos = {
        bazar: [...bazar, ...productosFirebase.filter(p => p.categoria === 'bazar')],
        // decoracion: [...decoracion, ...productosFirebase.filter(p => p.categoria === 'decoracion')],
        jugueteria: [...jugueteria, ...productosFirebase.filter(p => p.categoria === 'jugueteria')],
        libreria: [...libreria, ...productosFirebase.filter(p => p.categoria === 'libreria')],
        destilados: [...destilados, ...productosFirebase.filter(p => p.categoria === 'destilados')],
        licores: [...licores, ...productosFirebase.filter(p =>p.categoria==='licores')],
        ready_To_Drink: [...ready_To_Drink, ...productosFirebase.filter(p=>p.categoria==='ready_To_Drink')],
        vinos:[...vinos, ...productosFirebase.filter(p=>p.categoria==='vinos')],
        cervezas:[...cervezas, ...productosFirebase.filter(p=>p.categoria==='cervezas')],
        aguas:[...aguas, ...productosFirebase.filter(p=>p.categoria==='aguas')],
        aguas_Saborizadas: [...aguas_Saborizadas, ...productosFirebase.filter(p=>p.categoria==='aguas_Saborizadas')],
        aperitivos_sin_alcohol: [...aperitivos_sin_alcohol, ...productosFirebase.filter(p=>p.categoria==='aperitivos_sin_Alcohol')],
        bebidas_Deportivas: [...bebidas_Deportivas, ...productosFirebase.filter(p=>p.categoria==='bebidas_Deportivas')],
        gaseosas: [...gaseosas, ...productosFirebase.filter(p=>p.categoria==='gaseosas')],
        jugos: [...jugos, ...productosFirebase.filter(p=>p.categoria==='jugos')],
        cuidado: [...cuidado, ...productosFirebase.filter(p=>p.categoria==='cuidado')],
        papillas: [...papillas, ...productosFirebase.filter(p=>p.categoria==='papillas')],
        pañales: [...pañales, ...productosFirebase.filter(p=>p.categoria==='pañales')],
        carbones: [...carbones, ...productosFirebase.filter(p=>p.categoria==='carbones')],
        cerdo: [...cerdo, ...productosFirebase.filter(p=>p.categoria==='cerdo')],
        pescados: [...pescados, ...productosFirebase.filter(p=>p.categoria==='pescados')]
    };

    const limpiar=()=>{
        setNombre(" ");
        setPrecio("Bs");
        setPunto(" ");
        setStock(" ");
        setIdEditando(null);
     };

    // console.log(bazar);
    // console.log(decoracion);
    return(
       
        <div id="formulario-producto" className="p-6 border-amber-100 rounded-xl shadow-md mt-4 hover:scale-[1.02] transition-all duration-300">
           
            <h2 className="text-2xl font-bold mb-4 text-gray-500 text-center">Inventario</h2>
            <div  className="flex justify-center mb-8">
                <select 
                    value={categoria} 
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full mb-4 p-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white text-gray-700"
                >
                    <option value="bazar">Bazar</option>
                    {/* <option value="decoracion">Decoración</option> */}
                    <option value="jugueteria">Juguetería</option>
                    <option value="libreria">Librería</option>
                    <option value="destilados">Destilados</option>
                    <option value="licores">Licores</option>
                    <option value="ready_To_Drink">Ready to Drink</option>
                    <option value="vinos">Vinos y Espumantes</option>
                    <option value="cervezas">Cervezas</option>
                    <option value="aguas">Aguas</option>
                    <option value="aguasSab">Aguas Saborizadas</option>
                    <option value="aperitivos">Aperitivos sin Alcohol</option>
                    <option value="bebDep">Bebidas deportivas</option>
                    <option value="gaseosas">Gaseosas</option>
                    <option value="jugos">Jugos y Néctares</option>
                    <option value="cuidado">Cuidado y Aseo</option>
                    <option value="papillas">Papillas y Cereales</option>
                    <option value="panales">Pañales y Toallitas</option>
                    <option value="carbones">Carbones y Leñas</option>
                    <option value="cerdo">Cerdo</option>
                    <option value="pescados">Pescados y Mariscos</option>

                </select>
                <input type="text" value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre producto..." className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-500"/>
                <input type="text" value={precio} onChange={e=>setPrecio(e.target.value)}  placeholder="Precio..." className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-500"/>
                <input type="number" value={punto_reposicion} onChange={e=> setPunto(e.target.value)} placeholder="Punto de reposición..." className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-500"/>
                <input type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="Stock..." className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-500"/>
                
                <button
                    onClick={() => guardarProducto({
                        nombre, precio, punto_reposicion, stock, categoria
                    }, idEditando)} // <-- Le pasamos el ID (será null si es nuevo)
                    className={`${idEditando ? 'bg-blue-500' : 'bg-green-500'} text-white px-4 py-2 rounded-lg`}
                >
                    {idEditando ? "Actualizar Producto" : "Guardar Producto"}
                </button>

                 <button
                    onClick={() => {
                        setNombre("");
                        setPrecio("Bs ");
                        setPunto("");
                        setStock("");
                        setIdEditando(null);
                    }}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
                >
                    Limpiar
                </button>

                


            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-8 border-b pb-4">
                {Object.keys(datos).map((cat)=>(
                    <button
                        key={cat}
                        onClick={()=> setCategoria(cat)}
                        className={`text-sm font-semibold px-4 py-2 rounded-lg border-none uppercase transition-colors duration-300
                            ${categoria === cat ? "text-cyan-400 font-bold" : "text-black/40 hover:text-cyan-400 "}
                        `}
                    >{cat}</button>
                ))}
            </div>
            <div className="justify-between grid grid-cols-4 gap-4 pb-2 border-b items-center">
                        <h6 className="text-lg font-semibold mb-2 text-black/50">Nombre</h6>
                        <h6 className="text-lg font-semibold mb-2 text-black/50">Precio</h6>
                        <h6 className="text-lg font-semibold mb-2 text-black/50">Punto reposición</h6>
                        <h6 className="text-lg font-semibold mb-2 text-black/50">Stock</h6>
                    </div>
            <div>
                {datos[categoria]?.map((p)=>(
                    
                    <div key={p.id} className="justify-between items-center p-3  rounded-lg hover:bg-amber-100 transition-colors">
                        <div className="hover:text-cyan-50 justify-center grid grid-cols-4 gap-4 items-center">
                            <span className="text-gray-500"> {p.nombre} </span>
                            <span className="text-gray-500">{p.precio}</span>
                            <span className="text-sm text-gray-500"> {p.punto_reposicion} </span>
                            <span className="text-sm text-gray-500"> {p.stock} </span>

                            <div className="flex gap-2 justify-end">
                                <button
                                    onClick={()=>{
                                        setNombre(p.nombre);
                                        setPrecio(p.precio);
                                        setPunto(p.punto_reposicion);
                                        setStock(p.stock);
                                        setIdEditando(p.id);
                                        document.getElementById('formulario-producto').scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="p-1 text-cyan-300 hover:bg-violet-400 rounded"
                                >
                                    <Edit size={18}/>
                                </button>
                                <button 
                                    onClick={()=>borrarProducto(p.id)}
                                    className="p-1 text-red-600 hover:bg-red-500 rounded"
                                >
                                    <Trash2 size={18}/>
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
            {/* Nota de salud si es destilados */}
            {categoria === 'destilados' && 'licores' &&(
                <p className="text-[10px] text-red-500 mt-4 text-center italic">
                    * El consumo excesivo de alcohol es dañino para la salud.
                </p>
            )}
        </div>
    );
}