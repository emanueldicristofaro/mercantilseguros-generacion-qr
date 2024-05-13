import { useEffect, useState } from 'react'

export default function Footer () {

    const [footer, setFooter] = useState(false)

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

    /**USE EFFECTS */

    useEffect(() => {
        let object = parseURLParams(window.location.href)
        if(object !== undefined){
            setFooter(true)
        }
    }, [])

    return (
        <div id="footer">
            <footer className="bg-blue-700 shadow mt-10 dark:bg-gray-800">
            {!footer ? (
                <div className="flex justify-center w-full mx-auto max-w-screen-xl p-4">
                    <span className="text-sm text-white text-center">Inscrita en la Superintendencia de la Actividad Aseguradora bajo el No. 74 Copyright 2007 Mercantil Seguros C.A., RIF: J-000901805. Todos los derechos reservados</span>
                </div>
            ) : (
                <div className="mt-6 relative flex justify-center items-center text-white p-4 w-full">
                    <img src='/superintend.png' alt="LogoFooter" width={70} height={50}/>
                    <span>Regulado y supervisado por la Superintendencia de Seguros y Reaseguros de Panamá</span>
                </div>
            )}
            </footer>  
        </div>
    )
}