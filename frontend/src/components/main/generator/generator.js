
import React from 'react';
import './generator.css';
import html2canvas from 'html2canvas';
import Draggable from 'react-draggable';
import { ChromePicker } from 'react-color';
import Filter from './filters/filter'
import screenshot from 'image-screenshot'
import Templates from './templates/templates'
import './font.css'
import Trash from './clear/clear'


class Generator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilter: true,
            showTemplates: false,
            showTrash: false,
            showBlank: true,

            save: false,
            rows: [],
        };
   
        this.upperInput = this.upperInput.bind(this);
        this.lowerInput = this.lowerInput.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.saveFile = this.saveFile.bind(this);
        this.upperSizeChange = this.upperSizeChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.changeFont = this.changeFont.bind(this)
        this.clearBG = this.clearBG.bind(this)
        this.resetAll = this.resetAll.bind(this)
        this.loadBlank = this.loadBlank.bind(this)
    }


    componentWillMount() {
        this.initializeRows();
         window.onscroll = function () { window.scrollTo(0, 0); };
        document.body.style.overflow = 'hidden';
        window.onload = () => {
            this.loadBlank();
        }
    }

    componentWillUnmount() {
         window.onscroll = function () {};
        document.body.style.overflow = 'visible';
        return null;
    }

// Load Blank Template
    async loadBlank() {
        let img = await this.initializeBlank();

        const convert = (img) => {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL("image/png");
            document.getElementById('picture').src  =dataURL
        }

       
    }

    initializeBlank() {
        const img = new Image();
        img.src = `./templates/blank.png`
        document.getElementById("memeGenerator").style.width = `${img.width}px`
        document.getElementById("memeGenerator").style.height = `${img.height}px`
        document.getElementById("canvas2").style.width = `${img.width}px`
        document.getElementById("canvas2").style.height = `${img.height}px`
        document.getElementById('picture').src = img.src;
        return document.getElementById('picture')
    }
// End Load Blank Template



    async initializeRows() {
        await this.addRow()
        this.addRow()
    }


    hideTemplate() { 
       
        this.setState({showTemplates: false})
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

                document.getElementById("memeGenerator").style.width = `${img.width}px`
                document.getElementById("memeGenerator").style.height = `${img.height}px`
                document.getElementById("canvas2").style.width = `${img.width}px`
                document.getElementById("canvas2").style.height = `${img.height}px`
                document.getElementById('picture').src = img.src
            }
    }

  

  

    clearBG() {
         this.setState({showTrash: !this.state.showTrash})
    }

    resetAll() {
           this.setState({
            rows: []
        }, () => { this.initializeRows();
                    this.loadBlank();
         })
    }
  

   
    upperInput(e, num) {
        this.setState( { [`text${num}`]: e.target.value } )
    }

 

    lowerInput(e) {
        this.setState({lowertext: e.target.value});
    }

   

    saveFile() {

        const img = document.getElementById("picture")
    
        screenshot(img)
        .then( url => {
            document.getElementById('canvas2').style.backgroundImage = "url(" + url + ")";
            document.getElementById("picture").remove()
            this.screenCapture();
    
        })
    }

    screenCapture() {
        let self = this
        var screenshot2 = document.getElementsByClassName("memeGenerator");
        html2canvas(screenshot2[0],{
            imageTimeout: 30000,
            backgroundColor: "null"})
        .then( (canvas) => { 
            const base64image = canvas.toDataURL("image/png");
            let image = { image: base64image };
            self.props.composeMemes(image);
        })  
        // .then( this.props.closeModal)
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

    shadowSizeChange(e, num) {
        var text = document.getElementsByClassName(`upper-text-${num}`)[0];
        let size = e.currentTarget.value
        if (text === undefined) return;
        this.setState({[`shadowSize${num}`]: e.currentTarget.value}, () => {

            text.style.textShadow = `${this.state[`shadowValue${num}`]} 0px 0px ${size}px`;
        })
    }

    rotationChange(e, num) {
        var text = document.getElementsByClassName(`rotate-${num}`)[0];
        let size = e.currentTarget.value
        if (text === undefined) return;
        this.setState({[`rotate${num}`]: e.currentTarget.value}, () => {

            text.style.transform = `rotate(${this.state[`rotate${num}`]}deg)`;
        })
    }

    lowerSizeChange(e) {
        var text = document.getElementsByClassName("lower-text");
        text[0].style.fontSize = `${e.currentTarget.value}px`;    
    }
    
    handleClick = (num) => {
        this.setState({ [`displayColorPicker${num}`]:  !this.state[`displayColorPicker${num}`] })
    };

    handleClose(num) {
     
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


    };

    handleShadowClose = (num) => {
        this.setState({ [`displayShadowPicker${num}`]:  false })
 
       
    };

    handleShadowChange = (color, num )=> {
            this.setState({
                [`shadowValue${num}`]: color.hex
              }, () => {
                  var text = document.getElementsByClassName(`upper-text-${num}`)[0];
                  if (text === undefined) {
                 
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

    showFont(num) {
        let self = this
        document.addEventListener("keydown", function handler(event) {
        const key = event.key; 
            if (key === "Escape") {
                self.setState({[`showFont${num}`]: false}, () => {

               this.removeEventListener('keydown', handler);
                })
            }
        });
        return (
            <div className="Show-Font-Modal">
            <div className="Show-Font-Container">
                <div className="Show-Font-Top">

                <div className="Show-Font-Header">
                    Available Fonts
                </div>
                
                <div className="Style-Font-Impact"
                    onClick={ () => this.changeFont(num, 1)}
                >Impact</div>
                <div className="Style-Font-Arial"
                    onClick={ () => this.changeFont(num, 2)}
                >Arial</div>
                <div className="Style-Font-Times"
                    onClick={ () => this.changeFont(num, 3)}
                >Times New Roman</div>
                <div className="Style-Font-Open"
                    onClick={ () => this.changeFont(num, 4)}
                >Open Sans</div>
                 <div className="Style-Font-Comic"
                    onClick={ () => this.changeFont(num, 5)}
                >Comic Sans</div>

                 <div className="Style-Font-Arial-Black"
                    onClick={ () => this.changeFont(num, 6)}
                >Arial Black</div>
                <div className="Style-Font-Tahoma"
                    onClick={ () => this.changeFont(num, 7)}
                >Tahoma</div>
                 <div className="Style-Font-Verdana"
                    onClick={ () => this.changeFont(num, 8)}
                >Verdana</div>
                 <div className="Style-Font-Courier"
                    onClick={ () => this.changeFont(num, 9)}
                >Courier</div>
                </div>
                


                <div className="Show-Font-Bottom">
                <div className="Font-Submit-Button" id="Font-Submit-Button"
                onClick={() => {this.setState({[`showFont${num}`]: false })}}>
                    Done
                </div>
                </div>

            </div>
            </div>
        )
    }

    changeFont(num, font) {
        var text = document.getElementsByClassName(`upper-text-${num}`)[0]
        switch (font) {
            case 1:
                text.style.fontFamily = "Impact"
                break;
            case 2:
                text.style.fontFamily = "Arial"
                break
            case 3:
                text.style.fontFamily = "'Times New Roman', Times, serif";
                break;
            case 4:
                text.style.fontFamily = "'Open Sans', sans-serif"
                break;
            case 5:
                text.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
                break;
            case 6:
                text.style.fontFamily = '"Arial Black", Gadget, sans-serif'
                break
            case 7:
                text.style.fontFamily = "Tahoma, Geneva, sans-serif";
                break;
            case 8:
                text.style.fontFamily = "Verdana, Geneva, sans-serif";
                break;
            case 9:
                text.style.fontFamily = '"Courier New", Courier, monospace';
                break;
            default:
                break;
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
            let rowNum = this.state.rows.length -1;
            this.setState({
                [`text${rowNum}`]: rowNum,
                [`displayColorPicker${rowNum}`]: false,
                [`displayShadowPicker${rowNum}`]: false,
                [`shadowValue${rowNum}`]: "#000000",
                [`fontSize${rowNum}`]: 20,
                [`shadowSize${rowNum}`]: 5,
                [`slider${rowNum}`]: false,
                [`showFont${rowNum}`]: false,
                [`font${rowNum}`]: "Impact",
                 [`colorValue${rowNum}`]: "#FFFFFF",
                 [`rotate${rowNum}`]: 0

            })
            
        })
       
    }

    deleteRow() {
        if (this.state.rows.length <= 2 ) return;
        this.setState({
            rows: [...this.state.rows.slice(0,this.state.rows.length-1)]
        })
    }

    addInput(e, num) {
         this.setState( { [`text${num}`]: e.target.value }, 
                            () =>  {    
                                    let rows = this.state.rows
                                     rows[num] = this.state[`text${num}`]
                                     this.setState({ rows }) }
                    )
    }

    render() {
   
  
        //Generate new row inputs
        const newRows = this.state.rows.map( (row, idx) => {
            return (
            <div className="Generator-Text-New-Rows" key={idx}>
                <div className="Generator-Input-Div">
                    <textarea className='text-input' onChange={ e => this.addInput(e, idx)} placeholder={`Row# ${idx+1}`}/>
                <div className="Shadow-Color-Container">
                <div className="swatch" onClick={  e => this.handleClick(idx) }>
                    <div className="color" style={{backgroundColor: this.state[`colorValue${idx}`] }} />
                    </div>
                    { this.state[`displayColorPicker${idx}`] ? <div className="popover">
                    <div className="cover" onClick={ e => {
                        this.handleClose(idx) 
                       
                    }
                    }/>
                    <ChromePicker   color={ this.state[`colorValue${idx}`] } 
                                    onChange={ color => this.handleColorChange(color, idx) } />
                    </div> : null }
                    <span className="tooltiptext">Font Color</span>

                </div>

                <div className="Shadow-Color-Container">                
                    <div className="swatch" onClick={  e => this.handleShadowClick(idx) }>
                        <div className="color" style={{ backgroundColor: this.state[`shadowValue${idx}`] }} />
                    </div>
                    { this.state[`displayShadowPicker${idx}`] ? <div className="popover">
                    <div className="cover" onClick={ e => this.handleShadowClose(idx) }/>
                    <ChromePicker   color={ this.state[`shadowValue${idx}`] } 
                                    onChange={ color => this.handleShadowChange(color, idx) } 
                                   
                                    />
                    </div> : null }
                    <span className="tooltiptext">Shadow Color</span>

                </div>

                <div onClick={ () => this.setState({
                                  [`slider${idx}`]: !this.state[`slider${idx}`]
                              })} 
                    className="Row-Settings">
                              <i className="fas fa-sliders-h"></i>
                               <span className="tooltiptext2">Sizes And Settings</span>
                </div>
                <div onClick={ () => this.setState({
                                  [`showFont${idx}`]: !this.state[`showFont${idx}`]
                              })} className="Row-Settings">
                             <i className="fas fa-font"></i>
                               <span className="tooltiptext2">Fonts</span>

                </div>
            </div> 
            { this.state[`showFont${idx}`] ? this.showFont(idx) : null}

            { this.state[`slider${idx}`] ?   (  
            <div>      
            <div className="Text-Size-Changer">
                <div className="Text-Size-Header">
                    <div className="Text-Size">
                    Size
                    </div>
                    
                    <div className="Text-Size">
                        {this.state[`fontSize${idx}`]}
                    </div>
                </div>


                <input className="slider" type="range" min="10" max="100" onChange={ e=> this.upperSizeChange(e, idx)} value={this.state[`fontSize${idx}`]} />
            </div>

            <div className="Text-Size-Changer">
                <div className="Text-Size-Header">
                    <div className="Text-Size">
                        Shadow 
                    </div>
                    <div className="Text-Size">
                        {this.state.[`shadowSize${idx}`]}
                    </div>
                </div>
         
                <input className="slider" type="range" min="1" max="10" onChange={ e=> this.shadowSizeChange(e, idx)} value={this.state[`shadowSize${idx}`]} />
               
            </div>


            <div className="Text-Size-Changer">
                <div className="Text-Size-Header">
                    <div className="Text-Size">
                        Rotation
                    </div>
                    <div className="Text-Size">
                        {this.state.[`rotate${idx}`]}
                    </div>
                </div>

                <input className="slider" type="range" min="0" max="360" onChange={ e=> this.rotationChange(e, idx)} value={this.state[`rotate${idx}`]} />

            </div>

            </div> ) : null
            }



            </div>       
            )}
        )
        // END Generating New rows

        //Render new rows on image
        let newSentence = this.state.rows.map( (sentence, idx) => {
            const breakLine = sentence.split("\n").map( (line, index) => (
                <p key={index}>{line}</p>
            ))
            return (
                    

                <Draggable key={idx}>
                <div>
                    <div  className={`rotate-${idx}`}>

                    <div  className={`upper-text-${idx}`}>
                        { breakLine}
                    </div>
                    </div>
                    </div>

                  
                  
                </Draggable>
            )
          
        })
     
                                

   

        return (


                <div className="generator-page-container">
                    <div className="generator-header">
                        <div className="generator-uploader">
                        <label htmlFor="file-upload" className="profile-file-upload">
                             
                            <div className="Upload-Container">
                                <img src="/upload.svg" alt="" className="Upload-Icon" />
                                Upload Image
                             
                                <input  className="select-file" 
                                        id="file-upload" 
                                        type="file" 
                                
                                        accept="image/*" 
                                onChange={this.uploadImage} />
                            </div>
                        </label>

                          
                          

                            <div className="Filter-Display" onClick={this.filterToggle.bind(this)}>
                            <img    src="filter.svg" 
                                    className="Filter-Icon"
                                    alt=""
                                    
                                />  
                                <div className="Filter-Display-Name">
                                    Filters
                                </div>
                            </div>
                           
                            <div className="Generator-Template-Container"
                                onClick={ () => this.setState({showTemplates: !this.state.showTemplates})}>
                                <img src="template.svg" alt="" className="Template-Icon" />
                                Templates
                                
                            </div>
                            </div>

                            <div className="generator-right-side">
                            <div className="Remove-Container"
                                onClick={this.clearBG} >
                                <i className="fas fa-trash-alt"></i>
                                { this.state.showTrash ? 
                                <Trash toggle={this.clearBG}
                                reset={this.resetAll}
                                /> : null }
                                <span className="tooltip3">RESET</span>
                            </div>
                            <button className="save-upload-button" onClick={this.saveFile}>Save
                            </button>
                            </div>
                    </div>
                    { this.state.showTemplates ?  <Templates close={this.hideTemplate.bind(this)}/> : null}
                    <div className="memeContainer">
                        
                        <div className="Generator-Text-Rows">
                    
                            

                            {newRows}
                  
                            <div className="Row-Manipulation">
                            <button className="Add-Row" onClick={this.addRow.bind(this)}>
                                Add Row
                            </button>

                            <button className="Add-Row" onClick={this.deleteRow.bind(this)}>
                                Delete Row
                            </button>
                            </div>
                            
                                
                            
                            
                         
                        </div>
                        <Filter />
                        <div className="Generator-Meme-Container">
                          
                            <div className="memeGenerator" id="memeGenerator">

                                <div id='canvas2'>
                                <img id='picture' 
                                    src="" 
                                    alt="" />
                                
                                </div>
                    
                                {newSentence}
                            </div>

                        </div>

                    </div>
                </div>
            
        )
    }
}

export default Generator