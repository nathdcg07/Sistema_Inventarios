"use client";
import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { db } from "@/app/firebase";
import { collection, addDoc } from "firebase/firestore";
import { X, FileSpreadsheet } from "lucide-react"; // Importamos iconos útiles

export default function ImportadorClientes() {
    const [cargando, setCargando] = useState(false);
    const [progreso, setProgreso] = useState("");
    const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);
    const inputRef = useRef(null);

    // Captura los archivos cuando el usuario los selecciona
    const alCambiarArchivo = (e) => {
        if (e.target.files) {
            // Convertimos la lista de archivos a un arreglo común de JavaScript
            setArchivosSeleccionados(Array.from(e.target.files));
        }
    };

    // Quita un archivo de la lista al presionar la 'X'
    const eliminarArchivo = (index) => {
        const nuevosArchivos = archivosSeleccionados.filter((_, i) => i !== index);
        setArchivosSeleccionados(nuevosArchivos);
        if (nuevosArchivos.length === 0 && inputRef.current) {
            inputRef.current.value = ""; // Reseteamos el input nativo
        }
    };

    // Procesa y sube todos los archivos cargados uno por uno
    const procesarYSubirArchivos = async () => {
        if (archivosSeleccionados.length === 0) return;

        setCargando(true);
        const clientesRef = collection(db, "clientes");
        let totalClientesSubidos = 0;

        try {
            for (let idx = 0; idx < archivosSeleccionados.length; idx++) {
                const archivo = archivosSeleccionados[idx];
                setProgreso(`Leyendo archivo (${idx + 1}/${archivosSeleccionados.length}): ${archivo.name}...`);

                const datosBinarios = await new Promise((resolve, reject) => {
                    const lector = new FileReader();
                    lector.onload = (e) => resolve(new Uint8Array(e.target.result));
                    lector.onerror = (err) => reject(err);
                    lector.readAsArrayBuffer(archivo);
                });

                const libroTrabajo = XLSX.read(datosBinarios, { type: "array" });
                const nombrePestana = libroTrabajo.SheetNames[0];
                const hoja = libroTrabajo.Sheets[nombrePestana];
                const listaClientes = XLSX.utils.sheet_to_json(hoja);

                for (let i = 0; i < listaClientes.length; i++) {
                    const cliente = listaClientes[i];
                    await addDoc(clientesRef, {
                        nombre: cliente.Nombre || cliente.nombre || "Sin Nombre",
                        telefono: cliente.Telefono || cliente.telefono || "Sin Teléfono",
                        direccion: cliente.Direccion || cliente.direccion || "Sin Dirección",
                        ciudad: cliente.Ciudad || cliente.ciudad || "Sin Ciudad",
                        fechaRegistro: new Date()
                    });
                    totalClientesSubidos++;
                    setProgreso(`Archivo ${idx + 1}/${archivosSeleccionados.length} - Procesando fila ${i + 1}/${listaClientes.length}`);
                }
            }

            alert(`¡Éxito total! Se procesaron ${archivosSeleccionados.length} archivos y se subieron ${totalClientesSubidos} clientes.`);
            setArchivosSeleccionados([]);
            if (inputRef.current) inputRef.current.value = "";
        } catch (error) {
            console.error(error);
            alert("Ocurrió un error al procesar las hojas de cálculo.");
        } finally {
            setCargando(false);
            setProgreso("");
        }
    };

    return (
        <div className="p-6 bg-purple-50/50 rounded-2xl border border-purple-100 text-center max-w-2xl mx-auto shadow-sm">
            <h3 className="text-lg font-bold text-purple-900 mb-1 flex items-center justify-center gap-2">
                <FileSpreadsheet className="text-purple-600" size={22} /> Importador de Clientes Masivos
            </h3>
            <p className="text-xs text-gray-500 mb-6">
                Selecciona una o más hojas de cálculo (.xlsx) para migrar los datos de tus clientes.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4">
                {/* BOTÓN PERSONALIZADO (LABEL) */}
                <label 
                    htmlFor="input-excel-oculto" 
                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer select-none inline-block"
                >
                    Seleccionar archivos
                </label>

                {/* INPUT REAL OCULTO (Acepta múltiples archivos gracias a 'multiple') */}
                <input 
                    id="input-excel-oculto"
                    type="file" 
                    ref={inputRef}
                    accept=".xlsx, .xls" 
                    multiple 
                    onChange={alCambiarArchivo}
                    disabled={cargando}
                    className="hidden" 
                />

                {/* VISUALIZACIÓN DE ARCHIVOS SELECCIONADOS Y BOTÓN 'X' */}
                <div className="w-full max-w-md space-y-2">
                    {archivosSeleccionados.length === 0 ? (
                        <span className="text-xs text-gray-400 italic">Ningún archivo seleccionado</span>
                    ) : (
                        archivosSeleccionados.map((archivo, index) => (
                            <div key={index} className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-purple-100 text-xs text-gray-600 shadow-sm animate-in fade-in duration-200">
                                <span className="truncate max-w-[85%] font-medium">{archivo.name}</span>
                                {!cargando && (
                                    <button 
                                        onClick={() => eliminarArchivo(index)}
                                        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1 rounded-full transition-colors"
                                        title="Quitar archivo"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* BOTÓN DE ACCIÓN PARA SUBIR A LA BD */}
                {archivosSeleccionados.length > 0 && !cargando && (
                    <button
                        onClick={procesarYSubirArchivos}
                        className="mt-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-5 py-2 rounded-lg shadow transition-colors"
                    >
                        Subir {archivosSeleccionados.length} archivo(s) a Firebase
                    </button>
                )}
            </div>

            {/* BARRA DE PROGRESO DE CARGA */}
            {cargando && (
                <div className="mt-6 p-3 bg-purple-600 text-white text-xs font-bold rounded-xl animate-pulse shadow-inner">
                    {progreso}
                </div>
            )}
        </div>
    );
}
