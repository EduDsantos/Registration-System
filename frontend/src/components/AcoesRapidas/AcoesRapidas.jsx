// src/components/QuickActions.jsx
import React from "react";
import './acoesRapidas.css'

const QuickActions = () => {
  return (
    <div className="quick-actions">
      <h3>Acesso Rápido</h3>
      <ul>
        <li><button>Cadastrar novo aluno</button></li>
        <li><button>Registrar pagamento</button></li>
        <li><button>Gerenciar planos</button></li>
        <li><button>Ver lista de alunos</button></li>
      </ul>
    </div>
  );
};

export default QuickActions;
