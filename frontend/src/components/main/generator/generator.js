import React from 'react';
import './generator.css';
import html2canvas from 'html2canvas';
import Draggable from 'react-draggable';
class Generator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uppertext: "",
            lowertext: "",
        };
   
        this.upperInput = this.upperInput.bind(this);
        this.lowerInput = this.lowerInput.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.saveFile = this.saveFile.bind(this);
    }

    uploadImage(files) {
        files.preventDefault();
        const file = files.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)
        const img = new Image();
        reader.onload = function(e) {
            img.src = e.target.result
        };
            reader.onloadend = (e) => {   
                
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
        html2canvas(screenshot[0],{
            imageTimeout: 30000,
            backgroundColor: "null"})
        .then( (canvas) => { 
            const base64image = canvas.toDataURL("image/png");
            let image = { image: base64image };
            self.props.composeMemes(image);
        })
        .then( this.props.closeModal)
        .then( this.props.fetchMemes())
        this.setState({uppertext: ""});
        this.setState({lowertext: ""}, () => (
            this.props.fetchMemes()
        ));
        
    }

   
    upperSizeChange(e) {
        var text = document.getElementsByClassName("upper-text");
        text[0].style.fontSize = `${e.currentTarget.value}px`;

    }

    lowerSizeChange(e) {
        var text = document.getElementsByClassName("lower-text");
        text[0].style.fontSize = `${e.currentTarget.value}px`;    
    }


    render() {
        const upperTextOutput = this.state.uppertext.split("\n").map( (line, index) => (
            <p key={index}>{line}</p>
        ));

        return (
            <div className="generator-page-wrap">
                <div className="generator-page-container">
                    
                    <div className="icon-container">
                        <div onClick={this.props.closeModal} className="close-x">X</div>
                    </div>

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