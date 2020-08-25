import React from 'react'
import './trash.css'



const hideTrash = () => {
    document.getElementById("Trash-Container").style.display = "none"

}



const Trash = (props) => {

    const clearBG = () => {
        document.getElementById('picture').src = "";
        document.getElementById("file-upload").value = ""
        props.toggle()
        props.reset()
    }     
    return (
        <div className="Trash-Container" id="Trash-Container"> 
            <div className="Trash-Modal">
                <div>
                Are you sure to delete?
                </div>

                <div className="Trash-Modal-Decision">
                    <div onClick={clearBG} className="Trash-Button">
                    YES
                    </div>


                    <div onClick={props.toggle} className="Trash-Button">
                    NO
                    </div>
                </div>
            </div>

            
        </div> 
        
    )


}

export default Trash 