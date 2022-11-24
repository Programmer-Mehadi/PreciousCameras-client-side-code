import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`http://localhost:5000/checkusertype/${user?.email}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `barer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
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
        <div className='w-[99%] mx-auto px-5'>
            <Loading></Loading>
        </div>
    );
};

export default Dashboard;