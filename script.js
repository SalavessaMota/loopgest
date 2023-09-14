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
    
    // Aqui você pode adicionar o código para scroll automático
  });
  