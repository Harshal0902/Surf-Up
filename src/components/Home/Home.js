import React from 'react'
import Map from "../Map/Map"
import "./Home.css"
export default function Home() {
    return (
        <>
            <div className="home-center">
                <h1>Surf Up</h1>
                <p>Easy way to plan beatch trip during COVID. Surf Up shows the region which is not safe(i.e. having more COVID cases)</p>
            </div>
            <div className="Map">
                <Map />
            </div>
        </>
    )
}
