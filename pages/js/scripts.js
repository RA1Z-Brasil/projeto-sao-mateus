// Funções básicas para interação
document.addEventListener('DOMContentLoaded', function() {
    const API_BASE = "https://2ppts9r5ke.execute-api.us-west-2.amazonaws.com/dev";
    // Abrir modal de cancelamento
    const cancelButtons = document.querySelectorAll('.cancel-btn');
    cancelButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const modal = document.getElementById('cancel-modal');
            modal.style.display = 'flex';
            
            // Capturar o ID da consulta para cancelamento
            const appointmentId = this.closest('.appointment').dataset.id;
            document.querySelector('.btn-confirm').dataset.id = appointmentId;
        });
    });
    
    // Fechar modal de cancelamento
    document.querySelector('.btn-cancel').addEventListener('click', function() {
        document.getElementById('cancel-modal').style.display = 'none';
    });
    
    // Confirmar cancelamento
    document.querySelector('.btn-confirm').addEventListener('click', async function() {
        const appointmentId = this.dataset.id;
        await fetch(`${API_BASE}/cancelar-consulta`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ consulta_id: appointmentId })
        });

        document.getElementById('cancel-modal').style.display = 'none';
        alert('Consulta cancelada com sucesso!');
        // location.reload();
    });
    
    // Abrir modal para adicionar médico
    if (document.querySelector('.btn-add')) {
        document.querySelector('.btn-add').addEventListener('click', function() {
            document.getElementById('medico-modal').style.display = 'flex';
        });
    }
    
    // Fechar modal de médico
    if (document.querySelector('#medico-modal .btn-cancel')) {
        document.querySelector('#medico-modal .btn-cancel').addEventListener('click', function() {
            document.getElementById('medico-modal').style.display = 'none';
        });
    }
    
    // Validação do formulário de consulta
    if (document.getElementById('consulta-form')) {
        document.getElementById('consulta-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            const form = e.target;
            const data = {
                paciente_id: form.paciente.value,
                medico_id: form.medico.value,
                unidade_id: form.unidade.value,
                inicio: `${form.data.value}T${form.hora.value}`
            };
            await fetch(`${API_BASE}/agendar-consulta`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            alert('Consulta agendada com sucesso!');
            // form.reset();
            // window.location.href = 'index.html';
        });
    }
    
    // Validação do formulário de médico
    if (document.getElementById('medico-form')) {
        document.getElementById('medico-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            const data = {
                nome: document.getElementById('medico-nome').value,
                crm: document.getElementById('medico-crm').value,
                especialidade: document.getElementById('medico-especialidade').value,
                unidades_ids: Array.from(document.getElementById('medico-unidades').selectedOptions).map(o => o.value)
            };
            await fetch(`${API_BASE}/lambda_cadastrar_medico`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            alert('Médico cadastrado com sucesso!');
            document.getElementById('medico-modal').style.display = 'none';
            // this.reset();
            // location.reload();
        });
    }
    
    // Validação do formulário de unidade
    if (document.getElementById('unidade-form')) {
        document.getElementById('unidade-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            const data = {
                nome: document.getElementById('unidade-nome').value,
                endereco: document.getElementById('unidade-endereco').value,
                telefone: document.getElementById('unidade-telefone').value,
                especialidades: Array.from(document.getElementById('unidade-especialidades').selectedOptions).map(o => o.value)
            };
            await fetch(`${API_BASE}/lambda_cadastrar_unidade`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            alert('Unidade cadastrada com sucesso!');
            document.getElementById('unidade-modal').style.display = 'none';
            // this.reset();
            // location.reload();
        });
    }
});
