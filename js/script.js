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

  // Funcionalidade de troca de imagem na seção de serviços - DESKTOP
  const serviceImage = document.getElementById('service-image');
  const serviceLinks = document.querySelectorAll('.service-link');

  if (serviceImage && serviceLinks.length > 0) {
    serviceLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        const imageData = link.getAttribute('data-image');
        const targetSection = link.getAttribute('href');

        if (targetSection === '#galeria') {
          // Se for o link 'E muito mais...', rolar para a seção Galeria
          const galeriaSection = document.getElementById('galeria');
          if (galeriaSection) {
            const offsetTop = galeriaSection.offsetTop - 80; // Compensar altura do header
            window.scrollTo({
              top: offsetTop,
              behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
          }
        } else if (imageData) {
          // Verificar se a imagem existe antes de tentar carregá-la
          const newImageSrc = `images/Secao_02_Servicos/${imageData}`;
          const testImage = new Image();
          
          testImage.onload = function() {
            // Imagem carregada com sucesso, proceder com a troca
            serviceImage.classList.add('changing');

            // Usar setTimeout em vez de transitionend para maior confiabilidade
            setTimeout(() => {
              serviceImage.src = newImageSrc;
              serviceImage.alt = `Exemplo de ${imageData.replace('.webp', '').replace('_', ' ')}`;
              
              // Remover a classe changing
              serviceImage.classList.remove('changing');
            }, 150); // Metade do tempo da transição CSS
          };
          
          testImage.onerror = function() {
            console.warn(`Imagem não encontrada: ${newImageSrc}`);
            // Manter a imagem atual se a nova não for encontrada
          };
          
          testImage.src = newImageSrc;
        }
      });
    });
  }

  // Funcionalidade dos botões de serviços MOBILE
  const serviceBtns = document.querySelectorAll('.service-btn');

  if (serviceBtns.length > 0 && serviceImage) {
    serviceBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Verificar se é o botão "Ver Galeria"
        const action = btn.getAttribute('data-action');
        if (action === 'galeria') {
          const galeriaSection = document.getElementById('galeria');
          if (galeriaSection) {
            const offsetTop = galeriaSection.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
          }
          return;
        }
        
        // Remover classe active de todos os botões
        serviceBtns.forEach(b => b.classList.remove('active'));
        
        // Adicionar classe active ao botão clicado
        btn.classList.add('active');
        
        // Obter a imagem correspondente
        const imageData = btn.getAttribute('data-image');
        
        if (imageData) {
          // Adicionar efeito de transição
          serviceImage.classList.add('changing');
          
          // Trocar a imagem após um pequeno delay para o efeito visual
          setTimeout(() => {
            const newImageSrc = `images/Secao_02_Servicos/${imageData}`;
            serviceImage.src = newImageSrc;
            serviceImage.alt = `Exemplo de ${imageData.replace('.webp', '').replace('_', ' ')}`;
            
            // Remover o efeito de transição
            serviceImage.classList.remove('changing');
          }, 150);
        }
      });
    });
  }

  // Carrossel Galeria aprimorado
  const carrossel = document.querySelector(".carrossel-galeria");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const indicadoresContainer = document.getElementById("carrossel-indicadores");

  if (carrossel) {
    const imagensGaleria = [
      "Gta_Carrossel_1.webp", "Gustavo_Carrossel_2.webp", "Cachorro_Carrossel_3.webp",
      "Dragao_Carrossel_4.webp", "Xbox_Carrossel_5.webp", "Acai_Carrossel_6.webp",
      "Burguer_Carrossel_7.webp", "Mary_Carrossel_8.webp", "Pizza_Carrossel_9.webp",
      "Creed_Carrossel_10.webp", "Hamburguer_Carrossel_11.webp", "Paixao_Carrossel_12.webp",
      "Baly_Carrossel_13.webp", "Colgate_Carrossel_14.webp", "Principia_Carrossel_15.webp",
      "Flor_Carrossel_16.webp", "Vinho_Carrossel_17.webp", "Tatto_Carrossel_18.webp",
      "Sushi_Carrossel_19.webp", "Spider_Carrossel_20.webp", "Codinome_Carrossel_21.webp",
      "Death_Carrossel_22.webp", "Gear_Carrossel_23.webp", "Cardapio_Carrossel_24.webp",
      "Supergirl_Carrossel_25.webp", "God_Carrossel_26.webp", "Ghost_Carrossel_27.webp",
      "Ori-Post_28.webp","Panfleto_viagens.webp","Projeto_Guarana_Antartica.webp",
      "Projeto_Hamburguer_na_Espada.webp","Hamburgueria_Samurai.webp","Hamburguer_Halloween.webp",
      "Monter_Ovni.webp","Estudio_Maquiagem.webp","Folheto_Moda.webp","Vetor_placa_Mae.webp",
      "Racoes_Origens.webp","Snake_Metal_Gear.webp","Hidratante_paixao_02.webp","Godizilla_refrigerante.webp",
      "Creatina_God_of_War.webp","Cartao_visita.webp","Id_Visual.webp"
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
      const picture = document.createElement("picture");

      const sourceWebp = document.createElement("source");
      sourceWebp.srcset = `images/Secao_03_Galeria/Imagens_Carrosel_animado/${img} 1x`;
      sourceWebp.type = "image/webp";

      const imgFallback = document.createElement("img");
      imgFallback.src = `images/Secao_03_Galeria/Imagens_Carrosel_animado/${img}`;
      imgFallback.alt = `Projeto ${index + 1}: ${img.replace(/_/g, " ").replace(".webp", "")}`;
      imgFallback.loading = "lazy";
      imgFallback.setAttribute("role", "tabpanel");
      imgFallback.setAttribute("aria-label", `Projeto ${index + 1}`);

      picture.appendChild(sourceWebp);
      picture.appendChild(imgFallback);
      carrossel.appendChild(picture);
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
      
      // Detectar se é mobile
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Para mobile: scroll para centralizar cada imagem
        const images = carrossel.querySelectorAll('img');
        if (images[index]) {
          const imageWidth = images[index].offsetWidth;
          const containerWidth = carrossel.offsetWidth;
          const gap = 16; // 1rem convertido para px
          
          // Calcular posição para centralizar a imagem
          const scrollPosition = (imageWidth + gap) * index - (containerWidth - imageWidth) / 2;
          
          carrossel.scrollTo({
            left: Math.max(0, scrollPosition),
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        }
      } else {
        // Para desktop: comportamento original
        const scrollAmount = carrossel.clientWidth * index * 0.8;
        carrossel.scrollTo({
          left: scrollAmount,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
      
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

    // Detectar scroll manual e atualizar indicadores
    let scrollTimeout;
    carrossel.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Detectar qual imagem está mais centralizada
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
          const images = carrossel.querySelectorAll('img');
          const containerCenter = carrossel.scrollLeft + carrossel.offsetWidth / 2;
          
          let closestIndex = 0;
          let closestDistance = Infinity;
          
          images.forEach((img, index) => {
            const imgCenter = img.offsetLeft + img.offsetWidth / 2;
            const distance = Math.abs(containerCenter - imgCenter);
            
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          });
          
          if (closestIndex !== currentIndex) {
            currentIndex = closestIndex;
            atualizarIndicadores();
          }
        }
      }, 100);
    });

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
          
          // Resetar formulário após 2 segundos
          setTimeout(() => {
            form.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
          }, 2000);
        } else {
          throw new Error('Erro no envio');
        }
      } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        
        // Estado de erro
        submitButton.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
          </svg>
          Erro no envio
        `;
        
        // Restaurar botão após 3 segundos
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
        }, 3000);
      }
    });
  }

  // Máscara para telefone
  const telefoneInput = document.getElementById("telefone");
  if (telefoneInput) {
    telefoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      
      if (value.length <= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3");
        if (value.length < 14) {
          value = value.replace(/(\d{2})(\d{4})(\d{4})/, "($1)$2-$3");
        }
      }
      
      e.target.value = value;
    });
  }

  // Adicionar estilos CSS para animação de spin
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
});

