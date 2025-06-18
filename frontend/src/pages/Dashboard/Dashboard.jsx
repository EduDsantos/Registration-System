import React from 'react'
import './dashboard.css'
import Header from '../../components/Header/Header'
import Saudacao from '../../components/Saudacao/Saudacao'
import StatusCard from '../../components/StatusCard/StatusCard'
import OverviewChart from '../../components/Overview/Overview'
import QuickAlerts from '../../components/AlertasRapidos/AlertarRapidos'
import QuickActions from '../../components/AcoesRapidas/AcoesRapidas'
import TodaySchedule from '../../components/Calendario/Calendario'


export default function Dashboard() {
    return (
        <div>
            <Header />
            <Saudacao />
            <div className="status-cards" style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "20px" }}>
                <QuickActions />
                <StatusCard icon="🙍‍♂️​" title="Alunos Ativos" endpoint={'/ativos'} bgColor="#dff6e0" />
                <StatusCard icon="💲​" title="Pagamentos Pendentes" endpoint={'/pagamentos/pendentes'} bgColor="#fde2e2" />
                {/* <StatusCard icon="​✔️​" title="Aulas Hoje" value={5} bgColor="#e0ecfc" /> */}
                <StatusCard icon="​📈​" title="Crescimento do Mês" endpoint={'/crescimento'} bgColor="#f9e0fd" />
                
                <QuickAlerts />
                <TodaySchedule />
            </div>

            <OverviewChart />
        </div>
    )
}
