import { useState } from 'react'

import Modal from './modal'

export default function ButtonGenerarEnlace () {

    const [showModal, setShowModal] = useState(false)
    const [showButton, setShowButton] = useState(false)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [imagen, setImagen] = useState(null)

    const handleClickButtonCopy = () => {
        navigator.clipboard.writeText(body)
        .then(() => {
            alert('¡Valor copiado al portapapeles!')
        })
        .catch(err => {
            alert('Error al copiar al portapapeles:', err)
        })
    }

    const parseURLParams = (url) => {

        let queryStart = url.indexOf("?") + 1,
            queryEnd   = url.indexOf("#") + 1 || url.length + 1,
            query = url.slice(queryStart, queryEnd - 1),
            pairs = query.replace(/\+/g, " ").split("&"),
            parms = {}, i, n, v, nv
    
        if (query === url || query === "") return
    
        for (i = 0; i < pairs.length; i++) {
            nv = pairs[i].split("=", 2)
            n = decodeURIComponent(nv[0])
            v = decodeURIComponent(nv[1])
    
            if (!parms.hasOwnProperty(n)) parms[n] = []
            parms[n].push(nv.length === 2 ? v : null)
        }
        return parms
    }

    const generateQR = (data) => {

        const options = {
            method: 'POST',
            headers: {
              accept: 'image/png',
              'content-type': 'application/json',
              Authorization: 'sk_ZC8BOfieVfdxTtKy'
            },
            body: JSON.stringify({type: 'png', size: 100, color: '000000', backgroundColor: 'ffffff'})
          }
          
          fetch('https://api.short.io/links/qr/' + data.idString, options)
          .then(response => {
            if (response.status === 201) {
              return response.blob()
            } else {
              throw new Error('Error en la petición')
            }
          })
          .then(blob => {
            const url = URL.createObjectURL(blob)
            setImagen(url)
          })
            .then(response => console.log(response))
            .catch(err => console.error(err))
    }

    const generateShortLink = (url) => {

        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              Authorization: 'sk_ZC8BOfieVfdxTtKy'
            },
            body: JSON.stringify({domain: 'emih.short.gy', originalURL: url})
          }
          
          fetch('https://api.short.io/links', options)
            .then(response => response.json())
            .then(response => generateQR(response))
            .catch(err => console.error(err))  
    }

    const generateParamsUrl = (url, object) => {
        
        if(sessionStorage.getItem("titulo") !== null){
            url = url + `nombreresidencia=${sessionStorage.getItem("titulo")}&`
        }
        
        if (sessionStorage.getItem('direccion') !== null) {
            url = url + `direccion=${sessionStorage.getItem('direccion')}&`
        }
        
        if (sessionStorage.getItem('estadoId') !== null) {
            url = url + `estado=${sessionStorage.getItem('estadoId')}&`
        }

        if (sessionStorage.getItem('municipioId') !== null) {
            url = url + `municipio=${sessionStorage.getItem('municipioId')}&`
        }

        if (sessionStorage.getItem('ciudadId') !== null) {
            url = url + `ciudad=${sessionStorage.getItem('ciudadId')}&`
        }
        
        if (sessionStorage.getItem('zonaId') !== null) {
            url = url + `zona=${sessionStorage.getItem('zonaId')}&`
        }
        
        if (sessionStorage.getItem("conjunto") !== null) {
            url = url + `nombre=${sessionStorage.getItem("conjunto")}&`
        }

        url = url + `nombreasesor=${sessionStorage.getItem('asesorNombre')}&` +
        `cdmediador=${sessionStorage.getItem('asesorId')}`
        setBody(url)
        generateShortLink(url)
    }

    const descargarImagen = () => {

        if (imagen) {
            const link = document.createElement('a')
            link.href = imagen
            link.download = 'qr.png'
            document.body.appendChild(link)
            link.click();
            document.body.removeChild(link)
          }
    }

    const handleClickButton = (value) => {

        let object = parseURLParams(window.location.href)

        if(sessionStorage.getItem('asesorId') === null){
           setTitle('Error')
           setBody('Debe seleccionar un asesor') 
        } else if (sessionStorage.getItem('estadoId') !== null && sessionStorage.getItem('municipioId') === null){
            setTitle('Error')
            let cambiarTexto = object !== undefined ? 'corregimiento' : 'municipio'
            setBody('Debe seleccionar un ' + cambiarTexto)
        } else if (sessionStorage.getItem('municipioId') !== null && sessionStorage.getItem('ciudadId') === null){
            setTitle('Error')
            setBody('Debe seleccionar una ciudad')
        } else if (sessionStorage.getItem('ciudadId') !== null && sessionStorage.getItem('zonaId') === null){
            setTitle('Error')
            setBody('Debe seleccionar una zona')
        } else { 
            setShowButton(true)
            setTitle('Confirmación')
            let url = object !== undefined ? `https://mercantil-seguros.involve.me/combinado-residencial-pty?` : `https://formularios.mercantilseguros.com/combinado-residencial-b3446ba5098f?`
            generateParamsUrl(url, object)
        }
        setShowModal(value)
    }

    return (
        <div id="generarEnlace" className="flex justify-center">
            <Modal title={title} isVisible={showModal} onClose={() => {
                setShowModal(false)
                sessionStorage.clear()
            }}>
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
                        className="w-[25%] text-white bg-gray-800 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-800 focus:outline-none dark:focus:ring-blue-800"
                        onClick={handleClickButtonCopy}
                    >
                        Copiar
                    </button>
                ) : (<div></div>)}    
            </div>
            <div className="flex justify-center mt-5 mb-5">
                {imagen && <img src={imagen} width={150} height={150} alt="Imagen generada" />}
            </div>
            <div className="flex justify-center mt-5 mb-5">
                <button
                    type="button"
                    className="w-[25%] text-white bg-gray-800 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-800 focus:outline-none dark:focus:ring-blue-800"
                    onClick={descargarImagen}
                >
                    Descargar
                </button>
            </div>
            </Modal>
            <button type="button" className="w-96 text-white bg-gray-800 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-10 dark:bg-gray-800 dark:hover:bg-gray-800 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleClickButton}
            >Generar QR</button>
        </div>
    )
}