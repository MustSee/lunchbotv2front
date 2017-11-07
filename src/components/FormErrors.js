import React from 'react';

export default function FormErrors(props) {
    return (
        <div className="formErrors">
            {
                Object.keys(props.FormErrors).map((fieldName, i) => {
                    if (props.FormErrors[fieldName].length > 0){
                        return (
                            <span key={i}>{props.FormErrors[fieldName]}.<br/><br/></span>
                        )
                    } else {
                        return "";
                    }
            })
            }
        </div>
    )
}