import { useState } from 'react'

import Modal from './modal'

export default function ButtonGenerarEnlace () {

    const [showModal, setShowModal] = useState(false)
    const [showButton, setShowButton] = useState(false)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const handleClickButtonCopy = () => {
        navigator.clipboard.writeText(body)
        .then(() => {
            alert('¡Valor copiado al portapapeles!')
        })
        .catch(err => {
            alert('Error al copiar al portapapeles:', err)
        })
    }

    const handleClickButton = (value) => {

        if(sessionStorage.getItem('asesorId') === null){
           setTitle('Error')
           setBody('Debe seleccionar un asesor') 
        } else if (sessionStorage.getItem('estadoId') === null){
            setTitle('Error')
            setBody('Debe seleccionar un estado')
        } else if (sessionStorage.getItem('municipioId') === null){
            setTitle('Error')
            setBody('Debe seleccionar un municipio')
        } else if (sessionStorage.getItem('ciudadId') === null){
            setTitle('Error')
            setBody('Debe seleccionar una ciudad')
        } else if (sessionStorage.getItem('zonaId') === null){
            setTitle('Error')
            setBody('Debe seleccionar una zona')
        } else if (sessionStorage.getItem('conjunto') === null){
            setTitle('Error')
            setBody('Debe indicar su conjunto residencial')
        } else if (sessionStorage.getItem('titulo') === null){
            setTitle('Error')
            setBody('Debe indicar el título de propiedad')
        } else if (sessionStorage.getItem('direccion') === null){
            setTitle('Error')
            setBody('Debe indicar la dirección')
        } else {
            setShowButton(true)
            setTitle('Confirmación')
            let url = `https://formularios.mercantilseguros.com/` +
            `combinado-residencial-b3446ba5098f?` +
            `nombreresidencia=${sessionStorage.getItem("titulo")}&` +
            `direccion=${sessionStorage.getItem('direccion')}&` +
            `nombreasesor=${sessionStorage.getItem('asesorNombre')}&` +
            `estado=${sessionStorage.getItem('estadoId')}&` +
            `municipio=${sessionStorage.getItem('municipioId')}&` +
            `ciudad=${sessionStorage.getItem('ciudadId')}&` +
            `zona=${sessionStorage.getItem('zonaId')}&` +
            `nombre=${sessionStorage.getItem("conjunto")}&` +
            `cdmediador=${sessionStorage.getItem('asesorId')}`
            setBody(url)
        }
        setShowModal(value)
    }

    return (
        <div id="generarEnlace" className="flex justify-center">
            <Modal title={title} isVisible={showModal} onClose={() => setShowModal(false)}>
            <div className="flex items-center">
                <div className="w-full p-5">
                    <input
                        type="text"
                        className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                        value={body}
                        readOnly
                    />
                </div>
                {showButton ? (
                    <button
                        type="button"
                        className="w-[25%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={handleClickButtonCopy}
                    >
                        Copiar
                    </button>
                ) : (<div></div>)}
                </div>
            </Modal>
            <button type="button" className="w-96 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-10 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleClickButton}
            >Generar enlace</button>
        </div>
    )
}