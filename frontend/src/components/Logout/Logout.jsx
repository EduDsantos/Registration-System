import { useNavigate } from 'react-router-dom';
import './Logout.css'

export default function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {
        console.log('Deslogado')
        alert("Deslogado")
        localStorage.removeItem('token')

        navigate('/')
    }

    return (

        <button className="logout-btn" onClick={handleLogout}>
            <span className="texto">SAIR</span>
       
        </button>
    )

}
