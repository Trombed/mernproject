
import React from 'react';
import './generator.css';
import html2canvas from 'html2canvas';
import Draggable from 'react-draggable';
import { ChromePicker } from 'react-color';
import adjust from '../../../images/adjust.svg'
import Filter from './filters/filter'

class Generator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilter: true,

            text1: "",
            text2: "",
            save: false,
            rows: [],

            displayColorPicker1: false,
            colorValue1: "#FFFFFF",
            displayShadowPicker1: false,
            shadowValue1: "#000000",
            fontSize1: 20,



            displayColorPicker2: false,
            colorValue2: "#FFFFFF",
            displayShadowPicker2: false,
            shadowValue2: "#000000",
            fontSize2: 20,
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

     clearBG() {
        let result = document.getElementById('canvas2').style.backgroundImage = "url()";
    }

  

   
    upperInput(e, num) {
        this.setState( { [`text${num}`]: e.target.value } )
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

   
    upperSizeChange(e, num) {
        var text = document.getElementsByClassName(`upper-text-${num}`)[0];
        if (text === undefined) return;
        this.setState({[`fontSize${num}`]: e.currentTarget.value})
        text.style.fontSize = `${e.currentTarget.value}px`;

    }

    lowerSizeChange(e) {
        var text = document.getElementsByClassName("lower-text");
        text[0].style.fontSize = `${e.currentTarget.value}px`;    
    }
    
    handleClick = (num) => {
        this.setState({ [`displayColorPicker${num}`]:  !this.state[`displayColorPicker${num}`] })
    };

    handleClose = (num) => {
        this.setState({ [`displayColorPicker${num}`]: false })
    };

    handleColorChange = (color, num )=> {
      
            this.setState({
                [`colorValue${num}`]: color.hex
              }, () => {
                  var text = document.getElementsByClassName(`upper-text-${num}`)[0];
                  if (text === undefined ) return;
                  text.style.color = `${color.hex}`
              });
        

    };

    handleShadowClick = (num) => {
        this.setState({ [`displayShadowPicker${num}`]:  !this.state[`displayShadowPicker${num}`] })
        // if (num === 1) {
        //     this.setState({ displayShadowPicker1: !this.state.displayShadowPicker1  })
        // } else if (num === 2) {
        //     this.setState({ displayShadowPicker2: !this.state.displayShadowPicker2 })
        // }
    };

    handleShadowClose = (num) => {
      
        if (num === 1) {
            this.setState({ displayShadowPicker1: false })
            
        } else if (num === 2) {
            this.setState({ displayShadowPicker2: false })
        }
    };

    handleShadowChange = (color, num )=> {
            this.setState({
                [`shadowValue${num}`]: color.hex
              }, () => {
                  var text = document.getElementsByClassName(`upper-text-${num}`)[0];
                  if (text === undefined) {
                      console.log("test")
                      return;
                    }
                  text.style.textShadow = `${color.hex} 0px 0px 10px`
              });
   
    };

   
    submitURL(e) {
        if (e.key === "Enter") {
            this.urlUpload()
        }
    }

    filterToggle() {
     
        let text = document.getElementsByClassName("Generator-Text-Rows")[0] 
        let filter = document.getElementsByClassName("Filter-Container")[0]
        if (this.state.showFilter) {
            this.setState({ showFilter: false }, () => {
                text.style.display = "none"
                filter.style.display = "flex"
            })
        } else if (!this.state.showFilter) {
            this.setState({ showFilter: true}, () => {
                text.style.display = "flex"
                filter.style.display = "none"
            })
        }
    }

    addRow() {
        this.setState({rows: [...this.state.rows, ""]}, () => {
            let rowNum = this.state.rows.length + 2
            this.setState({
                [`text${rowNum}`]: rowNum,
                [`displayColorPicker${rowNum}`]: false,
                [`colorValue${rowNum}`]: "#FFFFFF",
                [`displayShadowPicker${rowNum}`]: false,
                [`shadowValue${rowNum}`]: "#000000",
                [`fontSize${rowNum}`]: 20
            })
            
        })
       
    }

    deleteRow() {
        if (this.state.rows.length <= 0 ) return;
        this.setState({
            rows: [...this.state.rows.slice(0,this.state.rows.length-1)]
        })
    }

    addInput(e, num) {
         this.setState( { [`text${num+3}`]: e.target.value }, 
                            () =>  {    
                                    let rows = this.state.rows
                                     rows[num] = this.state[`text${num+3}`]
                                     this.setState({ rows }) }
                    )
    }

    render() {

        //Generate new row inputs
        const newRows = this.state.rows.map( (row, idx) => (
            <div className="Generator-Text-New-Rows" key={idx}>
                <div className="Generator-Input-Div">
                    <textarea className='text-input' onChange={ e => this.addInput(e, idx)} placeholder={`Row# ${idx+3}`}/>
                <div>
                <div className="swatch" onClick={  e => this.handleClick(idx+3) }>
                    <div className="color" style={{backgroundColor: this.state[`colorValue${idx+3}`] }} />
                    </div>
                    { this.state[`displayColorPicker${idx+3}`] ? <div className="popover">
                    <div className="cover" onClick={ e => this.handleClose(idx+3) }/>
                    <ChromePicker   color={ this.state[`colorValue${idx+3}`] } 
                                    onChange={ color => this.handleColorChange(color, idx+3) } />
                    </div> : null }

                </div>

                <div>
                    <div className="swatch" onClick={  e => this.handleShadowClick(idx+3) }>
                        <div className="color" style={{ backgroundColor: this.state[`shadowValue${idx+2}`] }} />
                    </div>
                    { this.state[`displayShadowPicker${idx+3}`] ? <div className="popover">
                    <div className="cover" onClick={ e => this.handleShadowClose(idx+3) }/>
                    <ChromePicker   color={ this.state[`shadowValue${idx+3}`] } 
                                    onChange={ color => this.handleShadowChange(color, idx+3) } />
                    </div> : null }

                </div>
            </div>      
            <div className="Text-Size-Changer">
                    <div className="Text-Size">
                    Size:
                    </div>
                    <input className="slider" type="range" min="10" max="100" onChange={ e=> this.upperSizeChange(e, idx+3)} defaultValue="20" />
                    <div className="Text-Size">
                        { this.state[`fontSize${idx+3}`] }

                    </div>
                </div>
            </div>       

        ))
        // END Generating New rows

        //Render new rows on image
        let newSentence = this.state.rows.map( (sentence, idx) => {
            const breakLine = sentence.split("\n").map( (line, index) => (
                <p key={index}>{line}</p>
            ))
            return (
                <Draggable key={idx}>
                    <div  className={`upper-text-${idx+3}`}>
                        { breakLine}
                    </div>
                </Draggable>
            )
          
        })
     
                                

        //End render new rows on image


        const upperTextOutput = this.state.text1.split("\n").map( (line, index) => (
            <p key={index}>{line}</p>
        ));

         const lowerTextOutput = this.state.text2.split("\n").map( (line, index) => (
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
                            <div onClick={this.clearBG} className="Remove-Image">
                                Remove Image
                            </div>
                            <img    src={adjust} 
                                    className="adjust"
                                    onClick={this.filterToggle.bind(this)}
                                />  
                        </div>      
                           
                            <button className="save-upload-button" onClick={this.saveFile}>Save Meme
                            </button>
                    </div>
                    <div className="memeContainer">
                        
                        <div className="Generator-Text-Rows">
                    
                            
                          


                            
                            {/* UPPER TEXT */}
                            <div className="Generator-Input-Div">
                              

                                <textarea className='text-input' onChange={ e=> this.upperInput(e,1)} placeholder="
                                Upper Text" />
                                <div>
                                    <div className="swatch" onClick={  e => this.handleClick(1) }>
                                        <div className="color" style={{backgroundColor: this.state.colorValue1}} />
                                    </div>
                                    { this.state.displayColorPicker1 ? <div className="popover">
                                    <div className="cover" onClick={ e => this.handleClose(1) }/>
                                    <ChromePicker   color={ this.state.colorValue1 } 
                                                    onChange={ color => this.handleColorChange(color, 1) } />
                                    </div> : null }

                                </div>

                                <div>
                                    <div className="swatch" onClick={  e => this.handleShadowClick(1) }>
                                        <div className="color" style={{backgroundColor: this.state.shadowValue1}} />
                                    </div>
                                    { this.state.displayShadowPicker1 ? <div className="popover">
                                    <div className="cover" onClick={ e => this.handleShadowClose(1) }/>
                                    <ChromePicker   color={ this.state.shadowValue1 } 
                                                    onChange={ color => this.handleShadowChange(color, 1) } />
                                    </div> : null }

                                </div>
                            </div>
                         

                            <div className="Text-Size-Changer">
                                <div className="Text-Size">
                                Size:
                                </div>
                                <input className="slider" type="range" min="10" max="100" onChange={e => this.upperSizeChange(e, 1)} defaultValue="20" />
                                <div className="Text-Size">
                                    {this.state.fontSize1}

                                </div>
                            </div>
                            
                            {/* END UPPER TEXT */}
                            
                            {/* LOWER TEXT */}
                            <div className="Generator-Input-Div">
                              

                              <textarea className='text-input' onChange={ e => this.upperInput(e, 2)} placeholder="
                              Lower Text" />
                              <div>
                                  <div className="swatch" onClick={  e => this.handleClick(2) }>
                                      <div className="color" style={{backgroundColor: this.state.colorValue2}} />
                                  </div>
                                  { this.state.displayColorPicker2 ? <div className="popover">
                                  <div className="cover" onClick={ e => this.handleClose(2) }/>
                                  <ChromePicker   color={ this.state.colorValue2 } 
                                                  onChange={ color => this.handleColorChange(color, 2) } />
                                  </div> : null }

                              </div>

                              <div>
                                  <div className="swatch" onClick={  e => this.handleShadowClick(2) }>
                                      <div className="color" style={{backgroundColor: this.state.shadowValue2}} />
                                  </div>
                                  { this.state.displayShadowPicker2 ? <div className="popover">
                                  <div className="cover" onClick={ e => this.handleShadowClose(2) }/>
                                  <ChromePicker   color={ this.state.shadowValue2 } 
                                                  onChange={ color => this.handleShadowChange(color, 2) } />
                                  </div> : null }

                              </div>
                          </div>
                       

                          <div className="Text-Size-Changer">
                              <div className="Text-Size">
                              Size:
                              </div>
                              <input className="slider" type="range" min="10" max="100" onChange={ e=> this.upperSizeChange(e, 2)} defaultValue="20" />
                              <div className="Text-Size">
                                  {this.state.fontSize2}

                              </div>
                          </div>

                            {newRows}
                   
                            {/* END LOWER TEXT */}
                            <div>
                            <button onClick={this.addRow.bind(this)}>
                                Add Row
                            </button>

                            <button onClick={this.deleteRow.bind(this)}>
                                Delete Row
                            </button>
                            </div>
                            
                                
                            
                            
                         
                        </div>
                        <Filter />
                        <div className="Generator-Meme-Container">

                            <div className="memeGenerator" id="memeGenerator">

                                <div id='canvas2'>
                                    
                                </div>
                                <Draggable>
                                    <span className='upper-text-1 box'>{upperTextOutput}
                                    </span>
                                </Draggable>
                                <br />
                                <Draggable>
                                    <div  className='upper-text-2 '>    {lowerTextOutput}
                                    </div>
                                </Draggable>
                                {newSentence}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Generator