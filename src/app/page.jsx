"use client"

import NavBar from "./navbar"
import Asesores from "./asesores"
import Combinado from "./combinado"
import Encabezado from "./encabezado"
import Footer from "./footer"
import ButtonGenerarEnlace from './button-enlace'

export default function Home () {

  return (
    <div id="Home" className="bg-gray-200">
      <NavBar></NavBar>
      <Asesores></Asesores>
      <Combinado></Combinado>
      <Encabezado></Encabezado>
      <ButtonGenerarEnlace></ButtonGenerarEnlace>
      <Footer></Footer>
    </div> 
  )
}
