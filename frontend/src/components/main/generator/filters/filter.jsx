import React, { useState, useEffect } from 'react'
import './filter.css'



const Filter = () => {
    const [brightness, setBrightness] = useState(100)
    const [blur, setBlur]  = useState(0)
    const [contrast, setContrast] = useState(100)
    const [grayscale, setGrayscale] = useState(0)
    const [sepia, setSepia] = useState(0)
    const [saturate, setSaturate] = useState(100)
    const [hueRotate, setHueRotate] = useState(0)
    const [invert, setInvert] = useState(0)
    const picture = document.getElementById('canvas2')

    useEffect( () => {
       
        document.getElementById('canvas2').style.filter = `brightness(${brightness}%) blur(${blur}px) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%) saturate(${saturate}%)  hue-rotate(${hueRotate}deg) invert(${invert}%)`
    })

    const reset = () => {
        setBrightness(100);
        setBlur(0);
        setContrast(100);
        setGrayscale(0);
        setSepia(0);
        setSaturate(100);
        setHueRotate(0)
        setInvert(0)

    }


    const changeBrightness = (e) => {
        setBrightness(e.currentTarget.value)
    }
    
    const changeBlur = (e) => {
        setBlur(e.currentTarget.value)
    }
    
    const changeContrast = (e) => {
        setContrast(e.currentTarget.value)
    }
    
    const changeGrayscale = (e) => {
        setGrayscale(e.currentTarget.value)
    }
    
    const changeSepia = (e) => {
        setSepia(e.currentTarget.value)
    }
    
    const changeSaturate = (e) => {
        setSaturate(e.currentTarget.value)
    }
    
    const changeHueRotate = (e) => {
        setHueRotate(e.currentTarget.value)
    }
    
    const changeInvert = (e) => {
        setInvert(e.currentTarget.value)
    }



    return (
    <div className="Filter-Container">
        <div>
            Filters
        </div>
         <div className="Filter-Row">
            <div className="Filter-Row-Text">
                <div>
                Brightness: 
                </div>
                <div>
                {brightness}
                </div>
            </div>
            <input className="slider" type="range" min="0" max="200" onChange={ e => changeBrightness(e)} defaultValue="100" />
            
        </div>   
        
        <div className="Filter-Row">
        <div className="Filter-Row-Text">
                <div>
                Brightness: 
                </div>
                <div>
                {brightness}
                </div>
            </div>
            Blur:  {blur}
            <input className="slider" type="range" min="0" max="10" onChange={ e => changeBlur(e)} defaultValue="0" />
       
        </div>

        <div className="Filter-Row">
            <div className="Filter-Row-Text">
                <div>
                Contrast: 
                </div>
                <div>
                {contrast}
                </div>
            </div>
            <input className="slider" type="range" min="0" max="100" onChange={ e => changeContrast(e)} defaultValue="100" />
          
        </div>

        <div className="Filter-Row">
            <div className="Filter-Row-Text">
                <div>
                Grayscale: 
                </div>
                <div>
                {grayscale}
                </div>
            </div>
            <input className="slider" type="range" min="0" max="100" onChange={ e => changeGrayscale(e)} defaultValue="0" />
           
        </div>

        <div className="Filter-Row">
            <div className="Filter-Row-Text">
                <div>
                Sepia 
                </div>
                <div>
                {sepia}
                </div>
            </div>
            <input className="slider" type="range" min="0" max="100" onChange={ e => changeSepia(e)} defaultValue="0" />
            
        </div>

        <div className="Filter-Row"> 
            <div className="Filter-Row-Text">
                <div>
                Saturate: 
                </div>
                <div>
                {saturate}
                </div>
            </div>
            <input className="slider" type="range" min="0" max="100" onChange={ e => changeSaturate(e)} defaultValue="100" />
            
        </div>

        <div className="Filter-Row">
            <div className="Filter-Row-Text">
                <div>
                Hue Rotate: 
                </div>
                <div>
                {hueRotate}
                </div>
            </div>
            <input className="slider" type="range" min="0" max="360" onChange={ e => changeHueRotate(e)} defaultValue="0" />
            

        </div>

        <div className="Filter-Row">
            <div className="Filter-Row-Text">
                <div>
                Invert
                </div>
                <div>
                {invert}
                </div>
            </div>
            <input className="slider" type="range" min="0" max="100" onChange={ e => changeInvert(e)} defaultValue="0" />
            
        </div>

        <div>
            <button onClick={reset}>
                RESET
            </button>
        </div>
    </div>
    )
}

export default Filter

