import axios from "axios"
import { useNavigate } from "react-router-dom"
const CaptainLogout = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('CaptainToken')

    async function logout() {
        try {
            const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('CaptainToken')
            navigate('/CaptainLogin')
            
        } catch (err) {
            localStorage.removeItem('CaptainToken')
            navigate('/CaptainLogin')
        }
    }
    logout()

    return
}

export default CaptainLogout
