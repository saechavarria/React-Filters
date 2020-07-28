function App (){
  return(
    <div>
      <Header/>
   </div>
  )
}

class Header extends React.Component {
  
  state = {
    fechas : hotelsData
  }
  
  render()
  
  {
    return(
      
      //Retorno mi header
      <div>
        <div className="header">
          <div className="container-fluid">
            <h4 className="h4-header">Hoteles</h4>
            <br/>
            <h5 className="h5-header">desde el martes,1 de enero del 2019 hasta el miercoles, 2 de enero de 2019</h5>
            <br/>
          </div>
        </div>  
         <Filters hotelsData = {hotelsData}/>
        <div className="row">
          <Cards hotelsData = {hotelsData}/>  
        </div>
      </div>
    )
  }
}


//TO DO COMPONETIZAAARRR!!!!
function Filters (props) {

  const hotelsData = props;
  
  return(
    <div className="">
      <div className="filters">
        <br/>
        <div className="container-fluid">
          <div className="row">   
            <div className="col-md">
              <input className="form-control form-control-lg" type="date"/> 
            </div>
            <div className="col-md">
              <input className="form-control form-control-lg" type="date"/> 
            </div>
            <div className="col-md">
              <select class="form-control form-control-lg">
                <option>Todos los paises</option>
                <option>Colombia</option>
                <option>Brasil</option>
              </select>
            </div>
            <div className="col-md">
              <select class="form-control form-control-lg">
                <option>Cualquier precio</option>
              </select>
            </div>
            <div className="col-md">
              <select class="form-control form-control-lg">
                <option>Cualquier tamaño</option>
              </select>
            </div>
          </div>
        </div>
        <br/>
      </div>
    </div>
  )
}

function Cards (props) {

  const hotelsData = props.hotelsData;
  console.log(props)  

  return hotelsData.map( hotel =>
      <div className="col-4">
        <div className="card">
          <img className="card-img-top" src={hotel.photo} alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title">{hotel.name}</h5>
            <p className="card-text">{hotel.description}</p>
          </div>

          <div className="card-footer">
            <button type="button" className="btn btn-success">Reservar</button>
          </div>
        </div>
      </div>
  )
}


ReactDOM.render(<App/>,document.getElementById("app"));