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
    const [showBrightness, setShowBrightness] = useState(false)
    const [showBlur, setShowBlur] = useState(false)
    const [showContrast, setShowContrast] = useState(false)
    const [showGrayscale, setShowGrayscale] = useState(false)
    const [showSepia, setShowSepia] = useState(false)
    const [showSaturate, setShowSaturate] = useState(false)
    const [showHueRotate, setShowHueRotate] = useState(false)
    const [showInvert, setShowInvert] = useState(false)
  

    useEffect( () => {
       
        document.getElementById('picture').style.filter = `brightness(${brightness}%) blur(${blur}px) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%) saturate(${saturate}%)  hue-rotate(${hueRotate}deg) invert(${invert}%)`
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
        <div className="Filter-Header">
            FILTERS
        </div>
        <div className="Filter-Divider" />

        <div className="Filter-Row">
            <div className="Filter-Row-Text">
                <div className="Filter-Name" 
                onMouseEnter={ () => setShowBrightness(true) }
                onMouseLeave={ () => setShowBrightness(false)}
                onClick={ () => setBrightness(100)}
                >
                 { showBrightness ? "RESET" : "BRIGHTNESS" }
                </div>
                <div className="Filter-Number">
                    <input type="number" 
                    className="Filter-Input"
                    value={brightness} 
                    onChange={ changeBrightness }/>
                </div>
            </div>
            <div className="Filter-Slider">
                <input className="slider" 
                type="range" 
                min="0" 
                max="200" 
                onChange={ e => changeBrightness(e)} 
    
                value={brightness}
                 />
            </div>
            
        </div>   
        
        <div className="Filter-Row">
        <div className="Filter-Row-Text">
                <div className="Filter-Name"
                onMouseEnter={ () => setShowBlur(true) }
                onMouseLeave={ () => setShowBlur(false)}
                onClick={ () => setBlur(0)}
                >
                { showBlur ? "Reset" : "Blur"}
                </div>
                <div className="Filter-Number">
                <input type="number" 
                    className="Filter-Input"
                    value={blur} 
                    onChange={ changeBlur }/>
                </div>
            </div>
            <div className="Filter-Slider">

            <input className="slider" type="range" min="0" step="0.1" max="50" onChange={ e => changeBlur(e)} 
            value={blur} />
            </div>
       
        </div>

        <div className="Filter-Row">
            <div className="Filter-Row-Text">
                <div className="Filter-Name" 
                 onMouseEnter={ () => setShowContrast(true) }
                 onMouseLeave={ () => setShowContrast(false)}
                 onClick={ () => setContrast(100)}
                 >
                 { showContrast ? "Reset" : "Contrast"}
               
                </div>
                <div className="Filter-Number">
                <input type="number" 
                    className="Filter-Input"
                    value={contrast} 
                    onChange={ changeContrast }/>
                </div>
            </div>
            <div className="Filter-Slider">

            <input className="slider" type="range" min="0" max="100" onChange={ e => changeContrast(e)} 
            value={contrast} />
            </div>
          
        </div>

        <div className="Filter-Row">
            <div className="Filter-Row-Text">
                <div className="Filter-Name"
                onMouseEnter={ () => setShowGrayscale(true) }
                onMouseLeave={ () => setShowGrayscale(false)}
                onClick={ () => setGrayscale(0)}
                >
                { showGrayscale ? "Reset" : "Grayscale"}
                </div>
                <div className="Filter-Number">
                <input type="number" 
                    className="Filter-Input"
                    value={grayscale} 
                    onChange={ changeGrayscale }/>
                </div>
            </div>
            <div className="Filter-Slider">

            <input className="slider" type="range" min="0" max="100" onChange={ e => changeGrayscale(e)} 
            value={grayscale} />
            </div>
           
        </div>

        <div className="Filter-Row">
            <div className="Filter-Row-Text">
                <div className="Filter-Name"
                 onMouseEnter={ () => setShowSepia(true) }
                 onMouseLeave={ () => setShowSepia(false)}
                 onClick={ () => setSepia(0)}
                 >
                 { showSepia ? "Reset" : "Sepia"}
                </div>
                <div className="Filter-Number">
                <input type="number" 
                    className="Filter-Input"
                    value={sepia} 
                    onChange={ changeSepia }/>
                </div>
            </div>
            <div className="Filter-Slider">

            <input className="slider" type="range" min="0" max="100" onChange={ e => changeSepia(e)} 
            value={sepia} />
            </div>
            
        </div>

        <div className="Filter-Row"> 
            <div className="Filter-Row-Text">
                <div className="Filter-Name"
                 onMouseEnter={ () => setShowSaturate(true) }
                 onMouseLeave={ () => setShowSaturate(false)}
                 onClick={ () => setSaturate(100)}
                 >
                 { showSaturate ? "Reset" : "Saturate"}
                </div>
                <div className="Filter-Number">
                <input type="number" 
                    className="Filter-Input"
                    value={saturate} 
                    onChange={ changeSaturate }/>
                </div>
            </div>
            <div className="Filter-Slider">

            <input className="slider" type="range" min="0" max="100" onChange={ e => changeSaturate(e)} 
            value={saturate} />
            </div>
            
        </div>

        <div className="Filter-Row">
            <div className="Filter-Row-Text">
                <div className="Filter-Name"
                 onMouseEnter={ () => setShowHueRotate(true) }
                 onMouseLeave={ () => setShowHueRotate(false)}
                 onClick={ () => setHueRotate(0)}
                 >
                 { showHueRotate ? "Reset" : "Hue-Rotate"}
                </div>
                <div className="Filter-Number">
                <input type="number" 
                    className="Filter-Input"
                    value={hueRotate} 
                    onChange={ changeHueRotate }/>
                </div>
            </div>
            <div className="Filter-Slider">

            <input className="slider" type="range" min="0" max="360" onChange={ e => changeHueRotate(e)} 
         
            value={hueRotate} />
            </div>
            

        </div>

        <div className="Filter-Row">
            <div className="Filter-Row-Text">
                <div className="Filter-Name"
                 onMouseEnter={ () => setShowInvert(true) }
                 onMouseLeave={ () => setShowInvert(false)}
                 onClick={ () => setInvert(0)}
                 >
                 { showInvert ? "Reset" : "Invert"}
             
                </div>
                <div className="Filter-Number">
                    <input type="number" 
                    className="Filter-Input"
                    value={invert} 
                    onChange={changeInvert}/>
         
                </div>
            </div>
            <div className="Filter-Slider">

            <input className="slider"
                type="range" min="0" 
                max="100" 
                onChange={ e => changeInvert(e)} 
                value={invert} 
            />
            </div>
            
        </div>

        <div className="Filter-Reset-Container">
            <button onClick={reset} className="Filter-Reset">
                RESET
            </button>
        </div>
    </div>
    )
}

export default Filter

