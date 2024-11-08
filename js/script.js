

//menu lateral
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("show");
}

/// login ou criar conta

function entrar() {
  window.location.href = "login.html"; // Substitua "login.html" pelo caminho correto para a página de login
}

function criarConta() {
  window.location.href = "criar_conta.html"; // Substitua "criar_conta.html" pelo caminho correto para a página de criação de conta
}

//apresentação

let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    function nextSlide() {
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    function startApp() {
        window.location.href = "tela_inicial.html"; // Redireciona para a página principal do app
    }


//Criar conta

function redirecionar(event) {
  event.preventDefault(); // Impede o envio padrão do formulário
  window.location.href = "apresentacao.html"; // Redireciona para "apresentacao.html"
}