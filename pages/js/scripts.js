// Funções básicas para interação
document.addEventListener('DOMContentLoaded', function() {
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
    document.querySelector('.btn-confirm').addEventListener('click', function() {
        const appointmentId = this.dataset.id;
        // Aqui você faria uma requisição para o backend para cancelar a consulta
        console.log(`Consulta ${appointmentId} cancelada`);
        
        // Fechar o modal e recarregar a página (simulação)
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
        document.getElementById('consulta-form').addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui você faria a validação e envio para o backend
            alert('Consulta agendada com sucesso!');
            // this.reset();
            // window.location.href = 'index.html';
        });
    }
    
    // Validação do formulário de médico
    if (document.getElementById('medico-form')) {
        document.getElementById('medico-form').addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui você faria a validação e envio para o backend
            alert('Médico cadastrado com sucesso!');
            document.getElementById('medico-modal').style.display = 'none';
            // this.reset();
            // location.reload();
        });
    }
    
    // Validação do formulário de unidade
    if (document.getElementById('unidade-form')) {
        document.getElementById('unidade-form').addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui você faria a validação e envio para o backend
            alert('Unidade cadastrada com sucesso!');
            document.getElementById('unidade-modal').style.display = 'none';
            // this.reset();
            // location.reload();
        });
    }
});