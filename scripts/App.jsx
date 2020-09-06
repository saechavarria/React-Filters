//VOY A CARGAR EN MI FUNCIÓN App TODA MI APLICACIÓN PARA LUEGO RENDERIZARLA EN EL DOM

function App() {
  return (
      <Principal />
  );
}

//ACA EN MI CLASE PRINCIPAL VOY A DECLARAR MIS ESTADOS Y MI FUNCIONA DE FILTRADO PARA LUEGO PASARLOS A LOS COMPONENTES HIJOS
class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: hotelsData,
      today: "",
      dayTo: "",
      country: "all",
      price: "all",
      rooms: "all",
    };
  }
 
  filterData = () => {
    //LO SIGUIENTE ES UTILIZAR ES DESTRUCTING PARA NO TENER QUE ESTAS BINDEANDO LOS ESTADOS
    const {today, dayTo, country, price, rooms } = this.state;
    //ACA UTILIZO UN FILTER CON CONDICIONES "&&" AUNQUE TAMBIEN SE PODRIA HACER UN CHAIN FILTER QUERIA PROBAR EN HACERLO ASÍ
    //PORQUE DE ESTA MANERA SOLO VOY A NECESITAR ESTA FUNCIONA PARA MANEJAR CADA VEZ QUE CAMBIEN CUALQUIER FILTRO
    const newData = hotelsData.filter((hotel) => {
      return (
        (today === "" ? true : moment(today).format('YYYY-MM-DD') >= moment(hotel.availabilityFrom).format('YYYY-MM-DD'))  &&
        (dayTo === "" ? true :moment(dayTo).format('YYYY-MM-DD') <=  moment(hotel.availabilityTo).format('YYYY-MM-DD') ) &&
        (country === "all" ? true : hotel.country === country) &&
        (price === "all" ? true : hotel.price === Number(price)) &&
        (rooms === "all"
          ? true
          : rooms === "pequeño"
          ? hotel.rooms < 10
          : rooms === "mediano"
          ? hotel.rooms > 10 && hotel.rooms <= 20
          : hotel.rooms > 20)
      );
    });
      this.setState({
        data: newData,
      });
    
  };
  //CON ESTA FUNCIONA VOY A LLAMAR MI FUNCION FILTER CADA SE CAMBIEN CUALQUIERA DE LOS INPUTS
  handleChangeFilter = (e) => {
    switch (e.target.id) {
      case "dateSince":
        this.setState(
          {
            today: moment(e.target.value)
          },
          () => this.filterData()
        );
        break;
      case "dateTo":
        this.setState(
          {
            dayTo: moment(e.target.value),
          },
          () => this.filterData()
        );
        break;
      case "country":
        this.setState(
          {
            country: e.target.value,
          },
          () => this.filterData()
        );
        break;
      case "price":
        this.setState(
          {
            price: e.target.value,
          },
          () => this.filterData()
        );
        break;
      case "rooms":
        this.setState(
          {
            rooms: e.target.value,
          },
          () => this.filterData()
        );
        break;
    }
  };

  render() {
    return (
      <div>
        <Header today={this.state.today} dayTo={this.state.dayTo} />
        <Filters
          hotelsData={this.state.data}
          filter={this.handleChangeFilter}
          today={this.state.today}
          dayTo={this.state.dayTo}
        />
        <div className="row">
          {this.state.data.length === 0 ? <Error/> : <Cards hotelsData={this.state.data} />}
        </div>
      </div>
    );
  }
}
//EN MI COMPONENTE HEADER SIMPLEMENTE VOY A PINTAR MIS FECHAS DE FORMA BONITA UTILIZANDO MOMENT
//EN LA LINEA 125 Y 126 CON EL OPERADOR TERNARIO SI MIS ESTADOS DE FECHAS NO ESTAN SELECCIONADOS VOY A MOSTRAR UN MENSAJE PARA QUE LUZCA MEJOR LA APP
function Header(props) {
  return (
    <div className="header">
      <div className="container-fluid">
        <h4 className="h4-header">Hoteles</h4>
        <br />
        <h5 className="h5-header">
        {props.today === "" ? "Todos los hoteles" : "Desde "+props.today.format("dddd[,] DD [de] MMMM [de] YYYY")}
        {props.dayTo ==="" ? "" : " Hasta "+props.dayTo.format("dddd[,] DD [de] MMMM [de] YYYY")}
        </h5>
        <br />
      </div>
    </div>
  );
}
//ACA VOY A TENER MIS FILTROS SE PODRIA COMPONETIZAR MAS PERO COMO NO ESTOY UTILIZANDO CRA LO DEJE DE ESTA MANERA PARA TRABAJARLO MAS FACIL
//PUEDE COSTAR UN POCO ENTENDE EL HTML PERO ES MUY SENCILLO!!
function Filters(props) {
  return (
    <div className="filters">
      <div className=" container-fluid ">
        <div className="row">
          <div className="col-md col-sm-6 input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                <i class="fas fa-sign-in-alt" />
              </span>
            </div>
            <input
              id="dateSince"
              className="form-control"
              type="date"
              min={moment().format("YYYY-MM-DD")}
              onChange={props.filter}
            />
          </div>
          <div className="col-md col-sm-6 input-group ">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                <i class="fas fa-sign-in-alt" />
              </span>
            </div>
            <input
              id="dateTo"
              className="form-control"
              type="date"
              min={moment().format("YYYY-MM-DD")}
              onChange={props.filter}
            />
          </div>
          <div className="col-md col-sm-6 input-group ">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                <i class="fas fa-globe" />
              </span>
            </div>
            <select id="country" class="custom-select" onChange={props.filter}>
              <option value="all">Todos los Paises</option>
              <option value="Argentina">Argentina</option>
              <option value="Chile">Chile</option>
              <option value="Brasil">Brasil</option>
              <option value="Uruguay">Uruguay</option>
            </select>
          </div>
          <div className="col-md col-sm-6 input-group ">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                <i class="fas fa-dollar-sign" />
              </span>
            </div>
            <select
              id="price"
              class="custom-select form-control form-control-lg"
              onChange={props.filter}
            >
              <option value="all">Todos los precios</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
            </select>
          </div>
          <div className="col-md col-sm-6 input-group ">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                <i class="fas fa-bed" />
              </span>
            </div>
            <select
              id="rooms"
              class="custom-select form-control form-control-lg"
              onChange={props.filter}
            >
              <option value="all">Todos los tamaños</option>
              <option value="pequeño">Pequeño</option>
              <option value="mediano">Mediano</option>
              <option value="grande">Grande</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
//ACA VA ESTA MI COMPONENTE CARD, ESTE ES FACIL DE LEER
//NOTA: UTILICE BOOTSTRAP PARA REALIZAR LA APP RESPOSIVE Y QUE SEA LINDA XD
function Cards(props) {

  const hotelsData = props.hotelsData;

  return hotelsData.map((hotel) => (
    <div className="item col-xl-3 col-md-4 col-sm-6">
      <div className="card">
        <img className="card-img-top" src={hotel.photo} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{hotel.name}</h5>
          <p className="card-text">{hotel.description}</p>
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">
              <i class="fas fa-globe-americas" />
            </span>
            <div className="country">
              {hotel.city}, {hotel.country}
            </div>
          </div>
          <br />
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">
              <i class="fas fa-bed" />
            </span>
            <div className="rooms">{hotel.rooms} Habitaciones</div>
            <div className="price">
              <Price price={hotel.price} />
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button type="button" className="btn btn-lg btn-block">
            Reservar
          </button>
        </div>
      </div>
    </div>
  ));
}
//ESTO ES PARA MOSTAR UN ERROR CUANDO NO SE ENCUENTREN HOTELES
//EN LA LINEA 109 SE ESTA MANEJANDO ESTA PARTE
function Error() {
  return(
    <div className="item error">
      <h1>NO SE ENCONTRARON HOTELES</h1>
    </div>
  )
}
//ESTE COMPONENTE ES PARA PODER REPRESENTAR DE UNA FORMA VISUAL LOS PRECIOS "$$$$" Y PINTARLOS TAMBIEN BONITOS.
function Price(props) {
  const priceCheck = (price) => {
    return price <= props.price
      ? "fas fa-dollar-sign checked"
      : "fas fa-dollar-sign unChecked";
  };

  return (
    <div>
      <span className={priceCheck(1)} />
      <span className={priceCheck(2)} />
      <span className={priceCheck(3)} />
      <span className={priceCheck(4)} />
    </div>
  );
}
//ACA PINTO MI COMPONENTE APP QUE TIENE TODA MI APP EN MI HTML
ReactDOM.render(<App />, document.getElementById("app"));
