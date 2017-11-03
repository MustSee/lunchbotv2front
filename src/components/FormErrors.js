import React from 'react';

export default function FormErrors(props) {
    console.log(props);
    return (
        <div className="formErrors">
            {
                Object.keys(props.FormErrors).map((fieldName, i) => {
                    if (props.FormErrors[fieldName].length > 0){
                        return (
                            <p key={i}> {fieldName} {props.FormErrors[fieldName]}</p>
                        )
                    } else {
                        return "";
                    }
            })
            }
        </div>
    )
}