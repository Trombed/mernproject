import React from 'react'
import './templates.css'



const Templates = (props) => {
    const images = new Array(9).fill("template")
  
    const chooseTemplate = (image, idx) => {
        const img = new Image();
        img.src = `./templates/${image}${idx}.png`
        document.getElementById("memeGenerator").style.width = `${img.width}px`
        document.getElementById("memeGenerator").style.height = `${img.height}px`
        document.getElementById("canvas2").style.width = `${img.width}px`
        document.getElementById("canvas2").style.height = `${img.height}px`
        document.getElementById('picture').src = img.src;
        props.close();
        props.reset();
        convert(document.getElementById('picture'))
    }


    const convert = (img) => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        document.getElementById('picture').src  =dataURL
        
    }
   
    let renderImage = images.map( (image, idx) => {
        return (
            <div key={"image"+idx} className="Individual-Template"
            onClick={ () => chooseTemplate(image, idx)}>
                <img src={`./templates/${image}${idx}.png`} className="Template-Image" alt="" />
            </div>
        )
    })

    return (
        <div className="Generator-Template">
            <div className="Generator-Template-Absolute">

            {renderImage}
            </div>
        </div>

    )
}


export default Templates 