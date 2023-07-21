//Função Para expandir e tocar a música das Tirinhas

// Declaração da variável global para controlar o áudio em reprodução
let currentAudio = null;

function toggleAudio(audioElement, play) {
  if (play) {
    audioElement.play();
  } else {
    audioElement.pause();
    audioElement.currentTime = 0; // Reinicia o áudio para o início
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const playBTNs = document.getElementsByClassName("playBTN");
  const elemento = document.querySelector('.container');
  const capitulo = elemento.id;

  // Objeto para rastrear o estado de expansão de cada elemento
  const expandedState = {};

  for (let i = 0; i < playBTNs.length; i++) {
    playBTNs[i].addEventListener("click", function(event) {
      event.preventDefault();
      var avoId = this.closest(".portfolio-item").id;

      // Aumentar a tela individualmente
      const portfolioWrap = document.querySelector("#" + avoId + " .portfolio-wrap");
      const textoDiv = document.querySelector("#" + avoId + " .portfolio-text");
      const imgfluid = document.querySelector("#" + avoId + " .img-fluid");
      const audio = new Audio('./assets/mp3/mito' + capitulo + '-' + avoId + '.mp3');
      const duracaoAudio = 40; // Duração do áudio em segundos (ajuste conforme necessário)

      if (expandedState[avoId]) {
        // Se estiver expandido, recolher
        portfolioWrap.style.height = `180px`;
        textoDiv.style.opacity = "0";
        imgfluid.setAttribute("style", "width:auto;");
        if (currentAudio !== null) {
          // Pausar e remover o áudio da div recolhida
          toggleAudio(currentAudio, false);
          currentAudio = null;
        }
        expandedState[avoId] = false;
      } else {
        // Se estiver recolhido, expandir e recolher os outros
        for (const key in expandedState) {
          if (key !== avoId && expandedState[key]) {
            const otherPortfolioWrap = document.querySelector("#" + key + " .portfolio-wrap");
            const otherTextoDiv = document.querySelector("#" + key + " .portfolio-text");
            const otherImgFluid = document.querySelector("#" + key + " .img-fluid");
            otherPortfolioWrap.style.height = `180px`;
            otherTextoDiv.style.opacity = "0";
            otherImgFluid.setAttribute("style", "width:auto;");
            if (currentAudio !== null) {
              // Pausar e remover o áudio da div recolhida
              toggleAudio(currentAudio, false);
              currentAudio = null;
            }
            expandedState[key] = false;
          }
        }
        portfolioWrap.style.height = `400px`;
        textoDiv.style.opacity = "1";
        imgfluid.setAttribute("style", "width:auto; animation: flutuando 8s infinite alternate;");
        if (currentAudio !== null) {
          // Pausar e remover o áudio da div anterior, se houver
          toggleAudio(currentAudio, false);
        }
        // Definir o áudio atual para o novo áudio em reprodução
        currentAudio = audio;
        toggleAudio(audio, true);

        setTimeout(function() {
          imgfluid.setAttribute("style", "width:auto;");
          toggleAudio(audio, false);
          currentAudio = null; // Remover o áudio atual após a reprodução
        }, duracaoAudio * 1000);
        expandedState[avoId] = true;
      }

    });
  }
});
