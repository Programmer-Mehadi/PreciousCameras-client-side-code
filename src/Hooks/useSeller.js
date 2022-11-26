import { useEffect, useState } from "react";

const useSeller = email => {
    const [isSeller, setSeller] = useState(false);
    const [isSellerLoading, setSellerLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`${process.env.REACT_APP_server_api}users/seller/${email}`)
                .then(res => res.json())
                .then(data => {
                    setSeller(data.isSeller);
                    setSellerLoading(false);
                })
        }
    }, [email])
    return [isSeller, isSellerLoading]
}
export default useSeller;
