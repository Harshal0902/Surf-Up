import React from 'react'
import Map from "../Map/Map"

export default function HomeHi() {
    return (
        <>
            <div className="home-center">
                <h1>Surf Up</h1>
                <p>COVID के दौरान बीच ट्रिप की योजना बनाने का आसान तरीका। सर्फ अप उस क्षेत्र को दिखाता है जो सुरक्षित नहीं है (अर्थात अधिक COVID मामले होने पर)
                </p>
            </div>
            <div className="Map">
                <Map />
            </div>
        </>
    )
}
