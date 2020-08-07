
import React from 'react';
import './generator.css';
import html2canvas from 'html2canvas';
import Draggable from 'react-draggable';
import { ChromePicker } from 'react-color';


class Generator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uppertext: "",
            lowertext: "",

            displayColorPicker: false,
            displayColorPicker2: false,
            colorValue: "#FFFFFF",
            colorValue2: "#FFFFFF",

            displayShadowPicker: false,
            displayShadowPicker2: false,
            shadowValue: "#000000",
            shadowValue2: "#000000",
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
  
                console.log(img.width)
                console.log(img.height)

                // if (img.width > 800 || img.height > 700) {
                //         // document.getElementById("memeGenerator").style.width = "700px"
                //         // document.getElementById("memeGenerator").style.height = "700px"
                //         // document.getElementById("canvas2").style.width = `700px`
                //         // document.getElementById("canvas2").style.height = `700px`
                // }
                // else {
                    document.getElementById("memeGenerator").style.width = `${img.width}px`
                    document.getElementById("memeGenerator").style.height = `${img.height}px`
                    document.getElementById("canvas2").style.width = `${img.width}px`
                    document.getElementById("canvas2").style.height = `${img.height}px`
                // }
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
        if (document.getElementById('canvas2').style.backgroundImage === "") {
            return;
        }
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
    
    handleClick = (num) => {
        
        if (num === 1) {
            this.setState({ displayColorPicker: !this.state.displayColorPicker  })
        } else if (num === 2) {
            this.setState({ displayColorPicker2: !this.state.displayColorPicker2 })
        }
    };

    handleClose = (num) => {
       console.log(num)
        if (num === 1) {
            this.setState({ displayColorPicker: false })
            console.log(num)
        } else if (num === 2) {
            this.setState({ displayColorPicker2: false })
        }
    };

    handleColorChange = (color, num )=> {
        if (num === 1) {
            this.setState({
                colorValue: color.hex
              }, () => {
                  var text = document.getElementsByClassName("upper-text");
                  
                  text[0].style.color = `${color.hex}`
              });
        } else if (num === 2) {
            this.setState({
                colorValue: color.hex
              }, () => {
                  var text = document.getElementsByClassName("lower-text");
                  
                  text[0].style.color = `${color.hex}`
              });
        }

    };

    handleShadowClick = (num) => {
        
        if (num === 1) {
            this.setState({ displayShadowPicker: !this.state.displayShadowPicker  })
        } else if (num === 2) {
            this.setState({ displayShadowPicker2: !this.state.displayShadowPicker2 })
        }
    };

    handleShadowClose = (num) => {
      
        if (num === 1) {
            this.setState({ displayShadowPicker: false })
            console.log(num)
        } else if (num === 2) {
            this.setState({ displayShadowPicker2: false })
        }
    };

    handleShadowChange = (color, num )=> {
        if (num === 1) {
            this.setState({
                shadowValue: color.hex
              }, () => {
                  var text = document.getElementsByClassName("upper-text");
                  
                  text[0].style.textShadow = `${color.hex} 0px 0px 10px`
              });
        } else if (num === 2) {
            this.setState({
                shadowValue: color.hex
              }, () => {
                  var text = document.getElementsByClassName("lower-text");
                  
                  text[0].style.textShadow = `${color.hex} 0px 0px 10px`
              });
        }
    };


    render() {


        const upperTextOutput = this.state.uppertext.split("\n").map( (line, index) => (
            <p key={index}>{line}</p>
        ));

        return (
            <div className="generator-page-wrap">

                <div className="generator-page-container">
                    
                    <div className="memeContainer-title">Select background Image to create your Meme</div>
                    <div className="memeContainer">
                        <div className="Generator-Text-Rows">
                            <label htmlFor="file-upload" className="profile-file-upload">
                                Upload Image
                            </label>
                            <input  className="select-file" 
                                    id="file-upload" 
                                    type="file" 
                              
                                    accept="image/*" 
                                    onChange={this.uploadImage} /> 
                            
                            {/* <input type="text" value="" placeholder="Enter Image URL"/> */}


                            
                            {/* UPPER TEXT */}
                            <div className="Generator-Input-Div">
                              

                                <textarea className='input' onChange={this.upperInput} placeholder="
                                Upper Text" />
                                <div>
                                    <div className="swatch" onClick={  e => this.handleClick(1) }>
                                        <div className="color" style={{backgroundColor: this.state.colorValue}} />
                                    </div>
                                    { this.state.displayColorPicker ? <div className="popover">
                                    <div className="cover" onClick={ e => this.handleClose(1) }/>
                                    <ChromePicker   color={ this.state.colorValue } 
                                                    onChange={ color => this.handleColorChange(color, 1) } />
                                    </div> : null }

                                </div>

                                <div>
                                    <div className="swatch" onClick={  e => this.handleShadowClick(1) }>
                                        <div className="color" style={{backgroundColor: this.state.shadowValue}} />
                                    </div>
                                    { this.state.displayShadowPicker ? <div className="popover">
                                    <div className="cover" onClick={ e => this.handleShadowClose(1) }/>
                                    <ChromePicker   color={ this.state.shadowValue } 
                                                    onChange={ color => this.handleShadowChange(color, 1) } />
                                    </div> : null }

                                </div>
                            </div>
                         

                            <div>
                                <input className="text-size-bar" type="range" min="10" max="100" onChange={this.upperSizeChange} defaultValue="20" />
                            </div>
                            
                            {/* END UPPER TEXT */}
                            
                            {/* LOWER TEXT */}

                            <h1 className="text-input-label">Text 2:  </h1>
                            <textarea className='input' onChange={this.lowerInput}/>
                            <br/>
                            <button onClick={ e => this.handleClick(2) }>Pick Color</button>
                            { this.state.displayColorPicker2 ? <div className="popover">
                                <div  onClick={ this.handleClose } className="cover" />
                                <ChromePicker 
                                    color={this.state.colorValue2} 
                                    onChange={ color => this.handleColorChange(color, 2)}
                                />
                                </div> : null }
                            <br/>
                            <input className="text-size-bar" type="range" min="10" max="100" onChange={this.lowerSizeChange} defaultValue="20" />
                            <br/>
                            {/* END LOWER TEXT */}

                        
                            <button className="save-upload-button" onClick={this.saveFile}>Save Meme</button>
                        </div>

                        <div className="Generator-Meme-Container">

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
            </div>
        )
    }
}

export default Generator