"use client"

import { useEffect, useState } from 'react'
import Select from 'react-select'
import Spinner from './spinner'

export default function Asesores () {

    const [asesores, setAsesores] = useState([])
    const [asesoresMap, setAsesoresMap] = useState([])
    const [selectedOption, setSelectedOption] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [disabledAsesores, setDisableAsesores] = useState(false)
    const [uniqueAsesor, setUniqueAsesor] = useState('')

    const getAsesoresVenezuela = async () => {

      setIsLoading(true)
      const response = await fetch(
        'https://www1.mercantilseguros.com/appweb/api/v1/sirweb/asesores',{
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
        }
      )

      if(response.ok){
        let data = await response.json()
        setIsLoading(false)
        setAsesores(data)
      } else {
        setIsLoading(false)
        alert("Error encarga de asesores")
      }
    }

    const getAsesoresPanama = async () => {

      setIsLoading(true)
      const response = await fetch(
        'https://www1.mercantilseguros.com/appweb/api/v1/sirweb/asesores/panama',{
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
        }
      )
      
      if(response.ok){
        let data = await response.json()
        setIsLoading(false)
        setAsesores(data)
      } else {
        setIsLoading(false)
        alert("Error encarga de asesores")
      }
  
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

    const getAsesores = () => {

      let object = parseURLParams(window.location.href)

      if (object !== undefined && object.gid[0] === 'PAN') {
        getAsesoresPanama()
      } else {
        getAsesoresVenezuela()
      }   
    }

    const handleSelectChange = (selected) => {
        setSelectedOption(selected.value)
        sessionStorage.setItem('asesorId', selected.value.codigoAds)
        sessionStorage.setItem('asesorNombre', selected.value.nombreAds)
    }

    const handleUniqueAsesor = (object) => {
      setDisableAsesores(true)
      let asesorUniqueTemp = asesores.filter(a => a.codigoAds === object.cdMediador[0])
      sessionStorage.setItem('asesorId', object.cdMediador[0])
      sessionStorage.setItem('asesorNombre', asesorUniqueTemp[0]?.nombreAds)
      setUniqueAsesor(asesorUniqueTemp[0]?.codigoAds + ' - ' + asesorUniqueTemp[0]?.nombreAds)
    }

    useEffect(() => {
      getAsesores()
    }, [])

    useEffect(() => {
        const mapAsesores = () => {
          let asesoresTemp = []
          let object = parseURLParams(window.location.href)

          if(object !== undefined && object.gid[0] === 'PAN'){
            let asesoresPanama = asesores.filter(a => a.codigoAdsAsociado === null)
            asesoresPanama.map((a) => {
              asesoresTemp.push({ value: { codigoAds: a.codigoAds, nombreAds: a.nombreAds }, label: a.codigoAds + '-' + a.nombreAds })
            })
            if(object.cdMediador !== undefined) handleUniqueAsesor(object)
          } else {
            asesores.map((a) => {
              asesoresTemp.push({ value: { codigoAds: a.codigoAds, nombreAds: a.nombreAds }, label: a.codigoAds + '-' + a.nombreAds })
            })
            if(object !== undefined) handleUniqueAsesor(object)
          }
          setAsesoresMap(asesoresTemp)
        }
        mapAsesores()
      }, [asesores])

    return (
        <div id="asesores" className="flex justify-center">
          <Spinner state={isLoading}></Spinner>
            <div className="bg-gray-100 border border-gray-400 w-full sm:w-[50%] h-auto mt-24 rounded-xl shadow-md">
                <div className="p-4 mt-2 text-gray-800 font-bold"><h3>Indica los datos para generar tu QR personalizado</h3></div>
                {!disabledAsesores ? <div className="p-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Asesores</label>
                    <Select 
                    onChange={handleSelectChange}
                    options={asesoresMap}
                    placeholder="Seleccione"/>
                </div> :
                  <div className="p-4">
                    <label className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-black">Asesor</label>
                    <input type="text" className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" value={uniqueAsesor} disabled/>
                  </div>
                } 
            </div>
        </div>
    )
}