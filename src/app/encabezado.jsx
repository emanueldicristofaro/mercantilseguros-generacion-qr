"use client"

export default function Encabezado () {

    const handleInputTituloPropiedad = (event) => {
        sessionStorage.setItem("titulo", event.target.value)
    }

    const handleInputDireccion = (event) => {
        sessionStorage.setItem("direccion", event.target.value)
    }

    const handleInputInformacionAdicional = (event) => {
        sessionStorage.setItem("adicional", event.target.value)
    }

    return (
        <div id="encabezado" className="flex justify-center">
            <div className="bg-gray-100 border border-gray-400 w-full sm:w-[50%] h-auto mt-10 rounded-xl shadow-md">
            <div className="p-4 mt-2 text-gray-800 font-bold"><h3>Otros datos</h3></div>
                <div className="p-4 mt-1">
                    <div className="mb-2">
                        <label className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-black">Título de propiedad</label>
                        <input type="text" className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="Ingrese título de propiedad" maxlength="255" onChange={handleInputTituloPropiedad}/>
                    </div>
                    <div className="mb-2">
                        <label className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-black">Dirección</label>
                        <input type="text" className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="Ingrese dirección" maxlength="255" onChange={handleInputDireccion}/>
                    </div>
                    <div className="mb-2">
                        <label className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-black">Información adicional</label>
                        <input type="text" className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="Ingrese información adicional" maxlength="255" onChange={handleInputInformacionAdicional}/>
                    </div>
                </div>
            </div>
        </div>
    )
}