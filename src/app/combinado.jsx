"use client"

import { useEffect, useState } from 'react'
import Select from 'react-select'
import Spinner from './spinner'

export default function Combinado () {

    /**INITIAL */

    const ID_COUNTRY_VENEZUELA = 4127
    const ID_COUNTRY_PANAMA = 4924

    const [estados, setEstados] = useState([])
    const [estadosMap, setEstadosMap] = useState([])

    const [municipios, setMunicipios] = useState([])
    const [municipiosMap, setMunicipiosMap] = useState([])

    const [ciudades, setCiudades] = useState([])
    const [ciudadesMap, setCiudadesMap] = useState([])

    const [zonas, setZonas] = useState([])
    const [zonasMap, setZonasMap] = useState([])

    const [cambiarTextoEstado, setCambiarTextoEstado] = useState('')
    const [cambiarTextoMunicipio, setCambiarTextoMunicipio] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    /**SERVICES */

    const getTerritorialService = async (pid, param) => {

      setIsLoading(true)
      const response = await fetch(
        `https://www1.mercantilseguros.com/appweb/api/v1/organizacion-territorial?pid=${pid}`,{
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
        if(param === 'E')
            setEstados(data)
        else if(param === 'M')
            setMunicipios(data)
        else if(param === 'C')
            setCiudades(data)
        else
            setZonas(data)
      } else {
        setIsLoading(false)
        alert("Error")
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

    const getEstados = () => {

      let object = parseURLParams(window.location.href)
      let param = 'E'
      
      if (object !== undefined && object.gid[0] === 'PAN') {
        setCambiarTextoEstado('Provincias')
        setCambiarTextoMunicipio('Corregimientos')
        getTerritorialService(ID_COUNTRY_PANAMA, param)
      } else {
        setCambiarTextoEstado('Estados')
        setCambiarTextoMunicipio('Municipios')
        getTerritorialService(ID_COUNTRY_VENEZUELA, param)
      }
    }

    /**MAPPERS */

    const mapMunicipios = () => {
        let municipiosTemp = []
        municipios.map((e) => {
        municipiosTemp.push({ value: e.id, label: e.nombre })
      })
      setMunicipiosMap(municipiosTemp) 
    }

    const mapCiudades = () => {
        let ciudadesTemp = []
        ciudades.map((e) => {
        ciudadesTemp.push({ value: e.id, label: e.nombre })
      })
      setCiudadesMap(ciudadesTemp) 
    }

    const mapZonas = () => {
        let zonasTemp = []
        zonas.map((e) => {
        zonasTemp.push({ value: e.id, label: e.nombre })
      })
      setZonasMap(zonasTemp) 
    }

    /**HANDLERS */

    const handleSelectChangeEstado = (selected) => {
        let param = 'M'
        sessionStorage.setItem("estadoId", selected.value)
        getTerritorialService(selected.value, param)
    }

    const handleSelectChangeMunicipio = (selected) => {
        let param = 'C'
        sessionStorage.setItem("municipioId", selected.value)
        getTerritorialService(selected.value, param)
    }

    const handleSelectChangeCiudad = (selected) => {
        let param = 'Z'
        sessionStorage.setItem("ciudadId", selected.value)
        getTerritorialService(selected.value, param)
    }

    const handleSelectChangeZona = (selected) => {
        sessionStorage.setItem("zonaId", selected.value)
    }

    const handleInputConjuntoResidencial = (event) => {
        sessionStorage.setItem("conjunto", event.target.value)
    }

    /**USE EFFECTS */

    useEffect(() => {
        getEstados()
    }, [])

    useEffect(() => {
        const mapEstados = () => {
            let estadosTemp = []
              estados.map((e) => {
              estadosTemp.push({ value: e.id, label: e.nombre })
            })
            setEstadosMap(estadosTemp)
        } 
        mapEstados()
      }, [estados])

      useEffect(() => {
        mapMunicipios()
      }, [municipios])

      useEffect(() => {
        mapCiudades()
      }, [ciudades])

      useEffect(() => {
        mapZonas()
      }, [zonas])

    return (
        <div id="combinado" className="flex justify-center">
            <Spinner state={isLoading}></Spinner>
            <div className="bg-gray-100 border border-gray-400 w-full sm:w-[50%] h-auto mt-10 rounded-xl shadow-md">
                <div className="p-4 mt-2 text-gray-800 font-bold"><h3>Cotizador Combinado Residencial</h3></div>
                <div className="p-4 mt-2 text-black text-sm"><p>Datos de propiedad</p></div>
                <div className="p-4 mt-1 flex flex-wrap">
                    <div className="w-full sm:w-1/2 mb-2 sm:pr-2">
                        <div className="p-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">{cambiarTextoEstado}</label>
                            <Select 
                            onChange={handleSelectChangeEstado}
                            options={estadosMap}
                            placeholder="Seleccione" />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 mb-2 sm:pl-2">
                        <div className="p-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">{cambiarTextoMunicipio}</label>
                            <Select 
                            onChange={handleSelectChangeMunicipio}
                            options={municipiosMap}
                            placeholder="Seleccione" />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 mb-2 sm:pr-2">
                        <div className="p-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Ciudades</label>
                            <Select 
                            onChange={handleSelectChangeCiudad}
                            options={ciudadesMap}
                            placeholder="Seleccione" />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 mb-2 sm:pl-2">
                        <div className="p-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Zonas</label>
                            <Select 
                            onChange={handleSelectChangeZona}
                            options={zonasMap}
                            placeholder="Seleccione" />
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-black">Nombre del conjunto residencial</label>
                        <input type="text" className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder="Ingrese nombre del conjunto residencial" maxlength="255" onChange={handleInputConjuntoResidencial}/>   
                    </div>
                </div>
            </div>
        </div>
    )
}