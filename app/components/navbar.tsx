"use client"

// 1. Limpiamos el import de React y agregamos X de lucide-react
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; 
import { useIsMobile } from "../hooks/use-mobile";

const Navbar = () => {
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="bg-gray-800 text-white p-4 sticky top-0 z-50 transition-all duration-300">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-lg font-bold">PedidosYa Market</div>

                {isMobile ? (
                    <div className="relative">
                        <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer"> 
                            {/* Ahora X sí funcionará */}
                            {isOpen ? <X /> : <Menu />}    
                        </button>

                        {/* 2. ¡OJO! Te faltaba mostrar los links en móvil cuando isOpen es true */}
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-xl py-2 flex flex-col z-50">
                                <Link href="/" onClick={closeMenu} className="px-4 py-2 hover:bg-gray-600">Home</Link>
                                <Link href="/pedidos" onClick={closeMenu} className="px-4 py-2 hover:bg-gray-600">Pedidos</Link>
                                <Link href="/inventarios" onClick={closeMenu} className="px-4 py-2 hover:bg-gray-600">Inventario</Link>
                            </div>
                        )}       
                    </div>
                ) : (
                    <div className="flex space-x-4">
                        {/* 3. Corregido el espacio en las clases hover */}
                        <Link href="/" className="hover:bg-gray-600 hover:text-gray-300 px-2 py-1 rounded">
                            Home
                        </Link>
                        <Link href="/pedido" className="hover:bg-gray-600 hover:text-gray-300 px-2 py-1 rounded">
                            Pedidos
                        </Link>
                        <Link href="/inventarios" className="hover:bg-gray-600 hover:text-gray-300 px-2 py-1 rounded">
                            Inventario
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
