import axios from 'axios';
import React from 'react' ;
import './App.css';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Weather from './Weather';
// import Movies from './Movies';

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        city: "",
        locationObj: {},
        showError: false,
        errorMessage:"",
        weatherArr:[]
      };
    }
  
  handleChange = (event) => {
    let typedCity = event.target.value;
    this.setState({city: typedCity});
    console.log(typedCity);
  };

  getLocation = async (event) => {
    event.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`;
    console.log('URL: ', url);
    try {
    let response = await axios.get(url);
    console.log('location esponse:', response.data[0]);
    this.setState({
    locationObj: response.data[0]
    });
    this.getWeather();
    // this.getMovies();
   } catch(error){
     this.setState({
        showError:true,
        // errorMessage: error.response.status +':' + error.response.data.error
     })
   }
  }

  getWeather = async () => {
    const url = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.locationObj.lat}&lon=${this.state.locationObj.lon}&searchQuery=${this.state.city}`
    try {
      let response = await axios.get(url);
      console.log('Weather response: ', response.data);
      this.setState({
        weatherArr: response.data
      });
    } catch(error) {
      this.setState({
        showError: true,
        // errorMessage: Response.data
      })
    }
  }

  // getMovies = async () => {
  //   const url = `${process.env.SERVER}/movies?searchQuery=${this.state.city}`
  //   try {
  //     let response = await axios.get(url);
  //     console.log('Movies response: ', response.data);
  //     this.setState({
  //       moviesArr: response.data
  //     });
  //   } catch(error) {
  //     this.setState({
  //       showError: true,
  //       // errorMessage: Response.data
  //     })
  //   }
  // }
  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>City Exlporer</h1>
      </header>

      <form className='form' onSubmit={this.getLocation}>
        Your City: {" "}
         <input type="text" name="yourcity" onChange = {this.handleChange} />
        <button type='submit'>Search</button>
      </form>

      {this.state.locationObj.display_name &&
       <Container className='container' >
      <h2>here is the map for {this.state.locationObj.display_name} </h2>
      <p>Lat/Lon: {this.state.locationObj.lat}, {this.state.locationObj.lon}</p>
      <Image
              className="map"
              roundedCircle
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locationObj.lat},${this.state.locationObj.lon}&zoom=12`}
              alt={this.state.locationObj.display_name}/>

              <Weather weatherArr={this.state.weatherArr}/>
              {/* <Movies moviesArr={this.state.moviesArr}/> */}
      {/* <Image className='map' roundedCircle scr={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locationObj.lat},${this.state.locationObj.lon}&zoom=12&format=jpg`} alt={this.state.locationObj.display_name}/> */}
      </Container>
       }

       {this.state.showError &&
       <Alert varient='danger'>{this.state.errorMessage}</Alert>
      }
      </div>
    );
  }
}; 
export default App;
