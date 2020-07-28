function App (){
  return(
    <div>
      <div>Configuración éxitosa!</div>
      <Prueba/>
   </div>
  )
}

let Prueba = () => {
  return(
    <div>Hola desde Prueba</div>
  )
}

ReactDOM.render(<App/>,document.getElementById("app"));