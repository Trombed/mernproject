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
        //I WANNA DRINK
        this.upperInput = this.upperInput.bind(this)
        this.lowerInput = this.lowerInput.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
        this.saveFile = this.saveFile.bind(this)
        this.width = 500;
        this.height = 500;
    }

  
    uploadImage(files) {
        files.preventDefault();
        const file = files.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file)
            reader.onloadend = (e) => {
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
        
        html2canvas(screenshot[0],{
            width: this.width,
            height: this.height,
            backgroundColor: null})
        .then( (canvas) => {
      
            const base64image = canvas.toDataURL("image/png");
            let image = { image: base64image };
            // self.props.composeMemes(image)
            
            var win = window.open();
            win.document.write('<iframe src="' + base64image  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')
        }) 
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
                
            <div className="memeContainer">

                    <div>
                        <input type="file" id="fileinput" accept = "image/*" onChange={this.uploadImage} /> 
                        <br/>

                        Text
                        <textarea className='input' onChange={this.upperInput}/>
                        <br/>
                        <input type="range" min="10" max="100" onChange={this.upperSizeChange} defaultValue="20" />
                        <br/>

                        <textarea className='input' onChange={this.lowerInput}/>
                        <br/>
                        <input type="range" min="10" max="100" onChange={this.lowerSizeChange} defaultValue="20" />
                        <br/>
                    
                        <button onClick={this.saveFile}>Save</button>
                     </div>
                
                    <div className="memeGenerator">

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

            
        )
    }
}

export default Generator