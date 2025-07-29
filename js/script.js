document.addEventListener("DOMContentLoaded", () => {
  // Configuração de performance
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Funcionalidade do menu mobile aprimorada
  const mobileMenu = document.getElementById("mobile-menu");
  const mainNav = document.getElementById("main-nav");
  const menuLinks = document.querySelectorAll("#main-nav .menu-link");
  const btnWhatsappMobile = document.querySelector("#main-nav .btn-whatsapp.mobile-only");

  if (mobileMenu && mainNav) {
    mobileMenu.addEventListener("click", () => {
      const isActive = mobileMenu.classList.toggle("active");
      mainNav.classList.toggle("active");
      
      // Atualizar aria-expanded para acessibilidade
      mobileMenu.setAttribute("aria-expanded", isActive);
      
      // Prevenir scroll do body quando menu está aberto
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Fechar menu ao clicar nos links
    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        mainNav.classList.remove("active");
        mobileMenu.setAttribute("aria-expanded", "false");
        document.body.style.overflow = '';
      });
    });

    // Fechar menu ao clicar no botão WhatsApp
    if (btnWhatsappMobile) {
      btnWhatsappMobile.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        mainNav.classList.remove("active");
        mobileMenu.setAttribute("aria-expanded", "false");
        document.body.style.overflow = '';
      });
    }

    // Fechar menu ao pressionar Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mainNav.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        mainNav.classList.remove("active");
        mobileMenu.setAttribute("aria-expanded", "false");
        document.body.style.overflow = '';
        mobileMenu.focus();
      }
    });
  }

  // Animações de entrada aprimoradas
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observar elementos para animação
  const animatedElements = document.querySelectorAll('.texto-inicio, .foto-inicio');
  animatedElements.forEach(el => {
    if (!prefersReducedMotion) {
      observer.observe(el);
    } else {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });

  // Scroll suave e navegação ativa aprimorada
  const linksMenu = document.querySelectorAll("header nav a.menu-link");
  const sections = document.querySelectorAll("section[id]");

  // Função para atualizar link ativo baseado na seção visível
  const updateActiveLink = () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    linksMenu.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  // Atualizar link ativo no scroll
  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Executar uma vez no carregamento

  // Scroll suave ao clicar nos links
  linksMenu.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Compensar altura do header
        window.scrollTo({
          top: offsetTop,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });

  // Carrossel Galeria aprimorado
  const carrossel = document.querySelector(".carrossel-galeria");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const indicadoresContainer = document.getElementById("carrossel-indicadores");

  if (carrossel) {
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

    let currentIndex = 0;
    let autoScrollInterval;
    let isUserInteracting = false;

    // Criar indicadores com acessibilidade
    imagensGaleria.forEach((_, index) => {
      const indicador = document.createElement("button");
      indicador.className = "indicador";
      indicador.setAttribute("role", "tab");
      indicador.setAttribute("aria-label", `Ir para projeto ${index + 1}`);
      indicador.setAttribute("aria-selected", index === 0 ? "true" : "false");
      if (index === 0) indicador.classList.add("ativo");
      
      indicador.addEventListener("click", () => irParaImagem(index));
      indicadoresContainer.appendChild(indicador);
    });

    // Carregar imagens com lazy loading
    imagensGaleria.forEach((img, index) => {
      const imagem = document.createElement("img");
      imagem.src = `images/Secao_03_Galeria/Imagens_Carrosel_animado/${img}`;
      imagem.alt = `Projeto ${index + 1}: ${img.replace(/_/g, " ").replace(".png", "")}`;
      imagem.loading = "lazy";
      imagem.setAttribute("role", "tabpanel");
      imagem.setAttribute("aria-label", `Projeto ${index + 1}`);
      
      carrossel.appendChild(imagem);
    });

    function atualizarIndicadores() {
      const indicadores = indicadoresContainer.querySelectorAll('.indicador');
      indicadores.forEach((indicador, index) => {
        const isActive = index === currentIndex;
        indicador.classList.toggle('ativo', isActive);
        indicador.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    function irParaImagem(index) {
      currentIndex = index;
      const scrollAmount = carrossel.clientWidth * index * 0.8;
      carrossel.scrollTo({
        left: scrollAmount,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
      atualizarIndicadores();
      pararScrollAutomatico();
      setTimeout(retomarScrollAutomatico, 2000);
    }

    function iniciarScrollAutomatico() {
      if (prefersReducedMotion) return;
      
      autoScrollInterval = setInterval(() => {
        if (!isUserInteracting) {
          currentIndex = (currentIndex + 1) % imagensGaleria.length;
          irParaImagem(currentIndex);
        }
      }, 3000); // Reduzido para 3 segundos para movimento mais visível
    }

    function pararScrollAutomatico() {
      clearInterval(autoScrollInterval);
      isUserInteracting = true;
    }

    function retomarScrollAutomatico() {
      isUserInteracting = false;
      clearInterval(autoScrollInterval); // Limpar intervalo anterior
      iniciarScrollAutomatico();
    }

    // Controles de navegação
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

    // Navegação por teclado
    carrossel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        btnPrev.click();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        btnNext.click();
      }
    });

    // Touch/Drag melhorado
    let startX = 0;
    let isDragging = false;

    carrossel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      pararScrollAutomatico();
    }, { passive: true });

    carrossel.addEventListener("touchmove", (e) => {
      if (!startX) return;
      isDragging = true;
    }, { passive: true });

    carrossel.addEventListener("touchend", (e) => {
      if (!isDragging) return;
      
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          btnNext.click();
        } else {
          btnPrev.click();
        }
      }
      
      startX = 0;
      isDragging = false;
      setTimeout(retomarScrollAutomatico, 2000);
    }, { passive: true });

    // Iniciar scroll automático
    iniciarScrollAutomatico();

    // Pausar scroll automático quando a seção não está visível
    const galeriaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          retomarScrollAutomatico();
        } else {
          pararScrollAutomatico();
        }
      });
    }, { threshold: 0.5 });

    galeriaObserver.observe(document.getElementById('galeria'));
  }

  // Validação e envio do formulário aprimorado
  const form = document.getElementById("form-contato");
  if (form) {
    const inputs = form.querySelectorAll("input[required], textarea[required]");
    
    // Validação em tempo real
    inputs.forEach(input => {
      input.addEventListener("blur", () => {
        validateField(input);
      });
      
      input.addEventListener("input", () => {
        if (input.classList.contains("error")) {
          validateField(input);
        }
      });
    });

    function validateField(field) {
      const isValid = field.checkValidity() && field.value.trim() !== '';
      field.classList.toggle("error", !isValid);
      field.style.borderColor = isValid ? '' : '#dc3545';
      
      // Adicionar mensagem de erro personalizada
      let errorMsg = field.nextElementSibling;
      if (errorMsg && errorMsg.classList.contains('error-message')) {
        errorMsg.remove();
      }
      
      if (!isValid) {
        errorMsg = document.createElement('span');
        errorMsg.className = 'error-message';
        errorMsg.style.color = '#dc3545';
        errorMsg.style.fontSize = '0.8rem';
        errorMsg.style.marginTop = '0.25rem';
        errorMsg.textContent = getErrorMessage(field);
        field.parentNode.insertBefore(errorMsg, field.nextSibling);
      }
      
      return isValid;
    }

    function getErrorMessage(field) {
      if (field.type === 'email') {
        return 'Por favor, insira um e-mail válido.';
      } else if (field.type === 'tel') {
        return 'Por favor, insira um telefone válido no formato (XX)XXXXX-XXXX.';
      } else {
        return 'Este campo é obrigatório.';
      }
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Validar todos os campos
      let isFormValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        // Focar no primeiro campo com erro
        const firstError = form.querySelector('.error');
        if (firstError) {
          firstError.focus();
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      const submitButton = form.querySelector("button[type='submit']");
      const originalButtonText = submitButton.innerHTML;

      // Estado de carregamento
      submitButton.disabled = true;
      submitButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-opacity="0.3"/>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="4"/>
        </svg>
        Enviando...
      `;

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
          // Sucesso
          submitButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Enviado com sucesso!
          `;
          submitButton.style.background = 'var(--accent-green)';
          
          // Limpar formulário após 2 segundos
          setTimeout(() => {
            form.reset();
            submitButton.innerHTML = originalButtonText;
            submitButton.style.background = '';
            submitButton.disabled = false;
            
            // Remover mensagens de erro
            form.querySelectorAll('.error-message').forEach(msg => msg.remove());
            inputs.forEach(input => {
              input.classList.remove('error');
              input.style.borderColor = '';
            });
          }, 2000);
        } else {
          throw new Error('Erro na resposta do servidor');
        }
      } catch (error) {
        console.error("Erro ao enviar o formulário:", error);
        
        // Estado de erro
        submitButton.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
          </svg>
          Erro ao enviar
        `;
        submitButton.style.background = '#dc3545';
        
        setTimeout(() => {
          submitButton.innerHTML = originalButtonText;
          submitButton.style.background = '';
          submitButton.disabled = false;
        }, 3000);
      }
    });
  }

  // Máscara de telefone aprimorada
  const telefoneInput = document.getElementById("telefone");
  if (telefoneInput) {
    telefoneInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, '');
      let formattedValue = '';
      
      if (value.length > 0) {
        if (value.length <= 2) {
          formattedValue = `(${value}`;
        } else if (value.length <= 7) {
          formattedValue = `(${value.slice(0, 2)})${value.slice(2)}`;
        } else {
          formattedValue = `(${value.slice(0, 2)})${value.slice(2, 7)}-${value.slice(7, 11)}`;
        }
      }
      
      e.target.value = formattedValue;
    });
  }

  // Header scroll effect
  const header = document.getElementById('header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
  });

  // Adicionar estilos para animação de loading
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .error-message {
      display: block;
      margin-top: 0.25rem;
    }
  `;
  document.head.appendChild(style);
});

