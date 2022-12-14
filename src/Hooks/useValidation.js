import { useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { AuthContext } from "../Contexts/AuthProvider";


const useValidation = email => {
    const { user, logOut } = useContext(AuthContext);
    const [isValidate, setisValidate] = useState(false);
    useEffect(() => {
        if (user) {
            fetch(`${process.env.REACT_APP_server_api}uservalidationcheck`, {
                headers: {
                    'content-type': 'application/json',
                    authorization: `barer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'Forbidden' || data.status === 'unauthorized access') {
                        logOut()
                            .then(res => {
                                toast.success('Session dead, Please login Again!');
                                setisValidate(false);
                            })
                            .then(error => console.log(error))
                    }
                    else {
                        setisValidate(true);
                    }
                })
        }
    }, [])
    return [isValidate]
}
export default useValidation;