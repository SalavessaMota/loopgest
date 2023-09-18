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
      Host : "smtp.gmail.com",
      Username : "nunosalavessamota@gmail.com",
      Password : "Googlegoogle1",
      To : 'nunosalavessamota@gmail.com',
      From : document.getElementById("email").value,
      Subject : "Novo pedido de proposta",
      Body : "Nome: " + document.getElementById("name").value
        + "<br> Email: " + document.getElementById("email").value
        + "<br> Telefone: " + document.getElementById("phone").value
        + "<br> Tipologia: " + document.getElementById("message").value
        + "<br> Morada: " + document.getElementById("address").value
  }).then(
    message => alert("Obrigado pelo seu contacto")
  );
}
