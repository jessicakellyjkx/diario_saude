


//menu lateral
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("show");
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
      if (response?.status === 200) window.location.href = "login.html"; // Redireciona para "apresentacao.html"
    })
    .catch((error) => {
      console.error("error => ", error)
      return false
    })
}

async function adicionarConsulta(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Accept", "application/json")

  const raw = JSON.stringify({
    medico: event.target.elements.medico.value,
    especialidade: event.target.elements.especialidade.value,
    local_consulta: event.target.elements.local.value,
    data_consulta: event.target.elements.data.value,
    horario_consulta: event.target.elements.horario.value,
    observacoes: event.target.elements.observacoes.value,
    idusuario: localStorage.getItem('idusuario')
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  return await fetch("http://localhost:8080/adicionar-consulta", requestOptions)
    .then((response) => {
      if (response?.status === 200) window.location.href = "consulta.html"; // Redireciona para "consulta.html"
    })
    .catch((error) => {
      console.error("error => ", error)
      return false
    })
}

async function login(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Accept", "application/json")

  const raw = JSON.stringify({
    email: event.target.elements.email.value,
    senha: event.target.elements.password.value
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  return await fetch("http://localhost:8080/login", requestOptions)
    .then((response) => {
      if (response?.status === 200) {
        return response.json()
      }
    })    
    .then((response) => {
      window.location.href = "tela_inicial.html"; // Redireciona para "tela_inicial.html"
      console.log(response.idusuario);
      localStorage.setItem('idusuario', response.idusuario)
    })
    .catch((error) => {
      console.error("error => ", error)
      return false
    })
}

async function adicionarMedicamento(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Accept", "application/json")

  const raw = JSON.stringify({
    nome: event.target.elements.nome.value,
    sigla: event.target.elements.sigla.value,
    dosagem: event.target.elements.dosagem.value,
    frequencia: event.target.elements.frequencia.value,
    data_medicamento: event.target.elements.data.value,
    horario_medicamento: event.target.elements.horarios.value,
    idusuario: localStorage.getItem('idusuario')
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  return await fetch("http://localhost:8080/adicionar-medicamento", requestOptions)
    .then((response) => {
      if (response?.status === 200) window.location.href = "medicamentos.html"; // Redireciona para "medicamentos.html"
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

async function medicamentos(idusuario) {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Accept", "application/json")

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  const response =  await fetch(`http://localhost:8080/medicamentos?idusuario=${idusuario}`, requestOptions)
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
  if (response?.medicamentos) {
    let medicamentosHtml = '';
    response.medicamentos.forEach(medicamento => {
      const { nome, sigla, dosagem, frequencia, data_medicamento, horario_medicamento } = medicamento;
      medicamentosHtml += `
        <div class="medicamento">
                    <div class="medicamento-header">
                        <span>${nome}</span>
                        <span class="edit-icon">✎</span>
                    </div>
                    <div class="medicamento-info">
                        <p>Sigla: ${sigla}</p>
                        <p>Dosagem: ${dosagem}</p>
                        <p>Frequência: ${frequencia}</p>
                        <p>Data: ${data_medicamento}</p>
                        <p>Horários: ${horario_medicamento}</p>
                    </div>
                </div>`
    });
    document.getElementById('medicamentos').innerHTML = medicamentosHtml;
    
  }
}


// // script.js Lembrate
// document.addEventListener("DOMContentLoaded", () => {
//   const calendarBody = document.getElementById("calendar-body");
//   const currentMonth = document.getElementById("current-month");
//   const prevMonth = document.getElementById("prev-month");
//   const nextMonth = document.getElementById("next-month");

//   const renderCalendar = () => {
//       const daysInMonth = 31; // Dezembro
//       let html = "";
//       let day = 1;

//       for (let week = 0; week < 5; week++) {
//           html += "<tr>";
//           for (let weekday = 0; weekday < 7; weekday++) {
//               if (day <= daysInMonth) {
//                   html += `<td>${day}</td>`;
//                   day++;
//               } else {
//                   html += `<td></td>`;
//               }
//           }
//           html += "</tr>";
//       }

//       calendarBody.innerHTML = html;

//       document.querySelectorAll(".calendar td").forEach((cell) => {
//           cell.addEventListener("click", () => {
//               document
//                   .querySelectorAll(".calendar td")
//                   .forEach((c) => c.classList.remove("selected"));
//               cell.classList.add("selected");
//           });
//       });
//   };

//   renderCalendar();

//   prevMonth.addEventListener("click", () => alert("Mês anterior não implementado."));
//   nextMonth.addEventListener("click", () => alert("Próximo mês não implementado."));
// });


// // script.js medicamento excluir
// document.addEventListener("DOMContentLoaded", () => {
//   const deleteButton = document.getElementById("delete-button");
//   const checkboxes = document.querySelectorAll(".checkbox");

//   deleteButton.addEventListener("click", () => {
//       checkboxes.forEach((checkbox) => {
//           if (checkbox.checked) {
//               checkbox.parentElement.parentElement.remove();
//           }
//       });
//   });
// });



// // script.js notas
// document.addEventListener("DOMContentLoaded", () => {
//   const addButton = document.querySelector(".add-button");
//   const notasContainer = document.querySelector(".notas-container");

//   addButton.addEventListener("click", () => {
//       const newNota = document.createElement("div");
//       newNota.classList.add("nota");
//       newNota.innerHTML = `<p>Nova nota adicionada. Clique para editar.</p>`;
//       notasContainer.appendChild(newNota);

//       newNota.addEventListener("click", () => {
//           const texto = prompt("Edite sua nota:", newNota.innerText);
//           if (texto !== null) {
//               newNota.innerHTML = `<p>${texto}</p>`;
//           }
//       });
//   });

//   document.querySelectorAll(".nota").forEach((nota) => {
//       nota.addEventListener("click", () => {
//           const texto = prompt("Edite sua nota:", nota.innerText);
//           if (texto !== null) {
//               nota.innerHTML = `<p>${texto}</p>`;
//           }
//       });
//   });
// });



// // script.js configurações
// document.addEventListener("DOMContentLoaded", () => {
//   const saveButton = document.querySelector(".save-button");
//   const switches = document.querySelectorAll(".switch");

//   saveButton.addEventListener("click", () => {
//       const config = {};
//       switches.forEach((switchEl) => {
//           config[switchEl.id] = switchEl.checked;
//       });
//       alert("Configurações salvas:\n" + JSON.stringify(config, null, 2));
//   });
// });


// /* script.js  adicionar medicamentos*/
// document.getElementById("medicamento-form").addEventListener("submit", function(event) {
//   event.preventDefault();
//   const nome = document.getElementById("nome").value;
//   const dosagem = document.getElementById("dosagem").value;
//   const horarios = document.getElementById("horarios").value;
//   const observacoes = document.getElementById("observacoes").value;

//   if (nome && dosagem && horarios) {
//       alert("Medicamento salvo com sucesso!");
//   } else {
//       alert("Por favor, preencha todos os campos obrigatórios.");
//   }
// });
