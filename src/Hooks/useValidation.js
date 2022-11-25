import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import toast from 'react-hot-toast';


const useValidation = email => {
    const { user,logOut } = useContext(AuthContext);
    const [isValidate, setisValidate] = useState(false);
    useEffect(() => {
        if (user) {
            fetch('http://localhost:5000/uservalidationcheck', {
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