"use client"

import { useEffect, useState } from 'react'
import Select from 'react-select'
import Spinner from './spinner'

export default function Asesores () {

    const [asesores, setAsesores] = useState([])
    const [asesoresMap, setAsesoresMap] = useState([])
    const [selectedOption, setSelectedOption] = useState()
    const [isLoading, setIsLoading] = useState(false)

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
      } else if (object !== undefined && object.gid[0] === 'VEN') {
        getAsesoresVenezuela()
      }   
    }

    const handleSelectChange = (selected) => {
        setSelectedOption(selected.value)
        sessionStorage.setItem('asesorId', selected.value.codigoAds)
        sessionStorage.setItem('asesorNombre', selected.value.nombreAds)
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
          } else if(object !== undefined && object.gid[0] === 'VEN'){
            asesores.map((a) => {
              asesoresTemp.push({ value: { codigoAds: a.codigoAds, nombreAds: a.nombreAds }, label: a.codigoAds + '-' + a.nombreAds })
            })
          } else {
            alert("Error no se ha indicado un parámetro")  
          }
          setAsesoresMap(asesoresTemp)
        }
        mapAsesores()
      }, [asesores])

    return (
        <div id="asesores" className="flex justify-center">
          <Spinner state={isLoading}></Spinner>
            <div className="bg-gray-100 border border-gray-400 w-full sm:w-[50%] h-auto mt-24 rounded-xl shadow-md">
                <div className="p-4 mt-2 text-blue-600 font-bold"><h3>Datos del registro</h3></div>
                <div className="p-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Asesores</label>
                    <Select 
                    onChange={handleSelectChange}
                    options={asesoresMap} />
                </div>
            </div>
        </div>
    )
}