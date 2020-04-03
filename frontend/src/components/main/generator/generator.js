import React from 'react'
import './generator.css'
import html2canvas from 'html2canvas';
import Draggable from 'react-draggable'


class Generator extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            uppertext: "",
            lowertext: "",
            
        }
        //for generating and saving created memes
        this.upperInput = this.upperInput.bind(this)
        this.lowerInput = this.lowerInput.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
        this.saveFile = this.saveFile.bind(this)
        // this.height = 500;
        // this.width = 500;
    }

  
    uploadImage(files) {
        // var self = this;
        files.preventDefault();
        const file = files.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file)
        const img = new Image();
        reader.onload = function(e) {
            img.src = e.target.result
    
        }
        
            reader.onloadend = (e) => {   
                
                // self.width = img.width
                // self.height = img.height 
                if (img.width > 800 || img.height > 700) {
                        document.getElementById("memeGenerator").style.width = "700px"
                        document.getElementById("memeGenerator").style.height = "700px"
                        document.getElementById("canvas2").style.width = `700px`
                        document.getElementById("canvas2").style.height = `700px`
                }
                
                else {
                    document.getElementById("memeGenerator").style.width = `${img.width}px`
                    document.getElementById("memeGenerator").style.height = `${img.height}px`
                    document.getElementById("canvas2").style.width = `${img.width}px`
                    document.getElementById("canvas2").style.height = `${img.height}px`
                }
                document.getElementById('canvas2').style.backgroundImage = "url(" + reader.result + ")";
            }
      
    }


   
    upperInput(e) {
        this.setState({uppertext: e.target.value});
    }

    lowerInput(e) {
        this.setState({lowertext: e.target.value});
    }

    saveFile() {
        var self = this;
        var screenshot = document.getElementsByClassName("memeGenerator");
        console.log(this.width)
        console.log(this.height)
        html2canvas(screenshot[0],{


            // width: this.width,
            // height: this.height,
            imageTimeout: 30000,
            backgroundColor: "black"})
        .then( (canvas) => {
        
            const base64image = canvas.toDataURL("image/png");
            let image = { image: base64image };
            self.props.composeMemes(image)
            
            // var win = window.open();
            // win.document.write('<iframe src="' + base64image  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')
        })
        .then(this.props.closeModal)
        .then(this.props.fetchMemes())
        this.setState({uppertext: ""})
        this.setState({lowertext: ""})
        
    }

   
    upperSizeChange(e) {
        var text = document.getElementsByClassName("upper-text")
        text[0].style.fontSize = `${e.currentTarget.value}px`

    }

    lowerSizeChange(e) {
        var text = document.getElementsByClassName("lower-text")
        text[0].style.fontSize = `${e.currentTarget.value}px`    
    }


    render() {
        const upperTextOutput = this.state.uppertext.split("\n").map( (line, index) => (
            <p key={index}>{line}</p>
        ))

        return (
            //created 2 outer divs-generator-page-wrap and generator-page-container
            //since modal need outer container for users to click but not close modal. aka buffer area

            <div className="generator-page-wrap">
                <div className="generator-page-container">

                    <div className="memeContainer-title">Select background Image to create your Meme!</div>
                    <div className="memeContainer">
                        <div>
                            <input className="select-file" type="file" id="fileinput" accept = "image/*" onChange={this.uploadImage} /> 
                            <br/>

                            <h1 className="text-input-label">Text 1:  </h1>
                            <textarea className='input' onChange={this.upperInput}/>
                            <br/>
                            <input className="text-size-bar" type="range" min="10" max="100" onChange={this.upperSizeChange} defaultValue="20" />
                            <br/>

                            <h1 className="text-input-label">Text 2:  </h1>
                            <textarea className='input' onChange={this.lowerInput}/>
                            <br/>
                            <input className="text-size-bar" type="range" min="10" max="100" onChange={this.lowerSizeChange} defaultValue="20" />
                            <br/>
                        
                            <button className="save-upload-button" onClick={this.saveFile}>Save Meme</button>
                        </div>
                    
                        <div className="memeGenerator" id="memeGenerator">

                            <div id='canvas2'>
                                
                            </div>
                            <Draggable>
                                
                                <span className='upper-text box'>{upperTextOutput}
                            </span>
                            </Draggable>
                            <br />
                            <Draggable>
                                <div  className='lower-text'>{this.state.lowertext}</div>
                            </Draggable>


                    
                        </div>
                            
                        
                    
                    </div>
                </div>
            </div>

            
        )
    }
}

export default Generator