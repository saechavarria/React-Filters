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

    //TO DOOOOO  MOSTRAR FECHA HASTA 15 DÍAS DE LA FECHA ACTUAL

    return(
      
      //Retorno mi header
      <div>
        <div className="header">
          <div className="container-fluid">
            <h4 className="h4-header">Hoteles</h4>
            <br/>
            <h5 className="h5-header">desde { dateToday } hasta { newDateToShow }</h5>
            <br/>
          </div>
        </div>  
         <Filters hotelsData = {hotelsData}/>
        <div className="container-fluid">
          <div className="row">  
          <Cards hotelsData = {hotelsData}/>  
          </div>
        </div>
      </div>
    )
  }
}
//TO DO COMPONETIZAAARRR!!!!
class Filters  extends React.Component {

  render() {

    const handleChangeFilter = e => {
      e.preventDefault();
      console.log(e.target.value);
    }
    
  
    return(
      <div className="filters container-fluid ">
        <div className="row"> 
          <div className="col-md">
            <input className="form-control form-control-lg" type="date" value={dateTodayFilterShow} onChange={handleChangeFilter}/> 
          </div>
          <div className="col-md">
            <input className="form-control form-control-lg" type="date" value={dateToFilterShow} onChange={handleChangeFilter}/> 
          </div>
          <div className="col-md">
            <select class="form-control form-control-lg" onChange={handleChangeFilter}>
              <option>Todos los paises</option>
              <option>Colombia</option>
              <option>Argentina</option>
              <option>Chile</option>
              <option>Brasil</option>
              <option>Uruguay</option>
            </select>
          </div>
          <div className="col-md">
            <select class="form-control form-control-lg" onChange={handleChangeFilter}>
              <option>Cualquier precio</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div className="col-md">
            <select class="form-control form-control-lg">
              <option>Cualquier tamaño</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}



function Cards (props) {

  const hotelsData = props.hotelsData;

  return hotelsData.map( hotel =>
      <div className="item col-md-4 col-sm-6">
        <div className="card">
          <img className="card-img-top" src={hotel.photo} alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title">{hotel.name}</h5>
            <p className="card-text">{hotel.description}</p>
            <div className="">
              <i class="logo fa fa-globe"></i> {hotel.city}, {hotel.country}
            </div>
            <br/>
            <div className="">
              <i class="logo fa fa-bed"></i> {hotel.rooms} Habitaciones
            </div>
          </div>
          <div className="card-footer">
            <button type="button" className="btn btn-success">Reservar</button>
          </div>
        </div>
      </div>
  )
}


ReactDOM.render(<App/>,document.getElementById("app"));