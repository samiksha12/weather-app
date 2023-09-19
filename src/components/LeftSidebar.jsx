import React from 'react'
import SearchCities from './SearchCities'
import LocationImage from './LocationImage'

function LeftSidebar() {
  return (
    <div className='m-2 p-2 d-flex flex-column justify-content-between'>
        <SearchCities></SearchCities>
        <div></div>
        <div></div>
        <LocationImage></LocationImage>
    </div>
  )
}

export default LeftSidebar