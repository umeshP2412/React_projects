import React, { useEffect, useState } from 'react';
import Weathercard from './weathercard';
import "./style.css"

const Temp = () => {

    const [searchValue, setSearchValue] = useState('Ahmedabad')
    const [tempInfo, setTempInfo] = useState({})

    const getWeatherInfo = async () => {
        try {
            let geoLocURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&appid=ab2c4bb2b46edd47ec17209ad47d9b49`

            const result = await fetch(geoLocURL)
            const data = await result.json()

            if(!data[0]){
                throw new Error('geo Location not found!')
            }
            let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=ab2c4bb2b46edd47ec17209ad47d9b49`

            const weatherResult = await fetch(weatherUrl)
            const weatherData = await weatherResult.json()

            const { temp, humidity, pressure } = weatherData.main
            const { main: weathermood } = weatherData.weather[0]
            const { name } = weatherData
            const { speed } = weatherData.wind
            const { country, sunset } = weatherData.sys

            const sunsetTime = await `${new Date(sunset * 1000).getHours()}:${new Date(sunset * 1000).getMinutes()}`
            const myWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunsetTime
            }

            setTempInfo(myWeatherInfo)

            console.log("sunsetTime" ,sunsetTime)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getWeatherInfo()
    },[])
  return (
    <>
        <div className="wrap">
            <div className="search">
                <input type="search" placeholder='Search...' autoFocus id='search' className='searchTerm' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
            </div>
        </div>

        {/* our temp card  */}
        <Weathercard tempInfo={tempInfo}/>

    </>
  )
}

export default Temp