
const getToken = (email) => {

    fetch(`${process.env.REACT_APP_server_api}jwt?email=${email}`)
        .then(res => res.json())
        .then(data => {
            if (data?.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);            
            }
        })
}
export default getToken;