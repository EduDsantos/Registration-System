import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './statusCard.css'

const StatusCard = ({ icon, title, endpoint, bgColor }) => {
    const [value, setValue] = useState("...")

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get(`http://localhost:5000/alunos${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setValue(res.data.total || res.data.value || res.data.crescimento + "%" || 0)
        }).catch((err) => {
            console.error("Erro ao buscar dados no backend:", err)
            setValue("Erro")
        })


    }, [endpoint])


    return (
        <div className='status-card' style={{ backgroundColor: bgColor || '#e0e0e0' }}>
            <div className='status-icon'>{icon}</div>
            <div className='status-icon'>
                <p className='status-title'>{title}</p>
                <h2 className='status-value'>{value}</h2>
            </div>
        </div >
    )
}

export default StatusCard