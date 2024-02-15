import React from 'react'
import SearchCities from './SearchCities'
import LocationImage from './LocationImage'
import TodayWeather from './TodayWeather'

function LeftSidebar() {
  return (
    <div className='m-2 p-2 d-flex flex-column justify-content-between'>
        <SearchCities></SearchCities>
        <TodayWeather></TodayWeather>
    </div>
  )
}

export default LeftSidebar