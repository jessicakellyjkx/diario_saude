function entrar() {
  alert("Função de login em desenvolvimento.");
}

function criarConta() {
  alert("Função de criação de conta em desenvolvimento.");
}


function nextScreen(screenNumber) {
  // Oculta todas as telas
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  // Mostra a tela atual
  document.getElementById(`screen${screenNumber}`).classList.add('active');
}

function startApp() {
  alert('Aplicativo iniciado!');
  // Aqui você pode redirecionar para a página principal do app
}