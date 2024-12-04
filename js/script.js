


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

async function redirecionar(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Accept", "application/json")

  const raw = JSON.stringify({
    name: event.target.elements.name.value,
    email: event.target.elements.email.value,
    password: event.target.elements.password.value,
    telefone: event.target.elements.telefone.value,
    dataNascimento: event.target.elements.dataNascimento.value,
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  return await fetch("http://localhost:8080/criar-conta", requestOptions)
    .then((response) => {
      if (response?.status === 200) window.location.href = "apresentacao.html"; // Redireciona para "apresentacao.html"
    })
    .catch((error) => {
      console.error("error => ", error)
      return false
    })
}

async function meusDados(idusuario) {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Accept", "application/json")

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  const response =  await fetch(`http://localhost:8080/meus-dados?idusuario=${idusuario}`, requestOptions)
    .then((response) => {
      if (response?.status === 200){
        return response.json();
      }
    })    
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("error => ", error)
      return false
    })

  if (response?.usuario) {
    const { nome, email } = response.usuario;

    document.getElementById('nome').value = nome;
    document.getElementById('email').value = email;
    document.getElementById('nascimento').value = response.usuario['data_nascimento'].slice(0, 10);
  }
}

async function dadosUsuario(idusuario) {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Accept", "application/json")

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  const response =  await fetch(`http://localhost:8080/dados-usuario?idusuario=${idusuario}`, requestOptions)
    .then((response) => {
      if (response?.status === 200){
        return response.json();
      }
    })    
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("error => ", error)
      return false
    })
  
    console.log(response);
  if (response?.dadosUsuario) {
    const { peso, altura, sexo, tipo_sanguineo, alergias, medicamentos_atuais, condicoes } = response.dadosUsuario;

    document.getElementById('peso').value = peso;
    document.getElementById('altura').value = altura;
    document.getElementById('sexo').value = sexo;
    document.getElementById('sangue').value = tipo_sanguineo;
    document.getElementById('alergias').value = alergias;
    document.getElementById('medicamentos').value = medicamentos_atuais;
    document.getElementById('condicoes').value = condicoes;
  }
}

async function consultas(idusuario) {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Accept", "application/json")

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  const response =  await fetch(`http://localhost:8080/consultas?idusuario=${idusuario}`, requestOptions)
    .then((response) => {
      if (response?.status === 200){
        return response.json();
      }
    })    
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("error => ", error)
      return false
    })
  
    console.log(response);
  if (response?.consultas) {
    let consultasHtml = '';
    response.consultas.forEach(consulta => {
      const { medico, data_consulta, horario_consulta, especialidade, observacoes } = consulta;
      consultasHtml += `
        <div class="appointment">
            <h4 id="medico">Consulta com ${medico}</h4>
            <p><strong>Data: </strong><span>${data_consulta}</span></p>
            <p><strong>Horário: </strong><span>${horario_consulta}</span></p>
            <p><strong>Especialidade: </strong><span>${especialidade}</span></p>
            <p><strong>Observações: </strong><span>${observacoes}</span></p>
        </div>`
    });
    document.getElementById('consultas').innerHTML = consultasHtml;
    
  }
}