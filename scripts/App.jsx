function App (){
  return(
    <div>
      <Principal/>
   </div>
  )
}

class Principal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data : hotelsData,
      today : moment(),
      dayTo: moment().add(30,"days"),
      country: "all",
      price: "all",
      rooms: "all",
    }
  }
  

  filterData = () => {
    //Destructuring (usar variables locales y no poner this!!!)
    const { today, dayTo, country, price, rooms } = this.state;
  
    const newData = hotelsData.filter(hotel =>{

      return (
        (hotel.availabilityFrom >= today.valueOf() && hotel.availabilityTo <= dayTo.valueOf() ) && 
        (country === "all" ? true : hotel.country === country) && 
        (price === "all" ? true : hotel.price === Number(price)) && 
        (rooms === "all" ? true :(
          rooms === "pequeño" ? (hotel.rooms < 10) : 
          rooms === "mediano" ?( hotel.rooms > 10 && hotel.rooms <= 20) :
          (hotel.rooms > 20)
          )
        )
      )
    })

    this.setState({
      data: newData
    })
  }
  //TOOODOOOOOOOOOOO  HACE QUE FUNCIONE EL FILTROOOOOOOOOOOO.
  //var newList = [];
  handleChangeFilter = e => {
      
    switch(e.target.id){
      case 'dateSince':
        this.setState({
          today: moment(e.target.value)
        },() => this.filterData());
        break;
      case 'dateTo':
        this.setState({
          dayTo: moment(e.target.value)
        },() => this.filterData());  
        break;
      case 'country':
        this.setState({
          country: e.target.value
        },() => this.filterData());
        break;
      case 'price':
        this.setState({
          price: e.target.value
        },() => this.filterData());
        break;
      case 'rooms':
        this.setState({
          rooms: e.target.value
        },() => this.filterData());
        break; 
    }

   // this.setState({
    //  data: newList
   // })

  }

  render(){

    return(
      <div>
        <Header today = {this.state.today} dayTo = {this.state.dayTo}/>
        <Filters hotelsData = {this.state.data} filter = {this.handleChangeFilter} today = {this.state.today} dayTo = {this.state.dayTo}/>
        <div className="container-fluid">
          <div className="row">  
          <Cards hotelsData = {this.state.data} />  
          </div>
        </div>
      </div>
    )
  }
}

function Header(props){
  return(
    <div className="header">
      <div className="container-fluid">
        <h4 className="h4-header">Hoteles</h4>
        <br/>
        <h5 className="h5-header">Desde   { props.today.format("dddd[,] DD [de] MMMM [de] YYYY") } hasta {props.dayTo.format("dddd[,] DD [de] MMMM [de] YYYY") }</h5>
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
            <input id="dateSince" className="form-control form-control-lg" type="date" value={props.today.format("YYYY-MM-DD")} onChange={props.filter}/> 
          </div>
          <div className="col-md">
            <input id="dateTo" className="form-control form-control-lg" type="date" value={props.dayTo.format("YYYY-MM-DD")} onChange={props.filter}/> 
          </div>
          <div className="col-md">
            <select id="country" class="form-control form-control-lg" onChange={props.filter}>
              <option value="all">Todos los Paises</option>
              <option value="Argentina">Argentina</option>
              <option value="Chile">Chile</option>
              <option value="Brasil">Brasil</option>
              <option value="Uruguay">Uruguay</option>
            </select>
          </div>
          <div className="col-md">
            <select id="price" class="form-control form-control-lg" onChange={props.filter}>
              <option value="all">Todos los precios</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="col-md">
            <select id="rooms" class="form-control form-control-lg" onChange={props.filter}>
              <option value="all">Todos los tamaños</option>
              <option value="pequeño">Pequeño</option>
              <option value="mediano">Mediano</option>
              <option value="grande">Grande</option>
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
            desde: { moment(hotel.availabilityFrom).format("YYYY-MM-DD") } hasta : { moment(hotel.availabilityTo).format("YYYY-MM-DD") }
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