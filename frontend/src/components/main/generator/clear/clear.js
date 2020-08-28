import React from 'react'
import './trash.css'




const Trash = (props) => {

    const clearBG = () => {
        document.getElementById('picture').src = "";
        document.getElementById("file-upload").value = ""
        props.toggle()
        props.reset()
    }     
    return (
        <div className="Trash-Container" id="Trash-Container" onClick={ e => e.stopPropagation()}> 
            <div className="Trash-Modal">
                <div>
                reset all?
                </div>

                <div className="Trash-Modal-Decision">
                    <div onClick={ (e) => {
                        e.stopPropagation();
                        clearBG() }
                    } className="Trash-Button-Yes">
                    YES
                    </div>


                    <div onClick={props.toggle} className="Trash-Button-No">
                    NO
                    </div>
                </div>
            </div>

            
        </div> 
        
    )


}

export default Trash 