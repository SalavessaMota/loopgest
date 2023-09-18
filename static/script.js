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


function adjustRows() {
  var messageTextarea = document.getElementById('message');
  var addressTextarea = document.getElementById('address');

  var windowWidth = window.innerWidth;

  if (windowWidth <= 768) {
    messageTextarea.rows = "1"; 
    addressTextarea.rows = "1";
  } else {
    messageTextarea.rows = "4"; 
    addressTextarea.rows = "4";
  }
}


window.addEventListener('resize', adjustRows);


window.addEventListener('load', adjustRows);


function sendEmail(event){
  event.preventDefault();
  Email.send({
      SecureToken: "c616706f-a186-4e50-8a7f-a48dc939c2e7",
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
          console.log("SMTP.js says: " + message);
          if(message === 'OK'){
              alert("Obrigado pelo seu contacto");
          } else {
              alert("Houve um erro ao enviar o email: " + message);
          }
      }
  );
}
