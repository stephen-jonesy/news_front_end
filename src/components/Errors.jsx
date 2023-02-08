import { useContext, useEffect } from "react";
import { ErrorContext } from "../errorContext";
import "../scss/Errors.scss"
import CloseIcon from '@mui/icons-material/Close';

function Errors() {
    const {errors, setErrors} = useContext(ErrorContext);

    const clickHandler = (id) => {
        
        setErrors(()=> {
            return errors.filter((error)=> {
                return error.id !== id;
            })
        })
    }

    if (errors.length === 0) {
        return
    }
    return (
        <ul className="errors">
            {errors.map((error)=> {
                return(
                    <li key={error.id} className="alert alert-danger d-flex" role="alert">
                        <p>Error {error.status}: {error.message}</p>
                        <button onClick={() => clickHandler(error.id)}>
                            <CloseIcon />
                        </button>
                    </li>
                )

            })}


        </ul>

    )

}

export default Errors;