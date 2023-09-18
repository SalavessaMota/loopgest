document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll(".nav-button");

  buttons.forEach(button => {
    button.addEventListener("click", function() {
      const targetId = this.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth"
      });
    });
  });
});

function sendEmail(event){
  event.preventDefault();
  Email.send({
      SecureToken : "2aafbf0c-936c-482e-bc34-994c06e5ac80",
      To : 'nunosalavessamota@gmail.com',
      From : 'nunosalavessamota@gmail.com',
      Subject : "Novo pedido de proposta",
      Body : "Nome: " + document.getElementById("name").value
        + "<br> Email: " + document.getElementById("email").value
        + "<br> Telefone: " + document.getElementById("phone").value
        + "<br> Tipologia: " + document.getElementById("message").value
        + "<br> Morada: " + document.getElementById("address").value
  }).then(
    message => {
      console.log(message);
      if(message === 'OK'){
        alert("Obrigado pelo seu contacto");
      } else {
        alert("Houve um erro ao enviar o email: " + message);
      }
    }
  );
}
