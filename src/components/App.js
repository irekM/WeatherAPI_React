import React, { Component} from 'react';
import Form from'./Form';
import Result from './Result';
import './App.css';

const APIKey = 'e4adfa1eeda8cf91dda24ccaa0505163';

//klucz do API
class App extends Component {

state = {
  value: '',
  date: '',
  city: '',
  sunrise: '',
  sunset: '',
  pressure: '',
  wind: '',
  err: false,
}

handleInputChange = (e) => {
  this.setState({
    value: e.target.value
  })
}

handleCitySubmit = e =>{
  e.preventDefault();
  const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}&units=metric`;

  fetch(API)
  .then(response => {if(response.ok){
    return response
  }
  throw Error("Nie udało się")
})

//pobrany json i przerobiony na obiekt

  .then(response => response.json())
  .then(data => {
    const time = new Date().toLocaleString()
    this.setState(state=>({

      error:false,
      city: state.value,
      date: time,
      sunset: data.sys.sunset,
      sunrise: data.sys.sunrise,
      wind: data.wind.speed,
      pressure: data.main.pressure,
      temp: data.main.temp,
    }))
  })
  .catch(err => {console.log(err);
  this.setState(state=>({
    err:true,
    city: this.state.value,
  }))
  

})
}


render() {
  return (
    <div className="App">
      <Form 
      value={this.state.value} 
      change={this.handleInputChange}
      submit={this.handleCitySubmit}
       />
      <Result weather = {this.state} />
    </div>
  );
}
}

export default App;
