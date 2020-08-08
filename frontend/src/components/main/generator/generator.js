
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
            save: false,
            row: 2,

            displayColorPicker: false,
            colorValue: "#FFFFFF",
            displayShadowPicker: false,
            shadowValue: "#000000",
            fontSize1: 20,



            displayColorPicker2: false,
            colorValue2: "#FFFFFF",
            displayShadowPicker2: false,
            shadowValue2: "#000000",
        };
   
        this.upperInput = this.upperInput.bind(this);
        this.lowerInput = this.lowerInput.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.saveFile = this.saveFile.bind(this);
        this.upperSizeChange = this.upperSizeChange.bind(this)
    }

    componentWillMount() {
 
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

    urlUpload() {

        let address = document.getElementById("url-upload").value;
        if (address === "") return;
        let img = new Image();
        img.src = address
        if (img.width === 0 || img.height === 0) return;

        document.getElementById("memeGenerator").style.width = `${img.width}px`
        document.getElementById("memeGenerator").style.height = `${img.height}px`
        document.getElementById("canvas2").style.width = `${img.width}px`
        document.getElementById("canvas2").style.height = `${img.height}px`
        let result = document.getElementById('canvas2').style.backgroundImage = "url(" + address + ")";
        document.getElementById("url-upload").value = ""
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
        this.props.openModal("saving")
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
        this.setState({lowertext: ""}, () => {
            this.props.fetchMemes()
        });
        
    }

   
    upperSizeChange(e) {
        this.setState({fontSize1: e.currentTarget.value})
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

   
    submitURL(e) {
      
        if (e.key === "Enter") {
            this.urlUpload()
        }
    }

    render() {


        const upperTextOutput = this.state.uppertext.split("\n").map( (line, index) => (
            <p key={index}>{line}</p>
        ));

        return (
            <div className="generator-page-wrap">

                <div className="generator-page-container">
                    <div className="generator-header">
                        <div className="generator-uploader">
                            <label htmlFor="file-upload" className="profile-file-upload">
                                Upload Image
                            </label>
                            <input  className="select-file" 
                                    id="file-upload" 
                                    type="file" 
                              
                                    accept="image/*" 
                                    onChange={this.uploadImage} /> 
                            <input type="text" placeholder="Image URL" id="url-upload" onKeyPress={ e => this.submitURL(e)} />
                            <div className="generator-url-upload" onClick={this.urlUpload}>
                                URL
                            </div>
                        </div>            
                            <button className="save-upload-button" onClick={this.saveFile}>Save Meme
                            </button>
                    </div>
                    <div className="memeContainer">
                        
                        <div className="Generator-Text-Rows">
                    
                            
                          


                            
                            {/* UPPER TEXT */}
                            <div className="Generator-Input-Div">
                              

                                <textarea className='text-input' onChange={this.upperInput} placeholder="
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
                         

                            <div className="Text-Size-Changer">
                                <div className="Text-Size">
                                Size:
                                </div>
                                <input className="slider" type="range" min="10" max="100" onChange={this.upperSizeChange} defaultValue="20" />
                                <div className="Text-Size">
                                    {this.state.fontSize1}

                                </div>
                            </div>
                            
                            {/* END UPPER TEXT */}
                            
                            {/* LOWER TEXT */}
                            <div className="Generator-Input-Div">
                              

                              <textarea className='text-input' onChange={this.upperInput} placeholder="
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
                       

                          <div className="Text-Size-Changer">
                              <div className="Text-Size">
                              Size:
                              </div>
                              <input className="slider" type="range" min="10" max="100" onChange={this.upperSizeChange} defaultValue="20" />
                              <div className="Text-Size">
                                  {this.state.fontSize1}

                              </div>
                          </div>
                   
                            {/* END LOWER TEXT */}

                        
                         
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