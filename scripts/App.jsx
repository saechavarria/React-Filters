function App (){
  return(
    <div>
      <Principal/>
   </div>
  )
}

class Principal extends React.Component {
  
  state = {
    data : hotelsData,
    hoy : dateTodayFilterShow
  }
  
  render(){


    const handleChangeFilter = e => {

      e.preventDefault();

      console.log(e.target.id);

      this.setState({
       hoy: e.target.value
      });
      
      //Obtengo el valor de la fecha y lo combierto con valueOf() para poder comparar
      const dateSince = document.getElementById('dateSince').value;
      const dateSince2 = new Date (dateSince)

      //Obtengo el valor de la fecha y lo combierto con valueOf() para poder comparar
      const dateTo = document.getElementById('dateTo').value;
      const dateTo2 = new Date (dateTo)

      //Obtengo el valor del input de las ciudades
      const country = document.getElementById('country').value;

      //Obtengo el valor del input de las ciudades
      const price = document.getElementById('price').value;

      //Obtengo el valor del input de las ciudades
      const rooms = document.getElementById('rooms').value;


     // console.log(
      //  "dateSince: "+dateSince2,
      //  "dateTo: "+dateTo2,
      //  "country: "+country,
      //  "price: "+price,
     //   "rooms: "+rooms,
      
      //)
        
     // const prueba = hotelsData.filter(hotels => 
        
     // )
      
      //this.setState({
       // data: prueba
     // });

    }
    return(
      <div>
        <Header/>
        <Filters hotelsData = {this.state.data} filter = {handleChangeFilter} hoy = {this.state.hoy}/>
        <div className="container-fluid">
          <div className="row">  
          <Cards hotelsData = {this.state.data} />  
          </div>
        </div>
      </div>
    )
  }
}

function Header(){
  return(
    <div className="header">
      <div className="container-fluid">
        <h4 className="h4-header">Hoteles</h4>
        <br/>
        <h5 className="h5-header">desde { dateToday } hasta { newDateToShow }</h5>
        <br/>
      </div>
    </div>  
  )
}

//TO DO COMPONETIZAAARRR!!!!
function Filters (props) {
    return(
      <div className="filters container-fluid ">
        <div className="row"> 
          <div className="col-md">
            <input id="dateSince" className="form-control form-control-lg" type="date"  value ={props.hoy} onChange={props.filter}/> 
          </div>
          <div className="col-md">
            <input id="dateTo" className="form-control form-control-lg" type="date" onChange={props.filter}/> 
          </div>
          <div className="col-md">
            <select id="country" class="form-control form-control-lg" onChange={props.filter}>
              <option>Todos los paises</option>
              <option value="Colombia">Colombia</option>
              <option value="Argentina">Argentina</option>
              <option value="Chile">Chile</option>
              <option value="Brasil">Brasil</option>
              <option value="Uruguay">Uruguay</option>
            </select>
          </div>
          <div className="col-md">
            <select id="price" class="form-control form-control-lg" onChange={props.filter}>
              <option>Cualquier precio</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="col-md">
            <select id="rooms" class="form-control form-control-lg" onChange={props.filter}>
              <option>Cualquier tamaño</option>
              <option value="1">pequeño</option>
              <option value="2">Mediano</option>
              <option value="3">Grande</option>
            </select>
          </div>
        </div>
      </div>
    )
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