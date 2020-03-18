import React from 'react'
import './generator.css'
import html2canvas from 'html2canvas';


class Generator extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            uppertext: "",
            lowertext: ""
        }

        this.upperInput = this.upperInput.bind(this)
        this.lowerInput = this.lowerInput.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
        this.saveFile = this.saveFile.bind(this)
    }

    

    uploadImage(file) {
        file.preventDefault()


            if (file.target.files) {
                const imgFile = file.target.files[0]
                const reader = new FileReader();
                reader.readAsDataURL(imgFile)

                reader.onloadend = (e) => {
                    const image = new Image();
                    image.src = e.target.result
                    this.setState({currentImg: image.src})
                    image.onload = (ev)  => {
                    var canvas = document.getElementById('canvas');
                    
                    var ctx = canvas.getContext('2d');
                    
                    var hRatio = canvas.width / image.width    ;
                    var vRatio = canvas.height / image.height  ;
                    var ratio  = Math.min ( hRatio, vRatio );
                    ctx.clearRect(0, 0, image.width, image.height)
                    ctx.drawImage(image,  0,0, 
                                          image.width, image.height,
                                           0,0, image.width*ratio, image.height*ratio);
                    
                 
             
                }
            }
        }
    }

  
    
    upperInput(e) {
        this.setState({uppertext: e.target.value});
    }

    lowerInput(e) {
        this.setState({lowertext: e.target.value});
    }

    saveFile() {
        var element = document.getElementsByClassName("memeGenerator");
        html2canvas(element[0],{
             backgroundColor: null
        }).then( (canvas) => {
            const base64image = canvas.toDataURL("image/png");
            debugger
            // var win = window.open();
            // win.document.write('<iframe src="' + this.base64image  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')
            this.saveFileToDB()
            
        })      
                // let image = {
                //     image: this.base64image
                // };
                // debugger
                // this.props.composeMemes(image)
    }

    saveFileToDB(image) {

    }

   
    


    render() {
        console.log(this.props)
        return (
                
            <div className="memeContainer">
                
                Upper-Text
                <input type="text" className='upper-text' onChange={this.upperInput}/>
                <input type="file" id="fileinput" accept = "image/*" 
                onChange={this.uploadImage}/>  
                Lower-Text
                <input type="text" className='upper-text' onChange={this.lowerInput} />
                <button onClick={this.saveFile}>GENERATE</button>
                <br/>
                    <div className="memeGenerator">
                    <canvas id="canvas" >
                    </canvas>
                    <span className='upper'>{this.state.uppertext}</span>
                    <span className='lower'>{this.state.lowertext}</span>
                    </div>
              
            </div>
        )
    }
}

export default Generator