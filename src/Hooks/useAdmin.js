import { useEffect, useState } from "react";

const useAdmin = email => {
    const [isAdmin, setAdmin] = useState(false);
    const [isAdminLoading, setAdminLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`${process.env.REACT_APP_server_api}users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    setAdmin(data.isAdmin);
                    setAdminLoading(false);
                })
        }
    }, [email])
    return [isAdmin,isAdminLoading]
}
export default useAdmin;
