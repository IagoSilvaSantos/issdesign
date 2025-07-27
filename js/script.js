document.addEventListener("DOMContentLoaded", () => {
  // Funcionalidade do menu mobile
  const mobileMenu = document.getElementById("mobile-menu");
  const mainNav = document.getElementById("main-nav");
  const menuLinks = document.querySelectorAll("#main-nav .menu-link");
  const btnWhatsappMobile = document.querySelector("#main-nav .btn-whatsapp");

  if (mobileMenu && mainNav) {
    mobileMenu.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      mainNav.classList.toggle("active");
    });

    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        mainNav.classList.remove("active");
      });
    });

    if (btnWhatsappMobile) {
      btnWhatsappMobile.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        mainNav.classList.remove("active");
      });
    }
  }

  // Animação ao rolar para as seções
  const fotoInicio = document.querySelector(".foto-inicio img");
  const textoInicio = document.querySelector(".texto-inicio");

  if (textoInicio && fotoInicio) {
    window.addEventListener("load", () => {
      textoInicio.classList.add("aparecer");
      setTimeout(() => {
        fotoInicio.classList.add("aparecer");
      }, 500);
    });
  }

  // Scroll suave + classe ativa nos menus
  const linksMenu = document.querySelectorAll("header nav a.menu-link");
  linksMenu.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Scroll suave
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }

      // Remove classe active de todos e adiciona ao clicado
      linksMenu.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Carrossel Galeria
  const carrossel = document.querySelector(".carrossel-galeria");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const indicadoresContainer = document.getElementById("carrossel-indicadores");

  if (carrossel) {
    // Inserção dinâmica das imagens
    const imagensGaleria = [
      "Gta_Carrossel_1.png", "Gustavo_Carrossel_2.png", "Cachorro_Carrossel_3.png",
      "Dragao_Carrossel_4.png", "Xbox_Carrossel_5.png", "Acai_Carrossel_6.png",
      "Burguer_Carrossel_7.png", "Mary_Carrossel_8.png", "Pizza_Carrossel_9.png",
      "Creed_Carrossel_10.png", "Hamburguer_Carrossel_11.png", "Paixao_Carrossel_12.png",
      "Baly_Carrossel_13.png", "Colgate_Carrossel_14.png", "Principia_Carrossel_15.png",
      "Flor_Carrossel_16.png", "Vinho_Carrossel_17.png", "Tatto_Carrossel_18.png",
      "Sushi_Carrossel_19.png", "Spider_Carrossel_20.png", "Codinome_Carrossel_21.png",
      "Death_Carrossel_22.png", "Gear_Carrossel_23.png", "Cardapio_Carrossel_24.png",
      "Supergirl_Carrossel_25.png", "God_Carrossel_26.png", "Ghost_Carrossel_27.png"
    ];

    let imagensCarregadas = 0;
    let autoScrollInterval;
    let isUserInteracting = false;
    let currentIndex = 0;

    // Criar indicadores
    imagensGaleria.forEach((_, index) => {
      const indicador = document.createElement("div");
      indicador.className = "indicador";
      if (index === 0) indicador.classList.add("ativo");
      indicador.addEventListener("click", () => irParaImagem(index));
      indicadoresContainer.appendChild(indicador);
    });

    // Duplicar as imagens para criar loop infinito
    const imagensDuplicadas = [...imagensGaleria, ...imagensGaleria];

    // Lazy loading das imagens
    imagensDuplicadas.forEach((img, index) => {
      const imagem = document.createElement("img");
      imagem.dataset.src = `images/Secao_03_Galeria/Imagens_Carrosel_animado/${img}`;
      imagem.alt = img.replace(/_/g, " ").replace(".png", "");
      imagem.loading = "lazy";
      
      // Carregar apenas as primeiras 3 imagens imediatamente
      if (index < 3) {
        imagem.src = imagem.dataset.src;
        imagem.onload = () => {
          imagensCarregadas++;
          if (imagensCarregadas === 3) {
            iniciarScrollAutomatico();
          }
        };
      }
      
      carrossel.appendChild(imagem);
    });

    // Intersection Observer para lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src && !img.src) {
            img.src = img.dataset.src;
          }
        }
      });
    });

    // Observar todas as imagens para lazy loading
    carrossel.querySelectorAll('img').forEach(img => {
      imageObserver.observe(img);
    });

    function atualizarIndicadores() {
      const indicadores = indicadoresContainer.querySelectorAll('.indicador');
      indicadores.forEach((indicador, index) => {
        indicador.classList.toggle('ativo', index === currentIndex);
      });
    }

    function irParaImagem(index) {
      currentIndex = index;
      const scrollAmount = carrossel.clientWidth * index * 0.8;
      carrossel.scrollLeft = scrollAmount;
      atualizarIndicadores();
      pararScrollAutomatico();
      setTimeout(retomarScrollAutomatico, 3000);
    }

    function iniciarScrollAutomatico() {
      autoScrollInterval = setInterval(() => {
        if (!isUserInteracting) {
          carrossel.scrollLeft += 1;
          
          // Atualizar indicador baseado na posição
          const newIndex = Math.round(carrossel.scrollLeft / (carrossel.clientWidth * 0.8));
          if (newIndex !== currentIndex && newIndex < imagensGaleria.length) {
            currentIndex = newIndex;
            atualizarIndicadores();
          }
          
          // Quando chegar ao final das imagens originais, volta para o início
          const maxScroll = carrossel.scrollWidth / 2;
          if (carrossel.scrollLeft >= maxScroll) {
            carrossel.scrollLeft = 0;
            currentIndex = 0;
            atualizarIndicadores();
          }
        }
      }, 20); // Scroll mais suave
    }

    function pararScrollAutomatico() {
      clearInterval(autoScrollInterval);
      isUserInteracting = true;
    }

    function retomarScrollAutomatico() {
      isUserInteracting = false;
      iniciarScrollAutomatico();
    }

    // Funcionalidade dos botões
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        pararScrollAutomatico();
        currentIndex = (currentIndex + 1) % imagensGaleria.length;
        irParaImagem(currentIndex);
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        pararScrollAutomatico();
        currentIndex = currentIndex === 0 ? imagensGaleria.length - 1 : currentIndex - 1;
        irParaImagem(currentIndex);
      });
    }

    // Drag com o mouse (melhorado)
    let isDown = false;
    let startX;
    let scrollLeft;

    carrossel.addEventListener("mousedown", (e) => {
      isDown = true;
      pararScrollAutomatico();
      carrossel.style.cursor = "grabbing";
      startX = e.pageX - carrossel.offsetLeft;
      scrollLeft = carrossel.scrollLeft;
    });

    carrossel.addEventListener("mouseleave", () => {
      if (isDown) {
        isDown = false;
        carrossel.style.cursor = "grab";
        setTimeout(retomarScrollAutomatico, 2000);
      }
    });

    carrossel.addEventListener("mouseup", () => {
      if (isDown) {
        isDown = false;
        carrossel.style.cursor = "grab";
        
        // Snap para a imagem mais próxima
        const newIndex = Math.round(carrossel.scrollLeft / (carrossel.clientWidth * 0.8));
        if (newIndex < imagensGaleria.length) {
          currentIndex = newIndex;
          atualizarIndicadores();
        }
        
        setTimeout(retomarScrollAutomatico, 2000);
      }
    });

    carrossel.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carrossel.offsetLeft;
      const walk = (x - startX) * 2;
      carrossel.scrollLeft = scrollLeft - walk;
    });

    carrossel.style.cursor = "grab";
  }

  // Validação visual do formulário
  const form = document.getElementById("form-contato");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Previne o redirecionamento padrão

      const inputs = form.querySelectorAll("input[required], textarea[required]");
      let valid = true;
      inputs.forEach((input) => {
        if (!input.value.trim()) {
          input.style.borderColor = "red";
          valid = false;
        } else {
          input.style.borderColor = "#00aaff";
        }
      });

      if (!valid) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      const submitButton = form.querySelector("button[type='submit']");
      const originalButtonText = submitButton.textContent;
      const originalButtonColor = submitButton.style.backgroundColor;

      // Desabilita o botão e muda o texto
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          submitButton.textContent = "Enviado com sucesso!";
          submitButton.style.backgroundColor = "#4CAF50"; // Verde
          setTimeout(() => {
            submitButton.textContent = originalButtonText;
            submitButton.style.backgroundColor = originalButtonColor;
            submitButton.disabled = false;
            form.reset(); // Limpa o formulário após o sucesso
          }, 3000);
        } else {
          alert("Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.");
          submitButton.textContent = originalButtonText;
          submitButton.style.backgroundColor = originalButtonColor;
          submitButton.disabled = false;
        }
      } catch (error) {
        console.error("Erro ao enviar o formulário:", error);
        alert("Ocorreu um erro de rede. Por favor, tente novamente.");
        submitButton.textContent = originalButtonText;
        submitButton.style.backgroundColor = originalButtonColor;
        submitButton.disabled = false;
      }
    });
  }
  const telefoneInput = document.getElementById("telefone");
  if (telefoneInput) {
    telefoneInput.addEventListener("input", function (e) {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
      e.target.value = !x[2] ? x[1] : '(' + x[1] + ')' + x[2] + (x[3] ? '-' + x[3] : '');
    });
  }

});
