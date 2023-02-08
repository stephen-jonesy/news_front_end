import { useContext, useEffect } from "react";
import { ErrorContext } from "../errorContext";
import "../scss/Errors.scss"

function Errors() {
    const {errors, setErrors} = useContext(ErrorContext);
    console.log(errors);

    if (errors.length === 0) {
        return
    }
    return (
        <ul className="errors">
            {errors.map((error)=> {
                return(
                    <li key={error.id} className="alert alert-danger" role="alert">
                        Error {error.status}: {error.message}
                    
                    </li>
                )

            })}


        </ul>

    )

}

export default Errors;