import React, { Component } from 'react'
import axios from 'axios';

const API_KEY = 'd17c3be72502bb6f00871266a091a9dc';

export default class Weather extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             data: [],
             weather: [],
        }
    }

    getDay = () => {
        let d = new Date()
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let day = d.getDay()
        let numMonth = d.getMonth()
        let dayNum = d.getDate()
        switch (day) {
            case 0:
                return 'Sunday, ' + months[numMonth] + ' ' + dayNum
                break;
            case 1:
                return 'Monday, ' + months[numMonth] + ' ' + dayNum
                break;
            case 2:
                return 'Tuesday, ' + months[numMonth] + ' ' + dayNum
                break;
            case 3:
                return 'Wednesday, ' + months[numMonth] + ' ' + dayNum
                break;
            case 4:
                return 'Thursday, ' + months[numMonth] + ' ' + dayNum
                break;
            case 5:
                return 'Friday, ' + months[numMonth] + ' ' + dayNum
                break;
            case 6:
                return 'Saturday, ' + months[numMonth] + ' ' + dayNum
                break;
        }
    }

    getTime = () => {
        let currentTime = this.state.data.dt

        let date = new Date(currentTime * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime
    }

    getSunrise = () => {
        let sunriseTime = this.state.data.sys.sunrise
        var date = new Date(sunriseTime * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime
    }

    getSunset = () => {
        let sunsetTime = this.state.data.sys.sunset
        var date = new Date(sunsetTime * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=${API_KEY}`)
        .then(res => {
            console.log(res.data)
            this.setState({
                data: res.data,
                weather: res.data.weather
            })
        })
        .catch(error => console.log(error))
    }

    getColor = (id) => {
            if (id >= 200 && id <= 299){
                return 'mediumpurple'
            }
            if (id >= 300 && id <= 399){
                return 'lightskyblue'
            }
            if (id >= 500 && id <= 599){
                return 'lightblue'
            }
            if (id >= 600 && id <= 699){
                return 'mintcream'
            }
            if (id == 800){
                return 'lightgoldenrodyellow'
            }
            if (id >= 801 && id <= 899){
                return 'lightsteelblue'
            }
            if (id >= 700 && id <= 799){
                return 'lightslategray'
            }
        }

    render() {
        return (
            <div style={{backgroundColor: 'white', width: 300, height: 700, margin: 'auto', position:'relative', border: 'solid', overflow: 'hidden'}}>
                
                
                <h1>{this.getColor()}</h1>
                {
                    this.state.weather.map(w => (
                        <>
                    
                        <p style={{float:'right', textAlign: 'right', margin: 0, paddingRight: 10, fontSize: 12}}>{this.getDay()}</p>
                        <p style={{float:'left', textAlign: 'left', margin: 0, paddingLeft: 10}}>{this.state.data.name}, {this.state.data.sys.country}</p>
                        <p style={{clear:'both', float:'left', margin:0, paddingLeft: 10, fontSize: 10, paddingBottom: 20}}>Lon: {(this.state.data.coord.lon).toFixed(1)} Lat: {(this.state.data.coord.lat).toFixed(1)}</p>
                        <p style={{clear:'both', float:'left', margin:0, paddingLeft: 10, fontSize: 10, paddingBottom: 20, textAlign:'center'}}>Base: {this.state.data.base}</p>
                        <p style={{float:'right', textAlign: 'right', margin: 0, paddingRight: 10, fontSize: 10}}>Visbility: {this.state.data.visibility}</p>
                        <p style={{clear:'both', float:'left', margin:0, paddingLeft: 10, fontSize: 10, paddingBottom: 20, textAlign:'center'}}>Sys Type: {this.state.data.sys.type}, Sys ID: {this.state.data.sys.id}</p>
                        <p style={{float:'right', textAlign: 'right', margin: 0, paddingRight: 10, fontSize: 10}}>Sea Level: {this.state.data.main.sea_level}</p>
                        <p style={{clear:'both', float:'left', margin:0, paddingLeft: 10, fontSize: 10, paddingBottom: 20, textAlign:'center'}}>ID {this.state.data.id} COD {this.state.data.cod}</p>
                        <p style={{float:'right', textAlign: 'right', margin: 0, paddingRight: 10, fontSize: 10}}>Ground Level: {this.state.data.main.grnd_level}</p>
                        <p style={{clear:'both', float:'left', margin:0, paddingLeft: 10, fontSize: 10, paddingBottom: 20, textAlign:'center'}}>Timezone: {this.state.data.timezone}</p>

                        <div style={{clear:'both', width: 200, height: 250, margin: 'auto', backgroundColor: 'white', overflow: 'hidden', position: 'relative'}}>
                            <img style={{float: 'left', margin: 0, padding: 0}} src={`http://openweathermap.org/img/wn/${w.icon}@2x.png`}></img>
                            <p style={{float: 'right', fontSize: 40, fontWeight: 900, padding: 0,position: 'absolute', marginLeft: 'auto', marginRight: 'auto', left: '70%', right: 0, marginTop:'10%',textAlign: 'center', color: `${this.getColor(w.id)}`}}>°C</p>
                            <p style={{clear: 'both',fontSize: 60, fontWeight: 900, padding: 0, position: 'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: 0, textAlign: 'center', color: `${this.getColor(w.id)}`}}>{(this.state.data.main.temp-273.15).toFixed(2)}</p>
                            <p style={{padding: 0, position: 'absolute', marginLeft: 'auto', marginRight: 'auto', marginTop: '65%', left: 0, right: 0, textAlign: 'center'}} >{w.main.toUpperCase()}</p>
                            <p style={{padding: 0, position: 'absolute', marginLeft: 'auto', marginRight: 'auto', marginTop: '75%', left: 0, right: 0, textAlign: 'center'}} >{w.description}</p>
                            <p style={{padding: 0, position: 'absolute', marginLeft: 'auto', marginRight: 'auto', marginTop: '85%', left: 0, right: '70%', textAlign: 'center', fontSize: 14}}>&#8595; {(this.state.data.main.temp_min-273.15).toFixed(2)}&#176;C</p>
                            <p style={{padding: 0, position: 'absolute', marginLeft: 'auto', marginRight: 'auto', marginTop: '85%', left: '70%', right: 0, textAlign: 'center', fontSize: 14}}>&#8593; {(this.state.data.main.temp_max-273.15).toFixed(2)}&#176;C</p>
                            <p style={{padding: 0, position: 'absolute', marginLeft: 'auto', marginRight: 'auto', marginTop: 0, left: 0, right: 0, textAlign: 'center', fontSize: 12}}>Feels Like: {(this.state.data.main.feels_like-273.15).toFixed(2)}&#176;C</p>
                        </div>

                        <div>
                            <p style={{position:'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: '65%', bottom: '33%', textAlign:'center', fontSize: 14}}>{this.getSunrise()}</p>
                            <p style={{position:'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: 0, bottom: '33%', textAlign:'center', fontSize: 14}}>{this.getTime()}</p>
                            <p style={{position:'absolute', marginLeft: 'auto', marginRight: 'auto', left: '65%', right: 0, bottom: '33%', textAlign:'center', fontSize: 14}}>{this.getSunset()}</p>
                            <p style={{position:'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: '65%', bottom: '30%', textAlign:'center', fontSize: 12, color: `${this.getColor(w.id)}`}}>Sunrise</p>
                            <p style={{position:'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: 0, bottom: '30%', textAlign:'center', fontSize: 12, color: `${this.getColor(w.id)}`}}>Current Time</p>
                            <p style={{position:'absolute', marginLeft: 'auto', marginRight: 'auto', left: '65%', right: 0, bottom: '30%', textAlign:'center', fontSize: 12, color: `${this.getColor(w.id)}`}}>Sunset</p>
                        </div>
                        
                        <div >
                            <p style={{position:'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: '75%', bottom: '20%', textAlign:'center', fontSize: 14}}>{this.state.data.clouds.all}%</p>
                            <p style={{position:'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: 0, textAlign: 'center', bottom: '20%', textAlign:'center', fontSize: 14}}>{this.state.data.wind.gust}m/s</p>
                            <p style={{position:'absolute', marginLeft: 'auto', marginRight: 'auto', left: '75%', right: 0, bottom: '20%', fontSize: 14, textAlign:'center'}}>{this.state.data.wind.deg}&#176;</p>
                            <p style={{position:'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: 0, bottom: '17%', fontSize: 12, textAlign:'center', color: `${this.getColor(w.id)}`}}>Gust Speed</p>
                            <p style={{position:'absolute', marginLeft: 'auto', marginRight: 'auto', left: '75%', right: 0, bottom: '17%', fontSize: 12, textAlign:'center', color: `${this.getColor(w.id)}`}}>Wind Degree</p>
                            <p style={{position:'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: '75%', bottom: '17%', textAlign:'center', fontSize: 12, color: `${this.getColor(w.id)}`}}>Cloudiness</p>
                        </div>

                        <div >
                            <p style={{position:'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: '75%', bottom: '3%', textAlign:'center', fontSize: 14}}>{this.state.data.wind.speed}m/s</p>
                            <p style={{position:'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: 0, textAlign: 'center', bottom: '3%', textAlign:'center', fontSize: 14}}>{this.state.data.main.humidity}%</p>
                            <p style={{position:'absolute', marginLeft: 'auto', marginRight: 'auto', left: '75%', right: 0, bottom: '3%', fontSize: 14, textAlign:'center'}}>{this.state.data.main.pressure}hpa</p>
                            <p style={{position:'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: 0, bottom: 0, fontSize: 12, textAlign:'center', color: `${this.getColor(w.id)}`}}>Humidity</p>
                            <p style={{position:'absolute', marginLeft: 'auto', marginRight: 'auto', left: '75%', right: 0, bottom: 0, fontSize: 12, textAlign:'center', color: `${this.getColor(w.id)}`}}>Pressure</p>
                            <p style={{position:'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: '75%', bottom: 0, textAlign:'center', fontSize: 12, color: `${this.getColor(w.id)}`}}>Wind Speed</p>
                        </div>
                        </>
                    ))
                }
            </div>
        )
    }
}
