import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import useValidation from '../../../Hooks/useValidation';
import Loading from '../../Shared/Loading/Loading';


const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isValidate] = useValidation(user?.email);
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`${process.env.REACT_APP_server_api}checkusertype/${user?.email}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `barer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
            
                if (data?.status === "Forbidden" || data?.status === "unauthorized access" || data?.ownStatus === 'not found') {
                    logOut()
                        .then(res => {
                            toast.success('Logout successfully!');
                            return navigate('/login');
                        })
                        .then(error => console.log(error))
                }
                if (data.isAdmin === true || data.isAdmin === 'true') {
                    return navigate('/dashboard/allsellers')
                }
                else if (data?.type === 'Buyer') {
                    return navigate('/dashboard/myorders')

                }
                else if (data?.type === 'Seller') {
                    return navigate('/dashboard/addproduct')

                }
            })

    }, [user])

    return (
        <div className='w-[99%] mx-auto'>
            <Loading></Loading>
        </div>
    );
};

export default Dashboard;