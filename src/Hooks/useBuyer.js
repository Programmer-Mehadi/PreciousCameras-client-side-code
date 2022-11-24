import { useEffect, useState } from "react";

const useBuyer = email => {
    const [isBuyer, setBuyer] = useState(false);
    const [isBuyerLoading, setBuyerLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/buyer/${email}`)
                .then(res => res.json())
                .then(data => {
                    setBuyer(data.isBuyer);
                    setBuyerLoading(false);
                })
        }
    }, [email])
    return [isBuyer, isBuyerLoading]
}
export default useBuyer;
