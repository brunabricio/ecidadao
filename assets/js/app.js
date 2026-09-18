document.addEventListener("DOMContentLoaded", function () {

            const campoData = document.getElementById("toi-corte-data");

            if (!campoData) return;

            campoData.addEventListener("input", function () {

                let valor = this.value.replace(/\D/g, "");

                if (valor.length > 8) {
                    valor = valor.substring(0, 8);
                }

                if (valor.length > 4) {
                    valor = valor.replace(/(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
                } else if (valor.length > 2) {
                    valor = valor.replace(/(\d{2})(\d+)/, "$1/$2");
                }

                this.value = valor;

            });

        });

document.addEventListener("DOMContentLoaded", function () {
    const comprovanteRadios = document.querySelectorAll(
        'input[name="toi-neg-comprovante"]'
    );

    const uploadPanel = document.getElementById(
        "toi-neg-comprovante-upload-panel"
    );

    const uploadButton = document.getElementById(
        "neg-upload-btn-comprovante"
    );

    const indicator = document.getElementById(
        "neg-comprovante-indicator"
    );

    const statusWrapper = document.getElementById(
        "toi-neg-status-wrapper"
    );

    if (!uploadPanel || !uploadButton || !indicator || !statusWrapper) {
        return;
    }

    let arquivoSelecionado = false;

    function limparStatus() {
        statusWrapper.classList.add("hidden");

        document
            .querySelectorAll('input[name="toi-neg-status"]')
            .forEach(function (radio) {
                radio.checked = false;
            });
    }

    function resetarUpload() {
        arquivoSelecionado = false;

        indicator.classList.add("hidden");

        uploadButton.innerHTML = `
            <i class="fa fa-plus" aria-hidden="true"></i>
            <span>Selecionar o arquivo</span>
        `;

        limparStatus();
    }

    function atualizarComprovante() {
        const selecionado = document.querySelector(
            'input[name="toi-neg-comprovante"]:checked'
        );

        if (selecionado && selecionado.value === "sim") {
            uploadPanel.classList.remove("hidden");

            if (arquivoSelecionado) {
                statusWrapper.classList.remove("hidden");
            }
        } else {
            uploadPanel.classList.add("hidden");
            resetarUpload();
        }
    }

    comprovanteRadios.forEach(function (radio) {
        radio.addEventListener("change", atualizarComprovante);
    });

    uploadButton.addEventListener("click", function () {
        arquivoSelecionado = true;

        indicator.classList.remove("hidden");

        uploadButton.innerHTML = `
            <i class="fa fa-check" aria-hidden="true"></i>
            <span>Arquivo selecionado</span>
        `;

        statusWrapper.classList.remove("hidden");
    });

    atualizarComprovante();
});

document.addEventListener("DOMContentLoaded", function () {

    const radios = document.querySelectorAll('input[name="toi-neg-comprovante"]');
    const uploadPanel = document.getElementById("toi-neg-comprovante-upload-panel");
    const statusWrapper = document.getElementById("toi-neg-status-wrapper");

    const fileInput = document.getElementById("neg-comprovante-file");
    const uploadBtn = document.getElementById("btn-upload-neg");
    const indicator = document.querySelector(".neg-comprovante-indicator");

    // Este bloco é reutilizado em variações do formulário; não interrompe a
    // aplicação quando os controles de upload não existem na tela atual.
    if (!uploadPanel || !statusWrapper || !fileInput || !uploadBtn || !indicator) {
        return;
    }

    // Clique no botão abre o seletor
    uploadBtn.addEventListener("click", function () {
        fileInput.click();
    });

    // Mostra/esconde upload conforme Sim/Não
    function atualizarTela() {

        const selecionado = document.querySelector('input[name="toi-neg-comprovante"]:checked');

        if (selecionado && selecionado.value === "sim") {

            uploadPanel.classList.remove("hidden");

        } else {

            uploadPanel.classList.add("hidden");
            statusWrapper.classList.add("hidden");

            fileInput.value = "";
            indicator.classList.add("hidden");
            indicator.textContent = "Nenhum arquivo selecionado";

            document.querySelectorAll('input[name="toi-neg-status"]').forEach(r => r.checked = false);

        }

    }

    radios.forEach(radio => {
        radio.addEventListener("change", atualizarTela);
    });

    // Quando escolher um arquivo
    fileInput.addEventListener("change", function () {

        if (this.files.length > 0) {

            indicator.classList.remove("hidden");
            indicator.classList.remove("italic");
            indicator.textContent = this.files[0].name;

            // Só agora aparece a pergunta
            statusWrapper.classList.remove("hidden");

        } else {

            indicator.classList.add("italic");
            indicator.textContent = "Nenhum arquivo selecionado";

            statusWrapper.classList.add("hidden");

        }

    });

    atualizarTela();

});

document.addEventListener("DOMContentLoaded", function () {

    const radiosNegativacao = document.querySelectorAll('input[name="toi-has-negativacao"]');
    const radiosComprovante = document.querySelectorAll('input[name="toi-neg-comprovante"]');

    const painelNegativacao = document.getElementById("toi-negativacao-panel");
    const painelStatus = document.getElementById("toi-neg-status-wrapper");

    if (!painelNegativacao || !painelStatus) {
        return;
    }

    function atualizarNegativacao() {

        const negativacao = document.querySelector('input[name="toi-has-negativacao"]:checked');

        if (negativacao && negativacao.value === "sim") {
            painelNegativacao.classList.remove("hidden");
            atualizarStatus();
        } else {
            painelNegativacao.classList.add("hidden");
            painelStatus.classList.add("hidden");

            document.querySelectorAll('input[name="toi-neg-comprovante"]').forEach(r => r.checked = false);
            document.querySelectorAll('input[name="toi-neg-status"]').forEach(r => r.checked = false);
        }
    }

    function atualizarStatus() {

        const comprovante = document.querySelector('input[name="toi-neg-comprovante"]:checked');

        if (comprovante && comprovante.value === "sim") {
            painelStatus.classList.remove("hidden");
        } else {
            painelStatus.classList.add("hidden");

            document.querySelectorAll('input[name="toi-neg-status"]').forEach(r => r.checked = false);
        }
    }

    radiosNegativacao.forEach(radio => {
        radio.addEventListener("change", atualizarNegativacao);
    });

    radiosComprovante.forEach(radio => {
        radio.addEventListener("change", atualizarStatus);
    });

    atualizarNegativacao();
});

// Presentation privacy: never retain browser autofill data between participants.
    document.querySelectorAll('form').forEach(form => {
      form.setAttribute('autocomplete', 'off');
    });
    document.querySelectorAll('input, textarea, select').forEach(field => {
      field.setAttribute('autocomplete', 'off');
    });
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) window.location.reload();
    });
    document.querySelectorAll('button[aria-label="Sair"]').forEach(button => {
      button.addEventListener('click', () => window.location.reload());
    });

    // Helper function to show beautiful toast notifications
    function showNotification(title, desc, isError = false) {
      const toast = document.getElementById('success-toast');
      const toastTitle = document.querySelector('[data-template-id="toast-success-title"]');
      const toastDesc = document.querySelector('[data-template-id="toast-success-desc"]');
      if (!toast) return;

      if (toastTitle) toastTitle.textContent = title;
      if (toastDesc) toastDesc.textContent = desc;

      const icon = toast.querySelector('i');
      if (isError) {
        toast.classList.remove('bg-emerald-600');
        toast.classList.add('bg-red-600');
        if (icon) {
          icon.className = 'fa fa-exclamation-circle text-lg';
        }
      } else {
        toast.classList.remove('bg-red-600');
        toast.classList.add('bg-emerald-600');
        if (icon) {
          icon.className = 'fa fa-check-circle text-lg';
        }
      }

      toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
      toast.classList.add('translate-y-0', 'opacity-100');

      setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
      }, 4000);
    }

    // Elements of e-Cidadão
    const appWrapper = document.getElementById('app-wrapper');
    const searchInput = document.getElementById('search-input');
    const items = document.querySelectorAll('.complaint-item');
    const systemItems = document.querySelectorAll('.system-service-item');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBtnCancel = document.getElementById('modal-btn-cancel');
    const modalBtnContinue = document.getElementById('modal-btn-continue');
    const modalConfirmCheckbox = document.getElementById('modal-confirm-checkbox');
    const modalDetails = document.querySelectorAll('.modal-detail');

    const pageAcademicAccess = document.getElementById('page-academic-access');
    const pageEvaluationProfile = document.getElementById('page-evaluation-profile');
    const pageServiceEvaluation = document.getElementById('page-service-evaluation');
    const pageEvaluationComplete = document.getElementById('page-evaluation-complete');
    const pageEvaluationDashboard = document.getElementById('page-evaluation-dashboard');
    const pageEvaluationTracking = document.getElementById('page-evaluation-tracking');
    const pageAcademicTriage = document.getElementById('page-academic-triage');
    const pageHome = document.getElementById('page-home');
    const pageRequirements = document.getElementById('page-requirements');
    const pageAuthorQualification = document.getElementById('page-author-qualification');
    const pageDefendantQualification = document.getElementById('page-defendant-qualification');
    const pageFactsArguments = document.getElementById('page-facts-arguments');
    const pageFlightProblem = document.getElementById('page-flight-problem');
    const pageFlightLosses = document.getElementById('page-flight-losses');
    const pageOtherProofs = document.getElementById('page-other-proofs');
    const pageRequestsMain = document.getElementById('page-requests-step');
    const pageProcessLocation = document.getElementById('page-process-location');
    const pagePreviewMain = document.getElementById('page-petition-preview');
    const pageSentMain = document.getElementById('page-petition-sent');

    const simplifiedFormCopy = new Map([
      ['Quem está envolvido', 'Quem participou da situação?'],
      ['Indique a Concessionária do serviço público *', 'Qual empresa prestava o serviço? *'],
      ['Indique o Fabricante do Produto *', 'Quem fabricou o produto? *'],
      ['Indique o Vendedor do Produto *', 'Onde o produto foi comprado? *'],
      ['Indique a Companhia Aérea que vendeu o bilhete (passagem) *', 'Qual empresa vendeu a passagem? *'],
      ['Indique a Companhia Aérea que fez o voo *', 'Qual empresa operou o voo? *'],
      ['Quem é o réu?', 'A outra parte é:'],
      ['Indique o tempo de suspensão/interrupção do serviço *', 'Por quanto tempo o serviço ficou interrompido? *'],
      ['Descreva brevemente o que aconteceu *', 'Conte o que aconteceu *'],
      ['PROTOCOLOS', 'TENTATIVAS DE SOLUÇÃO'],
      ['Tem protocolos de reclamação com a concessionária? *', 'Você entrou em contato com a empresa? *'],
      ['Nº do protocolo *', 'Número de atendimento ou protocolo *'],
      ['Comprovante do protocolo (opcional)', 'Registro desse contato (opcional)'],
      ['PREJUÍZOS/DANOS', 'IMPACTOS DO PROBLEMA'],
      ['PREJUÍZOS E DANOS', 'IMPACTOS DO PROBLEMA'],
      ['Sofreu algum prejuízo material em razão da suspensão/interrupção? *', 'O problema gerou algum gasto ou perda financeira? *'],
      ['Sofreu danos morais? *', 'O ocorrido causou algum impacto pessoal relevante? *'],
      ['Descreva o prejuízo *', 'Explique o gasto ou a perda *'],
      ['Valor do prejuízo *', 'Valor estimado *'],
      ['Justifique/explique o dano moral *', 'Explique o impacto pessoal *'],
      ['Qual o valor entende necessário para compensar os danos morais sofridos? *', 'Qual valor você considera adequado? *'],
      ['Fatos e fundamentos', 'Relato da situação'],
      ['Especifique qual o produto adquirido *', 'Qual produto apresentou problema? *'],
      ['Indique a data da compra *', 'Quando o produto foi comprado? *'],
      ['Valor pago pelo produto *', 'Quanto foi pago? *'],
      ['CONTATO COM FABRICANTE OU VENDEDOR', 'CONTATO COM A EMPRESA'],
      ['Entrou em contato com o fabricante ou vendedor? *', 'Tentou resolver diretamente com a empresa? *'],
      ['ASSISTÊNCIA TÉCNICA', 'AVALIAÇÃO TÉCNICA'],
      ['Levou o produto para assistência técnica? *', 'O produto foi avaliado por uma assistência técnica? *'],
      ['TESTEMUNHAS', 'PESSOAS QUE PRESENCIARAM'],
      ['Há testemunhas dos fatos? *', 'Alguém presenciou o ocorrido? *'],
      ['OUTROS DOCUMENTOS', 'DOCUMENTOS COMPLEMENTARES'],
      ['Tem outros documentos para apresentar? *', 'Você possui mais algum documento útil? *'],
      ['MÍDIA', 'FOTOS, ÁUDIOS E VÍDEOS'],
      ['Tem mídia (fotografia, gravação, vídeo etc.) para apresentar? *', 'Você possui fotos, áudios ou vídeos relacionados? *'],
      ['Carregue aqui os documentos *', 'Adicione os documentos *'],
      ['Carregue aqui a(s) mídia(s) *', 'Adicione os arquivos de mídia *'],
      ['O que você espera', 'Resultado desejado'],
      ['Quer o restabelecimento imediato do serviço? *', 'Deseja que o serviço volte a funcionar? *'],
      ['Quer indenização pelos danos materiais? *', 'Deseja receber de volta os gastos e perdas? *'],
      ['Quer indenização pelos danos morais? *', 'Deseja solicitar compensação pelo impacto pessoal? *'],
      ['Quer a anulação das cobranças e da dívida? *', 'Deseja cancelar a cobrança questionada? *'],
      ['Quer a retirada imediata dos seus dados dos cadastros de devedores – exclusão da negativação? *', 'Deseja retirar seu nome do cadastro de inadimplentes? *'],
      ['Quer impedir que o réu inclua seus dados no cadastro de devedores (Serasa, SPC, etc)? *', 'Deseja evitar uma nova inclusão em cadastro de inadimplentes? *'],
      ['Revise sua solicitação', 'Confira o resumo'],
      ['Veja abaixo como as informações serão organizadas no relatório de preparação.', 'Confira os dados organizados por assunto antes de gerar seu relatório.']
    ]);

    function applySimplifiedFormCopy() {
      document.querySelectorAll('h2, h3, h4, label, span, p').forEach(element => {
        if (element.children.length > 0) return;
        const currentText = element.textContent.trim();
        const replacement = simplifiedFormCopy.get(currentText);
        if (replacement) element.textContent = replacement;
      });
    }

    applySimplifiedFormCopy();

    function reorderSimplifiedForms() {
      const serviceDescription = document.getElementById('facts-description')?.parentElement;
      const serviceDuration = document.getElementById('facts-time')?.parentElement;
      const serviceFields = serviceDuration?.parentElement;
      if (serviceDescription && serviceDuration && serviceFields) {
        serviceFields.insertBefore(serviceDescription, serviceDuration);
      }

      const productForm = document.getElementById('facts-form-vicio');
      const productDescription = document.getElementById('facts-vicio-desc')?.parentElement;
      if (productForm && productDescription && productForm.children.length > 1) {
        productForm.insertBefore(productDescription, productForm.children[1]);
      }

      const witnessesSection = document.querySelector('[data-template-id="sect-witnesses-title"]')?.closest('.space-y-2');
      const documentsSection = document.querySelector('[data-template-id="sect-documents-title"]')?.closest('.space-y-2');
      const mediaSection = document.querySelector('[data-template-id="sect-media-title"]')?.closest('.space-y-2');
      const proofsSections = witnessesSection?.parentElement;
      if (proofsSections && documentsSection && mediaSection && witnessesSection) {
        proofsSections.append(documentsSection, mediaSection, witnessesSection);
      }
    }

    reorderSimplifiedForms();

    const guidedFormIds = [
      'defendant-form', 'defendant-form-vicio', 'defendant-form-voo', 'defendant-form-transito',
      'facts-form', 'facts-form-voo', 'facts-form-vicio', 'facts-form-transito',
      'facts-form-toi', 'facts-form-negativacao', 'flight-problem-form', 'flight-losses-form',
      'proofs-form', 'requests-form', 'requests-form-voo', 'requests-form-transito',
      'requests-form-negativacao', 'requests-form-toi'
    ];
    const guidedForms = guidedFormIds.map(id => document.getElementById(id)).filter(Boolean);

    function syncGuidedChoices() {
      guidedForms.forEach(form => {
        form.querySelectorAll('input[type="radio"]').forEach(input => {
          const label = input.closest('label');
          if (!label) return;
          label.classList.add('guided-choice');
          label.classList.toggle('is-selected', input.checked);
        });
      });
    }

    guidedForms.forEach(form => {
      form.classList.add('guided-form');
      form.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]):not([type="hidden"]), textarea, select').forEach(field => {
        field.classList.add('guided-field');
      });
      form.addEventListener('change', syncGuidedChoices);
    });
    syncGuidedChoices();

    const previewDocument = document.querySelector('#page-petition-preview .font-serif.max-h-96');
    if (previewDocument) previewDocument.classList.add('guided-review');

    // As orientações pertencem à primeira etapa do formulário. Mantemos os
    // blocos no HTML original para preservar os identificadores usados pelo
    // protótipo, mas os posicionamos visualmente antes do título "Seus dados".
    const authorMainTitle = document.querySelector('[data-template-id="auth-main-title"]');
    const authorMainContainer = authorMainTitle?.parentElement;
    const authorGuidance = document.createElement('section');
    authorGuidance.id = 'author-guidance';
    authorGuidance.className = 'author-guidance';
    [
      document.getElementById('author-guidance-warning'),
      document.getElementById('author-guidance-documents'),
      document.getElementById('author-guidance-requirements')
    ].forEach(block => {
      if (block) {
        block.classList.add('author-guidance-block');
        authorGuidance.appendChild(block);
      }
    });
    if (authorMainContainer && authorMainTitle && authorGuidance.children.length) {
      authorMainContainer.insertBefore(authorGuidance, authorMainTitle);
    }

    // Mantém somente uma página principal visível por vez.
    const mainPages = [
      pageAcademicAccess,
      pageEvaluationProfile,
      pageServiceEvaluation,
      pageEvaluationComplete,
      pageEvaluationDashboard,
      pageEvaluationTracking,
      pageAcademicTriage,
      pageHome,
      pageRequirements,
      pageAuthorQualification,
      pageDefendantQualification,
      pageFactsArguments,
      pageFlightProblem,
      pageFlightLosses,
      pageOtherProofs,
      pageRequestsMain,
      pageProcessLocation,
      pagePreviewMain,
      pageSentMain
    ].filter(Boolean);

    function showOnlyPage(pageToShow) {
      mainPages.forEach(page => page.classList.add('hidden'));
      if (pageToShow) pageToShow.classList.remove('hidden');
      window.setTimeout(() => {
        applySimplifiedFormCopy();
        syncGuidedChoices();
      }, 0);
    }

    const authorForm = document.getElementById('author-form');
    const defendantForm = document.getElementById('defendant-form');
    const factsForm = document.getElementById('facts-form');
    const proofsForm = document.getElementById('proofs-form');
    const btnProofsBack = document.getElementById('btn-proofs-back');

    function syncAuthorGuidanceVisibility() {
      if (!authorGuidance || !authorForm) return;
      authorGuidance.classList.toggle('hidden', authorForm.classList.contains('hidden'));
    }

    // Fluxo principal do e-Cidadão: avaliação da experiência no Petição Cidadã.
    const evaluationForm = document.getElementById('service-evaluation-form');
    const evaluationSteps = Array.from(document.querySelectorAll('.evaluation-step'));
    const evaluationStepperItems = Array.from(document.querySelectorAll('#evaluation-stepper li'));
    const evaluationBack = document.getElementById('evaluation-back');
    const evaluationNext = document.getElementById('evaluation-next');
    const evaluationSubmit = document.getElementById('evaluation-submit');
    const evaluationError = document.getElementById('evaluation-error');
    const evaluationProblemDetails = document.getElementById('evaluation-problem-details');
    const evaluationDescription = document.getElementById('evaluation-problem-description');
    const evaluationDescriptionCount = document.getElementById('evaluation-description-count');
    const evaluationScreenshotButton = document.getElementById('evaluation-screenshot-button');
    const evaluationScreenshotName = document.getElementById('evaluation-screenshot-name');
    const evaluationReview = document.getElementById('evaluation-review');
    let currentEvaluationStep = 1;
    let selectedEvaluationSubject = '';
    let selectedEvaluationGroup = '';
    let evaluationProfile = null;
    let lastEvaluationReport = '';

    function selectedEvaluationValue(name) {
      return evaluationForm?.querySelector(`input[name="${name}"]:checked`)?.value || '';
    }

    function syncEvaluationChoices() {
      evaluationForm?.querySelectorAll('input[type="radio"]').forEach(input => {
        input.closest('label')?.classList.toggle('is-selected', input.checked);
      });
    }

    function syncEvaluationProblemFields() {
      const showDetails = selectedEvaluationValue('evaluation-has-problem') === 'sim';
      evaluationProblemDetails?.classList.toggle('hidden', !showDetails);
      ['evaluation-problem-stage', 'evaluation-problem-type', 'evaluation-problem-description'].forEach(id => {
        const field = document.getElementById(id);
        if (field) field.required = showDetails;
      });
    }

    function showEvaluationStep(step) {
      currentEvaluationStep = Math.min(5, Math.max(1, step));
      evaluationSteps.forEach(section => {
        section.classList.toggle('hidden', Number(section.dataset.evaluationStep) !== currentEvaluationStep);
      });
      evaluationStepperItems.forEach((item, index) => {
        item.classList.toggle('is-active', index + 1 === currentEvaluationStep);
        item.classList.toggle('is-complete', index + 1 < currentEvaluationStep);
      });
      evaluationBack?.classList.toggle('hidden', currentEvaluationStep === 1);
      evaluationNext?.classList.toggle('hidden', currentEvaluationStep === 5);
      evaluationSubmit?.classList.toggle('hidden', currentEvaluationStep !== 5);
      evaluationError?.classList.add('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function validateEvaluationStep(step) {
      const section = evaluationForm?.querySelector(`[data-evaluation-step="${step}"]`);
      if (!section) return true;
      let firstInvalid = null;
      const checkedNames = new Set();
      section.querySelectorAll('[required]').forEach(field => {
        let valid = true;
        if (field.type === 'radio') {
          if (checkedNames.has(field.name)) return;
          checkedNames.add(field.name);
          valid = Boolean(section.querySelector(`input[name="${field.name}"]:checked`));
        } else if (field.type === 'checkbox') {
          valid = field.checked;
        } else {
          valid = Boolean(field.value.trim());
        }
        field.closest('label, fieldset')?.classList.toggle('has-error', !valid);
        if (!valid && !firstInvalid) firstInvalid = field;
      });
      evaluationError?.classList.toggle('hidden', !firstInvalid);
      firstInvalid?.focus();
      return !firstInvalid;
    }

    function labelForRadio(name) {
      const input = evaluationForm?.querySelector(`input[name="${name}"]:checked`);
      return input?.closest('label')?.textContent.trim() || 'Não informado';
    }

    function buildEvaluationReview() {
      if (!evaluationReview) return;
      const ratings = Array.from(evaluationForm.querySelectorAll('.stage-rating')).map(row => ({
        stage: row.querySelector('strong')?.textContent.trim() || '',
        score: Number(row.querySelector('input:checked')?.value || 0)
      }));
      const average = ratings.length ? (ratings.reduce((sum, item) => sum + item.score, 0) / ratings.length).toFixed(1) : '-';
      const processNumber = document.getElementById('evaluation-process-number')?.value.trim() || 'Não informado';
      const values = [
        ['Sistema avaliado', selectedEvaluationSubject || 'Não informado'],
        ['Categoria do serviço', selectedEvaluationGroup || 'Não informado'],
        ['Número do processo', processNumber],
        ['Local da utilização', `${document.getElementById('evaluation-city')?.value || '-'} / ${document.getElementById('evaluation-state')?.value || '-'}`],
        ['Data', document.getElementById('evaluation-date')?.value || '-'],
        ['Dispositivo e navegador', `${document.getElementById('evaluation-device')?.value || '-'} · ${document.getElementById('evaluation-browser')?.value || '-'}`],
        ['Conseguiu concluir?', labelForRadio('evaluation-completed')],
        ['Média das etapas', `${average} de 5`],
        ['Problema encontrado?', labelForRadio('evaluation-has-problem')],
        ['Satisfação geral', `${selectedEvaluationValue('evaluation-satisfaction') || '-'} de 5`],
        ['Esforço necessário', labelForRadio('evaluation-effort')],
        ['Precisou de ajuda?', labelForRadio('evaluation-needed-help')],
        ['Barreira de acessibilidade?', labelForRadio('evaluation-accessibility')]
      ];
      if (selectedEvaluationValue('evaluation-has-problem') === 'sim') {
        values.splice(7, 0,
          ['Etapa afetada', document.getElementById('evaluation-problem-stage')?.value || '-'],
          ['Tipo de dificuldade', document.getElementById('evaluation-problem-type')?.value || '-']
        );
      }
      const list = document.createElement('dl');
      values.forEach(([term, description]) => {
        const row = document.createElement('div');
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        dt.textContent = term;
        dd.textContent = description;
        row.append(dt, dd);
        list.appendChild(row);
      });
      evaluationReview.replaceChildren(list);
    }

    function formatProcessNumber(value) {
      const digits = value.replace(/\D/g, '').slice(0, 20);
      const groups = [digits.slice(0, 7), digits.slice(7, 9), digits.slice(9, 13), digits.slice(13, 14), digits.slice(14, 16), digits.slice(16, 20)];
      const separators = ['', '-', '.', '.', '.', '.'];
      return groups.reduce((result, group, index) => group ? result + separators[index] + group : result, '');
    }

    function initializeEvaluation() {
      if (!evaluationForm) return;
      const date = document.getElementById('evaluation-date');
      if (date && !date.value) date.value = new Date().toISOString().slice(0, 10);
      syncEvaluationProblemFields();
      syncEvaluationChoices();
      showEvaluationStep(1);
    }

    document.getElementById('evaluation-process-number')?.addEventListener('input', event => {
      event.target.value = formatProcessNumber(event.target.value);
    });
    evaluationDescription?.addEventListener('input', () => {
      if (evaluationDescriptionCount) evaluationDescriptionCount.textContent = String(evaluationDescription.value.length);
    });
    evaluationForm?.addEventListener('change', () => {
      syncEvaluationChoices();
      syncEvaluationProblemFields();
    });
    evaluationScreenshotButton?.addEventListener('click', () => {
      if (evaluationScreenshotName) evaluationScreenshotName.textContent = 'captura_peticao_cidada.png (arquivo demonstrativo; não enviado)';
    });
    evaluationNext?.addEventListener('click', () => {
      if (!validateEvaluationStep(currentEvaluationStep)) return;
      if (currentEvaluationStep === 4) buildEvaluationReview();
      showEvaluationStep(currentEvaluationStep + 1);
    });
    evaluationBack?.addEventListener('click', () => showEvaluationStep(currentEvaluationStep - 1));
    evaluationForm?.addEventListener('submit', event => {
      event.preventDefault();
      if (!validateEvaluationStep(5)) return;
      const protocol = `EC-AV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
      const protocolElement = document.getElementById('evaluation-protocol');
      if (protocolElement) protocolElement.textContent = protocol;
      const processNumber = document.getElementById('evaluation-process-number')?.value || 'Não informado';
      lastEvaluationReport = [
        'e-Cidadão — Relatório de avaliação do Petição Cidadã',
        `Protocolo: ${protocol}`,
        `Sistema avaliado: ${selectedEvaluationSubject}`,
        `Categoria: ${selectedEvaluationGroup}`,
        `Participante: ${evaluationProfile?.name || 'Não informado'}`,
        `Município/UF: ${evaluationProfile?.city || '-'} / ${evaluationProfile?.state || '-'}`,
        `Número do processo: ${processNumber}`,
        `Satisfação geral: ${selectedEvaluationValue('evaluation-satisfaction') || '-'} de 5`,
        `Conseguiu concluir: ${labelForRadio('evaluation-completed')}`,
        `Problema encontrado: ${labelForRadio('evaluation-has-problem')}`,
        '',
        'Documento gerado por protótipo acadêmico. Não equivale a protocolo oficial do TJERJ.'
      ].join('\n');
      const reportPreview = document.getElementById('evaluation-report-preview');
      if (reportPreview) reportPreview.textContent = lastEvaluationReport;
      const metricTotal = document.getElementById('metric-total');
      const metricSatisfaction = document.getElementById('metric-satisfaction');
      if (metricTotal) metricTotal.textContent = '1.285';
      if (metricSatisfaction) metricSatisfaction.textContent = `${selectedEvaluationValue('evaluation-satisfaction') || '-'},0/5`;
      if (selectedEvaluationValue('evaluation-has-problem') === 'sim') {
        const queue = document.getElementById('manager-queue');
        const priorityText = document.getElementById('auto-priority')?.textContent || 'Média';
        const priorityKey = priorityText === 'Crítica' ? 'critical' : priorityText === 'Alta' ? 'high' : 'medium';
        const occurrence = document.createElement('article'); occurrence.dataset.priority = priorityKey;
        const code = document.createElement('b'); code.textContent = protocol;
        const summary = document.createElement('span'); summary.textContent = `${selectedEvaluationSubject} · ${document.getElementById('auto-category')?.textContent || 'Ocorrência'}`;
        const priority = document.createElement('em'); priority.className = `priority-${priorityKey}`; priority.textContent = priorityText === '—' ? 'Média' : priorityText;
        const owner = document.createElement('small'); owner.textContent = selectedEvaluationGroup;
        occurrence.append(code, summary, priority, owner);
        queue?.prepend(occurrence);
      }
      showOnlyPage(pageEvaluationComplete);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.getElementById('evaluation-print')?.addEventListener('click', () => window.print());
    document.getElementById('evaluation-download')?.addEventListener('click', () => {
      if (!lastEvaluationReport) return;
      const file = new Blob([lastEvaluationReport], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'relatorio-avaliacao-e-cidadao.txt';
      link.click();
      URL.revokeObjectURL(url);
    });

    function openEvaluationDashboard() {
      if (!academicSessionUser) {
        showOnlyPage(pageAcademicAccess);
        return;
      }
      showOnlyPage(pageEvaluationDashboard);
      document.getElementById('header-subnav')?.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.getElementById('evaluation-open-dashboard')?.addEventListener('click', openEvaluationDashboard);
    document.getElementById('nav-dashboard')?.addEventListener('click', event => {
      event.preventDefault();
      openEvaluationDashboard();
    });
    document.getElementById('dashboard-back')?.addEventListener('click', () => {
      showOnlyPage(pageHome);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Cartograma interativo do Brasil. Os valores são demonstrativos e não
    // representam estatísticas oficiais do TJERJ.
    const brazilStates = [
      ['AC','Acre',87,240,18],['AM','Amazonas',165,165,46],['RR','Roraima',209,77,12],['RO','Rondônia',193,256,21],
      ['PA','Pará',324,161,68],['AP','Amapá',343,85,15],['TO','Tocantins',391,250,31],['MA','Maranhão',434,176,54],
      ['PI','Piauí',465,209,39],['CE','Ceará',513,179,73],['RN','Rio Grande do Norte',553,191,38],['PB','Paraíba',551,209,44],
      ['PE','Pernambuco',534,225,82],['AL','Alagoas',552,243,33],['SE','Sergipe',540,257,29],['BA','Bahia',480,280,96],
      ['MT','Mato Grosso',287,283,57],['MS','Mato Grosso do Sul',302,384,48],['GO','Goiás',369,329,71],['DF','Distrito Federal',390,323,64],
      ['MG','Minas Gerais',437,361,138],['ES','Espírito Santo',489,379,61],['RJ','Rio de Janeiro',463,413,186],['SP','São Paulo',381,412,224],
      ['PR','Paraná',342,443,105],['SC','Santa Catarina',359,480,76],['RS','Rio Grande do Sul',321,513,91]
    ];
    const mapThemeFactors = { all: 1, petition: .31, query: .25, support: .19, documents: .15, information: .10 };
    const mapThemeNames = { all: 'Todos os serviços', petition: 'Peticionamento e processos', query: 'Consulta e acompanhamento', support: 'Atendimento ao cidadão', documents: 'Documentos e pagamentos', information: 'Informação pública' };
    const brazilMap = document.getElementById('brazil-complaint-map');
    const mapThemeFilter = document.getElementById('map-theme-filter');
    const mapStateDetail = document.getElementById('map-state-detail');

    function complaintColor(value, maximum) {
      const ratio = maximum ? value / maximum : 0;
      if (ratio > .75) return '#07595b';
      if (ratio > .5) return '#16817f';
      if (ratio > .3) return '#4da8a1';
      if (ratio > .15) return '#8bc9c3';
      return '#cbe7e3';
    }

    function stateComplaintValue(state, theme) {
      if (theme === 'all') return state[4];
      const variation = 0.82 + ((state[0].charCodeAt(0) + state[0].charCodeAt(1) + theme.length) % 8) / 20;
      return Math.max(1, Math.round(state[4] * mapThemeFactors[theme] * variation));
    }

    function renderBrazilComplaintMap(theme = 'all') {
      if (!brazilMap) return;
      const namespace = 'http://www.w3.org/2000/svg';
      const values = brazilStates.map(state => stateComplaintValue(state, theme));
      const maximum = Math.max(...values);
      const total = values.reduce((sum, value) => sum + value, 0);
      brazilMap.replaceChildren();
      const mapImage = document.createElementNS(namespace, 'image');
      mapImage.setAttribute('class', 'brazil-map-image');
      mapImage.setAttribute('href', 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Brazilian_States.PNG');
      mapImage.setAttribute('x', '35'); mapImage.setAttribute('y', '0');
      mapImage.setAttribute('width', '560'); mapImage.setAttribute('height', '600');
      mapImage.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      brazilMap.appendChild(mapImage);
      brazilStates.forEach((state, index) => {
        const [uf, name, x, y] = state;
        const value = values[index];
        const group = document.createElementNS(namespace, 'g');
        group.setAttribute('class', 'brazil-state');
        group.setAttribute('tabindex', '0');
        group.setAttribute('role', 'button');
        group.setAttribute('aria-label', `${name}: ${value} avaliações`);
        const marker = document.createElementNS(namespace, 'circle');
        marker.setAttribute('cx', String(x)); marker.setAttribute('cy', String(y));
        marker.setAttribute('r', String(10 + Math.round((value / maximum) * 7)));
        marker.setAttribute('fill', complaintColor(value, maximum));
        const label = document.createElementNS(namespace, 'text');
        label.setAttribute('x', String(x)); label.setAttribute('y', String(y - 1)); label.textContent = uf;
        const count = document.createElementNS(namespace, 'text');
        count.setAttribute('x', String(x)); count.setAttribute('y', String(y + 8)); count.setAttribute('class', 'state-count'); count.textContent = String(value);
        const showState = () => {
          if (!mapStateDetail) return;
          mapStateDetail.replaceChildren();
          const eyebrow = document.createElement('small'); eyebrow.textContent = name.toUpperCase();
          const strong = document.createElement('strong'); strong.textContent = `${value} avaliações`;
          const span = document.createElement('span'); span.textContent = mapThemeNames[theme];
          mapStateDetail.append(eyebrow, strong, span);
          brazilMap.querySelectorAll('.brazil-state').forEach(item => item.classList.remove('is-selected'));
          group.classList.add('is-selected');
        };
        group.addEventListener('click', showState);
        group.addEventListener('mouseenter', showState);
        group.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') showState(); });
        group.append(marker, label, count);
        brazilMap.appendChild(group);
      });
      const totalElement = document.getElementById('map-theme-total');
      if (totalElement) totalElement.textContent = `${total.toLocaleString('pt-BR')} avaliações`;
    }

    mapThemeFilter?.addEventListener('change', event => renderBrazilComplaintMap(event.target.value));
    renderBrazilComplaintMap();
    document.getElementById('dashboard-public-report')?.addEventListener('click', () => {
      const themes = Object.keys(mapThemeNames);
      const rows = [['UF', 'Estado', ...themes.map(theme => mapThemeNames[theme])]];
      brazilStates.forEach(state => {
        rows.push([state[0], state[1], ...themes.map(theme => stateComplaintValue(state, theme))]);
      });
      const csv = rows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(';')).join('\r\n');
      const file = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = `relatorio-publico-e-cidadao-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    });

    const managerPanel = document.getElementById('dashboard-manager-panel');
    const publicViewButton = document.getElementById('dashboard-public-view');
    const managerViewButton = document.getElementById('dashboard-manager-view');
    function setDashboardView(mode) {
      const manager = mode === 'manager';
      managerPanel?.classList.toggle('hidden', !manager);
      document.getElementById('advanced-questionnaire-editor')?.classList.toggle('hidden', !manager);
      publicViewButton?.classList.toggle('is-active', !manager);
      managerViewButton?.classList.toggle('is-active', manager);
      if (manager) managerPanel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    publicViewButton?.addEventListener('click', () => setDashboardView('public'));
    managerViewButton?.addEventListener('click', () => setDashboardView('manager'));

    document.getElementById('manager-queue-filter')?.addEventListener('change', event => {
      document.querySelectorAll('#manager-queue article').forEach(item => {
        item.classList.toggle('hidden', event.target.value !== 'all' && item.dataset.priority !== event.target.value);
      });
    });

    document.getElementById('question-editor-form')?.addEventListener('submit', event => {
      event.preventDefault();
      const system = document.getElementById('question-system')?.value;
      const question = document.getElementById('question-text')?.value.trim();
      const type = document.getElementById('question-type')?.value;
      if (!system || !question) return;
      const list = document.getElementById('custom-question-list');
      if (list?.querySelector('p')) list.replaceChildren();
      const item = document.createElement('article');
      const strong = document.createElement('strong'); strong.textContent = question;
      const meta = document.createElement('span'); meta.textContent = `${system} · ${type} · versão de rascunho`;
      item.append(strong, meta);
      list?.appendChild(item);
      event.target.reset();
    });
    document.getElementById('question-editor-form')?.closest('.dashboard-card')?.classList.add('hidden');

    const questionnaireStore = new Map();
    const publishedQuestionnaireStore = new Map();
    let questionSequence = 10;
    const defaultManagerQuestions = [
      { id: 1, text: 'Foi fácil acessar e autenticar-se no sistema?', type: 'scale', section: 'Acesso', help: 'Avalie de 1 (muito difícil) a 5 (muito fácil).', options: [], condition: '', required: true, active: true },
      { id: 2, text: 'Você conseguiu concluir o que precisava?', type: 'yesno', section: 'Resultado', help: '', options: ['Sim', 'Não'], condition: '', required: true, active: true },
      { id: 3, text: 'Descreva a principal dificuldade encontrada.', type: 'longtext', section: 'Experiência geral', help: 'Não informe senhas ou dados sensíveis.', options: [], condition: 'problem-yes', required: false, active: true }
    ];
    const managerSystemFilter = document.getElementById('question-system-filter');
    if (managerSystemFilter) {
      managerSystemFilter.replaceChildren();
      systemItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item.dataset.system;
        option.textContent = item.dataset.system;
        managerSystemFilter.appendChild(option);
      });
    }
    document.querySelectorAll('#question-system-filter option').forEach(option => {
      questionnaireStore.set(option.value, defaultManagerQuestions.map(question => ({ ...question, id: ++questionSequence })));
    });
    const advancedQuestionForm = document.getElementById('advanced-question-form');
    const questionSystemFilter = document.getElementById('question-system-filter');
    const advancedQuestionType = document.getElementById('advanced-question-type');
    const advancedOptionsField = document.getElementById('advanced-question-options-field');
    const typeLabels = { scale: 'Escala de 1 a 5', yesno: 'Sim ou não', single: 'Escolha única', multiple: 'Múltipla escolha', text: 'Texto curto', longtext: 'Texto longo', date: 'Data' };

    function currentQuestionnaire() {
      return questionnaireStore.get(questionSystemFilter?.value) || [];
    }

    function resetAdvancedQuestionForm() {
      advancedQuestionForm?.reset();
      const editId = document.getElementById('question-edit-id');
      if (editId) editId.value = '';
      document.getElementById('advanced-question-save-label').textContent = 'Adicionar pergunta';
      document.getElementById('advanced-question-cancel')?.classList.add('hidden');
      advancedOptionsField?.classList.add('hidden');
    }

    function setQuestionnaireDraft() {
      const status = document.getElementById('questionnaire-status');
      if (!status) return;
      status.textContent = 'Alterações não publicadas';
      status.className = 'questionnaire-status draft';
    }

    function renderAdvancedQuestionList() {
      const list = document.getElementById('advanced-question-list');
      if (!list) return;
      list.replaceChildren();
      currentQuestionnaire().forEach((question, index) => {
        const item = document.createElement('article');
        item.className = `question-builder-item${question.active ? '' : ' is-disabled'}`;
        item.dataset.id = String(question.id);
        const order = document.createElement('span'); order.className = 'question-order'; order.textContent = String(index + 1);
        const content = document.createElement('div'); content.className = 'question-builder-content';
        const title = document.createElement('strong'); title.textContent = question.text;
        const meta = document.createElement('span'); meta.textContent = `${question.section} · ${typeLabels[question.type]} · ${question.required ? 'Obrigatória' : 'Opcional'}${question.condition ? ' · Condicional' : ''}`;
        content.append(title, meta);
        const actions = document.createElement('div'); actions.className = 'question-builder-actions';
        [['up','Subir','fa-arrow-up'],['down','Descer','fa-arrow-down'],['edit','Editar','fa-pencil'],['duplicate','Duplicar','fa-copy'],['toggle',question.active ? 'Desativar' : 'Ativar',question.active ? 'fa-toggle-on' : 'fa-toggle-off'],['delete','Excluir','fa-trash']].forEach(([action,label,icon]) => {
          const button = document.createElement('button'); button.type = 'button'; button.dataset.action = action; button.title = label; button.setAttribute('aria-label', label); button.innerHTML = `<i class="fa ${icon}"></i>`; actions.appendChild(button);
        });
        item.append(order, content, actions); list.appendChild(item);
      });
    }

    advancedQuestionType?.addEventListener('change', () => {
      advancedOptionsField?.classList.toggle('hidden', !['single', 'multiple'].includes(advancedQuestionType.value));
    });
    questionSystemFilter?.addEventListener('change', () => { resetAdvancedQuestionForm(); renderAdvancedQuestionList(); });
    document.getElementById('advanced-question-cancel')?.addEventListener('click', resetAdvancedQuestionForm);
    advancedQuestionForm?.addEventListener('submit', event => {
      event.preventDefault();
      const text = document.getElementById('advanced-question-text')?.value.trim();
      if (!text) return;
      const editId = Number(document.getElementById('question-edit-id')?.value || 0);
      const question = {
        id: editId || ++questionSequence,
        text,
        type: advancedQuestionType?.value || 'text',
        section: document.getElementById('advanced-question-section')?.value || 'Experiência geral',
        help: document.getElementById('advanced-question-help')?.value.trim() || '',
        options: (document.getElementById('advanced-question-options')?.value || '').split('\n').map(value => value.trim()).filter(Boolean),
        condition: document.getElementById('advanced-question-condition')?.value || '',
        required: Boolean(document.getElementById('advanced-question-required')?.checked),
        active: true
      };
      const questions = currentQuestionnaire();
      const position = questions.findIndex(item => item.id === editId);
      if (position >= 0) question.active = questions[position].active;
      if (position >= 0) questions[position] = question; else questions.push(question);
      setQuestionnaireDraft(); resetAdvancedQuestionForm(); renderAdvancedQuestionList();
    });
    document.getElementById('advanced-question-list')?.addEventListener('click', event => {
      const button = event.target.closest('button[data-action]');
      const item = event.target.closest('[data-id]');
      if (!button || !item) return;
      const questions = currentQuestionnaire();
      const index = questions.findIndex(question => question.id === Number(item.dataset.id));
      if (index < 0) return;
      const action = button.dataset.action;
      if (action === 'delete') questions.splice(index, 1);
      if (action === 'duplicate') questions.splice(index + 1, 0, { ...questions[index], id: ++questionSequence, text: `${questions[index].text} (cópia)` });
      if (action === 'toggle') questions[index].active = !questions[index].active;
      if (action === 'up' && index > 0) [questions[index - 1], questions[index]] = [questions[index], questions[index - 1]];
      if (action === 'down' && index < questions.length - 1) [questions[index + 1], questions[index]] = [questions[index], questions[index + 1]];
      if (action === 'edit') {
        const question = questions[index];
        document.getElementById('question-edit-id').value = String(question.id);
        document.getElementById('advanced-question-text').value = question.text;
        advancedQuestionType.value = question.type;
        document.getElementById('advanced-question-section').value = question.section;
        document.getElementById('advanced-question-help').value = question.help;
        document.getElementById('advanced-question-options').value = question.options.join('\n');
        document.getElementById('advanced-question-condition').value = question.condition;
        document.getElementById('advanced-question-required').checked = question.required;
        advancedOptionsField?.classList.toggle('hidden', !['single', 'multiple'].includes(question.type));
        document.getElementById('advanced-question-save-label').textContent = 'Salvar alterações';
        document.getElementById('advanced-question-cancel')?.classList.remove('hidden');
        advancedQuestionForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      setQuestionnaireDraft(); renderAdvancedQuestionList();
    });
    document.getElementById('question-preview-button')?.addEventListener('click', () => {
      const preview = document.getElementById('advanced-question-preview');
      const content = document.getElementById('advanced-question-preview-content');
      if (!preview || !content) return;
      content.replaceChildren();
      currentQuestionnaire().filter(question => question.active).forEach((question, index) => {
        const field = document.createElement('div'); field.className = 'preview-question';
        const label = document.createElement('strong'); label.textContent = `${index + 1}. ${question.text}${question.required ? ' *' : ''}`;
        field.appendChild(label);
        if (question.help) { const help = document.createElement('small'); help.textContent = question.help; field.appendChild(help); }
        if (question.type === 'longtext') { const input = document.createElement('textarea'); input.rows = 3; field.appendChild(input); }
        else if (question.type === 'text' || question.type === 'date') { const input = document.createElement('input'); input.type = question.type === 'date' ? 'date' : 'text'; field.appendChild(input); }
        else {
          const choices = document.createElement('div'); choices.className = 'preview-choices';
          const options = question.type === 'scale' ? ['1','2','3','4','5'] : question.type === 'yesno' ? ['Sim','Não'] : question.options;
          options.forEach(option => { const chip = document.createElement('span'); chip.textContent = option; choices.appendChild(chip); });
          field.appendChild(choices);
        }
        if (question.condition) { const condition = document.createElement('em'); condition.textContent = `Exibição condicional: ${question.condition}`; field.appendChild(condition); }
        content.appendChild(field);
      });
      preview.classList.remove('hidden');
      preview.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    document.getElementById('advanced-question-preview-close')?.addEventListener('click', () => document.getElementById('advanced-question-preview')?.classList.add('hidden'));
    document.getElementById('question-publish-button')?.addEventListener('click', () => {
      const status = document.getElementById('questionnaire-status');
      const feedback = document.getElementById('advanced-question-feedback');
      publishedQuestionnaireStore.set(questionSystemFilter?.value, currentQuestionnaire().map(question => ({ ...question, options: [...question.options] })));
      if (status) { status.textContent = `Versão ${new Date().toLocaleDateString('pt-BR')} publicada`; status.className = 'questionnaire-status published'; }
      if (feedback) { feedback.textContent = `Questionário de ${questionSystemFilter?.value} publicado com ${currentQuestionnaire().filter(question => question.active).length} perguntas ativas.`; feedback.classList.remove('hidden'); }
    });
    renderAdvancedQuestionList();

    function analyzeEvaluationProblem() {
      const description = (evaluationDescription?.value || '').toLowerCase();
      const selectedType = document.getElementById('evaluation-problem-type')?.value || '';
      let category = selectedType || 'Aguardando relato';
      if (/erro|trav|não abre|botão|falh/.test(description)) category = 'Erro técnico';
      else if (/lento|demor|carreg/.test(description)) category = 'Lentidão';
      else if (/leitor|teclado|contraste|acess/.test(description)) category = 'Barreira de acessibilidade';
      else if (/entend|confus|linguagem|texto/.test(description)) category = 'Conteúdo ou linguagem';
      const preventsCompletion = /não consegui|impediu|bloqueou|perdi|travou/.test(description);
      const priority = preventsCompletion || selectedType === 'Perda de dados' ? 'Crítica' : description.length > 100 ? 'Alta' : description.length > 20 ? 'Média' : '—';
      const categoryElement = document.getElementById('auto-category');
      const priorityElement = document.getElementById('auto-priority');
      if (categoryElement) categoryElement.textContent = category;
      if (priorityElement) {
        priorityElement.textContent = priority;
        priorityElement.className = priority === 'Crítica' ? 'is-critical' : priority === 'Alta' ? 'is-high' : '';
      }
    }
    evaluationDescription?.addEventListener('input', analyzeEvaluationProblem);
    document.getElementById('evaluation-problem-type')?.addEventListener('change', analyzeEvaluationProblem);

    document.getElementById('nav-track')?.addEventListener('click', event => {
      event.preventDefault();
      showOnlyPage(academicSessionUser ? pageEvaluationTracking : pageAcademicAccess);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.getElementById('tracking-form')?.addEventListener('submit', event => {
      event.preventDefault();
      const code = document.getElementById('tracking-protocol')?.value.trim();
      if (!code) return;
      const trackingCode = document.getElementById('tracking-code');
      const trackingSystem = document.getElementById('tracking-system');
      if (trackingCode) trackingCode.textContent = code.toUpperCase();
      if (trackingSystem) trackingSystem.textContent = selectedEvaluationSubject || 'Serviço digital do TJERJ';
      document.getElementById('tracking-result')?.classList.remove('hidden');
    });
    document.getElementById('evaluation-finish')?.addEventListener('click', () => {
      evaluationForm?.reset();
      selectedEvaluationSubject = '';
      selectedEvaluationGroup = '';
      if (evaluationDescriptionCount) evaluationDescriptionCount.textContent = '0';
      if (evaluationScreenshotName) evaluationScreenshotName.textContent = 'Nenhum arquivo selecionado. Demonstração sem envio real.';
      showOnlyPage(pageHome);
      document.getElementById('header-subnav')?.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const evaluationProfileForm = document.getElementById('evaluation-profile-form');
    const profileError = document.getElementById('profile-error');
    const profileCpf = document.getElementById('profile-cpf');
    const profileCep = document.getElementById('profile-cep');
    profileCpf?.addEventListener('input', event => {
      const digits = event.target.value.replace(/\D/g, '').slice(0, 11);
      event.target.value = digits.replace(/^(\d{3})(\d)/, '$1.$2').replace(/^(\d{3}\.\d{3})(\d)/, '$1.$2').replace(/^(\d{3}\.\d{3}\.\d{3})(\d{1,2})$/, '$1-$2');
    });
    profileCep?.addEventListener('input', event => {
      const digits = event.target.value.replace(/\D/g, '').slice(0, 8);
      event.target.value = digits.replace(/^(\d{5})(\d)/, '$1-$2');
    });

    function confirmDemonstrativeDocument(buttonId, inputId, labelId, filename) {
      document.getElementById(buttonId)?.addEventListener('click', () => {
        const input = document.getElementById(inputId);
        const label = document.getElementById(labelId);
        if (input) input.value = 'simulado';
        if (label) label.textContent = `${filename} — validado na demonstração`;
      });
    }
    confirmDemonstrativeDocument('profile-id-upload', 'profile-id-confirmed', 'profile-id-file', 'documento_identificacao.pdf');
    confirmDemonstrativeDocument('profile-address-upload', 'profile-address-confirmed', 'profile-address-file', 'comprovante_residencia.pdf');

    evaluationProfileForm?.addEventListener('submit', event => {
      event.preventDefault();
      const required = Array.from(evaluationProfileForm.querySelectorAll('[required]'));
      const invalid = required.find(field => !field.value.trim());
      profileError?.classList.toggle('hidden', !invalid);
      if (invalid) {
        invalid.focus();
        return;
      }
      evaluationProfile = {
        name: document.getElementById('profile-name')?.value.trim() || '',
        cpf: profileCpf?.value || '',
        cep: profileCep?.value || '',
        state: document.getElementById('profile-state')?.value || '',
        city: document.getElementById('profile-city')?.value.trim() || '',
        neighborhood: document.getElementById('profile-neighborhood')?.value.trim() || '',
        address: document.getElementById('profile-address')?.value.trim() || ''
      };
      const evaluationState = document.getElementById('evaluation-state');
      const evaluationCity = document.getElementById('evaluation-city');
      if (evaluationState) evaluationState.value = evaluationProfile.state === 'RJ' ? 'RJ' : 'outro';
      if (evaluationCity) evaluationCity.value = evaluationProfile.city;
      showOnlyPage(pageHome);
      document.getElementById('header-subnav')?.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    syncAuthorGuidanceVisibility();
    if (authorForm) {
      new MutationObserver(syncAuthorGuidanceVisibility).observe(authorForm, {
        attributes: true,
        attributeFilter: ['class']
      });
    }

    // GOV.BR Page Elements
    const govbrWrapper = document.getElementById('govbr-wrapper');
    const reqContinueBtn = document.getElementById('req-continue-btn');
    const govbrLogoBack = document.getElementById('govbr-logo-back');
    const govbrCpfInput = document.getElementById('govbr-cpf-input');
    const govbrLoginForm = document.getElementById('govbr-login-form');
    const govbrSubmitBtn = document.getElementById('govbr-submit-btn');

    // Saved Complaints Modal Elements
    const savedComplaintsModal = document.getElementById('saved-complaints-modal');
    const savedModalCloseBtn = document.getElementById('saved-modal-close-btn');
    const savedModalBtnNew = document.getElementById('saved-modal-btn-new');
    const savedContinueBtns = document.querySelectorAll('.saved-continue-btn');

    let currentSelectedCardIndex = null;
    let modalSelectionMode = 'legacy';
    // Mantida no escopo principal porque a lista também é usada na prévia da
    // petição e na limpeza final do fluxo.
    let witnessesArray = [];

    // Inicia o formulário diretamente, sem etapa de autenticação.
    if (reqContinueBtn) {
      reqContinueBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showOnlyPage(pageAuthorQualification);
        const subNav = document.getElementById('header-subnav');
        if (subNav) subNav.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Acesso e cadastro demonstrativos: os dados existem apenas durante esta
    // execução da página e não são enviados nem gravados no navegador.
    const academicTabLogin = document.getElementById('academic-tab-login');
    const academicTabRegister = document.getElementById('academic-tab-register');
    const academicLoginForm = document.getElementById('academic-login-form');
    const academicRegisterForm = document.getElementById('academic-register-form');
    const academicTriageForm = document.getElementById('academic-triage-form');
    const academicTriageResult = document.getElementById('academic-triage-result');
    const academicTriageContinue = document.getElementById('academic-triage-continue');
    const academicTriageEvaluate = document.getElementById('academic-triage-evaluate');
    const academicTriageBack = document.getElementById('academic-triage-back');
    let academicSessionUser = null;

    function selectAcademicAuthTab(mode) {
      const isLogin = mode === 'login';
      academicLoginForm?.classList.toggle('hidden', !isLogin);
      academicRegisterForm?.classList.toggle('hidden', isLogin);
      academicTabLogin?.classList.toggle('is-active', isLogin);
      academicTabRegister?.classList.toggle('is-active', !isLogin);
      academicTabLogin?.setAttribute('aria-selected', String(isLogin));
      academicTabRegister?.setAttribute('aria-selected', String(!isLogin));
    }

    academicTabLogin?.addEventListener('click', () => selectAcademicAuthTab('login'));
    academicTabRegister?.addEventListener('click', () => selectAcademicAuthTab('register'));

    function openAcademicTriage() {
      const profileName = document.getElementById('profile-name');
      if (profileName && academicSessionUser?.name) profileName.value = academicSessionUser.name;
      showOnlyPage(pageEvaluationProfile);
      document.getElementById('header-subnav')?.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    academicLoginForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      academicSessionUser = {
        email: document.getElementById('academic-login-email')?.value || '',
        source: 'login'
      };
      openAcademicTriage();
    });

    academicRegisterForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      academicSessionUser = {
        name: document.getElementById('academic-register-name')?.value || '',
        email: document.getElementById('academic-register-email')?.value || '',
        source: 'register'
      };
      const headerName = document.querySelector('[data-template-id="header-user-name"]');
      if (headerName && academicSessionUser.name) {
        headerName.textContent = academicSessionUser.name;
      }
      openAcademicTriage();
    });

    academicTriageBack?.addEventListener('click', () => {
      showOnlyPage(pageAcademicAccess);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    academicTriageForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(academicTriageForm);
      const needsSpecializedHelp = data.get('triage-age') === 'nao' ||
        data.get('triage-state') === 'nao' ||
        data.get('triage-value') === 'nao' ||
        data.get('triage-existing') === 'sim';
      const lacksDocuments = data.get('triage-docs') === 'nao';

      academicTriageResult.classList.remove('hidden', 'is-attention', 'is-ready');
      academicTriageResult.classList.add(needsSpecializedHelp ? 'is-attention' : 'is-ready');
      academicTriageResult.innerHTML = needsSpecializedHelp
        ? '<strong>Vale buscar orientação especializada.</strong><span>Algumas respostas indicam que o atendimento pode exigir uma análise específica. Você ainda pode conhecer o fluxo e preparar suas informações.</span>'
        : `<strong>Sua situação pode seguir para preparação.</strong><span>${lacksDocuments ? 'Você poderá identificar no checklist quais documentos ainda precisa reunir.' : 'Continue para escolher o assunto e organizar os documentos disponíveis.'}</span>`;
      academicTriageEvaluate.classList.add('hidden');
      academicTriageContinue.classList.remove('hidden');
    });

    academicTriageContinue?.addEventListener('click', () => {
      showOnlyPage(pageHome);
      document.getElementById('header-subnav')?.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Go back from GOV.BR Logo
    if (govbrLogoBack) {
      govbrLogoBack.addEventListener('click', () => {
        govbrWrapper.classList.add('hidden');
        appWrapper.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // CEP Auto-fill simulation
    const cepInput = document.getElementById('auth-cep');
    if (cepInput) {
      cepInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 8) val = val.slice(0, 8);
        if (val.length > 5) {
          val = val.replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
        }
        e.target.value = val;

        if (val.length === 9) {
          document.getElementById('auth-rua').value = 'Rua da Assembleia';
          document.getElementById('auth-bairro').value = 'Centro';
          document.getElementById('auth-cidade').value = 'Rio de Janeiro';
          document.getElementById('auth-estado').value = 'RJ';
        }
      });
    }

    // Currency Formatter Helper
    function formatBRL(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (!value) {
        e.target.value = '';
        return;
      }
      let number = parseFloat(value) / 100;
      e.target.value = number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function updateDefendantDropdown() {
      const dropdown = document.getElementById('def-concessionaria-dropdown');
      const label = document.querySelector('[data-template-id="lbl-def-concessionaria"]');
      const span = document.getElementById('def-concessionaria-span');
      const input = document.getElementById('def-concessionaria');
      const cnpjInput = document.getElementById('def-cnpj');

      if (!dropdown) return;

      const configurations = {
        1: {
          label: 'Indique a Concessionária do serviço público *',
          placeholder: 'Campo obrigatório',
          options: [
            { value: 'aguas-niteroi', text: 'ÁGUAS DE NITEROI', cnpj: '02.150.336/0001-66' },
            { value: 'aguas-imperador', text: 'ÁGUAS DO IMPERADOR', cnpj: '83.200.006/0001-30' },
            { value: 'aguas-rio', text: 'ÁGUAS DO RIO', cnpj: '41.979.866/0001-20' },
            { value: 'cedae', text: 'CEDAE', cnpj: '33.393.875/0001-10' },
            { value: 'claro', text: 'CLARO', cnpj: '40.432.544/0001-47' }
          ]
        },
        5: {
          label: 'Indique o(a) responsável pela sua inscrição indevida em cadastro de devedores *',
          placeholder: 'Campo obrigatório',
          options: [
            { value: '99pay', text: '99PAY INSTITUIÇÃO DE PAGAMENTO SA', cnpj: '24.313.102/0001-25' },
            { value: 'aguas-niteroi', text: 'ÁGUAS DE NITEROI', cnpj: '02.150.336/0001-66' },
            { value: 'aguas-imperador', text: 'ÁGUAS DO IMPERADOR', cnpj: '83.200.006/0001-30' },
            { value: 'ame-digital', text: 'AME DIGITAL', cnpj: '32.778.350/0001-70' },
            { value: 'banco-abc-brasil', text: 'BANCO ABC BRASIL', cnpj: '' }
          ]
        },
        6: {
          label: 'Indique a Concessionária responsável pela cobrança reclamada e apontamento de irregularidade (TOI etc): *',
          placeholder: 'Campo obrigatório',
          options: [
            { value: 'aguas-imperador', text: 'ÁGUAS DO IMPERADOR', cnpj: '83.200.006/0001-30' },
            { value: 'aguas-rio', text: 'ÁGUAS DO RIO', cnpj: '41.979.866/0001-20' },
            { value: 'enel', text: 'ENEL', cnpj: '33.050.071/0001-58' },
            { value: 'light', text: 'LIGHT', cnpj: '60.444.437/0001-46' },
            { value: 'naturgy', text: 'NATURGY', cnpj: '' }
          ]
        }
      };

      const config = configurations[currentSelectedCardIndex] || configurations[1];

      if (label) label.textContent = config.label;
      if (input) input.value = '';
      if (cnpjInput) cnpjInput.value = '';

      if (span) {
        span.textContent = config.placeholder;
        span.classList.remove('text-gray-500', 'text-gray-800');
        span.classList.add('text-gray-400');
      }

      dropdown.innerHTML = config.options.map(option => `
        <button
          type="button"
          class="w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-slate-50 transition"
          data-value="${option.value}"
          data-cnpj="${option.cnpj}">
          ${option.text}
        </button>
      `).join('');

      dropdown.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
          const value = button.dataset.value || '';
          const cnpj = button.dataset.cnpj || '';
          const text = button.textContent.trim();

          if (input) input.value = value;
          if (cnpjInput) cnpjInput.value = cnpj;

          if (span) {
            span.textContent = text;
            span.classList.remove('text-gray-400', 'text-gray-500');
            span.classList.add('text-gray-800');
          }

          dropdown.classList.add('hidden');
        });
      });
    }

    const damageValueInput = document.getElementById('damage-value');
    if (damageValueInput) damageValueInput.addEventListener('input', formatBRL);

    const moralValueInput = document.getElementById('moral-value');
    if (moralValueInput) moralValueInput.addEventListener('input', formatBRL);

    const reqMaterialValInput = document.getElementById('req-material-val');
    if (reqMaterialValInput) reqMaterialValInput.addEventListener('input', formatBRL);

    const reqMoralValInput = document.getElementById('req-moral-val');
    if (reqMoralValInput) reqMoralValInput.addEventListener('input', formatBRL);

    // Custom dropdown Estado Civil behavior
    const authCivilBtn = document.getElementById('auth-civil-btn');
    const authCivilDropdown = document.getElementById('auth-civil-dropdown');
    const authCivilSpan = document.getElementById('auth-civil-span');
    const authCivilInput = document.getElementById('auth-civil');

    if (authCivilBtn && authCivilDropdown) {
      authCivilBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        authCivilDropdown.classList.toggle('hidden');
        if (authProfissaoDropdown) authProfissaoDropdown.classList.add('hidden');
        if (authNascimentoDropdown) authNascimentoDropdown.classList.add('hidden');
      });

      authCivilDropdown.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const value = btn.getAttribute('data-value');
          const text = btn.textContent;
          authCivilInput.value = value;
          authCivilSpan.textContent = text;
          authCivilSpan.classList.remove('text-gray-500');
          authCivilSpan.classList.add('text-gray-800');
          authCivilDropdown.classList.add('hidden');
        });
      });

      document.addEventListener('click', (e) => {
        if (!authCivilDropdown.classList.contains('hidden') && !e.target.closest('#auth-civil-btn') && !e.target.closest('#auth-civil-dropdown')) {
          authCivilDropdown.classList.add('hidden');
        }
      });
    }

    // Custom dropdown Profissão behavior
    const authProfissaoBtn = document.getElementById('auth-profissao-btn');
    const authProfissaoDropdown = document.getElementById('auth-profissao-dropdown');
    const authProfissaoSpan = document.getElementById('auth-profissao-span');
    const authProfissaoInput = document.getElementById('auth-profissao');
    const authProfissaoSearch = document.getElementById('auth-profissao-search');
    const authProfissaoList = document.getElementById('auth-profissao-list');

    if (authProfissaoBtn && authProfissaoDropdown) {
      authProfissaoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        authProfissaoDropdown.classList.toggle('hidden');
        if (authCivilDropdown) authCivilDropdown.classList.add('hidden');
        if (authNascimentoDropdown) authNascimentoDropdown.classList.add('hidden');
        if (!authProfissaoDropdown.classList.contains('hidden')) {
          authProfissaoSearch.focus();
        }
      });

      // Filter logic
      authProfissaoSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const btns = authProfissaoList.querySelectorAll('button');
        btns.forEach(btn => {
          const text = btn.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          btn.style.display = text.includes(query) ? '' : 'none';
        });
      });

      authProfissaoList.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const value = btn.getAttribute('data-value');
          const text = btn.textContent;
          authProfissaoInput.value = value;
          authProfissaoSpan.textContent = text;
          authProfissaoSpan.classList.remove('text-gray-500');
          authProfissaoSpan.classList.add('text-gray-800');
          authProfissaoDropdown.classList.add('hidden');
        });
      });

      document.addEventListener('click', (e) => {
        if (!authProfissaoDropdown.classList.contains('hidden') && !e.target.closest('#auth-profissao-btn') && !e.target.closest('#auth-profissao-dropdown')) {
          authProfissaoDropdown.classList.add('hidden');
        }
      });
    }

    // Custom dropdown País de Nascimento behavior
    const authNascimentoBtn = document.getElementById('auth-nascimento-btn');
    const authNascimentoDropdown = document.getElementById('auth-nascimento-dropdown');
    const authNascimentoSpan = document.getElementById('auth-nascimento-span');
    const authNascimentoInput = document.getElementById('auth-nascimento');
    const authNascimentoSearch = document.getElementById('auth-nascimento-search');
    const authNascimentoList = document.getElementById('auth-nascimento-list');

    if (authNascimentoBtn && authNascimentoDropdown) {
      authNascimentoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        authNascimentoDropdown.classList.toggle('hidden');
        if (authCivilDropdown) authCivilDropdown.classList.add('hidden');
        if (authProfissaoDropdown) authProfissaoDropdown.classList.add('hidden');
        if (!authNascimentoDropdown.classList.contains('hidden')) {
          authNascimentoSearch.focus();
        }
      });

      // Filter logic
      authNascimentoSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const btns = authNascimentoList.querySelectorAll('button');
        btns.forEach(btn => {
          const text = btn.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          btn.style.display = text.includes(query) ? '' : 'none';
        });
      });

      authNascimentoList.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const value = btn.getAttribute('data-value');
          const text = btn.textContent;
          authNascimentoInput.value = value;
          authNascimentoSpan.textContent = text;
          authNascimentoSpan.classList.remove('text-gray-500');
          authNascimentoSpan.classList.add('text-gray-800');
          authNascimentoDropdown.classList.add('hidden');
        });
      });

      document.addEventListener('click', (e) => {
        if (!authNascimentoDropdown.classList.contains('hidden') && !e.target.closest('#auth-nascimento-btn') && !e.target.closest('#auth-nascimento-dropdown')) {
          authNascimentoDropdown.classList.add('hidden');
        }
      });
    }

    // Dummy Upload Simulation
    document.querySelectorAll('.upload-dummy-btn').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const indicator = btn.parentElement.querySelector('.file-name-indicator');
        if (indicator) {
          indicator.textContent = index === 0 ? 'comprovante_residencia.pdf (1.2 MB)' : 'documento_identidade.jpg (850 KB)';
          indicator.classList.remove('hidden');
          indicator.classList.add('text-green-600', 'font-semibold');
        }
      });
    });

    // Back to saved list button listener
    const btnBackAuthorList = document.getElementById('btn-back-author-list');
    if (btnBackAuthorList) {
      btnBackAuthorList.addEventListener('click', (e) => {
        e.preventDefault();
        if (savedComplaintsModal) {
          savedComplaintsModal.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }
      });
    }

    // Elements for Summary View
    const authorSummary = document.getElementById('author-summary');
    const btnEditAuthor = document.getElementById('btn-edit-author');
    const btnToggleDetails = document.getElementById('btn-toggle-details');
    const detailsChevron = document.getElementById('details-chevron');
    const summaryDetailsPanel = document.getElementById('summary-details-panel');
    const btnAddNewAuthor = document.getElementById('btn-add-new-author');
    const btnSummaryContinue = document.getElementById('btn-summary-continue');

    function closeAuthorDetails() {
      if (!summaryDetailsPanel) return;
      summaryDetailsPanel.classList.add('hidden');
      if (detailsChevron) detailsChevron.style.transform = 'rotate(-90deg)';
      if (btnToggleDetails) btnToggleDetails.setAttribute('aria-expanded', 'false');
    }

    closeAuthorDetails();
    if (pageAuthorQualification) {
      new MutationObserver(() => {
        if (!pageAuthorQualification.classList.contains('hidden')) closeAuthorDetails();
      }).observe(pageAuthorQualification, { attributes: true, attributeFilter: ['class'] });
    }

    function resetDefendantQualificationState() {
      const serviceForm = document.getElementById('defendant-form');
      const productForm = document.getElementById('defendant-form-vicio');
      const flightForm = document.getElementById('defendant-form-voo');
      const trafficForm = document.getElementById('defendant-form-transito');
      const summary = document.getElementById('defendant-summary');

      [serviceForm, productForm, flightForm, trafficForm].forEach(form => {
        if (form) {
          form.reset();
          form.classList.add('hidden');
        }
      });
      if (summary) summary.classList.add('hidden');

      const fieldsToClear = [
        'def-concessionaria',
        'def-cnpj',
        'def-fabricante',
        'def-cnpj-fabricante',
        'def-vendedor',
        'def-cnpj-vendedor',
        'def-voo-vendedora',
        'def-voo-vendedora-cnpj',
        'def-voo-operadora',
        'def-voo-operadora-cnpj',
        'def-transito-cnpj',
        'def-transito-cpf',
        'def-transito-nome-empresarial',
        'def-transito-nome',
        'def-transito-cep',
        'def-transito-rua',
        'def-transito-numero',
        'def-transito-complemento',
        'def-transito-bairro',
        'def-transito-cidade',
        'def-transito-estado'
      ];
      fieldsToClear.forEach(id => {
        const field = document.getElementById(id);
        if (field) field.value = '';
      });

      [
        ['def-concessionaria-span', 'Selecione...'],
        ['def-fabricante-span', 'Selecione...'],
        ['def-vendedor-span', 'Selecione...']
      ].forEach(([id, text]) => {
        const span = document.getElementById(id);
        if (span) {
          span.textContent = text;
          span.className = 'text-gray-500';
        }
      });

      [
        'def-concessionaria-dropdown',
        'def-fabricante-dropdown',
        'def-vendedor-dropdown',
        'vicio-fabricante-container',
        'vicio-vendedor-container'
      ].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.classList.add('hidden');
      });

      [
        'def-fabricante-search',
        'def-vendedor-search'
      ].forEach(id => {
        const search = document.getElementById(id);
        if (search) search.value = '';
      });

      [
        'def-summary-concessionaria',
        'def-summary-cnpj',
        'def-summary-fabricante',
        'def-summary-cnpj-fab',
        'def-summary-vendedor',
        'def-summary-cnpj-vend',
        'def-summary-voo-vendedora',
        'def-summary-voo-vendedora-cnpj',
        'def-summary-voo-operadora',
        'def-summary-voo-operadora-cnpj',
        'def-summary-transito-nome',
        'def-summary-transito-doc',
        'def-summary-transito-endereco'
      ].forEach(id => {
        const value = document.getElementById(id);
        if (value) value.textContent = '-';
      });

      const selectedType = document.getElementById('transito-selected-type');
      if (selectedType) selectedType.value = 'empresa';
      const companyFields = document.getElementById('transito-empresa-fields');
      const personFields = document.getElementById('transito-pessoa-fields');
      if (companyFields) companyFields.classList.remove('hidden');
      if (personFields) personFields.classList.add('hidden');

      if (currentSelectedCardIndex === 2) {
        if (productForm) productForm.classList.remove('hidden');
      } else if (currentSelectedCardIndex === 3) {
        if (flightForm) flightForm.classList.remove('hidden');
      } else if (currentSelectedCardIndex === 4) {
        if (trafficForm) trafficForm.classList.remove('hidden');
      } else if ([1, 5, 6].includes(currentSelectedCardIndex)) {
        if (serviceForm) serviceForm.classList.remove('hidden');
        updateDefendantDropdown();
      }
      window.setTimeout(() => {
        applySimplifiedFormCopy();
        syncGuidedChoices();
      }, 0);
    }

    // Garante que o formulário correto seja exibido em qualquer caminho que abra
    // a etapa de qualificação do réu (avanço, voltar ou edição).
    if (pageDefendantQualification) {
      const defendantPageObserver = new MutationObserver(() => {
        if (!pageDefendantQualification.classList.contains('hidden')) {
          resetDefendantQualificationState();
          const backContainer = document.getElementById('def-back-btn-container');
          if (backContainer) backContainer.classList.remove('hidden');
        }
      });
      defendantPageObserver.observe(pageDefendantQualification, {
        attributes: true,
        attributeFilter: ['class']
      });
    }

    // Toggle Details function
    if (btnToggleDetails) {
      btnToggleDetails.addEventListener('click', () => {
        const isHidden = summaryDetailsPanel.classList.toggle('hidden');
        btnToggleDetails.setAttribute('aria-expanded', String(!isHidden));
        if (isHidden) {
          detailsChevron.style.transform = 'rotate(-90deg)';
        } else {
          detailsChevron.style.transform = 'rotate(0deg)';
        }
      });
    }

    // Edit Author function
    if (btnEditAuthor) {
      btnEditAuthor.addEventListener('click', () => {
        authorSummary.classList.add('hidden');
        authorForm.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Add New Author simulation (reset form)
    if (btnAddNewAuthor) {
      btnAddNewAuthor.addEventListener('click', () => {
        authorForm.reset();
        // Restore default email value
        const emailInput = document.getElementById('auth-email');
        if (emailInput) emailInput.value = 'contato@exemplo.com.br';
        // Clear custom selectors
        document.getElementById('auth-civil-span').textContent = 'Selecione...';
        document.getElementById('auth-civil-span').className = 'text-gray-500';
        document.getElementById('auth-civil').value = '';
        document.getElementById('auth-profissao-span').textContent = 'Selecione...';
        document.getElementById('auth-profissao-span').className = 'text-gray-500';
        document.getElementById('auth-profissao').value = '';
        // Clear file upload indicators
        document.querySelectorAll('.file-name-indicator').forEach(ind => {
          ind.classList.add('hidden');
          ind.textContent = 'Nenhum arquivo selecionado';
        });

        authorSummary.classList.add('hidden');
        authorForm.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Summary Continue Button Action (Go to Defendant Page instead of directly back to Home)
    if (btnSummaryContinue) {
      btnSummaryContinue.addEventListener('click', () => {
        resetDefendantQualificationState();
        pageAuthorQualification.classList.add('hidden');
        pageDefendantQualification.classList.remove('hidden');

        const defForm = document.getElementById('defendant-form');
        const defFormVicio = document.getElementById('defendant-form-vicio');
        const defFormVoo = document.getElementById('defendant-form-voo');
        const defFormTransito = document.getElementById('defendant-form-transito');

        // Esconde todos antes de mostrar somente o formulário da categoria escolhida.
        if (defForm) defForm.classList.add('hidden');
        if (defFormVicio) defFormVicio.classList.add('hidden');
        if (defFormVoo) defFormVoo.classList.add('hidden');
        if (defFormTransito) defFormTransito.classList.add('hidden');

        if (currentSelectedCardIndex === 2) {
          if (defFormVicio) defFormVicio.classList.remove('hidden');
        } else if (currentSelectedCardIndex === 3) {
          if (defFormVoo) defFormVoo.classList.remove('hidden');
        } else if (currentSelectedCardIndex === 4) {
          if (defFormTransito) defFormTransito.classList.remove('hidden');
        } else if ([1, 5, 6].includes(currentSelectedCardIndex)) {
          if (defForm) defForm.classList.remove('hidden');
          updateDefendantDropdown();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Defendant Page Interactivity
    const defConcessionariaBtn = document.getElementById('def-concessionaria-btn');
    const defConcessionariaDropdown = document.getElementById('def-concessionaria-dropdown');
    const defConcessionariaSpan = document.getElementById('def-concessionaria-span');
    const defConcessionariaInput = document.getElementById('def-concessionaria');
    const defCnpjInput = document.getElementById('def-cnpj');
    const defBackBtn = document.getElementById('def-back-btn');

    if (defConcessionariaBtn && defConcessionariaDropdown) {
      defConcessionariaBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        defConcessionariaDropdown.classList.toggle('hidden');
      });

      defConcessionariaDropdown.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const value = btn.getAttribute('data-value');
          const text = btn.textContent;
          const cnpj = btn.getAttribute('data-cnpj');
          
          defConcessionariaInput.value = value;
          defConcessionariaSpan.textContent = text;
          defConcessionariaSpan.classList.remove('text-gray-500');
          defConcessionariaSpan.classList.add('text-gray-800');
          
          defCnpjInput.value = cnpj;
          
          defConcessionariaDropdown.classList.add('hidden');
        });
      });

      document.addEventListener('click', (e) => {
        if (!defConcessionariaDropdown.classList.contains('hidden') && !e.target.closest('#def-concessionaria-btn') && !e.target.closest('#def-concessionaria-dropdown')) {
          defConcessionariaDropdown.classList.add('hidden');
        }
      });
    }

    if (defBackBtn) {
      defBackBtn.addEventListener('click', (e) => {
        e.preventDefault();
        pageDefendantQualification.classList.add('hidden');
        pageAuthorQualification.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    const defendantSummary = document.getElementById('defendant-summary');
    const defSummaryConcessionaria = document.getElementById('def-summary-concessionaria');
    const defSummaryCnpj = document.getElementById('def-summary-cnpj');
    const btnEditDefendant = document.getElementById('btn-edit-defendant');
    const btnAddNewDefendant = document.getElementById('btn-add-new-defendant');
    const btnDefSummaryBack = document.getElementById('btn-def-summary-back');
    const btnDefSummaryContinue = document.getElementById('btn-def-summary-continue');
    const defBackBtnContainer = document.getElementById('def-back-btn-container');

    if (defendantForm) {
      defendantForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedConcessionaria = defConcessionariaSpan.textContent;
        const selectedCnpj = defCnpjInput.value;

        if (!defConcessionariaInput.value) {
          showNotification('Aviso', 'Por favor, selecione uma concessionária.', true);
          return;
        }

        // Populate summary elements
        if (defSummaryConcessionaria) defSummaryConcessionaria.textContent = selectedConcessionaria;
        if (defSummaryCnpj) defSummaryCnpj.textContent = selectedCnpj;

        // Toggle summary details visibility
        document.getElementById('def-summary-service-details').classList.remove('hidden');
        document.getElementById('def-summary-vicio-details').classList.add('hidden');
        document.getElementById('def-summary-transito-details').classList.add('hidden');
        document.getElementById('def-summary-voo-details').classList.add('hidden');

        // Show summary and hide form
        defendantForm.classList.add('hidden');
        if (defBackBtnContainer) defBackBtnContainer.classList.add('hidden');
        if (defendantSummary) defendantSummary.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    const defendantFormVicio = document.getElementById('defendant-form-vicio');
    
    // Toggle condicional para Fabricante (Vício do Produto)
    const claimFabricanteRadios = document.getElementsByName('claim-fabricante');
    const vicioFabricanteContainer = document.getElementById('vicio-fabricante-container');
    const defFabricanteInput = document.getElementById('def-fabricante');
    const defCnpjFabricanteInput = document.getElementById('def-cnpj-fabricante');
    const defFabricanteSpan = document.getElementById('def-fabricante-span');
    
    if (claimFabricanteRadios) {
      claimFabricanteRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.value === 'sim') {
            vicioFabricanteContainer.classList.remove('hidden');
            if (defFabricanteInput) defFabricanteInput.setAttribute('required', 'true');
          } else {
            vicioFabricanteContainer.classList.add('hidden');
            if (defFabricanteInput) {
              defFabricanteInput.removeAttribute('required');
              defFabricanteInput.value = '';
            }
            if (defCnpjFabricanteInput) defCnpjFabricanteInput.value = '';
            if (defFabricanteSpan) {
              defFabricanteSpan.textContent = 'Selecione...';
              defFabricanteSpan.className = 'text-gray-500';
            }
          }
        });
      });
    }

    // Toggle condicional para Vendedor (Vício do Produto)
    const claimVendedorRadios = document.getElementsByName('claim-vendedor');
    const vicioVendedorContainer = document.getElementById('vicio-vendedor-container');
    const defVendedorInput = document.getElementById('def-vendedor');
    const defCnpjVendedorInput = document.getElementById('def-cnpj-vendedor');
    const defVendedorSpan = document.getElementById('def-vendedor-span');
    
    if (claimVendedorRadios) {
      claimVendedorRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.value === 'sim') {
            vicioVendedorContainer.classList.remove('hidden');
            if (defVendedorInput) defVendedorInput.setAttribute('required', 'true');
          } else {
            vicioVendedorContainer.classList.add('hidden');
            if (defVendedorInput) {
              defVendedorInput.removeAttribute('required');
              defVendedorInput.value = '';
            }
            if (defCnpjVendedorInput) defCnpjVendedorInput.value = '';
            if (defVendedorSpan) {
              defVendedorSpan.textContent = 'Selecione...';
              defVendedorSpan.className = 'text-gray-500';
            }
          }
        });
      });
    }

    // Searchable dropdown Fabricante
    const defFabricanteBtn = document.getElementById('def-fabricante-btn');
    const defFabricanteDropdown = document.getElementById('def-fabricante-dropdown');
    const defFabricanteSearch = document.getElementById('def-fabricante-search');
    const defFabricanteList = document.getElementById('def-fabricante-list');
    
    if (defFabricanteBtn && defFabricanteDropdown) {
      defFabricanteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        defFabricanteDropdown.classList.toggle('hidden');
        if (defVendedorDropdown) defVendedorDropdown.classList.add('hidden');
        if (!defFabricanteDropdown.classList.contains('hidden') && defFabricanteSearch) {
          defFabricanteSearch.focus();
        }
      });
      
      if (defFabricanteSearch) {
        defFabricanteSearch.addEventListener('input', (e) => {
          const query = e.target.value.toLowerCase();
          const btns = defFabricanteList.querySelectorAll('button');
          btns.forEach(btn => {
            const text = btn.textContent.toLowerCase();
            btn.style.display = text.includes(query) ? '' : 'none';
          });
        });
      }
      
      defFabricanteList.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          const val = btn.getAttribute('data-value');
          const cnpj = btn.getAttribute('data-cnpj');
          if (defFabricanteInput) defFabricanteInput.value = val;
          if (defCnpjFabricanteInput) defCnpjFabricanteInput.value = cnpj;
          if (defFabricanteSpan) {
            defFabricanteSpan.textContent = val;
            defFabricanteSpan.className = 'text-gray-800';
          }
          defFabricanteDropdown.classList.add('hidden');
        });
      });
    }

    // Searchable dropdown Vendedor
    const defVendedorBtn = document.getElementById('def-vendedor-btn');
    const defVendedorDropdown = document.getElementById('def-vendedor-dropdown');
    const defVendedorSearch = document.getElementById('def-vendedor-search');
    const defVendedorList = document.getElementById('def-vendedor-list');
    
    if (defVendedorBtn && defVendedorDropdown) {
      defVendedorBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        defVendedorDropdown.classList.toggle('hidden');
        if (defFabricanteDropdown) defFabricanteDropdown.classList.add('hidden');
        if (!defVendedorDropdown.classList.contains('hidden') && defVendedorSearch) {
          defVendedorSearch.focus();
        }
      });
      
      if (defVendedorSearch) {
        defVendedorSearch.addEventListener('input', (e) => {
          const query = e.target.value.toLowerCase();
          const btns = defVendedorList.querySelectorAll('button');
          btns.forEach(btn => {
            const text = btn.textContent.toLowerCase();
            btn.style.display = text.includes(query) ? '' : 'none';
          });
        });
      }
      
      defVendedorList.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          const val = btn.getAttribute('data-value');
          const cnpj = btn.getAttribute('data-cnpj');
          if (defVendedorInput) defVendedorInput.value = val;
          if (defCnpjVendedorInput) defCnpjVendedorInput.value = cnpj;
          if (defVendedorSpan) {
            defVendedorSpan.textContent = val;
            defVendedorSpan.className = 'text-gray-800';
          }
          defVendedorDropdown.classList.add('hidden');
        });
      });
    }

    // Close on outer clicks
    document.addEventListener('click', (e) => {
      if (defFabricanteDropdown && !defFabricanteDropdown.classList.contains('hidden') && !e.target.closest('#def-fabricante-btn') && !e.target.closest('#def-fabricante-dropdown')) {
        defFabricanteDropdown.classList.add('hidden');
      }
      if (defVendedorDropdown && !defVendedorDropdown.classList.contains('hidden') && !e.target.closest('#def-vendedor-btn') && !e.target.closest('#def-vendedor-dropdown')) {
        defVendedorDropdown.classList.add('hidden');
      }
    });

    if (defendantFormVicio) {
      defendantFormVicio.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isFabricanteActive = document.querySelector('input[name="claim-fabricante"]:checked')?.value === 'sim';
        const isVendedorActive = document.querySelector('input[name="claim-vendedor"]:checked')?.value === 'sim';

        if (!isFabricanteActive && !isVendedorActive) {
          showNotification('Aviso', 'Selecione pelo menos um réu (Fabricante ou Vendedor) para continuar.', true);
          return;
        }

        const fabricanteVal = document.getElementById('def-fabricante').value;
        const vendedorVal = document.getElementById('def-vendedor').value;

        if (isFabricanteActive && !fabricanteVal) {
          showNotification('Campo Obrigatório', 'Selecione o Fabricante do Produto.', true);
          return;
        }

        if (isVendedorActive && !vendedorVal) {
          showNotification('Campo Obrigatório', 'Selecione o Vendedor do Produto.', true);
          return;
        }
        
        const fabricante = isFabricanteActive ? fabricanteVal : 'Não reclamado';
        const cnpjFab = isFabricanteActive ? (document.getElementById('def-cnpj-fabricante').value || 'Não informado') : '-';
        const vendedor = isVendedorActive ? vendedorVal : 'Não reclamado';
        const cnpjVend = isVendedorActive ? (document.getElementById('def-cnpj-vendedor').value || 'Não informado') : '-';

        document.getElementById('def-summary-fabricante').textContent = fabricante;
        document.getElementById('def-summary-cnpj-fab').textContent = cnpjFab;
        document.getElementById('def-summary-vendedor').textContent = vendedor;
        document.getElementById('def-summary-cnpj-vend').textContent = cnpjVend;

        // Toggle summary details visibility
        document.getElementById('def-summary-service-details').classList.add('hidden');
        document.getElementById('def-summary-transito-details').classList.add('hidden');
        document.getElementById('def-summary-voo-details').classList.add('hidden');
        document.getElementById('def-summary-vicio-details').classList.remove('hidden');

        defendantFormVicio.classList.add('hidden');
        if (defBackBtnContainer) defBackBtnContainer.classList.add('hidden');
        if (defendantSummary) defendantSummary.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Traffic Accident Defendant Form behavior
    const btnTransitoEmpresa = document.getElementById('transito-type-empresa');
    const btnTransitoPessoa = document.getElementById('transito-type-pessoa');
    const transitoSelectedType = document.getElementById('transito-selected-type');
    const transitoEmpresaFields = document.getElementById('transito-empresa-fields');
    const transitoPessoaFields = document.getElementById('transito-pessoa-fields');

    if (btnTransitoEmpresa && btnTransitoPessoa) {
      btnTransitoEmpresa.addEventListener('click', () => {
        transitoSelectedType.value = 'empresa';
        btnTransitoEmpresa.className = 'flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 bg-blue-600 text-white transition';
        btnTransitoPessoa.className = 'flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 bg-white text-blue-600 transition';
        transitoEmpresaFields.classList.remove('hidden');
        transitoPessoaFields.classList.add('hidden');
        
        // Mark fields required/optional
        document.getElementById('def-transito-cnpj').setAttribute('required', 'true');
        document.getElementById('def-transito-nome-empresarial').setAttribute('required', 'true');

        document.getElementById('def-transito-cpf').removeAttribute('required');
        document.getElementById('def-transito-nome').removeAttribute('required');
        document.getElementById('def-transito-cep').removeAttribute('required');
        document.getElementById('def-transito-rua').removeAttribute('required');
        document.getElementById('def-transito-numero').removeAttribute('required');
        document.getElementById('def-transito-bairro').removeAttribute('required');
        document.getElementById('def-transito-cidade').removeAttribute('required');
        document.getElementById('def-transito-estado').removeAttribute('required');
      });

      btnTransitoPessoa.addEventListener('click', () => {
        transitoSelectedType.value = 'pessoa';
        btnTransitoPessoa.className = 'flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 bg-blue-600 text-white transition';
        btnTransitoEmpresa.className = 'flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 bg-white text-blue-600 transition';
        transitoEmpresaFields.classList.add('hidden');
        transitoPessoaFields.classList.remove('hidden');

        // Mark fields required/optional
        document.getElementById('def-transito-cnpj').removeAttribute('required');
        document.getElementById('def-transito-nome-empresarial').removeAttribute('required');

        document.getElementById('def-transito-cpf').setAttribute('required', 'true');
        document.getElementById('def-transito-nome').setAttribute('required', 'true');
        document.getElementById('def-transito-cep').setAttribute('required', 'true');
        document.getElementById('def-transito-rua').setAttribute('required', 'true');
        document.getElementById('def-transito-numero').setAttribute('required', 'true');
        document.getElementById('def-transito-bairro').setAttribute('required', 'true');
        document.getElementById('def-transito-cidade').setAttribute('required', 'true');
        document.getElementById('def-transito-estado').setAttribute('required', 'true');
      });
    }

    const cepTransitoInput = document.getElementById('def-transito-cep');
    if (cepTransitoInput) {
      cepTransitoInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 8) val = val.slice(0, 8);
        if (val.length > 5) {
          val = val.replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
        }
        e.target.value = val;

        if (val.length === 9) {
          document.getElementById('def-transito-rua').value = 'Avenida Rio Branco';
          document.getElementById('def-transito-bairro').value = 'Centro';
          document.getElementById('def-transito-cidade').value = 'Rio de Janeiro';
          document.getElementById('def-transito-estado').value = 'RJ';
        }
      });
    }

    // Apply masks to transito inputs
    applyCPFMask(document.getElementById('def-transito-cpf'));
    applyPhoneMask(document.getElementById('def-transito-telefone'));
    
    // CNPJ Mask helper
    function applyCNPJMask(inputEl) {
      if (!inputEl) return;
      inputEl.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 14) value = value.slice(0, 14);
        if (value.length > 12) {
          value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})$/, '$1.$2.$3/$4-$5');
        } else if (value.length > 8) {
          value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{1,4})$/, '$1.$2.$3/$4');
        } else if (value.length > 5) {
          value = value.replace(/^(\d{2})(\d{3})(\d{1,3})$/, '$1.$2.$3');
        } else if (value.length > 2) {
          value = value.replace(/^(\d{2})(\d{1,3})$/, '$1.$2');
        }
        e.target.value = value;
      });
    }
    applyCNPJMask(document.getElementById('def-transito-cnpj'));

    const airlineCnpjMap = {
      'AIR CANADA': '05.385.049/0001-23',
      'AMERICAN AIRLINES INC': '36.212.637/0001-99',
      'AZUL LINHAS AEREAS BRASILEIRAS S.A': '09.296.295/0001-60',
      'GOL LINHAS AEREAS S.A': '07.575.651/0001-59',
      'LATAM AIRLINES GROUP S.A': '02.012.862/0001-60'
    };
    const defendantFormVoo = document.getElementById('defendant-form-voo');
    const defVooVendedora = document.getElementById('def-voo-vendedora');
    const defVooOperadora = document.getElementById('def-voo-operadora');
    const defVooVendedoraCnpj = document.getElementById('def-voo-vendedora-cnpj');
    const defVooOperadoraCnpj = document.getElementById('def-voo-operadora-cnpj');

    function connectAirlineCnpj(select, cnpjInput) {
      if (!select || !cnpjInput) return;
      select.addEventListener('change', () => {
        cnpjInput.value = airlineCnpjMap[select.value] || '';
      });
    }
    connectAirlineCnpj(defVooVendedora, defVooVendedoraCnpj);
    connectAirlineCnpj(defVooOperadora, defVooOperadoraCnpj);

    if (defendantFormVoo) {
      defendantFormVoo.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!defVooVendedora.value || !defVooOperadora.value) {
          showNotification('Aviso', 'Selecione as duas companhias aéreas.', true);
          return;
        }
        document.getElementById('def-summary-voo-vendedora').textContent = defVooVendedora.value;
        document.getElementById('def-summary-voo-vendedora-cnpj').textContent = defVooVendedoraCnpj.value;
        document.getElementById('def-summary-voo-operadora').textContent = defVooOperadora.value;
        document.getElementById('def-summary-voo-operadora-cnpj').textContent = defVooOperadoraCnpj.value;
        document.getElementById('def-summary-service-details').classList.add('hidden');
        document.getElementById('def-summary-vicio-details').classList.add('hidden');
        document.getElementById('def-summary-transito-details').classList.add('hidden');
        document.getElementById('def-summary-voo-details').classList.remove('hidden');
        defendantFormVoo.classList.add('hidden');
        if (defBackBtnContainer) defBackBtnContainer.classList.add('hidden');
        if (defendantSummary) defendantSummary.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    const defendantFormTransito = document.getElementById('defendant-form-transito');
    if (defendantFormTransito) {
      defendantFormTransito.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = transitoSelectedType.value;
        let nome = '';
        let doc = '';
        let endereco = '';

        if (type === 'empresa') {
          nome = document.getElementById('def-transito-nome-empresarial').value;
          doc = document.getElementById('def-transito-cnpj').value;
          endereco = 'Não informado';
        } else {
          nome = document.getElementById('def-transito-nome').value;
          doc = document.getElementById('def-transito-cpf').value;
          const rua = document.getElementById('def-transito-rua').value;
          const num = document.getElementById('def-transito-numero').value;
          const comp = document.getElementById('def-transito-complemento').value;
          const bairro = document.getElementById('def-transito-bairro').value;
          const cid = document.getElementById('def-transito-cidade').value;
          const est = document.getElementById('def-transito-estado').value;
          const cep = document.getElementById('def-transito-cep').value;
          endereco = `${rua}, ${num}${comp ? ' ' + comp : ''} - ${bairro}, ${cid}/${est} - CEP: ${cep}`;
        }

        document.getElementById('def-summary-transito-nome').textContent = nome;
        document.getElementById('def-summary-transito-doc').textContent = doc;
        document.getElementById('def-summary-transito-endereco').textContent = endereco;

        document.getElementById('def-summary-service-details').classList.add('hidden');
        document.getElementById('def-summary-vicio-details').classList.add('hidden');
        document.getElementById('def-summary-voo-details').classList.add('hidden');
        document.getElementById('def-summary-transito-details').classList.remove('hidden');

        defendantFormTransito.classList.add('hidden');
        if (defBackBtnContainer) defBackBtnContainer.classList.add('hidden');
        if (defendantSummary) defendantSummary.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    document.querySelectorAll('.btn-def-transito-back').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (savedComplaintsModal) {
          savedComplaintsModal.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    if (btnEditDefendant) {
      btnEditDefendant.addEventListener('click', () => {
        resetDefendantQualificationState();
        if (defBackBtnContainer) defBackBtnContainer.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (btnDefSummaryBack) {
      btnDefSummaryBack.addEventListener('click', () => {
        resetDefendantQualificationState();
        if (defBackBtnContainer) defBackBtnContainer.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (btnAddNewDefendant) {
      btnAddNewDefendant.addEventListener('click', () => {
        resetDefendantQualificationState();
        if (defBackBtnContainer) defBackBtnContainer.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (btnDefSummaryContinue) {
      btnDefSummaryContinue.addEventListener('click', () => {
       showNotification(
          'Avançando no Processo',
          'Informações salvas. Avançando para Fatos e Fundamentos.'
        );

        pageDefendantQualification.classList.add('hidden');
        if (pageFactsArguments) pageFactsArguments.classList.remove('hidden');
        
        // Show correct facts form
        const formNormal = document.getElementById('facts-form');
        const formVicio = document.getElementById('facts-form-vicio');
        const formVoo = document.getElementById('facts-form-voo');
        const formToi = document.getElementById('facts-form-toi');
        const formTransito = document.getElementById('facts-form-transito');
        const formNegativacao = document.getElementById('facts-form-negativacao');

        [formNormal, formVicio, formVoo, formToi, formTransito, formNegativacao].forEach(form => {
          if (form) form.classList.add('hidden');
        });

        if (currentSelectedCardIndex === 2) {
          if (formVicio) formVicio.classList.remove('hidden');
        } else if (currentSelectedCardIndex === 3) {
          if (formVoo) {
            formVoo.reset();
            resetFlightUploadState();
            resetFlightProblemState();
            formVoo.classList.remove('hidden');
          }
        } else if (currentSelectedCardIndex === 6) {
          if (formToi) formToi.classList.remove('hidden');
        } else if (currentSelectedCardIndex === 4) {
          if (formTransito) formTransito.classList.remove('hidden');
        } else if (currentSelectedCardIndex === 5) {
          if (formNegativacao) formNegativacao.classList.remove('hidden');
        } else {
          if (formNormal) formNormal.classList.remove('hidden');
        }

        const factsTimeLabel = document.querySelector('[data-template-id="lbl-facts-time"]');
        if (factsTimeLabel) {
          if (currentSelectedCardIndex === 5) {
            factsTimeLabel.textContent = 'Indique há quanto tempo ocorreu a cobrança ou negativação indevida *';
          } else {
            // Restore default editable text value safely
            factsTimeLabel.textContent = 'Indique o tempo de suspensão/interrupção do serviço *';
          }
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Step 3 (Fatos e Fundamentos) Interactivity
    const factsDescription = document.getElementById('facts-description');
    const charCounterSpan = document.getElementById('char-counter-span');
    const btnFactsBack = document.getElementById('btn-facts-back');

    if (factsDescription && charCounterSpan) {
      factsDescription.addEventListener('input', () => {
        charCounterSpan.textContent = factsDescription.value.length;
      });
    }

    const factsVicioDesc = document.getElementById('facts-vicio-desc');
    const vicioCharCounter = document.getElementById('vicio-char-counter');
    if (factsVicioDesc && vicioCharCounter) {
      factsVicioDesc.addEventListener('input', () => {
        vicioCharCounter.textContent = factsVicioDesc.value.length;
      });
    }

    const factsVicioValor = document.getElementById('facts-vicio-valor');
    if (factsVicioValor) {
      factsVicioValor.addEventListener('input', formatBRL);
    }

    // Lógica para o Formulário de Acidente de Trânsito (Fatos e Fundamentos)
    const factsFormTransito = document.getElementById('facts-form-transito');
    const factsTransitoCep = document.getElementById('facts-transito-cep');
    if (factsTransitoCep) {
      factsTransitoCep.addEventListener('input', (e) => {
        let digits = e.target.value.replace(/\D/g, '').slice(0, 8);
        if (digits.length > 5) {
          digits = `${digits.slice(0, 5)}-${digits.slice(5)}`;
        }
        e.target.value = digits;
      });
    }
    
    // Contadores de caracteres
    const relatoInput = document.getElementById('facts-transito-relato');
    const relatoCounter = document.getElementById('transito-relato-char-counter');
    if (relatoInput && relatoCounter) {
      relatoInput.addEventListener('input', () => { relatoCounter.textContent = relatoInput.value.length; });
    }

    const danosVeiculoInput = document.getElementById('facts-transito-danos-veiculo');
    const danosVeiculoCounter = document.getElementById('transito-danos-veiculo-char-counter');
    if (danosVeiculoInput && danosVeiculoCounter) {
      danosVeiculoInput.addEventListener('input', () => { danosVeiculoCounter.textContent = danosVeiculoInput.value.length; });
    }

    const perdaUsoInput = document.getElementById('facts-transito-perda-uso-desc');
    const perdaUsoCounter = document.getElementById('transito-perda-uso-char-counter');
    if (perdaUsoInput && perdaUsoCounter) {
      perdaUsoInput.addEventListener('input', () => { perdaUsoCounter.textContent = perdaUsoInput.value.length; });
    }

    const lesoesInput = document.getElementById('facts-transito-lesoes-desc');
    const lesoesCounter = document.getElementById('transito-lesoes-char-counter');
    if (lesoesInput && lesoesCounter) {
      lesoesInput.addEventListener('input', () => { lesoesCounter.textContent = lesoesInput.value.length; });
    }

    const transitoMoralInput = document.getElementById('facts-transito-moral-desc');
    const transitoMoralCounter = document.getElementById('transito-moral-char-counter');
    if (transitoMoralInput && transitoMoralCounter) {
      transitoMoralInput.addEventListener('input', () => { transitoMoralCounter.textContent = transitoMoralInput.value.length; });
    }

    // Formatação de valores monetários
    const perdaUsoValor = document.getElementById('facts-transito-perda-uso-valor');
    if (perdaUsoValor) perdaUsoValor.addEventListener('input', formatBRL);

    const transitoMoralValor = document.getElementById('facts-transito-moral-valor');
    if (transitoMoralValor) transitoMoralValor.addEventListener('input', formatBRL);

    // Toggle condicional BRAT
    const hasBratRadios = document.getElementsByName('transito-has-brat');
    const bratPanel = document.getElementById('transito-brat-panel');
    if (hasBratRadios && bratPanel) {
      hasBratRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          bratPanel.classList.toggle('hidden', e.target.value !== 'sim');
        });
      });
    }

    // Toggle condicional Orçamento
    const hasOrcamentoRadios = document.getElementsByName('transito-has-orcamento');
    const orcamentoPanel = document.getElementById('transito-orcamento-panel');
    if (hasOrcamentoRadios && orcamentoPanel) {
      hasOrcamentoRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          orcamentoPanel.classList.toggle('hidden', e.target.value !== 'sim');
        });
      });
    }

    // Toggle condicional Perda de Uso
    const hasPerdaUsoRadios = document.getElementsByName('transito-has-perda-uso');
    const perdaUsoPanel = document.getElementById('transito-perda-uso-panel');
    if (hasPerdaUsoRadios && perdaUsoPanel) {
      hasPerdaUsoRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          perdaUsoPanel.classList.toggle('hidden', e.target.value !== 'sim');
          if (e.target.value === 'sim') {
            if (perdaUsoInput) perdaUsoInput.setAttribute('required', 'true');
            if (perdaUsoValor) perdaUsoValor.setAttribute('required', 'true');
          } else {
            if (perdaUsoInput) perdaUsoInput.removeAttribute('required');
            if (perdaUsoValor) perdaUsoValor.removeAttribute('required');
          }
        });
      });
    }

    // Toggle condicional Machucado
    const hasMachucadoRadios = document.getElementsByName('transito-has-machucado');
    const machucadoPanel = document.getElementById('transito-machucado-panel');
    if (hasMachucadoRadios && machucadoPanel) {
      hasMachucadoRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          machucadoPanel.classList.toggle('hidden', e.target.value !== 'sim');
          if (e.target.value === 'sim') {
            if (lesoesInput) lesoesInput.setAttribute('required', 'true');
          } else {
            if (lesoesInput) lesoesInput.removeAttribute('required');
          }
        });
      });
    }

    // Toggle condicional Danos Morais
    const hasTransitoMoralRadios = document.getElementsByName('transito-has-moral');
    const transitoMoralPanel = document.getElementById('transito-moral-panel');
    if (hasTransitoMoralRadios && transitoMoralPanel) {
      hasTransitoMoralRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          transitoMoralPanel.classList.toggle('hidden', e.target.value !== 'sim');
          if (e.target.value === 'sim') {
            if (transitoMoralInput) transitoMoralInput.setAttribute('required', 'true');
            if (transitoMoralValor) transitoMoralValor.setAttribute('required', 'true');
          } else {
            if (transitoMoralInput) transitoMoralInput.removeAttribute('required');
            if (transitoMoralValor) transitoMoralValor.removeAttribute('required');
          }
        });
      });
    }

    // Simulação de uploads para acidente de trânsito
    const selectBratBtn = document.querySelector('.transito-upload-btn-brat');
    const bratIndicator = document.querySelector('.transito-brat-file-indicator');
    if (selectBratBtn && bratIndicator) {
      selectBratBtn.addEventListener('click', () => {
        bratIndicator.textContent = 'brat_registro_acidente.pdf (1.8 MB)';
        bratIndicator.classList.remove('hidden', 'text-gray-500', 'italic');
        bratIndicator.classList.add('text-green-600', 'font-semibold');
      });
    }

    const selectOrcamentoBtn = document.querySelector('.transito-upload-btn-orcamento');
    const orcamentoIndicator = document.querySelector('.transito-orcamento-file-indicator');
    if (selectOrcamentoBtn && orcamentoIndicator) {
      selectOrcamentoBtn.addEventListener('click', () => {
        orcamentoIndicator.textContent = 'orcamento_oficina_reparos.pdf (2.1 MB)';
        orcamentoIndicator.classList.remove('hidden', 'text-gray-500', 'italic');
        orcamentoIndicator.classList.add('text-green-600', 'font-semibold');
      });
    }

    const selectPerdaUsoBtn = document.querySelector('.transito-upload-btn-perda-uso');
    const perdaUsoIndicator = document.querySelector('.transito-perda-uso-file-indicator');
    if (selectPerdaUsoBtn && perdaUsoIndicator) {
      selectPerdaUsoBtn.addEventListener('click', () => {
        perdaUsoIndicator.textContent = 'comprovante_aluguel_carro_recibos.pdf (950 KB)';
        perdaUsoIndicator.classList.remove('hidden', 'text-gray-500', 'italic');
        perdaUsoIndicator.classList.add('text-green-600', 'font-semibold');
      });
    }

    const selectLaudosBtn = document.querySelector('.transito-upload-btn-laudos');
    const laudosIndicator = document.querySelector('.transito-laudos-file-indicator');
    if (selectLaudosBtn && laudosIndicator) {
      selectLaudosBtn.addEventListener('click', () => {
        laudosIndicator.textContent = 'laudo_atendimento_medico_receitas.pdf (3.4 MB)';
        laudosIndicator.classList.remove('hidden', 'text-gray-500', 'italic');
        laudosIndicator.classList.add('text-green-600', 'font-semibold');
      });
    }

    // Envio do formulário de trânsito
    if (factsFormTransito) {
      factsFormTransito.addEventListener('submit', (e) => {
        e.preventDefault();

        // Valida upload do BRAT obrigatório se selecionado Sim
        const bratSelected = document.querySelector('input[name="transito-has-brat"]:checked')?.value;
        if (bratSelected === 'sim') {
          if (bratIndicator && bratIndicator.classList.contains('hidden')) {
            showNotification('Upload Obrigatório', 'Por favor, carregue o documento do BRAT ou similar.', true);
            return;
          }
        }

        // Valida upload do orçamento obrigatório se selecionado Sim
        const orcSelected = document.querySelector('input[name="transito-has-orcamento"]:checked')?.value;
        if (orcSelected === 'sim') {
          if (orcamentoIndicator && orcamentoIndicator.classList.contains('hidden')) {
            showNotification('Upload Obrigatório', 'Por favor, carregue o orçamento ou nota fiscal.', true);
            return;
          }
        }

        // Valida upload do comprovante de perda de uso obrigatório se selecionado Sim
        const perdaSelected = document.querySelector('input[name="transito-has-perda-uso"]:checked')?.value;
        if (perdaSelected === 'sim') {
          if (perdaUsoIndicator && perdaUsoIndicator.classList.contains('hidden')) {
            showNotification('Upload Obrigatório', 'Por favor, carregue o comprovante dos gastos materiais.', true);
            return;
          }
        }

        // Valida upload dos laudos médicos obrigatório se selecionado Sim
        const machucadoSelected = document.querySelector('input[name="transito-has-machucado"]:checked')?.value;
        if (machucadoSelected === 'sim') {
          if (laudosIndicator && laudosIndicator.classList.contains('hidden')) {
            showNotification('Upload Obrigatório', 'Por favor, carregue os laudos ou receitas médicas.', true);
            return;
          }
        }

        if (pageFactsArguments) pageFactsArguments.classList.add('hidden');
        if (pageOtherProofs) pageOtherProofs.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Botão Voltar do formulário de trânsito
    document.querySelectorAll('.btn-facts-back-transito').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (pageFactsArguments) pageFactsArguments.classList.add('hidden');
        if (pageDefendantQualification) pageDefendantQualification.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // Product defect file upload interactive simulation
    const btnDeleteVicioFile = document.getElementById('btn-delete-vicio-file');
    const vicioUploadedFileRow = document.getElementById('vicio-uploaded-file-row');
    const vicioUploadButtonZone = document.getElementById('vicio-upload-button-zone');
    const btnSelectVicioFile = document.getElementById('btn-select-vicio-file');

    if (btnDeleteVicioFile && vicioUploadedFileRow && vicioUploadButtonZone) {
      btnDeleteVicioFile.addEventListener('click', () => {
        vicioUploadedFileRow.classList.add('hidden');
        vicioUploadButtonZone.classList.remove('hidden');
      });
    }

    if (btnSelectVicioFile && vicioUploadedFileRow && vicioUploadButtonZone) {
      btnSelectVicioFile.addEventListener('click', () => {
        vicioUploadButtonZone.classList.add('hidden');
        vicioUploadedFileRow.classList.remove('hidden');
      });
    }

    // Conditional fields for Product Defect: contact and technical assistance
    const vicioContactDatePanel = document.getElementById('vicio-contact-date-panel');
    const vicioContactPanel = document.getElementById('vicio-contact-panel');
    const vicioContactResponseDatePanel = document.getElementById('vicio-contact-response-date-panel');
    const vicioContactResponsePanel = document.getElementById('vicio-contact-response-panel');
    const vicioRepairDatePanel = document.getElementById('vicio-repair-date-panel');
    const vicioRepairPanel = document.getElementById('vicio-repair-panel');
    const vicioRepairUploadPanel = document.getElementById('vicio-repair-upload-panel');
    const vicioRepairUploadBtn = document.getElementById('vicio-repair-upload-btn');
    const vicioRepairDropZone = document.getElementById('vicio-repair-drop-zone');
    const vicioRepairFileIndicator = document.getElementById('vicio-repair-file-indicator');

    function toggleVicioConditionalPanel(panel, show) {
      if (!panel) return;
      panel.classList.toggle('hidden', !show);
      panel.querySelectorAll('input[type="text"], input[type="date"], textarea').forEach(field => {
        field.required = show && !field.closest('.hidden');
      });
    }

    document.querySelectorAll('input[name="vicio-has-contact"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const showContact = e.target.value === 'sim';
        toggleVicioConditionalPanel(vicioContactDatePanel, showContact);
        toggleVicioConditionalPanel(vicioContactPanel, showContact);

        if (!showContact) {
          const noResponse = document.querySelector('input[name="vicio-contact-has-response"][value="nao"]');
          if (noResponse) noResponse.checked = true;
          toggleVicioConditionalPanel(vicioContactResponseDatePanel, false);
          toggleVicioConditionalPanel(vicioContactResponsePanel, false);
        }
      });
    });

    document.querySelectorAll('input[name="vicio-contact-has-response"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const showResponse = e.target.value === 'sim';
        toggleVicioConditionalPanel(vicioContactResponseDatePanel, showResponse);
        toggleVicioConditionalPanel(vicioContactResponsePanel, showResponse);
      });
    });

    document.querySelectorAll('input[name="vicio-has-repair"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const showRepair = e.target.value === 'sim';
        toggleVicioConditionalPanel(vicioRepairDatePanel, showRepair);
        toggleVicioConditionalPanel(vicioRepairPanel, showRepair);

        if (!showRepair) {
          const noReport = document.querySelector('input[name="vicio-repair-has-report"][value="nao"]');
          if (noReport) noReport.checked = true;
          toggleVicioConditionalPanel(vicioRepairUploadPanel, false);
        }
      });
    });

    document.querySelectorAll('input[name="vicio-repair-has-report"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        toggleVicioConditionalPanel(vicioRepairUploadPanel, e.target.value === 'sim');
      });
    });

    [
      ['vicio-contact-description', 'vicio-contact-char-counter'],
      ['vicio-contact-response-description', 'vicio-response-char-counter']
    ].forEach(([fieldId, counterId]) => {
      const field = document.getElementById(fieldId);
      const counter = document.getElementById(counterId);
      if (field && counter) {
        field.addEventListener('input', () => {
          counter.textContent = field.value.length;
        });
      }
    });

    function simulateVicioRepairUpload(fileNames) {
      if (!vicioRepairFileIndicator) return;
      const selectedNames = fileNames && fileNames.length
        ? fileNames.slice(0, 5)
        : ['recibo_assistencia_tecnica.pdf'];
      vicioRepairFileIndicator.textContent = `${selectedNames.join(', ')} (${selectedNames.length} arquivo${selectedNames.length > 1 ? 's' : ''})`;
      vicioRepairFileIndicator.classList.remove('hidden', 'text-gray-500', 'italic');
      vicioRepairFileIndicator.classList.add('text-green-600', 'font-semibold');
      vicioRepairFileIndicator.dataset.uploaded = 'true';
    }

    if (vicioRepairUploadBtn) {
      vicioRepairUploadBtn.addEventListener('click', () => {
        simulateVicioRepairUpload();
      });
    }

    if (vicioRepairDropZone) {
      ['dragenter', 'dragover'].forEach(eventName => {
        vicioRepairDropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          vicioRepairDropZone.classList.add('border-blue-400', 'bg-blue-50');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        vicioRepairDropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          vicioRepairDropZone.classList.remove('border-blue-400', 'bg-blue-50');
        });
      });

      vicioRepairDropZone.addEventListener('drop', (e) => {
        const fileNames = Array.from(e.dataTransfer?.files || []).map(file => file.name);
        simulateVicioRepairUpload(fileNames);
      });
    }

    const vicioMaterialPanel = document.getElementById('vicio-material-panel');
    const vicioMoralPanel = document.getElementById('vicio-moral-panel');
    const vicioMaterialUploadBtn = document.getElementById('vicio-material-upload-btn');
    const vicioMaterialDropZone = document.getElementById('vicio-material-drop-zone');
    const vicioMaterialFileIndicator = document.getElementById('vicio-material-file-indicator');
    const vicioMaterialValue = document.getElementById('vicio-material-value');
    const vicioMoralValue = document.getElementById('vicio-moral-value');

    document.querySelectorAll('input[name="vicio-has-material"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        toggleVicioConditionalPanel(vicioMaterialPanel, e.target.value === 'sim');
      });
    });

    document.querySelectorAll('input[name="vicio-has-moral"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        toggleVicioConditionalPanel(vicioMoralPanel, e.target.value === 'sim');
      });
    });

    [
      ['vicio-material-description', 'vicio-material-char-counter'],
      ['vicio-moral-description', 'vicio-moral-char-counter']
    ].forEach(([fieldId, counterId]) => {
      const field = document.getElementById(fieldId);
      const counter = document.getElementById(counterId);
      if (field && counter) {
        field.addEventListener('input', () => {
          counter.textContent = field.value.length;
        });
      }
    });

    if (vicioMaterialValue) vicioMaterialValue.addEventListener('input', formatBRL);
    if (vicioMoralValue) vicioMoralValue.addEventListener('input', formatBRL);

    function simulateVicioMaterialUpload(fileNames) {
      if (!vicioMaterialFileIndicator) return;
      const selectedNames = fileNames && fileNames.length
        ? fileNames.slice(0, 5)
        : ['comprovante_prejuizo_material.pdf'];
      vicioMaterialFileIndicator.textContent = `${selectedNames.join(', ')} (${selectedNames.length} arquivo${selectedNames.length > 1 ? 's' : ''})`;
      vicioMaterialFileIndicator.classList.remove('hidden', 'text-gray-500', 'italic');
      vicioMaterialFileIndicator.classList.add('text-green-600', 'font-semibold');
      vicioMaterialFileIndicator.dataset.uploaded = 'true';
    }

    if (vicioMaterialUploadBtn) {
      vicioMaterialUploadBtn.addEventListener('click', () => {
        simulateVicioMaterialUpload();
      });
    }

    if (vicioMaterialDropZone) {
      ['dragenter', 'dragover'].forEach(eventName => {
        vicioMaterialDropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          vicioMaterialDropZone.classList.add('border-blue-400', 'bg-blue-50');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        vicioMaterialDropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          vicioMaterialDropZone.classList.remove('border-blue-400', 'bg-blue-50');
        });
      });

      vicioMaterialDropZone.addEventListener('drop', (e) => {
        const fileNames = Array.from(e.dataTransfer?.files || []).map(file => file.name);
        simulateVicioMaterialUpload(fileNames);
      });
    }

    // TOI Specific Interactions
    const toiValorIndevido = document.getElementById('toi-valor-indevido');
    if (toiValorIndevido) toiValorIndevido.addEventListener('input', formatBRL);

    const toiDescricao = document.getElementById('toi-descricao');
    const toiCharCounter = document.getElementById('toi-char-counter');
    if (toiDescricao && toiCharCounter) {
      toiDescricao.addEventListener('input', () => {
        toiCharCounter.textContent = toiDescricao.value.length;
      });
    }

    document.querySelectorAll('.toi-upload-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ind = btn.parentElement.querySelector('.toi-file-indicator');
        if (ind) {
          ind.textContent = 'documento_toi_faturas_confeccao_divida.pdf (2.4 MB)';
          ind.classList.remove('hidden');
          ind.classList.add('text-green-600', 'font-semibold');
        }
      });
    });

    const toiHasCorte = document.getElementsByName('toi-has-corte');
    const toiCortePanel = document.getElementById('toi-corte-panel');
    if (toiHasCorte && toiCortePanel) {
      toiHasCorte.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.value === 'sim') {
            toiCortePanel.classList.remove('hidden');
          } else {
            toiCortePanel.classList.add('hidden');
          }
        });
      });
    }

    const toiHasNegativacao = document.getElementsByName('toi-has-negativacao');
    const toiNegativacaoPanel = document.getElementById('toi-negativacao-panel');
    if (toiHasNegativacao && toiNegativacaoPanel) {
      toiHasNegativacao.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.value === 'sim') {
            toiNegativacaoPanel.classList.remove('hidden');
          } else {
            toiNegativacaoPanel.classList.add('hidden');
          }
        });
      });
    }

    const toiPago = document.getElementsByName('toi-pago');
    const toiPagoPanel = document.getElementById('toi-pago-panel');
    const toiValorPago = document.getElementById('toi-valor-pago');
    if (toiPago && toiPagoPanel) {
      toiPago.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.value === 'sim') {
            toiPagoPanel.classList.remove('hidden');
            if (toiValorPago) toiValorPago.setAttribute('required', 'true');
          } else {
            toiPagoPanel.classList.add('hidden');
            if (toiValorPago) toiValorPago.removeAttribute('required');
          }
        });
      });
    }
    if (toiValorPago) toiValorPago.addEventListener('input', formatBRL);

    document.querySelectorAll('.toi-upload-btn-pago').forEach(btn => {
      btn.addEventListener('click', () => {
        const ind = btn.parentElement.querySelector('.toi-pago-file-indicator');
        if (ind) {
          ind.textContent = 'comprovante_pagamento_toi.pdf (512 KB)';
          ind.classList.remove('hidden');
          ind.classList.add('text-green-600', 'font-semibold');
        }
      });
    });

    const toiHasPrejuizoMaterial = document.getElementsByName('toi-has-prejuizo-material');
    const toiPrejuizoMaterialPanel = document.getElementById('toi-prejuizo-material-panel');
    const toiPrejuizoDesc = document.getElementById('toi-prejuizo-desc');
    const toiPrejuizoValor = document.getElementById('toi-prejuizo-valor');
    if (toiHasPrejuizoMaterial && toiPrejuizoMaterialPanel) {
      toiHasPrejuizoMaterial.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.value === 'sim') {
            toiPrejuizoMaterialPanel.classList.remove('hidden');
            if (toiPrejuizoDesc) toiPrejuizoDesc.setAttribute('required', 'true');
            if (toiPrejuizoValor) toiPrejuizoValor.setAttribute('required', 'true');
          } else {
            toiPrejuizoMaterialPanel.classList.add('hidden');
            if (toiPrejuizoDesc) toiPrejuizoDesc.removeAttribute('required');
            if (toiPrejuizoValor) toiPrejuizoValor.removeAttribute('required');
          }
        });
      });
    }
    if (toiPrejuizoDesc) {
      toiPrejuizoDesc.addEventListener('input', () => {
        const counter = document.getElementById('toi-prejuizo-char-counter');
        if (counter) counter.textContent = toiPrejuizoDesc.value.length;
      });
    }
    if (toiPrejuizoValor) toiPrejuizoValor.addEventListener('input', formatBRL);

    document.querySelectorAll('.toi-upload-btn-prejuizo').forEach(btn => {
      btn.addEventListener('click', () => {
        const ind = btn.parentElement.querySelector('.toi-prejuizo-file-indicator');
        if (ind) {
          ind.textContent = 'comprovante_prejuizo_geladeira_queimada.pdf (1.1 MB)';
          ind.classList.remove('hidden');
          ind.classList.add('text-green-600', 'font-semibold');
        }
      });
    });

    const toiHasMoral = document.getElementsByName('toi-has-moral');
    const toiMoralPanel = document.getElementById('toi-moral-panel');
    const toiMoralDesc = document.getElementById('toi-moral-desc');
    const toiMoralValor = document.getElementById('toi-moral-valor');
    if (toiHasMoral && toiMoralPanel) {
      toiHasMoral.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.value === 'sim') {
            toiMoralPanel.classList.remove('hidden');
            if (toiMoralDesc) toiMoralDesc.setAttribute('required', 'true');
            if (toiMoralValor) toiMoralValor.setAttribute('required', 'true');
          } else {
            toiMoralPanel.classList.add('hidden');
            if (toiMoralDesc) toiMoralDesc.removeAttribute('required');
            if (toiMoralValor) toiMoralValor.removeAttribute('required');
          }
        });
      });
    }
    if (toiMoralDesc) {
      toiMoralDesc.addEventListener('input', () => {
        const counter = document.getElementById('toi-moral-char-counter');
        if (counter) counter.textContent = toiMoralDesc.value.length;
      });
    }
    if (toiMoralValor) toiMoralValor.addEventListener('input', formatBRL);

    // Form TOI submit
    const factsFormToi = document.getElementById('facts-form-toi');
    if (factsFormToi) {
      factsFormToi.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Verifica upload do TOI obrigatorio
        const fileInd = factsFormToi.querySelector('.toi-file-indicator');
        if (fileInd && fileInd.classList.contains('hidden')) {
          showNotification('Upload Obrigatório', 'Por favor, carregue o documento do TOI ou similar.', true);
          return;
        }

        // Valida duration do corte
        const corteSelected = document.querySelector('input[name="toi-has-corte"]:checked')?.value;
        if (corteSelected === 'sim') {
          const meses = parseInt(document.getElementById('toi-duracao-meses').value || 0);
          const dias = parseInt(document.getElementById('toi-duracao-dias').value || 0);
          const horas = parseInt(document.getElementById('toi-duracao-horas').value || 0);
          if (meses === 0 && dias === 0 && horas === 0) {
            showNotification('Campo Obrigatório', 'Informe ao menos um dos campos de duração da suspensão.', true);
            return;
          }
        }

        // Verifica upload do comprovante de pagamento se pago foi Sim
        const pagoSelected = document.querySelector('input[name="toi-pago"]:checked')?.value;
        if (pagoSelected === 'sim') {
          const pagoInd = factsFormToi.querySelector('.toi-pago-file-indicator');
          if (pagoInd && pagoInd.classList.contains('hidden')) {
            showNotification('Upload Obrigatório', 'Por favor, carregue o comprovante de pagamento do TOI.', true);
            return;
          }
        }

        // Verifica upload do comprovante de prejuizo se prejuizo foi Sim
        const prejuSelected = document.querySelector('input[name="toi-has-prejuizo-material"]:checked')?.value;
        if (prejuSelected === 'sim') {
          const prejInd = factsFormToi.querySelector('.toi-prejuizo-file-indicator');
          if (prejInd && prejInd.classList.contains('hidden')) {
            showNotification('Upload Obrigatório', 'Por favor, carregue o comprovante de prejuízo material.', true);
            return;
          }
        }

        if (pageFactsArguments) pageFactsArguments.classList.add('hidden');
        if (pageOtherProofs) pageOtherProofs.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    document.querySelectorAll('.btn-facts-back-toi').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (pageFactsArguments) pageFactsArguments.classList.add('hidden');
        if (pageDefendantQualification) pageDefendantQualification.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    document.querySelectorAll('.btn-facts-back-vicio').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (pageFactsArguments) pageFactsArguments.classList.add('hidden');
        if (pageDefendantQualification) pageDefendantQualification.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    const factsFormVicio = document.getElementById('facts-form-vicio');
    if (factsFormVicio) {
      factsFormVicio.addEventListener('submit', (e) => {
        e.preventDefault();

        const hasRepairReport = document.querySelector('input[name="vicio-repair-has-report"]:checked')?.value === 'sim';
        const repairReportUploaded = document.getElementById('vicio-repair-file-indicator')?.dataset.uploaded === 'true';
        if (hasRepairReport && !repairReportUploaded) {
          showNotification(
            'Upload Obrigatório',
            'Carregue uma cópia do recibo ou laudo da assistência técnica.',
            true
          );
          return;
        }

        const hasMaterialDamage = document.querySelector('input[name="vicio-has-material"]:checked')?.value === 'sim';
        const materialProofUploaded = document.getElementById('vicio-material-file-indicator')?.dataset.uploaded === 'true';
        if (hasMaterialDamage && !materialProofUploaded) {
          showNotification(
            'Upload Obrigatório',
            'Carregue os comprovantes do prejuízo material sofrido.',
            true
          );
          return;
        }

        if (pageFactsArguments) pageFactsArguments.classList.add('hidden');
        if (pageOtherProofs) pageOtherProofs.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (pageDefendantQualification) {
      const defendantVisibilityObserver = new MutationObserver(() => {
        if (!pageDefendantQualification.classList.contains('hidden')) {
          resetDefendantQualificationState();
        }
      });
      defendantVisibilityObserver.observe(pageDefendantQualification, {
        attributes: true,
        attributeFilter: ['class']
      });
    }

    // Lógica para o Formulário de Cobrança ou Negativação Indevida (Card 5)
    const negValorCobranca = document.getElementById('neg-valor-cobrança');
    if (negValorCobranca) negValorCobranca.addEventListener('input', formatBRL);

    const negDescricao = document.getElementById('neg-descricao');
    const negCharCounter = document.getElementById('neg-char-counter');
    if (negDescricao && negCharCounter) {
      negDescricao.addEventListener('input', () => { negCharCounter.textContent = negDescricao.value.length; });
    }

    const negPrejuizoDesc = document.getElementById('neg-prejuizo-desc');
    const negPrejuizoCounter = document.getElementById('neg-prejuizo-char-counter');
    if (negPrejuizoDesc && negPrejuizoCounter) {
      negPrejuizoDesc.addEventListener('input', () => { negPrejuizoCounter.textContent = negPrejuizoDesc.value.length; });
    }

    const negPrejuizoValor = document.getElementById('neg-prejuizo-valor');
    if (negPrejuizoValor) negPrejuizoValor.addEventListener('input', formatBRL);

    const negMoralDesc = document.getElementById('neg-moral-desc');
    const negMoralCounter = document.getElementById('neg-moral-char-counter');
    if (negMoralDesc && negMoralCounter) {
      negMoralDesc.addEventListener('input', () => { negMoralCounter.textContent = negMoralDesc.value.length; });
    }

    const negMoralValor = document.getElementById('neg-moral-valor');
    if (negMoralValor) negMoralValor.addEventListener('input', formatBRL);

    // Dummy Uploads
    document.querySelectorAll('.neg-upload-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ind = btn.parentElement.querySelector('.neg-file-indicator');
        if (ind) {
          ind.textContent = 'comprovantes_cobrancas_indevidas.pdf (2.1 MB)';
          ind.classList.remove('hidden');
          ind.classList.add('text-green-600', 'font-semibold');
        }
      });
    });

    document.querySelectorAll('.neg-upload-btn-comprovante').forEach(btn => {
      btn.addEventListener('click', () => {
        const ind = btn.parentElement.querySelector('.neg-comprovante-indicator');
        if (ind) {
          ind.textContent = 'extrato_orgao_consulta_oficial.pdf (1.3 MB)';
          ind.classList.remove('hidden');
          ind.classList.add('text-green-600', 'font-semibold');
        }
      });
    });

    document.querySelectorAll('.neg-upload-btn-prejuizo').forEach(btn => {
      btn.addEventListener('click', () => {
        const ind = btn.parentElement.querySelector('.neg-prejuizo-indicator');
        if (ind) {
          ind.textContent = 'comprovantes_prejuizo_material.pdf (3.2 MB)';
          ind.classList.remove('hidden');
          ind.classList.add('text-green-600', 'font-semibold');
        }
      });
    });

    // Radio panels toggles
    const negHasNegativacao = document.getElementsByName('neg-has-negativacao');
    const negNegativacaoPanel = document.getElementById('neg-negativacao-panel');
    if (negHasNegativacao && negNegativacaoPanel) {
      negHasNegativacao.forEach(radio => {
        radio.addEventListener('change', (e) => {
          negNegativacaoPanel.classList.toggle('hidden', e.target.value !== 'sim');
        });
      });
    }

    const negHasComprovante = document.getElementsByName('neg-has-comprovante');
    const negComprovanteUploadPanel = document.getElementById('neg-comprovante-upload-panel');
    if (negHasComprovante && negComprovanteUploadPanel) {
      negHasComprovante.forEach(radio => {
        radio.addEventListener('change', (e) => {
          const showUpload = e.target.value === 'sim';
          negComprovanteUploadPanel.classList.toggle('hidden', !showUpload);
          if (!showUpload) {
            const indicator = negComprovanteUploadPanel.querySelector('.neg-comprovante-indicator');
            if (indicator) {
              indicator.textContent = 'Nenhum arquivo selecionado';
              indicator.className = 'neg-comprovante-indicator text-xs text-gray-500 italic hidden';
            }
          }
        });
      });
    }

    const negHasPrejuizo = document.getElementsByName('neg-has-prejuizo');
    const negPrejuizoPanel = document.getElementById('neg-prejuizo-panel');
    if (negHasPrejuizo && negPrejuizoPanel) {
      negHasPrejuizo.forEach(radio => {
        radio.addEventListener('change', (e) => {
          negPrejuizoPanel.classList.toggle('hidden', e.target.value !== 'sim');
          if (e.target.value === 'sim') {
            if (negPrejuizoDesc) negPrejuizoDesc.setAttribute('required', 'true');
            if (negPrejuizoValor) negPrejuizoValor.setAttribute('required', 'true');
          } else {
            if (negPrejuizoDesc) negPrejuizoDesc.removeAttribute('required');
            if (negPrejuizoValor) negPrejuizoValor.removeAttribute('required');
          }
        });
      });
    }

    const negHasMoral = document.getElementsByName('neg-has-moral');
    const negMoralPanel = document.getElementById('neg-moral-panel');
    if (negHasMoral && negMoralPanel) {
      negHasMoral.forEach(radio => {
        radio.addEventListener('change', (e) => {
          negMoralPanel.classList.toggle('hidden', e.target.value !== 'sim');
          if (e.target.value === 'sim') {
            if (negMoralDesc) negMoralDesc.setAttribute('required', 'true');
            if (negMoralValor) negMoralValor.setAttribute('required', 'true');
          } else {
            if (negMoralDesc) negMoralDesc.removeAttribute('required');
            if (negMoralValor) negMoralValor.removeAttribute('required');
          }
        });
      });
    }

    // Submit Card 5 facts form
    const factsFormNegativacao = document.getElementById('facts-form-negativacao');
    if (factsFormNegativacao) {
      factsFormNegativacao.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validations
        const fileInd = factsFormNegativacao.querySelector('.neg-file-indicator');
        if (fileInd && fileInd.classList.contains('hidden')) {
          showNotification('Upload Obrigatório', 'Por favor, carregue os documentos contendo as cobranças indevidas.', true);
          return;
        }

        const isNegativado = document.querySelector('input[name="neg-has-negativacao"]:checked')?.value;
        if (isNegativado === 'sim') {
          const hasProof = document.querySelector('input[name="neg-has-comprovante"]:checked')?.value;
          if (hasProof === 'sim') {
            const compInd = factsFormNegativacao.querySelector('.neg-comprovante-indicator');
            if (compInd && compInd.classList.contains('hidden')) {
              showNotification('Upload Obrigatório', 'Por favor, envie o documento referente à negativação.', true);
              return;
            }
          }
        }

        const isPrejuizo = document.querySelector('input[name="neg-has-prejuizo"]:checked')?.value;
        if (isPrejuizo === 'sim') {
          const prejInd = factsFormNegativacao.querySelector('.neg-prejuizo-indicator');
          if (prejInd && prejInd.classList.contains('hidden')) {
            showNotification('Upload Obrigatório', 'Por favor, carregue os comprovantes do prejuízo material sofrido.', true);
            return;
          }
        }

        if (pageFactsArguments) pageFactsArguments.classList.add('hidden');
        if (pageOtherProofs) pageOtherProofs.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Back action
    document.querySelectorAll('.btn-facts-back-negativacao').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (pageFactsArguments) pageFactsArguments.classList.add('hidden');
        if (pageDefendantQualification) pageDefendantQualification.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // Toggle condicional de protocolos e gerenciamento de lista
    const hasProtocolsRadio = document.getElementsByName('has-protocols');
    const protocolPanel = document.getElementById('protocol-conditional-panel');
    
    let protocolsArray = [
      { id: 1, number: '098765432123', fileName: 'CamScanner 14-07-2026 12.52.pdf' }
    ];

    function renderProtocols() {
      const emptyState = document.getElementById('protocols-list-empty');
      const listContainer = document.getElementById('protocols-list');
      if (!listContainer) return;
      
      if (protocolsArray.length === 0) {
        if (emptyState) emptyState.classList.remove('hidden');
        listContainer.classList.add('hidden');
        listContainer.innerHTML = '';
      } else {
        if (emptyState) emptyState.classList.add('hidden');
        listContainer.classList.remove('hidden');
        
        listContainer.innerHTML = protocolsArray.map(p => `
          <div class="grid grid-cols-12 gap-2 items-center py-2.5 text-xs text-gray-700 border-b border-gray-100 last:border-b-0">
            <div class="col-span-5 font-semibold font-mono tracking-tight text-gray-900 break-all">${p.number}</div>
            <div class="col-span-5 truncate">
              ${p.fileName ? `<a href="#" class="text-blue-600 hover:underline font-medium flex items-center gap-1"><i class="fa fa-file-pdf-o text-red-500" aria-hidden="true"></i> <span class="truncate">${p.fileName}</span></a>` : '<span class="text-gray-400 italic">Sem comprovante</span>'}
            </div>
            <div class="col-span-2 text-right">
              <button type="button" class="btn-delete-protocol text-red-600 hover:text-red-800 font-semibold px-2 py-1 rounded border border-red-200 hover:bg-red-50 transition text-[10px] inline-flex items-center gap-1" data-id="${p.id}">
                <i class="fa fa-trash-o" aria-hidden="true"></i> Excluir
              </button>
            </div>
          </div>
        `).join('');
        
        // Add delete event listeners
        listContainer.querySelectorAll('.btn-delete-protocol').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const id = parseInt(btn.getAttribute('data-id'));
            protocolsArray = protocolsArray.filter(p => p.id !== id);
            renderProtocols();
          });
        });
      }
    }

    if (hasProtocolsRadio && protocolPanel) {
      hasProtocolsRadio.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.value === 'sim') {
            protocolPanel.classList.remove('hidden');
            renderProtocols();
          } else {
            protocolPanel.classList.add('hidden');
          }
        });
      });
    }

    const btnSelectProtocolFile = document.getElementById('btn-select-protocol-file');
    const protocolFileIndicator = document.getElementById('protocol-file-indicator');
    let selectedProtocolFileName = '';

    if (btnSelectProtocolFile && protocolFileIndicator) {
      btnSelectProtocolFile.addEventListener('click', () => {
        selectedProtocolFileName = 'CamScanner 14-07-2026 12.52.pdf';
        protocolFileIndicator.textContent = selectedProtocolFileName;
        protocolFileIndicator.className = 'text-xs text-green-600 font-semibold';
      });
    }

    const btnSaveProtocol = document.getElementById('btn-save-protocol');
    const inputProtocolNumber = document.getElementById('protocol-number');
    if (btnSaveProtocol) {
      btnSaveProtocol.addEventListener('click', (e) => {
        e.preventDefault();
        const number = inputProtocolNumber.value.trim();
        if (!number) {
          showNotification('Campo Obrigatório', 'Por favor, informe o número do protocolo.', true);
          return;
        }
        if (protocolsArray.length >= 10) {
          showNotification('Limite Atingido', 'Você pode incluir no máximo 10 protocolos.', true);
          return;
        }
        
        protocolsArray.push({
          id: Date.now(),
          number: number,
          fileName: selectedProtocolFileName || null
        });
        
        // Reset form fields
        inputProtocolNumber.value = '';
        selectedProtocolFileName = '';
        protocolFileIndicator.textContent = 'Nenhum arquivo selecionado';
        protocolFileIndicator.className = 'text-xs text-gray-500 italic';
        
        renderProtocols();
      });
    }

    // Toggle condicional de prejuízos materiais
    const hasMaterialRadio = document.getElementsByName('has-material-damage');
    const materialPanel = document.getElementById('material-damage-panel');
    const damageDesc = document.getElementById('damage-description');
    const damageCounter = document.getElementById('damage-char-counter');
    if (hasMaterialRadio && materialPanel) {
      hasMaterialRadio.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.value === 'sim') {
            materialPanel.classList.remove('hidden');
          } else {
            materialPanel.classList.add('hidden');
          }
        });
      });
      if (damageDesc && damageCounter) {
        damageDesc.addEventListener('input', () => {
          damageCounter.textContent = damageDesc.value.length;
        });
      }
    }

    // Toggle condicional de danos morais
    const hasMoralRadio = document.getElementsByName('has-moral-damage');
    const moralPanel = document.getElementById('moral-damage-panel');
    const moralDesc = document.getElementById('moral-description');
    const moralCounter = document.getElementById('moral-char-counter');
    if (hasMoralRadio && moralPanel) {
      hasMoralRadio.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.value === 'sim') {
            moralPanel.classList.remove('hidden');
          } else {
            moralPanel.classList.add('hidden');
          }
        });
      });
      if (moralDesc && moralCounter) {
        moralDesc.addEventListener('input', () => {
          moralCounter.textContent = moralDesc.value.length;
        });
      }
    }

    const factsFormVoo = document.getElementById('facts-form-voo');
    const vooValorBilhete = document.getElementById('voo-valor-bilhete');
    const vooBilheteButton = document.getElementById('btn-voo-bilhete-upload');
    const vooPagamentoButton = document.getElementById('btn-voo-pagamento-upload');
    const vooBilheteIndicator = document.getElementById('voo-bilhete-indicator');
    const vooPagamentoIndicator = document.getElementById('voo-pagamento-indicator');

    function resetFlightUploadState() {
      [
        [vooBilheteButton, vooBilheteIndicator, 'Arraste os arquivos aqui ou clique para escolher.'],
        [vooPagamentoButton, vooPagamentoIndicator, 'Nenhum arquivo selecionado']
      ].forEach(([button, indicator, initialText]) => {
        if (button) button.dataset.selected = '';
        if (indicator) {
          indicator.textContent = initialText;
          indicator.className = 'text-xs text-gray-500 italic';
        }
      });
      document.getElementById('voo-bilhete-error')?.classList.add('hidden');
      document.getElementById('voo-pagamento-error')?.classList.add('hidden');
    }

    if (vooValorBilhete) vooValorBilhete.addEventListener('input', formatBRL);
    if (vooBilheteButton) {
      vooBilheteButton.addEventListener('click', () => {
        vooBilheteButton.dataset.selected = 'true';
        vooBilheteIndicator.textContent = 'bilhete_cartao_embarque.pdf (1,3 MB)';
        vooBilheteIndicator.className = 'text-xs text-green-600 font-semibold';
        document.getElementById('voo-bilhete-error')?.classList.add('hidden');
      });
    }
    if (vooPagamentoButton) {
      vooPagamentoButton.addEventListener('click', () => {
        vooPagamentoButton.dataset.selected = 'true';
        vooPagamentoIndicator.textContent = 'comprovante_pagamento_bilhete.pdf (980 KB)';
        vooPagamentoIndicator.className = 'text-xs text-green-600 font-semibold';
        document.getElementById('voo-pagamento-error')?.classList.add('hidden');
      });
    }
    if (factsFormVoo) {
      factsFormVoo.addEventListener('submit', (e) => {
        e.preventDefault();
        const hasTicket = vooBilheteButton?.dataset.selected === 'true';
        const hasPayment = vooPagamentoButton?.dataset.selected === 'true';
        document.getElementById('voo-bilhete-error')?.classList.toggle('hidden', hasTicket);
        document.getElementById('voo-pagamento-error')?.classList.toggle('hidden', hasPayment);
        if (!hasTicket || !hasPayment) {
          showNotification('Aviso', 'Inclua os documentos obrigatórios do voo.', true);
          return;
        }
        if (pageFactsArguments) pageFactsArguments.classList.add('hidden');
        if (pageFlightProblem) pageFlightProblem.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    const btnVooBack = document.getElementById('btn-voo-back');
    if (btnVooBack) {
      btnVooBack.addEventListener('click', () => {
        if (pageFactsArguments) pageFactsArguments.classList.add('hidden');
        if (pageDefendantQualification) pageDefendantQualification.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    document.getElementById('btn-flight-problem-back')?.addEventListener('click', () => {
      showOnlyPage(pageFactsArguments);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    const selectedFlightProblems = new Set();
    const selectedFlightProblemsContainer = document.getElementById('flight-selected-problems');
    const flightProblemError = document.getElementById('flight-problem-error');
    const flightProblemPickerPanel = document.getElementById('flight-problem-picker-panel');
    const flightLostBaggageForm = document.getElementById('flight-lost-baggage-form');
    const flightLostReceiptButton = document.getElementById('btn-flight-lost-receipt');
    const flightLostNotesButton = document.getElementById('btn-flight-lost-notes');
    const flightLostComplaintPanel = document.getElementById('flight-lost-complaint-panel');
    const flightLostComplaintFileButton = document.getElementById('btn-flight-lost-complaint-file');
    const flightLostReplacementPanel = document.getElementById('flight-lost-replacement-panel');
    const flightLostReplacementFilesButton = document.getElementById('btn-flight-lost-replacement-files');
    const flightDamagedForm = document.getElementById('flight-damaged-baggage-form');
    const flightDamagedDeliveryButton = document.getElementById('btn-flight-damaged-delivery');
    const flightDamagedComplaintPanel = document.getElementById('flight-damaged-complaint-panel');
    const flightDamagedComplaintButton = document.getElementById('btn-flight-damaged-complaint');
    const flightDamagedRepairButton = document.getElementById('btn-flight-damaged-repair');
    const flightDelayedForm = document.getElementById('flight-delayed-baggage-form');
    const flightDelayedDeliveryButton = document.getElementById('btn-flight-delayed-delivery');
    const flightDelayedComplaintPanel = document.getElementById('flight-delayed-complaint-panel');
    const flightDelayedComplaintButton = document.getElementById('btn-flight-delayed-complaint');
    const flightDelayedReplacementPanel = document.getElementById('flight-delayed-replacement-panel');
    const flightDelayedReplacementButton = document.getElementById('btn-flight-delayed-replacement');
    const flightDelayCancelForm = document.getElementById('flight-delay-cancel-form');
    const flightDelayConditionalKinds = ['food', 'hotel', 'ticket'];
    const flightViolatedForm = document.getElementById('flight-violated-baggage-form');
    const flightViolatedNotesButton = document.getElementById('btn-flight-violated-notes');
    const flightViolatedDeliveryButton = document.getElementById('btn-flight-violated-delivery');
    const flightViolatedComplaintPanel = document.getElementById('flight-violated-complaint-panel');
    const flightViolatedComplaintButton = document.getElementById('btn-flight-violated-complaint');
    const flightViolatedReplacementPanel = document.getElementById('flight-violated-replacement-panel');
    const flightViolatedReplacementButton = document.getElementById('btn-flight-violated-replacement');
    const flightDeniedForm = document.getElementById('flight-denied-boarding-form');
    const flightDeniedConfigs = [
      { kind: 'document', showValue: 'sim', fieldId: 'flight-denied-document-description', upload: true },
      { kind: 'other', showValue: 'sim', fieldId: 'flight-denied-other-description', upload: true },
      { kind: 'rebooked', showValue: 'nao', fieldId: 'flight-denied-solution', upload: false },
      { kind: 'food', showValue: 'sim', fieldId: 'flight-denied-food-value', upload: true },
      { kind: 'hotel', showValue: 'sim', fieldId: 'flight-denied-hotel-value', upload: true }
    ];

    function showFlightProblemPicker() {
      flightLostBaggageForm?.classList.add('hidden');
      flightDamagedForm?.classList.add('hidden');
      flightDelayedForm?.classList.add('hidden');
      flightDelayCancelForm?.classList.add('hidden');
      flightViolatedForm?.classList.add('hidden');
      flightDeniedForm?.classList.add('hidden');
      flightProblemPickerPanel?.classList.remove('hidden');
    }

    function resetFlightProblemState() {
      selectedFlightProblems.clear();
      flightProblemError?.classList.add('hidden');
      if (flightLostBaggageForm) flightLostBaggageForm.reset();
      if (flightLostReceiptButton) flightLostReceiptButton.dataset.selected = '';
      if (flightLostNotesButton) flightLostNotesButton.dataset.selected = '';
      if (flightLostComplaintFileButton) flightLostComplaintFileButton.dataset.selected = '';
      if (flightLostReplacementFilesButton) flightLostReplacementFilesButton.dataset.selected = '';
      if (flightDamagedForm) flightDamagedForm.reset();
      [flightDamagedDeliveryButton, flightDamagedComplaintButton, flightDamagedRepairButton].forEach(button => {
        if (button) button.dataset.selected = '';
      });
      flightDamagedComplaintPanel?.classList.add('hidden');
      if (flightDelayedForm) flightDelayedForm.reset();
      [flightDelayedDeliveryButton, flightDelayedComplaintButton, flightDelayedReplacementButton].forEach(button => {
        if (button) button.dataset.selected = '';
      });
      flightDelayedComplaintPanel?.classList.add('hidden');
      flightDelayedReplacementPanel?.classList.add('hidden');
      const delayedReplacementDescription = document.getElementById('flight-delayed-replacement-description');
      const delayedReplacementValue = document.getElementById('flight-delayed-replacement-value');
      if (delayedReplacementDescription) delayedReplacementDescription.required = false;
      if (delayedReplacementValue) delayedReplacementValue.required = false;
      flightLostComplaintPanel?.classList.add('hidden');
      flightLostReplacementPanel?.classList.add('hidden');
      const replacementDescription = document.getElementById('flight-lost-replacement-description');
      const replacementValue = document.getElementById('flight-lost-replacement-value');
      if (replacementDescription) replacementDescription.required = false;
      if (replacementValue) replacementValue.required = false;
      const receiptIndicator = document.getElementById('flight-lost-receipt-indicator');
      const notesIndicator = document.getElementById('flight-lost-notes-indicator');
      const complaintIndicator = document.getElementById('flight-lost-complaint-indicator');
      const replacementIndicator = document.getElementById('flight-lost-replacement-indicator');
      if (receiptIndicator) {
        receiptIndicator.textContent = 'Arraste os arquivos aqui ou clique para escolher.';
        receiptIndicator.className = 'text-xs text-gray-500 italic';
      }
      if (notesIndicator) {
        notesIndicator.textContent = 'Arraste os arquivos aqui ou clique para escolher.';
        notesIndicator.className = 'text-xs text-gray-500 italic';
      }
      if (complaintIndicator) {
        complaintIndicator.textContent = 'Nenhum arquivo selecionado';
        complaintIndicator.className = 'text-xs text-gray-500 italic';
      }
      if (replacementIndicator) {
        replacementIndicator.textContent = 'Arraste os arquivos aqui ou clique para escolher.';
        replacementIndicator.className = 'text-xs text-gray-500 italic';
      }
      document.getElementById('flight-lost-receipt-error')?.classList.add('hidden');
      document.getElementById('flight-lost-complaint-error')?.classList.add('hidden');
      document.getElementById('flight-lost-replacement-error')?.classList.add('hidden');
      document.getElementById('flight-lost-description-count').textContent = '0';
      document.getElementById('flight-lost-summary-count').textContent = '0';
      document.getElementById('flight-lost-replacement-description-count').textContent = '0';
      document.getElementById('flight-damaged-description-count').textContent = '0';
      document.getElementById('flight-damaged-summary-count').textContent = '0';
      document.getElementById('flight-delayed-summary-count').textContent = '0';
      document.getElementById('flight-delayed-replacement-description-count').textContent = '0';
      ['delivery', 'complaint', 'repair'].forEach(kind => {
        document.getElementById(`flight-damaged-${kind}-error`)?.classList.add('hidden');
      });
      const damagedIndicatorDefaults = {
        delivery: 'Arraste os arquivos aqui ou clique para escolher.',
        complaint: 'Nenhum arquivo selecionado',
        repair: 'Arraste os arquivos aqui ou clique para escolher.'
      };
      Object.entries(damagedIndicatorDefaults).forEach(([kind, text]) => {
        const indicator = document.getElementById(`flight-damaged-${kind}-indicator`);
        if (indicator) {
          indicator.textContent = text;
          indicator.className = 'text-xs text-gray-500 italic';
        }
      });
      const delayedIndicatorDefaults = {
        delivery: 'Arraste os arquivos aqui ou clique para escolher.',
        complaint: 'Nenhum arquivo selecionado',
        replacement: 'Arraste os arquivos aqui ou clique para escolher.'
      };
      Object.entries(delayedIndicatorDefaults).forEach(([kind, text]) => {
        const indicator = document.getElementById(`flight-delayed-${kind}-indicator`);
        if (indicator) {
          indicator.textContent = text;
          indicator.className = 'text-xs text-gray-500 italic';
        }
        document.getElementById(`flight-delayed-${kind}-error`)?.classList.add('hidden');
      });
      if (flightDelayCancelForm) flightDelayCancelForm.reset();
      flightDelayConditionalKinds.forEach(kind => {
        const button = document.getElementById(`btn-flight-delay-${kind}`);
        const panel = document.getElementById(`flight-delay-${kind}-panel`);
        const value = document.getElementById(`flight-delay-${kind}-value`);
        const indicator = document.getElementById(`flight-delay-${kind}-indicator`);
        if (button) button.dataset.selected = '';
        panel?.classList.add('hidden');
        if (value) value.required = false;
        if (indicator) {
          indicator.textContent = kind === 'ticket' ? 'Nenhum arquivo selecionado' : 'Arraste os arquivos aqui ou clique para escolher.';
          indicator.className = 'text-xs text-gray-500 italic';
        }
        document.getElementById(`flight-delay-${kind}-error`)?.classList.add('hidden');
      });
      document.getElementById('flight-delay-summary-count').textContent = '0';
      if (flightViolatedForm) flightViolatedForm.reset();
      [flightViolatedNotesButton, flightViolatedDeliveryButton, flightViolatedComplaintButton, flightViolatedReplacementButton].forEach(button => {
        if (button) button.dataset.selected = '';
      });
      flightViolatedComplaintPanel?.classList.add('hidden');
      flightViolatedReplacementPanel?.classList.add('hidden');
      const violatedReplacementDescription = document.getElementById('flight-violated-replacement-description');
      const violatedReplacementValue = document.getElementById('flight-violated-replacement-value');
      if (violatedReplacementDescription) violatedReplacementDescription.required = false;
      if (violatedReplacementValue) violatedReplacementValue.required = false;
      document.getElementById('flight-violated-description-count').textContent = '0';
      document.getElementById('flight-violated-replacement-description-count').textContent = '0';
      document.getElementById('flight-violated-summary-count').textContent = '0';
      ['notes', 'delivery', 'complaint', 'replacement'].forEach(kind => {
        const indicator = document.getElementById(`flight-violated-${kind}-indicator`);
        if (indicator) {
          indicator.textContent = kind === 'complaint' ? 'Nenhum arquivo selecionado' : 'Arraste os arquivos aqui ou clique para escolher.';
          indicator.className = 'text-xs text-gray-500 italic';
        }
        document.getElementById(`flight-violated-${kind}-error`)?.classList.add('hidden');
      });
      if (flightDeniedForm) flightDeniedForm.reset();
      flightDeniedConfigs.forEach(config => {
        const panel = document.getElementById(`flight-denied-${config.kind}-panel`);
        const field = document.getElementById(config.fieldId);
        const button = document.getElementById(`btn-flight-denied-${config.kind}`);
        panel?.classList.add('hidden');
        if (field) field.required = false;
        if (button) button.dataset.selected = '';
        const indicator = document.getElementById(`flight-denied-${config.kind}-indicator`);
        if (indicator) {
          indicator.textContent = ['food', 'hotel'].includes(config.kind) ? 'Arraste os arquivos aqui ou clique para escolher.' : 'Nenhum arquivo selecionado';
          indicator.className = 'text-xs text-gray-500 italic';
        }
        document.getElementById(`flight-denied-${config.kind}-error`)?.classList.add('hidden');
      });
      ['document-description', 'other-description', 'solution'].forEach(suffix => {
        const counter = document.getElementById(`flight-denied-${suffix}-count`);
        if (counter) counter.textContent = '0';
      });
      const otherLossesForm = document.getElementById('flight-other-losses-form');
      const otherLossesPanel = document.getElementById('flight-other-losses-panel');
      const otherLossesDescription = document.getElementById('flight-other-losses-description');
      const otherLossesValue = document.getElementById('flight-other-losses-value');
      const otherLossesButton = document.getElementById('btn-flight-other-losses-files');
      if (otherLossesForm) otherLossesForm.reset();
      otherLossesPanel?.classList.add('hidden');
      if (otherLossesDescription) otherLossesDescription.required = false;
      if (otherLossesValue) otherLossesValue.required = false;
      if (otherLossesButton) otherLossesButton.dataset.selected = '';
      document.getElementById('flight-other-losses-description-count').textContent = '0';
      document.getElementById('flight-other-losses-error')?.classList.add('hidden');
      const otherLossesIndicator = document.getElementById('flight-other-losses-indicator');
      if (otherLossesIndicator) {
        otherLossesIndicator.textContent = 'Arraste os arquivos aqui ou clique para escolher.';
        otherLossesIndicator.className = 'text-xs text-gray-500 italic';
      }
      showFlightProblemPicker();
      renderSelectedFlightProblems();
    }

    function renderSelectedFlightProblems() {
      if (!selectedFlightProblemsContainer) return;
      selectedFlightProblemsContainer.innerHTML = Array.from(selectedFlightProblems).map(problem => `
        <div class="border border-gray-200 rounded-xl p-4 bg-white shadow-sm flex items-center justify-between gap-4" data-selected-problem="${problem}">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0"><i class="fa fa-plane"></i></div>
            <div class="min-w-0"><p class="font-semibold text-gray-900">${problem}</p><button type="button" class="flight-problem-details text-xs text-blue-600 hover:underline mt-1">Clique aqui para visualizar detalhes</button><p class="flight-problem-detail-text hidden text-xs text-gray-500 mt-2">Problema selecionado para esta reclamação.</p></div>
          </div>
          <button type="button" class="flight-problem-remove px-3 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold shrink-0"><i class="fa fa-trash mr-1"></i>Excluir</button>
        </div>
      `).join('');

      document.querySelectorAll('.flight-problem-option').forEach(button => {
        const selected = selectedFlightProblems.has(button.dataset.problem);
        button.classList.toggle('bg-blue-600', !selected);
        button.classList.toggle('hover:bg-blue-700', !selected);
        button.classList.toggle('bg-blue-400', selected);
        button.classList.toggle('cursor-default', selected);
        const icon = button.querySelector('i');
        if (icon) icon.className = selected ? 'fa fa-check' : 'fa fa-plus';
      });
    }

    document.querySelectorAll('.flight-problem-option').forEach(button => {
      button.addEventListener('click', () => {
        const problem = button.dataset.problem;
        if (selectedFlightProblems.has(problem)) return;
        if (selectedFlightProblems.size >= 3) {
          showNotification('Aviso', 'É possível adicionar no máximo três problemas.', true);
          return;
        }
        if (problem === 'Bagagem extraviada e não mais localizada') {
          flightProblemPickerPanel?.classList.add('hidden');
          flightLostBaggageForm?.classList.remove('hidden');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (problem === 'Bagagem extraviada e entregue com atraso') {
          flightProblemPickerPanel?.classList.add('hidden');
          flightDelayedForm?.classList.remove('hidden');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (problem === 'Bagagem violada (itens desaparecidos)') {
          flightProblemPickerPanel?.classList.add('hidden');
          flightViolatedForm?.classList.remove('hidden');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (problem === 'Bagagem danificada (mala quebrada etc.)') {
          flightProblemPickerPanel?.classList.add('hidden');
          flightDamagedForm?.classList.remove('hidden');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (problem === 'Atraso/Cancelamento do voo') {
          flightProblemPickerPanel?.classList.add('hidden');
          flightDelayCancelForm?.classList.remove('hidden');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (problem === 'Embarque não autorizado') {
          flightProblemPickerPanel?.classList.add('hidden');
          flightDeniedForm?.classList.remove('hidden');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        selectedFlightProblems.add(problem);
        flightProblemError?.classList.add('hidden');
        renderSelectedFlightProblems();
      });
    });

    ['flight-lost-description', 'flight-lost-summary', 'flight-lost-replacement-description'].forEach((id) => {
      const field = document.getElementById(id);
      const counter = document.getElementById(`${id}-count`);
      field?.addEventListener('input', () => {
        if (counter) counter.textContent = field.value.length;
      });
    });
    document.getElementById('flight-lost-items-value')?.addEventListener('input', formatBRL);
    document.getElementById('flight-lost-replacement-value')?.addEventListener('input', formatBRL);
    document.getElementsByName('flight-lost-complaint').forEach(radio => {
      radio.addEventListener('change', () => {
        const show = radio.value === 'sim' && radio.checked;
        flightLostComplaintPanel?.classList.toggle('hidden', !show);
        if (!show && radio.checked) {
          if (flightLostComplaintFileButton) flightLostComplaintFileButton.dataset.selected = '';
          document.getElementById('flight-lost-complaint-error')?.classList.add('hidden');
        }
      });
    });
    document.getElementsByName('flight-lost-replacement').forEach(radio => {
      radio.addEventListener('change', () => {
        const show = radio.value === 'sim' && radio.checked;
        flightLostReplacementPanel?.classList.toggle('hidden', !show);
        const description = document.getElementById('flight-lost-replacement-description');
        const value = document.getElementById('flight-lost-replacement-value');
        if (description) description.required = show;
        if (value) value.required = show;
        if (!show && radio.checked) {
          if (description) description.value = '';
          if (value) value.value = '';
          if (flightLostReplacementFilesButton) flightLostReplacementFilesButton.dataset.selected = '';
          document.getElementById('flight-lost-replacement-description-count').textContent = '0';
          document.getElementById('flight-lost-replacement-error')?.classList.add('hidden');
        }
      });
    });
    if (flightLostReceiptButton) {
      flightLostReceiptButton.addEventListener('click', () => {
        flightLostReceiptButton.dataset.selected = 'true';
        const indicator = document.getElementById('flight-lost-receipt-indicator');
        if (indicator) {
          indicator.textContent = 'recibo_entrega_bagagem.pdf (1,1 MB)';
          indicator.className = 'text-xs text-green-600 font-semibold';
        }
        document.getElementById('flight-lost-receipt-error')?.classList.add('hidden');
      });
    }
    if (flightLostNotesButton) {
      flightLostNotesButton.addEventListener('click', () => {
        flightLostNotesButton.dataset.selected = 'true';
        const indicator = document.getElementById('flight-lost-notes-indicator');
        if (indicator) {
          indicator.textContent = 'notas_itens_desaparecidos.pdf (920 KB)';
          indicator.className = 'text-xs text-green-600 font-semibold';
        }
      });
    }
    if (flightLostComplaintFileButton) {
      flightLostComplaintFileButton.addEventListener('click', () => {
        flightLostComplaintFileButton.dataset.selected = 'true';
        const indicator = document.getElementById('flight-lost-complaint-indicator');
        if (indicator) {
          indicator.textContent = 'formulario_reclamacao_companhia_aerea.pdf (870 KB)';
          indicator.className = 'text-xs text-green-600 font-semibold';
        }
        document.getElementById('flight-lost-complaint-error')?.classList.add('hidden');
      });
    }
    if (flightLostReplacementFilesButton) {
      flightLostReplacementFilesButton.addEventListener('click', () => {
        flightLostReplacementFilesButton.dataset.selected = 'true';
        const indicator = document.getElementById('flight-lost-replacement-indicator');
        if (indicator) {
          indicator.textContent = 'recibos_bens_adquiridos.pdf (1,2 MB)';
          indicator.className = 'text-xs text-green-600 font-semibold';
        }
        document.getElementById('flight-lost-replacement-error')?.classList.add('hidden');
      });
    }
    document.getElementById('btn-flight-lost-cancel')?.addEventListener('click', showFlightProblemPicker);
    flightLostBaggageForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const hasReceipt = flightLostReceiptButton?.dataset.selected === 'true';
      const complaintYes = document.querySelector('input[name="flight-lost-complaint"]:checked')?.value === 'sim';
      const replacementYes = document.querySelector('input[name="flight-lost-replacement"]:checked')?.value === 'sim';
      const hasComplaintFile = flightLostComplaintFileButton?.dataset.selected === 'true';
      const hasReplacementFiles = flightLostReplacementFilesButton?.dataset.selected === 'true';
      document.getElementById('flight-lost-receipt-error')?.classList.toggle('hidden', hasReceipt);
      document.getElementById('flight-lost-complaint-error')?.classList.toggle('hidden', !complaintYes || hasComplaintFile);
      document.getElementById('flight-lost-replacement-error')?.classList.toggle('hidden', !replacementYes || hasReplacementFiles);
      if (!hasReceipt || (complaintYes && !hasComplaintFile) || (replacementYes && !hasReplacementFiles)) {
        showNotification('Aviso', 'Preencha e carregue os comprovantes obrigatórios.', true);
        return;
      }
      selectedFlightProblems.add('Bagagem extraviada e não mais localizada');
      showFlightProblemPicker();
      renderSelectedFlightProblems();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    ['flight-damaged-description', 'flight-damaged-summary'].forEach(id => {
      const field = document.getElementById(id);
      const counter = document.getElementById(`${id}-count`);
      field?.addEventListener('input', () => {
        if (counter) counter.textContent = field.value.length;
      });
    });
    document.getElementById('flight-damaged-value')?.addEventListener('input', formatBRL);
    document.getElementsByName('flight-damaged-complaint').forEach(radio => {
      radio.addEventListener('change', () => {
        const show = radio.value === 'sim' && radio.checked;
        flightDamagedComplaintPanel?.classList.toggle('hidden', !show);
        if (!show && radio.checked) {
          if (flightDamagedComplaintButton) flightDamagedComplaintButton.dataset.selected = '';
          document.getElementById('flight-damaged-complaint-error')?.classList.add('hidden');
          const indicator = document.getElementById('flight-damaged-complaint-indicator');
          if (indicator) {
            indicator.textContent = 'Nenhum arquivo selecionado';
            indicator.className = 'text-xs text-gray-500 italic';
          }
        }
      });
    });
    [
      [flightDamagedDeliveryButton, 'flight-damaged-delivery-indicator', 'recibo_entrega_bagagem.pdf (1,1 MB)', 'flight-damaged-delivery-error'],
      [flightDamagedComplaintButton, 'flight-damaged-complaint-indicator', 'formulario_reclamacao_companhia_aerea.pdf (870 KB)', 'flight-damaged-complaint-error'],
      [flightDamagedRepairButton, 'flight-damaged-repair-indicator', 'orcamento_reparo_bagagem.pdf (1,4 MB)', 'flight-damaged-repair-error']
    ].forEach(([button, indicatorId, fileName, errorId]) => {
      button?.addEventListener('click', () => {
        button.dataset.selected = 'true';
        const indicator = document.getElementById(indicatorId);
        if (indicator) {
          indicator.textContent = fileName;
          indicator.className = 'text-xs text-green-600 font-semibold';
        }
        document.getElementById(errorId)?.classList.add('hidden');
      });
    });
    document.getElementById('btn-flight-damaged-cancel')?.addEventListener('click', showFlightProblemPicker);
    flightDamagedForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const complaintYes = document.querySelector('input[name="flight-damaged-complaint"]:checked')?.value === 'sim';
      const hasDelivery = flightDamagedDeliveryButton?.dataset.selected === 'true';
      const hasComplaint = flightDamagedComplaintButton?.dataset.selected === 'true';
      const hasRepair = flightDamagedRepairButton?.dataset.selected === 'true';
      document.getElementById('flight-damaged-delivery-error')?.classList.toggle('hidden', hasDelivery);
      document.getElementById('flight-damaged-complaint-error')?.classList.toggle('hidden', !complaintYes || hasComplaint);
      document.getElementById('flight-damaged-repair-error')?.classList.toggle('hidden', hasRepair);
      if (!hasDelivery || !hasRepair || (complaintYes && !hasComplaint)) {
        showNotification('Aviso', 'Preencha e carregue os comprovantes obrigatórios.', true);
        return;
      }
      selectedFlightProblems.add('Bagagem danificada (mala quebrada etc.)');
      showFlightProblemPicker();
      renderSelectedFlightProblems();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    ['flight-delayed-summary', 'flight-delayed-replacement-description'].forEach(id => {
      const field = document.getElementById(id);
      const counter = document.getElementById(`${id}-count`);
      field?.addEventListener('input', () => {
        if (counter) counter.textContent = field.value.length;
      });
    });
    document.getElementById('flight-delayed-replacement-value')?.addEventListener('input', formatBRL);
    document.getElementsByName('flight-delayed-complaint').forEach(radio => {
      radio.addEventListener('change', () => {
        const show = radio.value === 'sim' && radio.checked;
        flightDelayedComplaintPanel?.classList.toggle('hidden', !show);
        if (!show && radio.checked) {
          if (flightDelayedComplaintButton) flightDelayedComplaintButton.dataset.selected = '';
          document.getElementById('flight-delayed-complaint-error')?.classList.add('hidden');
        }
      });
    });
    document.getElementsByName('flight-delayed-replacement').forEach(radio => {
      radio.addEventListener('change', () => {
        const show = radio.value === 'sim' && radio.checked;
        flightDelayedReplacementPanel?.classList.toggle('hidden', !show);
        const description = document.getElementById('flight-delayed-replacement-description');
        const value = document.getElementById('flight-delayed-replacement-value');
        if (description) description.required = show;
        if (value) value.required = show;
        if (!show && radio.checked) {
          if (description) description.value = '';
          if (value) value.value = '';
          if (flightDelayedReplacementButton) flightDelayedReplacementButton.dataset.selected = '';
          document.getElementById('flight-delayed-replacement-description-count').textContent = '0';
          document.getElementById('flight-delayed-replacement-error')?.classList.add('hidden');
        }
      });
    });
    [
      [flightDelayedDeliveryButton, 'flight-delayed-delivery-indicator', 'recibo_entrega_bagagem.pdf (1,1 MB)', 'flight-delayed-delivery-error'],
      [flightDelayedComplaintButton, 'flight-delayed-complaint-indicator', 'formulario_reclamacao_companhia_aerea.pdf (870 KB)', 'flight-delayed-complaint-error'],
      [flightDelayedReplacementButton, 'flight-delayed-replacement-indicator', 'recibos_bens_adquiridos.pdf (1,2 MB)', 'flight-delayed-replacement-error']
    ].forEach(([button, indicatorId, fileName, errorId]) => {
      button?.addEventListener('click', () => {
        button.dataset.selected = 'true';
        const indicator = document.getElementById(indicatorId);
        if (indicator) {
          indicator.textContent = fileName;
          indicator.className = 'text-xs text-green-600 font-semibold';
        }
        document.getElementById(errorId)?.classList.add('hidden');
      });
    });
    document.getElementById('btn-flight-delayed-cancel')?.addEventListener('click', showFlightProblemPicker);
    flightDelayedForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const fromField = document.getElementById('flight-delayed-from');
      const toField = document.getElementById('flight-delayed-to');
      const from = fromField?.dataset.isoValue || fromField?.value || '';
      const to = toField?.dataset.isoValue || toField?.value || '';
      if (from && to && new Date(to) < new Date(from)) {
        showNotification('Aviso', 'A data final deve ser posterior à data inicial.', true);
        return;
      }
      const complaintYes = document.querySelector('input[name="flight-delayed-complaint"]:checked')?.value === 'sim';
      const replacementYes = document.querySelector('input[name="flight-delayed-replacement"]:checked')?.value === 'sim';
      const hasDelivery = flightDelayedDeliveryButton?.dataset.selected === 'true';
      const hasComplaint = flightDelayedComplaintButton?.dataset.selected === 'true';
      const hasReplacement = flightDelayedReplacementButton?.dataset.selected === 'true';
      document.getElementById('flight-delayed-delivery-error')?.classList.toggle('hidden', hasDelivery);
      document.getElementById('flight-delayed-complaint-error')?.classList.toggle('hidden', !complaintYes || hasComplaint);
      document.getElementById('flight-delayed-replacement-error')?.classList.toggle('hidden', !replacementYes || hasReplacement);
      if (!hasDelivery || (complaintYes && !hasComplaint) || (replacementYes && !hasReplacement)) {
        showNotification('Aviso', 'Preencha e carregue os comprovantes obrigatórios.', true);
        return;
      }
      selectedFlightProblems.add('Bagagem extraviada e entregue com atraso');
      showFlightProblemPicker();
      renderSelectedFlightProblems();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    const flightDelaySummary = document.getElementById('flight-delay-summary');
    flightDelaySummary?.addEventListener('input', () => {
      document.getElementById('flight-delay-summary-count').textContent = flightDelaySummary.value.length;
    });
    flightDelayConditionalKinds.forEach(kind => {
      const valueInput = document.getElementById(`flight-delay-${kind}-value`);
      const uploadButton = document.getElementById(`btn-flight-delay-${kind}`);
      const panel = document.getElementById(`flight-delay-${kind}-panel`);
      valueInput?.addEventListener('input', formatBRL);
      document.getElementsByName(`flight-delay-${kind}`).forEach(radio => {
        radio.addEventListener('change', () => {
          const show = radio.value === 'sim' && radio.checked;
          panel?.classList.toggle('hidden', !show);
          if (valueInput) valueInput.required = show;
          if (!show && radio.checked) {
            if (valueInput) valueInput.value = '';
            if (uploadButton) uploadButton.dataset.selected = '';
            document.getElementById(`flight-delay-${kind}-error`)?.classList.add('hidden');
            const indicator = document.getElementById(`flight-delay-${kind}-indicator`);
            if (indicator) {
              indicator.textContent = kind === 'ticket' ? 'Nenhum arquivo selecionado' : 'Arraste os arquivos aqui ou clique para escolher.';
              indicator.className = 'text-xs text-gray-500 italic';
            }
          }
        });
      });
      uploadButton?.addEventListener('click', () => {
        uploadButton.dataset.selected = 'true';
        const indicator = document.getElementById(`flight-delay-${kind}-indicator`);
        const names = {
          food: 'comprovantes_alimentacao.pdf (980 KB)',
          hotel: 'comprovantes_hospedagem.pdf (1,3 MB)',
          ticket: 'comprovante_novo_bilhete.pdf (1,1 MB)'
        };
        if (indicator) {
          indicator.textContent = names[kind];
          indicator.className = 'text-xs text-green-600 font-semibold';
        }
        document.getElementById(`flight-delay-${kind}-error`)?.classList.add('hidden');
      });
    });
    document.getElementById('btn-flight-delay-cancel')?.addEventListener('click', showFlightProblemPicker);
    flightDelayCancelForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      let conditionalValid = true;
      flightDelayConditionalKinds.forEach(kind => {
        const yes = document.querySelector(`input[name="flight-delay-${kind}"]:checked`)?.value === 'sim';
        const selected = document.getElementById(`btn-flight-delay-${kind}`)?.dataset.selected === 'true';
        document.getElementById(`flight-delay-${kind}-error`)?.classList.toggle('hidden', !yes || selected);
        if (yes && !selected) conditionalValid = false;
      });
      if (!conditionalValid) {
        showNotification('Aviso', 'Carregue os comprovantes obrigatórios.', true);
        return;
      }
      selectedFlightProblems.add('Atraso/Cancelamento do voo');
      showFlightProblemPicker();
      renderSelectedFlightProblems();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    ['flight-violated-description', 'flight-violated-replacement-description', 'flight-violated-summary'].forEach(id => {
      const field = document.getElementById(id);
      const counter = document.getElementById(`${id}-count`);
      field?.addEventListener('input', () => {
        if (counter) counter.textContent = field.value.length;
      });
    });
    document.getElementById('flight-violated-value')?.addEventListener('input', formatBRL);
    document.getElementById('flight-violated-replacement-value')?.addEventListener('input', formatBRL);
    document.getElementsByName('flight-violated-complaint').forEach(radio => {
      radio.addEventListener('change', () => {
        const show = radio.value === 'sim' && radio.checked;
        flightViolatedComplaintPanel?.classList.toggle('hidden', !show);
        if (!show && radio.checked) {
          if (flightViolatedComplaintButton) flightViolatedComplaintButton.dataset.selected = '';
          const indicator = document.getElementById('flight-violated-complaint-indicator');
          if (indicator) {
            indicator.textContent = 'Nenhum arquivo selecionado';
            indicator.className = 'text-xs text-gray-500 italic';
          }
          document.getElementById('flight-violated-complaint-error')?.classList.add('hidden');
        }
      });
    });
    document.getElementsByName('flight-violated-replacement').forEach(radio => {
      radio.addEventListener('change', () => {
        const show = radio.value === 'sim' && radio.checked;
        flightViolatedReplacementPanel?.classList.toggle('hidden', !show);
        const description = document.getElementById('flight-violated-replacement-description');
        const value = document.getElementById('flight-violated-replacement-value');
        if (description) description.required = show;
        if (value) value.required = show;
        if (!show && radio.checked) {
          if (description) description.value = '';
          if (value) value.value = '';
          if (flightViolatedReplacementButton) flightViolatedReplacementButton.dataset.selected = '';
          document.getElementById('flight-violated-replacement-description-count').textContent = '0';
          const indicator = document.getElementById('flight-violated-replacement-indicator');
          if (indicator) {
            indicator.textContent = 'Arraste os arquivos aqui ou clique para escolher.';
            indicator.className = 'text-xs text-gray-500 italic';
          }
          document.getElementById('flight-violated-replacement-error')?.classList.add('hidden');
        }
      });
    });
    [
      [flightViolatedNotesButton, 'notes', 'notas_itens_desaparecidos.pdf (920 KB)'],
      [flightViolatedDeliveryButton, 'delivery', 'recibo_entrega_bagagem.pdf (1,1 MB)'],
      [flightViolatedComplaintButton, 'complaint', 'formulario_reclamacao_companhia_aerea.pdf (870 KB)'],
      [flightViolatedReplacementButton, 'replacement', 'recibos_bens_adquiridos.pdf (1,2 MB)']
    ].forEach(([button, kind, fileName]) => {
      button?.addEventListener('click', () => {
        button.dataset.selected = 'true';
        const indicator = document.getElementById(`flight-violated-${kind}-indicator`);
        if (indicator) {
          indicator.textContent = fileName;
          indicator.className = 'text-xs text-green-600 font-semibold';
        }
        document.getElementById(`flight-violated-${kind}-error`)?.classList.add('hidden');
      });
    });
    document.getElementById('btn-flight-violated-cancel')?.addEventListener('click', showFlightProblemPicker);
    flightViolatedForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const complaintYes = document.querySelector('input[name="flight-violated-complaint"]:checked')?.value === 'sim';
      const replacementYes = document.querySelector('input[name="flight-violated-replacement"]:checked')?.value === 'sim';
      const hasDelivery = flightViolatedDeliveryButton?.dataset.selected === 'true';
      const hasComplaint = flightViolatedComplaintButton?.dataset.selected === 'true';
      const hasReplacement = flightViolatedReplacementButton?.dataset.selected === 'true';
      document.getElementById('flight-violated-delivery-error')?.classList.toggle('hidden', hasDelivery);
      document.getElementById('flight-violated-complaint-error')?.classList.toggle('hidden', !complaintYes || hasComplaint);
      document.getElementById('flight-violated-replacement-error')?.classList.toggle('hidden', !replacementYes || hasReplacement);
      if (!hasDelivery || (complaintYes && !hasComplaint) || (replacementYes && !hasReplacement)) {
        showNotification('Aviso', 'Preencha e carregue os comprovantes obrigatórios.', true);
        return;
      }
      selectedFlightProblems.add('Bagagem violada (itens desaparecidos)');
      showFlightProblemPicker();
      renderSelectedFlightProblems();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    ['flight-denied-document-description', 'flight-denied-other-description', 'flight-denied-solution'].forEach(id => {
      const field = document.getElementById(id);
      const counter = document.getElementById(`${id}-count`);
      field?.addEventListener('input', () => {
        if (counter) counter.textContent = field.value.length;
      });
    });
    ['flight-denied-food-value', 'flight-denied-hotel-value'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', formatBRL);
    });
    flightDeniedConfigs.forEach(config => {
      const panel = document.getElementById(`flight-denied-${config.kind}-panel`);
      const field = document.getElementById(config.fieldId);
      const uploadButton = document.getElementById(`btn-flight-denied-${config.kind}`);
      document.getElementsByName(`flight-denied-${config.kind}`).forEach(radio => {
        radio.addEventListener('change', () => {
          const show = radio.value === config.showValue && radio.checked;
          panel?.classList.toggle('hidden', !show);
          if (field) field.required = show;
          if (!show && radio.checked) {
            if (field) field.value = '';
            if (uploadButton) uploadButton.dataset.selected = '';
            const counter = document.getElementById(`${config.fieldId}-count`);
            if (counter) counter.textContent = '0';
            const indicator = document.getElementById(`flight-denied-${config.kind}-indicator`);
            if (indicator) {
              indicator.textContent = ['food', 'hotel'].includes(config.kind) ? 'Arraste os arquivos aqui ou clique para escolher.' : 'Nenhum arquivo selecionado';
              indicator.className = 'text-xs text-gray-500 italic';
            }
            document.getElementById(`flight-denied-${config.kind}-error`)?.classList.add('hidden');
          }
        });
      });
      if (config.upload) {
        uploadButton?.addEventListener('click', () => {
          uploadButton.dataset.selected = 'true';
          const names = {
            document: 'documento_apontado_irregular.pdf (740 KB)',
            other: 'documento_relativo_relato.pdf (820 KB)',
            food: 'comprovantes_alimentacao.pdf (980 KB)',
            hotel: 'comprovantes_hospedagem.pdf (1,3 MB)'
          };
          const indicator = document.getElementById(`flight-denied-${config.kind}-indicator`);
          if (indicator) {
            indicator.textContent = names[config.kind];
            indicator.className = 'text-xs text-green-600 font-semibold';
          }
          document.getElementById(`flight-denied-${config.kind}-error`)?.classList.add('hidden');
        });
      }
    });
    document.getElementById('btn-flight-denied-cancel')?.addEventListener('click', showFlightProblemPicker);
    flightDeniedForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      let uploadsValid = true;
      flightDeniedConfigs.filter(config => config.upload).forEach(config => {
        const active = document.querySelector(`input[name="flight-denied-${config.kind}"]:checked`)?.value === config.showValue;
        const selected = document.getElementById(`btn-flight-denied-${config.kind}`)?.dataset.selected === 'true';
        document.getElementById(`flight-denied-${config.kind}-error`)?.classList.toggle('hidden', !active || selected);
        if (active && !selected) uploadsValid = false;
      });
      if (!uploadsValid) {
        showNotification('Aviso', 'Carregue os documentos e comprovantes obrigatórios.', true);
        return;
      }
      selectedFlightProblems.add('Embarque não autorizado');
      showFlightProblemPicker();
      renderSelectedFlightProblems();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    selectedFlightProblemsContainer?.addEventListener('click', (e) => {
      const card = e.target.closest('[data-selected-problem]');
      if (!card) return;
      if (e.target.closest('.flight-problem-remove')) {
        selectedFlightProblems.delete(card.dataset.selectedProblem);
        renderSelectedFlightProblems();
      } else if (e.target.closest('.flight-problem-details')) {
        card.querySelector('.flight-problem-detail-text')?.classList.toggle('hidden');
      }
    });
    document.getElementById('btn-flight-problem-continue')?.addEventListener('click', () => {
      if (selectedFlightProblems.size === 0) {
        flightProblemError?.classList.remove('hidden');
        showNotification('Aviso', 'Selecione pelo menos um problema.', true);
        return;
      }
      showOnlyPage(pageFlightLosses);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.getElementById('btn-flight-losses-back')?.addEventListener('click', () => {
      showOnlyPage(pageFlightProblem);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    const flightOtherLossesForm = document.getElementById('flight-other-losses-form');
    const flightOtherLossesPanel = document.getElementById('flight-other-losses-panel');
    const flightOtherLossesDescription = document.getElementById('flight-other-losses-description');
    const flightOtherLossesValue = document.getElementById('flight-other-losses-value');
    const flightOtherLossesFilesButton = document.getElementById('btn-flight-other-losses-files');
    document.getElementsByName('flight-other-losses').forEach(radio => {
      radio.addEventListener('change', () => {
        const show = radio.value === 'sim' && radio.checked;
        flightOtherLossesPanel?.classList.toggle('hidden', !show);
        if (flightOtherLossesDescription) flightOtherLossesDescription.required = show;
        if (flightOtherLossesValue) flightOtherLossesValue.required = show;
        if (!show && radio.checked) {
          if (flightOtherLossesDescription) flightOtherLossesDescription.value = '';
          if (flightOtherLossesValue) flightOtherLossesValue.value = '';
          if (flightOtherLossesFilesButton) flightOtherLossesFilesButton.dataset.selected = '';
          document.getElementById('flight-other-losses-description-count').textContent = '0';
          document.getElementById('flight-other-losses-error')?.classList.add('hidden');
          const indicator = document.getElementById('flight-other-losses-indicator');
          if (indicator) {
            indicator.textContent = 'Arraste os arquivos aqui ou clique para escolher.';
            indicator.className = 'text-xs text-gray-500 italic';
          }
        }
      });
    });
    flightOtherLossesDescription?.addEventListener('input', () => {
      document.getElementById('flight-other-losses-description-count').textContent = flightOtherLossesDescription.value.length;
    });
    flightOtherLossesValue?.addEventListener('input', formatBRL);
    flightOtherLossesFilesButton?.addEventListener('click', () => {
      flightOtherLossesFilesButton.dataset.selected = 'true';
      const indicator = document.getElementById('flight-other-losses-indicator');
      if (indicator) {
        indicator.textContent = 'comprovantes_demais_prejuizos.pdf (1,2 MB)';
        indicator.className = 'text-xs text-green-600 font-semibold';
      }
      document.getElementById('flight-other-losses-error')?.classList.add('hidden');
    });
    flightOtherLossesForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const hasOtherLosses = document.querySelector('input[name="flight-other-losses"]:checked')?.value === 'sim';
      const hasFiles = flightOtherLossesFilesButton?.dataset.selected === 'true';
      document.getElementById('flight-other-losses-error')?.classList.toggle('hidden', !hasOtherLosses || hasFiles);
      if (hasOtherLosses && !hasFiles) {
        showNotification('Aviso', 'Carregue o comprovante dos demais prejuízos.', true);
        return;
      }
      showOnlyPage(pageOtherProofs);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    if (btnFactsBack) {
      btnFactsBack.addEventListener('click', (e) => {
        e.preventDefault();
        if (pageFactsArguments) pageFactsArguments.classList.add('hidden');
        if (pageDefendantQualification) pageDefendantQualification.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (factsForm) {
      factsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Advance to Step 4: Outras Provas
        if (pageFactsArguments) pageFactsArguments.classList.add('hidden');
        if (pageOtherProofs) pageOtherProofs.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (btnProofsBack) {
      btnProofsBack.addEventListener('click', (e) => {
        e.preventDefault();
        if (pageOtherProofs) pageOtherProofs.classList.add('hidden');
        if (currentSelectedCardIndex === 3) {
          if (pageFlightLosses) pageFlightLosses.classList.remove('hidden');
        } else if (pageFactsArguments) {
          pageFactsArguments.classList.remove('hidden');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // References to Pedidos page elements
    const pageRequestsStep = document.getElementById('page-requests-step');
    const requestsForm = document.getElementById('requests-form');
    const requestsFormVoo = document.getElementById('requests-form-voo');
    const requestsFormTransito = document.getElementById('requests-form-transito');
    const requestsFormToi = document.getElementById('requests-form-toi');
    const requestsFormNegativacao = document.getElementById('requests-form-negativacao');
    const btnRequestsBack = document.getElementById('btn-requests-back');
    const requestsValidationError = document.getElementById('requests-validation-error');
    const requestsToiValidationError = document.getElementById('requests-toi-validation-error');
    const requestsNegValidationError = document.getElementById('requests-neg-validation-error');
    const requestsTransitoValidationError = document.getElementById('requests-transito-validation-error');
    const requestsVooValidationError = document.getElementById('requests-voo-validation-error');
    let pendingTransitoRequests = null;

    function buildCurrentAddress(prefix) {
      const value = (suffix) => document.getElementById(`${prefix}-${suffix}`)?.value?.trim() || '';
      return [
        [value('rua'), value('numero')].filter(Boolean).join(', '),
        value('complemento'),
        [value('bairro'), value('cidade'), value('estado')].filter(Boolean).join(' - '),
        value('cep') ? `CEP: ${value('cep')}` : ''
      ].filter(Boolean).join(' | ') || 'Não informado';
    }

    function openProcessLocationStep() {
      const authorAddress = buildCurrentAddress('auth');
      const defendantAddress = buildCurrentAddress('def-transito');
      const authorDistrict = document.getElementById('auth-bairro')?.value?.trim();
      const authorCity = document.getElementById('auth-cidade')?.value?.trim();
      const defendantDistrict = document.getElementById('def-transito-bairro')?.value?.trim();
      const defendantCity = document.getElementById('def-transito-cidade')?.value?.trim();

      const authorAddressEl = document.getElementById('location-author-address');
      const defendantAddressEl = document.getElementById('location-defendant-address');
      const authorTitle = document.getElementById('location-author-title');
      const defendantTitle = document.getElementById('location-defendant-title');
      if (authorAddressEl) authorAddressEl.textContent = authorAddress;
      if (defendantAddressEl) defendantAddressEl.textContent = defendantAddress;
      if (authorTitle) authorTitle.textContent = [authorDistrict, authorCity].filter(Boolean).join(' - ').toUpperCase() || 'ENDEREÇO DO AUTOR';
      if (defendantTitle) defendantTitle.textContent = [defendantDistrict, defendantCity].filter(Boolean).join(' - ').toUpperCase() || 'ENDEREÇO DO RÉU';

      document.querySelectorAll('input[name="process-location"]').forEach(radio => {
        radio.checked = false;
      });
      ['location-author-card', 'location-defendant-card'].forEach(id => {
        const card = document.getElementById(id);
        if (card) card.classList.remove('border-blue-600', 'ring-1', 'ring-blue-600');
      });
      const error = document.getElementById('process-location-error');
      if (error) error.classList.add('hidden');
      pageRequestsStep.classList.add('hidden');
      if (pageProcessLocation) pageProcessLocation.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('input[name="process-location"]').forEach(radio => {
      radio.addEventListener('change', () => {
        ['location-author-card', 'location-defendant-card'].forEach(id => {
          const card = document.getElementById(id);
          if (card) card.classList.remove('border-blue-600', 'ring-1', 'ring-blue-600');
        });
        const selectedCard = document.getElementById(
          radio.value === 'autor' ? 'location-author-card' : 'location-defendant-card'
        );
        if (selectedCard) selectedCard.classList.add('border-blue-600', 'ring-1', 'ring-blue-600');
      });
    });

    const btnLocationBack = document.getElementById('btn-location-back');
    if (btnLocationBack) {
      btnLocationBack.addEventListener('click', () => {
        if (pageProcessLocation) pageProcessLocation.classList.add('hidden');
        pageRequestsStep.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    const processLocationForm = document.getElementById('process-location-form');
    if (processLocationForm) {
      processLocationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedLocation = document.querySelector('input[name="process-location"]:checked')?.value;
        const error = document.getElementById('process-location-error');
        if (!selectedLocation || !pendingTransitoRequests) {
          if (error) error.classList.remove('hidden');
          return;
        }
        if (error) error.classList.add('hidden');
        pendingTransitoRequests.location = selectedLocation;
        if (pageProcessLocation) pageProcessLocation.classList.add('hidden');
        proceedToPreview(
          'nao',
          pendingTransitoRequests.material,
          pendingTransitoRequests.moral,
          { type: 'transito', medicas: pendingTransitoRequests.medicas, location: selectedLocation }
        );
      });
    }

    [
      ['req-transito-material', 'req-transito-material-value-panel', 'req-transito-material-value'],
      ['req-transito-medicas', 'req-transito-medicas-value-panel', 'req-transito-medicas-value'],
      ['req-transito-moral', 'req-transito-moral-value-panel', 'req-transito-moral-value']
    ].forEach(([radioName, panelId, inputId]) => {
      const panel = document.getElementById(panelId);
      const input = document.getElementById(inputId);
      document.querySelectorAll(`input[name="${radioName}"]`).forEach(radio => {
        radio.addEventListener('change', (e) => {
          const show = e.target.value === 'sim';
          if (panel) panel.classList.toggle('hidden', !show);
          if (input) {
            input.required = show;
            if (!show) input.value = '';
          }
        });
      });
      if (input) input.addEventListener('input', formatBRL);
    });

    [
      ['req-voo-moral', 'req-voo-moral-panel', 'req-voo-moral-value', 'req-voo-moral-reason'],
      ['req-voo-bilhete', 'req-voo-bilhete-panel', 'req-voo-bilhete-value', 'req-voo-bilhete-reason'],
      ['req-voo-material', 'req-voo-material-panel', 'req-voo-material-value', 'req-voo-material-reason']
    ].forEach(([radioName, panelId, valueId, reasonId]) => {
      const panel = document.getElementById(panelId);
      const valueInput = document.getElementById(valueId);
      const reasonInput = document.getElementById(reasonId);
      const counter = document.querySelector(`[data-count-for="${reasonId}"]`);
      document.querySelectorAll(`input[name="${radioName}"]`).forEach(radio => {
        radio.addEventListener('change', event => {
          const show = event.target.value === 'sim';
          panel?.classList.toggle('hidden', !show);
          [valueInput, reasonInput].forEach(input => {
            if (!input) return;
            input.required = show;
            if (!show) input.value = '';
          });
          if (!show && counter) counter.textContent = '0';
        });
      });
      valueInput?.addEventListener('input', formatBRL);
      reasonInput?.addEventListener('input', () => {
        if (counter) counter.textContent = String(reasonInput.value.length);
      });
    });

    // Vicio Dropdown elements
    const reqVicioDropdownBtn = document.getElementById('req-vicio-dropdown-btn');
    const reqVicioDropdownList = document.getElementById('req-vicio-dropdown-list');
    const reqVicioDropdownSpan = document.getElementById('req-vicio-dropdown-span');
    const reqVicioDropdownValue = document.getElementById('req-vicio-dropdown-value');
    const reqVicioDropdownSearch = document.getElementById('req-vicio-dropdown-search');
    const reqVicioOptions = document.getElementById('req-vicio-options');

    if (reqVicioDropdownBtn && reqVicioDropdownList) {
      reqVicioDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        reqVicioDropdownList.classList.toggle('hidden');
        if (reqVicioDropdownSearch) {
          reqVicioDropdownSearch.value = '';
          reqVicioDropdownSearch.focus();
        }
        // Show all options initially on open
        if (reqVicioOptions) {
          reqVicioOptions.querySelectorAll('button').forEach(btn => {
            btn.style.display = '';
          });
        }
      });

      if (reqVicioDropdownSearch) {
        reqVicioDropdownSearch.addEventListener('input', (e) => {
          const query = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const btns = reqVicioOptions.querySelectorAll('button');
          btns.forEach(btn => {
            const text = btn.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            btn.style.display = text.includes(query) ? '' : 'none';
          });
        });
      }

      reqVicioOptions.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const value = btn.getAttribute('data-value');
          const text = btn.textContent;
          reqVicioDropdownValue.value = value;
          reqVicioDropdownSpan.textContent = text;
          reqVicioDropdownSpan.classList.remove('text-gray-500');
          reqVicioDropdownSpan.classList.add('text-gray-800');
          reqVicioDropdownList.classList.add('hidden');
        });
      });

      document.addEventListener('click', (e) => {
        if (!reqVicioDropdownList.classList.contains('hidden') && !e.target.closest('#req-vicio-dropdown-btn') && !e.target.closest('#req-vicio-dropdown-list')) {
          reqVicioDropdownList.classList.add('hidden');
        }
      });
    }

    // Radios and conditional panels
    const reqReestablishmentRadios = document.getElementsByName('req-reestablishment');
    const reqMaterialRadios = document.getElementsByName('req-material');
    const reqMoralRadios = document.getElementsByName('req-moral');

    const reqMaterialValContainer = document.getElementById('req-material-val-container');
    const reqMoralValContainer = document.getElementById('req-moral-val-container');

    const reqMaterialVal = document.getElementById('req-material-val');
    const reqMoralVal = document.getElementById('req-moral-val');

    // TOI form elements
    const reqToiDanosMateriaisRadios = document.getElementsByName('req-toi-danos-materiais');
    const reqToiDanosMoraisRadios = document.getElementsByName('req-toi-danos-morais');
    const reqToiMatValContainer = document.getElementById('req-toi-mat-val-container');
    const reqToiMorValContainer = document.getElementById('req-toi-mor-val-container');
    const reqToiMatVal = document.getElementById('req-toi-mat-val');
    const reqToiMorVal = document.getElementById('req-toi-mor-val');

    // Negativacao/Cobranca form elements (Card 5)
    const reqNegDanosMateriaisRadios = document.getElementsByName('req-neg-danos-materiais');
    const reqNegDanosMoraisRadios = document.getElementsByName('req-neg-danos-morais');
    const reqNegMatValContainer = document.getElementById('req-neg-mat-val-container');
    const reqNegMorValContainer = document.getElementById('req-neg-mor-val-container');
    const reqNegMatVal = document.getElementById('req-neg-mat-val');
    const reqNegMorVal = document.getElementById('req-neg-mor-val');

    // Toggle logic for Pedidos conditionals
    reqMaterialRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'sim') {
          reqMaterialValContainer.classList.remove('hidden');
          reqMaterialVal.setAttribute('required', 'true');
        } else {
          reqMaterialValContainer.classList.add('hidden');
          reqMaterialVal.removeAttribute('required');
        }
      });
    });

    reqMoralRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'sim') {
          reqMoralValContainer.classList.remove('hidden');
          reqMoralVal.setAttribute('required', 'true');
        } else {
          reqMoralValContainer.classList.add('hidden');
          reqMoralVal.removeAttribute('required');
        }
      });
    });

    // TOI toggles
    reqToiDanosMateriaisRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'sim') {
          reqToiMatValContainer.classList.remove('hidden');
          reqToiMatVal.setAttribute('required', 'true');
        } else {
          reqToiMatValContainer.classList.add('hidden');
          reqToiMatVal.removeAttribute('required');
        }
      });
    });

    reqToiDanosMoraisRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'sim') {
          reqToiMorValContainer.classList.remove('hidden');
          reqToiMorVal.setAttribute('required', 'true');
        } else {
          reqToiMorValContainer.classList.add('hidden');
          reqToiMorVal.removeAttribute('required');
        }
      });
    });

    // Negativacao/Cobranca toggles
    reqNegDanosMateriaisRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'sim') {
          reqNegMatValContainer.classList.remove('hidden');
          reqNegMatVal.setAttribute('required', 'true');
        } else {
          reqNegMatValContainer.classList.add('hidden');
          reqNegMatVal.removeAttribute('required');
        }
      });
    });

    reqNegDanosMoraisRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'sim') {
          reqNegMorValContainer.classList.remove('hidden');
          reqNegMorVal.setAttribute('required', 'true');
        } else {
          reqNegMorValContainer.classList.add('hidden');
          reqNegMorVal.removeAttribute('required');
        }
      });
    });

    if (reqToiMatVal) reqToiMatVal.addEventListener('input', formatBRL);
    if (reqToiMorVal) reqToiMorVal.addEventListener('input', formatBRL);
    if (reqNegMatVal) reqNegMatVal.addEventListener('input', formatBRL);
    if (reqNegMorVal) reqNegMorVal.addEventListener('input', formatBRL);

    if (btnRequestsBack) {
      btnRequestsBack.addEventListener('click', (e) => {
        e.preventDefault();
        pageRequestsStep.classList.add('hidden');
        pageOtherProofs.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    document.querySelectorAll('.btn-requests-toi-back').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        pageRequestsStep.classList.add('hidden');
        pageOtherProofs.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    document.querySelectorAll('.btn-requests-neg-back').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        pageRequestsStep.classList.add('hidden');
        pageOtherProofs.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    document.querySelectorAll('.btn-requests-transito-back').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        pageRequestsStep.classList.add('hidden');
        pageOtherProofs.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    document.querySelectorAll('.btn-requests-voo-back').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        pageRequestsStep.classList.add('hidden');
        pageOtherProofs.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // Logic to handle transitioning to the requests step based on Card index
    function showCorrectRequestsForm() {
      const q1Normal = document.getElementById('q1-normal-container');
      const q1Vicio = document.getElementById('q1-vicio-container');
      const reqMaterialLabel = document.querySelector('[data-template-id="lbl-req-material"]');
      
      if (currentSelectedCardIndex === 6) {
        requestsForm.classList.add('hidden');
        if (requestsFormVoo) requestsFormVoo.classList.add('hidden');
        if (requestsFormTransito) requestsFormTransito.classList.add('hidden');
        requestsFormToi.classList.remove('hidden');
        if (requestsFormNegativacao) requestsFormNegativacao.classList.add('hidden');
      } else if (currentSelectedCardIndex === 5) {
        requestsForm.classList.add('hidden');
        if (requestsFormVoo) requestsFormVoo.classList.add('hidden');
        if (requestsFormTransito) requestsFormTransito.classList.add('hidden');
        requestsFormToi.classList.add('hidden');
        if (requestsFormNegativacao) requestsFormNegativacao.classList.remove('hidden');
      } else if (currentSelectedCardIndex === 4) {
        requestsForm.classList.add('hidden');
        if (requestsFormVoo) requestsFormVoo.classList.add('hidden');
        requestsFormToi.classList.add('hidden');
        if (requestsFormNegativacao) requestsFormNegativacao.classList.add('hidden');
        if (requestsFormTransito) {
          requestsFormTransito.reset();
          requestsFormTransito.classList.remove('hidden');
          requestsFormTransito.querySelectorAll('[id$="-value-panel"]').forEach(panel => {
            panel.classList.add('hidden');
          });
          requestsFormTransito.querySelectorAll('input[type="text"]').forEach(input => {
            input.required = false;
            input.value = '';
          });
        }
      } else if (currentSelectedCardIndex === 3) {
        requestsForm.classList.add('hidden');
        if (requestsFormTransito) requestsFormTransito.classList.add('hidden');
        requestsFormToi.classList.add('hidden');
        if (requestsFormNegativacao) requestsFormNegativacao.classList.add('hidden');
        if (requestsFormVoo) {
          requestsFormVoo.reset();
          requestsFormVoo.classList.remove('hidden');
          requestsFormVoo.querySelectorAll('[id$="-panel"]').forEach(panel => panel.classList.add('hidden'));
          requestsFormVoo.querySelectorAll('input[type="text"], textarea').forEach(input => {
            input.required = false;
            input.value = '';
          });
          requestsFormVoo.querySelectorAll('[data-count-for]').forEach(counter => counter.textContent = '0');
          requestsVooValidationError?.classList.add('hidden');
        }
      } else {
        requestsForm.classList.remove('hidden');
        if (requestsFormVoo) requestsFormVoo.classList.add('hidden');
        if (requestsFormTransito) requestsFormTransito.classList.add('hidden');
        requestsFormToi.classList.add('hidden');
        if (requestsFormNegativacao) requestsFormNegativacao.classList.add('hidden');
        
        if (currentSelectedCardIndex === 2) {
          if (reqMaterialLabel) reqMaterialLabel.textContent = 'Quer indenização pelos danos materiais (prejuízos sofridos em razão do problema do produto)? *';
          if (q1Normal) q1Normal.classList.add('hidden');
          if (q1Vicio) q1Vicio.classList.remove('hidden');
        } else {
          if (reqMaterialLabel) reqMaterialLabel.textContent = 'Quer indenização pelos danos materiais (prejuízos sofridos com a suspensão/interrupção, etc)? *';
          if (q1Normal) q1Normal.classList.remove('hidden');
          if (q1Vicio) q1Vicio.classList.add('hidden');
        }
      }
    }

    if (requestsFormVoo) {
      requestsFormVoo.addEventListener('submit', (e) => {
        e.preventDefault();
        const moral = document.querySelector('input[name="req-voo-moral"]:checked')?.value;
        const bilhete = document.querySelector('input[name="req-voo-bilhete"]:checked')?.value;
        const material = document.querySelector('input[name="req-voo-material"]:checked')?.value;
        const allAnswered = moral && bilhete && material;
        const hasAnyRequest = [moral, bilhete, material].some(value => value === 'sim');
        if (!allAnswered || !hasAnyRequest || !requestsFormVoo.checkValidity()) {
          requestsVooValidationError?.classList.remove('hidden');
          requestsFormVoo.reportValidity();
          return;
        }
        requestsVooValidationError?.classList.add('hidden');
        proceedToPreview('nao', material, moral, { type: 'voo', bilhete });
      });
    }

    // Submit for Normal Requests
    if (requestsForm) {
      requestsForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let hasAnySim = false;
        let isQ1Answered = false;
        let reestVal = 'nao';

        const matVal = document.querySelector('input[name="req-material"]:checked')?.value;
        const morVal = document.querySelector('input[name="req-moral"]:checked')?.value;

        if (currentSelectedCardIndex === 2) {
          const dropdownVal = reqVicioDropdownValue.value;
          isQ1Answered = !!dropdownVal;
          if (dropdownVal && dropdownVal !== 'nao-preciso') {
            hasAnySim = true;
            reestVal = 'sim';
          }
        } else {
          reestVal = document.querySelector('input[name="req-reestablishment"]:checked')?.value;
          isQ1Answered = !!reestVal;
          if (reestVal === 'sim') {
            hasAnySim = true;
          }
        }

        if (matVal === 'sim' || morVal === 'sim') {
          hasAnySim = true;
        }

        if (!isQ1Answered || !matVal || !morVal) {
          requestsValidationError.classList.remove('hidden');
          const errorText = document.querySelector('[data-template-id="req-validation-error-text"]');
          if (errorText) errorText.textContent = "Por favor, responda todas as perguntas obrigatórias.";
          return;
        }

        if (!hasAnySim) {
          requestsValidationError.classList.remove('hidden');
          const errorText = document.querySelector('[data-template-id="req-validation-error-text"]');
          if (errorText) errorText.textContent = "Pelo menos um dos pedidos deve ser marcado como sim!";
          return;
        }

        requestsValidationError.classList.add('hidden');
        proceedToPreview(reestVal, matVal, morVal);
      });
    }

    if (requestsFormTransito) {
      requestsFormTransito.addEventListener('submit', (e) => {
        e.preventDefault();

        const material = document.querySelector('input[name="req-transito-material"]:checked')?.value;
        const medicas = document.querySelector('input[name="req-transito-medicas"]:checked')?.value;
        const moral = document.querySelector('input[name="req-transito-moral"]:checked')?.value;
        const allAnswered = material && medicas && moral;
        const hasAnyRequest = [material, medicas, moral].some(value => value === 'sim');

        if (!allAnswered || !hasAnyRequest) {
          if (requestsTransitoValidationError) requestsTransitoValidationError.classList.remove('hidden');
          return;
        }

        if (requestsTransitoValidationError) requestsTransitoValidationError.classList.add('hidden');
        pendingTransitoRequests = { material, medicas, moral };
        openProcessLocationStep();
      });
    }

    // Submit for TOI Requests
    if (requestsFormToi) {
      requestsFormToi.addEventListener('submit', (e) => {
        e.preventDefault();

        const neg = document.querySelector('input[name="req-toi-negativacao"]:checked')?.value;
        const reest = document.querySelector('input[name="req-toi-restabelecimento"]:checked')?.value;
        const abst = document.querySelector('input[name="req-toi-abstencao"]:checked')?.value;
        const imp = document.querySelector('input[name="req-toi-impedir-neg"]:checked')?.value;
        const desc = document.querySelector('input[name="req-toi-desconstituicao"]:checked')?.value;
        const decl = document.querySelector('input[name="req-toi-declaracao-nulidade"]:checked')?.value;
        const rest = document.querySelector('input[name="req-toi-restituicao"]:checked')?.value;
        const dobro = document.querySelector('input[name="req-toi-restituicao-dobro"]:checked')?.value;
        const mat = document.querySelector('input[name="req-toi-danos-materiais"]:checked')?.value;
        const mor = document.querySelector('input[name="req-toi-danos-morais"]:checked')?.value;

        let hasAnySim = [neg, reest, abst, imp, desc, decl, rest, dobro, mat, mor].some(val => val === 'sim');

        if (!hasAnySim) {
          requestsToiValidationError.classList.remove('hidden');
          return;
        }

        requestsToiValidationError.classList.add('hidden');
        proceedToPreview(reest, mat, mor, { neg, abst, imp, desc, decl, rest, dobro });
      });
    }

    // Submit for Negativacao/Cobranca Requests
    if (requestsFormNegativacao) {
      requestsFormNegativacao.addEventListener('submit', (e) => {
        e.preventDefault();

        const anul = document.querySelector('input[name="req-neg-anulacao"]:checked')?.value;
        const decl = document.querySelector('input[name="req-neg-declaracao-nulidade"]:checked')?.value;
        const excl = document.querySelector('input[name="req-neg-exclusao-negativacao"]:checked')?.value;
        const imp = document.querySelector('input[name="req-neg-impedir-neg"]:checked')?.value;
        const mat = document.querySelector('input[name="req-neg-danos-materiais"]:checked')?.value;
        const mor = document.querySelector('input[name="req-neg-danos-morais"]:checked')?.value;

        let hasAnySim = [anul, decl, excl, imp, mat, mor].some(val => val === 'sim');

        if (!hasAnySim) {
          requestsNegValidationError.classList.remove('hidden');
          return;
        }

        requestsNegValidationError.classList.add('hidden');
        proceedToPreview('nao', mat, mor, { anul, decl, excl, imp });
      });
    }

    function proceedToPreview(reestVal, matVal, morVal, toiExtras = null) {
        // Return safely to home (last wizard step built)
        pageRequestsStep.classList.add('hidden');

        // Build the preview only from the current in-memory form values.
        const currentValue = (id) => document.getElementById(id)?.value?.trim() || '';
        const currentText = (id) => {
          const text = document.getElementById(id)?.textContent?.trim() || '';
          return text === 'Selecione...' ? '' : text;
        };
        const setPreviewText = (id, value) => {
          const element = document.getElementById(id);
          if (element) element.textContent = value || 'Não informado';
        };

        const authorName = currentValue('auth-nome');
        const authorCpf = currentValue('auth-cpf');
        setPreviewText(
          'prev-author-name-cpf',
          authorName ? `${authorName}${authorCpf ? ` (CPF ${authorCpf})` : ''}` : ''
        );
        const civilStatus = currentText('auth-civil-span');
        const profession = currentText('auth-profissao-span');
        setPreviewText(
          'prev-author-civil-profession',
          [civilStatus, profession].filter(Boolean).join(' - ')
        );
        setPreviewText('prev-author-country', currentText('auth-nascimento-span'));

        const street = currentValue('auth-rua');
        const number = currentValue('auth-numero');
        const complement = currentValue('auth-complemento');
        const district = currentValue('auth-bairro');
        const city = currentValue('auth-cidade');
        const state = currentValue('auth-estado');
        const cep = currentValue('auth-cep');
        const addressParts = [
          [street, number].filter(Boolean).join(', '),
          complement,
          [district, city, state].filter(Boolean).join(' - '),
          cep ? `CEP: ${cep}` : ''
        ].filter(Boolean);
        setPreviewText('prev-author-address', addressParts.join(' | '));
        setPreviewText('prev-author-identity', currentValue('auth-identidade-txt'));
        setPreviewText('prev-author-phone', currentValue('auth-telefone'));
        setPreviewText('prev-author-email', currentValue('auth-email'));

        const authorUploadIndicators = document.querySelectorAll('#author-form .file-name-indicator');
        const addressFile = authorUploadIndicators[0]?.classList.contains('hidden')
          ? ''
          : authorUploadIndicators[0]?.textContent?.trim();
        const identityFile = authorUploadIndicators[1]?.classList.contains('hidden')
          ? ''
          : authorUploadIndicators[1]?.textContent?.trim();
        setPreviewText('prev-author-address-file', addressFile);
        setPreviewText('prev-author-identity-file', identityFile);
        
        // Dynamically populate Preview Petition fields before displaying
        const prevConcessionaria = document.getElementById('prev-val-concessionaria');
        if (prevConcessionaria) {
          if (currentSelectedCardIndex === 2) {
            const fabricante = document.getElementById('def-fabricante').value || '-';
            const cnpjFab = document.getElementById('def-cnpj-fabricante').value || 'Não informado';
            const vendedor = document.getElementById('def-vendedor').value || '-';
            const cnpjVend = document.getElementById('def-cnpj-vendedor').value || 'Não informado';
            prevConcessionaria.textContent = `Fabricante: ${fabricante} (CNPJ: ${cnpjFab}) / Vendedor: ${vendedor} (CNPJ: ${cnpjVend})`;
          } else if (currentSelectedCardIndex === 3) {
            const vendedora = currentValue('def-voo-vendedora') || '-';
            const cnpjVendedora = currentValue('def-voo-vendedora-cnpj') || 'Não informado';
            const operadora = currentValue('def-voo-operadora') || '-';
            const cnpjOperadora = currentValue('def-voo-operadora-cnpj') || 'Não informado';
            prevConcessionaria.textContent = `Companhia que vendeu o bilhete: ${vendedora} (CNPJ: ${cnpjVendedora}) / Companhia que fez o voo: ${operadora} (CNPJ: ${cnpjOperadora})`;
          } else if (currentSelectedCardIndex === 4) {
            const type = transitoSelectedType.value;
            if (type === 'empresa') {
              const name = document.getElementById('def-transito-nome-empresarial').value || '-';
              const doc = document.getElementById('def-transito-cnpj').value || '-';
              prevConcessionaria.textContent = `Empresa: ${name} (CNPJ: ${doc})`;
            } else {
              const name = document.getElementById('def-transito-nome').value || '-';
              const doc = document.getElementById('def-transito-cpf').value || '-';
              prevConcessionaria.textContent = `Pessoa: ${name} (CPF: ${doc})`;
            }
          } else {
            const selectedConcessionaria = defConcessionariaSpan.textContent.trim();
            const selectedCnpj = defCnpjInput.value.trim();
            prevConcessionaria.textContent = selectedConcessionaria && selectedConcessionaria !== 'Selecione...'
              ? `${selectedConcessionaria}${selectedCnpj ? ` (CNPJ ${selectedCnpj})` : ''}`
              : 'Não informado';
          }
        }

        const prevLblTime = document.getElementById('prev-lbl-time');
        if (prevLblTime) {
          if (currentSelectedCardIndex === 5) {
            prevLblTime.textContent = 'Tempo da cobrança ou negativação indevida';
          } else {
            prevLblTime.textContent = 'Tempo de suspensão/interrupção do serviço';
          }
        }

        const prevTime = document.getElementById('prev-val-time');
        const inputFactsTime = document.getElementById('facts-time');
        if (prevTime) {
          if (currentSelectedCardIndex === 2) {
            prevTime.textContent = `Compra em: ${document.getElementById('facts-vicio-data').value || '-'} | Valor pago: ${document.getElementById('facts-vicio-valor').value || '-'}`;
          } else if (currentSelectedCardIndex === 6) {
            prevTime.textContent = `TOI valor: ${document.getElementById('toi-valor-indevido').value || '-'}`;
          } else if (currentSelectedCardIndex === 4) {
            prevTime.textContent = `Data do acidente: ${document.getElementById('facts-transito-data').value || '-'} | Local: ${document.getElementById('facts-transito-local').value || '-'}`;
          } else if (inputFactsTime) {
            prevTime.textContent = inputFactsTime.value || '90 dias';
          }
        }

        const prevDesc = document.getElementById('prev-val-desc');
        if (prevDesc) {
          if (currentSelectedCardIndex === 2) {
            prevDesc.textContent = document.getElementById('facts-vicio-desc').value || '';
          } else if (currentSelectedCardIndex === 6) {
            prevDesc.textContent = document.getElementById('toi-descricao').value || '';
          } else if (currentSelectedCardIndex === 4) {
            prevDesc.textContent = document.getElementById('facts-transito-relato').value || '';
          } else if (factsDescription) {
            prevDesc.textContent = factsDescription.value || 'teste';
          }
        }

        const prevProtocols = document.getElementById('prev-val-protocols');
        if (prevProtocols) {
          if (protocolsArray && protocolsArray.length > 0) {
            prevProtocols.innerHTML = protocolsArray.map(p => `Nº ${p.number} ${p.fileName ? `(${p.fileName})` : ''}`).join('<br>');
          } else {
            prevProtocols.textContent = 'Nenhum protocolo informado';
          }
        }

        const prevHasMaterial = document.getElementById('prev-val-has-material');
        const isMaterialChecked = currentSelectedCardIndex === 6
          ? document.querySelector('input[name="req-toi-danos-materiais"]:checked')?.value
          : currentSelectedCardIndex === 3
            ? document.querySelector('input[name="req-voo-material"]:checked')?.value
          : currentSelectedCardIndex === 2
            ? document.querySelector('input[name="vicio-has-material"]:checked')?.value
            : document.querySelector('input[name="has-material-damage"]:checked')?.value;
        if (prevHasMaterial) {
          prevHasMaterial.textContent = isMaterialChecked === 'sim' ? 'Sim' : 'Não';
        }

        const prevHasMoral = document.getElementById('prev-val-has-moral');
        const isMoralChecked = currentSelectedCardIndex === 6
          ? document.querySelector('input[name="req-toi-danos-morais"]:checked')?.value
          : currentSelectedCardIndex === 3
            ? document.querySelector('input[name="req-voo-moral"]:checked')?.value
          : currentSelectedCardIndex === 2
            ? document.querySelector('input[name="vicio-has-moral"]:checked')?.value
            : document.querySelector('input[name="has-moral-damage"]:checked')?.value;
        if (prevHasMoral) {
          prevHasMoral.textContent = isMoralChecked === 'sim' ? 'Sim' : 'Não';
        }

        // Testemunhas
        const prevWitnesses = document.getElementById('prev-val-witnesses');
        const isWitnessesChecked = document.querySelector('input[name="has-witnesses"]:checked')?.value;
        if (prevWitnesses) {
          if (isWitnessesChecked === 'sim' && witnessesArray && witnessesArray.length > 0) {
            prevWitnesses.innerHTML = witnessesArray.map(w => `${w.name} (CPF: ${w.cpf || 'Não informado'})`).join('<br>');
          } else {
            prevWitnesses.textContent = 'Não informado';
          }
        }

        // Pedidos list
        const prevRequestsList = document.getElementById('prev-val-requests-list');
        if (prevRequestsList) {
          let reqListHtml = '';
          if (toiExtras) {
            if (currentSelectedCardIndex === 3 && toiExtras.type === 'voo') {
              if (morVal === 'sim') {
                const amount = document.getElementById('req-voo-moral-value')?.value || 'Não informado';
                const reason = document.getElementById('req-voo-moral-reason')?.value || 'Não informado';
                reqListHtml += `<li>Requer indenização pelos danos morais no valor de ${amount}. Justificativa: ${reason}</li>`;
              }
              if (toiExtras.bilhete === 'sim') {
                const amount = document.getElementById('req-voo-bilhete-value')?.value || 'Não informado';
                const reason = document.getElementById('req-voo-bilhete-reason')?.value || 'Não informado';
                reqListHtml += `<li>Requer a restituição do valor do bilhete original, no valor de ${amount}. Justificativa: ${reason}</li>`;
              }
              if (matVal === 'sim') {
                const amount = document.getElementById('req-voo-material-value')?.value || 'Não informado';
                const reason = document.getElementById('req-voo-material-reason')?.value || 'Não informado';
                reqListHtml += `<li>Requer indenização pelos danos materiais no valor de ${amount}. Justificativa: ${reason}</li>`;
              }
            } else if (currentSelectedCardIndex === 4 && toiExtras.type === 'transito') {
              if (matVal === 'sim') {
                const materialAmount = document.getElementById('req-transito-material-value')?.value || 'Não informado';
                reqListHtml += `<li>Requer indenização pelos danos do veículo/danos materiais no valor de ${materialAmount}.</li>`;
              }
              if (toiExtras.medicas === 'sim') {
                const medicalAmount = document.getElementById('req-transito-medicas-value')?.value || 'Não informado';
                reqListHtml += `<li>Requer indenização pelas despesas médicas, tratamento e/ou medicamentos no valor de ${medicalAmount}.</li>`;
              }
              if (morVal === 'sim') {
                const moralAmount = document.getElementById('req-transito-moral-value')?.value || 'Não informado';
                reqListHtml += `<li>Requer indenização pelos danos morais no valor de ${moralAmount}.</li>`;
              }
            } else if (currentSelectedCardIndex === 5) {
              if (toiExtras.anul === 'sim') reqListHtml += '<li>Deseja a anulação das cobranças e da dívida.</li>';
              if (toiExtras.decl === 'sim') reqListHtml += '<li>Deseja a declaração de quitação/inexistência/nulidade das cobranças e da dívida.</li>';
              if (toiExtras.excl === 'sim') reqListHtml += '<li>Deseja a retirada imediata dos seus dados dos cadastros de devedores – exclusão da negativação.</li>';
              if (toiExtras.imp === 'sim') reqListHtml += '<li>Deseja impedir que o réu inclua seus dados no cadastro de devedores (Serasa, SPC, etc).</li>';
              if (matVal === 'sim') {
                const matAmount = reqNegMatVal.value || 'R$ 5.000,00';
                reqListHtml += `<li>Entende que o valor de ${matAmount} é necessário para compensar os danos materiais sofridos.</li>`;
              }
              if (morVal === 'sim') {
                const morAmount = reqNegMorVal.value || 'R$ 5.000,00';
                reqListHtml += `<li>Entende que o valor de ${morAmount} é necessário para compensar os danos morais sofridos.</li>`;
              }
            } else {
              if (toiExtras.neg === 'sim') reqListHtml += '<li>Deseja a retirada imediata dos dados do(s) cadastro(s) restritivo(s).</li>';
              if (reestVal === 'sim') reqListHtml += '<li>Deseja o restabelecimento imediato do serviço.</li>';
              if (toiExtras.abst === 'sim') reqListHtml += '<li>Deseja que o réu se abstenha de interromper o fornecimento.</li>';
              if (toiExtras.imp === 'sim') reqListHtml += '<li>Deseja impedir inclusão nos cadastros de devedores.</li>';
              if (toiExtras.desc === 'sim') reqListHtml += '<li>Deseja a desconstituição/anulação/exclusão do TOI e da dívida.</li>';
              if (toiExtras.decl === 'sim') reqListHtml += '<li>Deseja a declaração de quitação/inexistência/nulidade do TOI.</li>';
              if (toiExtras.rest === 'sim') reqListHtml += '<li>Deseja a restituição da quantia paga pelo TOI.</li>';
              if (toiExtras.dobro === 'sim') reqListHtml += '<li>Deseja a restituição em dobro do valor pago.</li>';
              
              if (matVal === 'sim') {
                const matAmount = reqToiMatVal.value || 'R$ 9.000,00';
                reqListHtml += `<li>Entende que o valor de ${matAmount} é necessário para compensar os danos materiais sofridos.</li>`;
              }
              if (morVal === 'sim') {
                const morAmount = reqToiMorVal.value || 'R$ 9.000,00';
                reqListHtml += `<li>Entende que o valor de ${morAmount} é necessário para compensar os danos morais sofridos.</li>`;
              }
            }
          } else {
            if (reestVal === 'sim') {
              if (currentSelectedCardIndex === 2) {
                const selectedText = reqVicioDropdownSpan.textContent;
                reqListHtml += `<li>Deseja: ${selectedText}.</li>`;
              } else {
                reqListHtml += '<li>Deseja o restabelecimento imediato do serviço.</li>';
              }
            }
            if (matVal === 'sim') {
              const matAmount = reqMaterialVal.value || 'R$ 5.000,00';
              reqListHtml += `<li>Entende que o valor de ${matAmount} é necessário para compensar os danos materiais sofridos.</li>`;
            } else {
              reqListHtml += '<li>Entende que não é necessário indenização pelos danos materiais sofridos.</li>';
            }
            if (morVal === 'sim') {
              const morAmount = reqMoralVal.value || 'R$ 5.000,00';
              reqListHtml += `<li>Entende que o valor de ${morAmount} é necessário para compensar os danos morais sofridos.</li>`;
            } else {
              reqListHtml += '<li>Entende que não é necessário indenização pelos danos morais sofridos.</li>';
            }
          }
          prevRequestsList.innerHTML = reqListHtml;
        }

        const previewLocationSection = document.getElementById('preview-location-section');
        const previewLocationValue = document.getElementById('prev-val-process-location');
        const isTrafficLocation = currentSelectedCardIndex === 4 && toiExtras?.type === 'transito';
        if (previewLocationSection) previewLocationSection.classList.toggle('hidden', !isTrafficLocation);
        if (isTrafficLocation && previewLocationValue) {
          const selectedAddress = toiExtras.location === 'autor'
            ? document.getElementById('location-author-address')?.textContent
            : document.getElementById('location-defendant-address')?.textContent;
          const selectedLabel = toiExtras.location === 'autor' ? 'Endereço do autor' : 'Endereço do réu';
          previewLocationValue.textContent = `${selectedLabel}: ${selectedAddress || 'Não informado'}`;
        }

        // Date update
        const prevDate = document.getElementById('prev-val-date');
        if (prevDate) {
          const today = new Date();
          const day = String(today.getDate()).padStart(2, '0');
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const year = today.getFullYear();
          prevDate.textContent = `${day}/${month}/${year}`;
        }

        // Navigate to the newly introduced Step 6: Petição Preview
        const pagePetitionPreview = document.getElementById('page-petition-preview');
        const prevDocTitleType = document.getElementById('prev-doc-title-type');
        const previewLocalStep = document.getElementById('preview-local-step');
        const previewPetitionStepNumber = document.getElementById('preview-petition-step-number');

        if (previewLocalStep) {
          previewLocalStep.classList.toggle('hidden', currentSelectedCardIndex !== 4);
          previewLocalStep.classList.toggle('flex', currentSelectedCardIndex === 4);
          previewLocalStep.parentElement?.classList.toggle('traffic-stepper', currentSelectedCardIndex === 4);
        }
        if (previewPetitionStepNumber) {
          previewPetitionStepNumber.textContent = currentSelectedCardIndex === 4 ? '7' : '6';
        }

        if (currentSelectedCardIndex === 2) {
          if (prevDocTitleType) prevDocTitleType.textContent = 'Vício do Produto';
        } else if (currentSelectedCardIndex === 4) {
          if (prevDocTitleType) prevDocTitleType.textContent = 'Acidente de trânsito';
        } else if (currentSelectedCardIndex === 5) {
          if (prevDocTitleType) prevDocTitleType.textContent = 'Cobrança ou negativação indevida';
        } else if (currentSelectedCardIndex === 6) {
          if (prevDocTitleType) prevDocTitleType.textContent = 'Apontamento de irregularidade (TOI)';
        } else {
          if (prevDocTitleType) prevDocTitleType.textContent = 'Interrupção de serviço essencial';
        }

        if (pagePetitionPreview) {
          if (previewDeclarationCheckbox) previewDeclarationCheckbox.checked = false;
          if (btnPreviewSubmit) btnPreviewSubmit.disabled = true;
          pagePetitionPreview.classList.remove('hidden');
        } else {
          goToHome();
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Petition Preview Button actions
    const btnPreviewBack = document.getElementById('btn-preview-back');
    const btnPreviewSubmit = document.getElementById('btn-preview-submit');
    const previewDeclarationCheckbox = document.getElementById('preview-declaration-checkbox');
    const modalConfirmSubmit = document.getElementById('modal-confirm-submit');
    const modalSubmitClose = document.getElementById('modal-submit-close');
    const btnSubmitModalCancel = document.getElementById('btn-submit-modal-cancel');
    const btnSubmitModalConfirm = document.getElementById('btn-submit-modal-confirm');
    const pagePetitionSent = document.getElementById('page-petition-sent');
    const btnPetitionSentFinish = document.getElementById('btn-petition-sent-finish');

    if (btnPreviewBack) {
      btnPreviewBack.addEventListener('click', (e) => {
        e.preventDefault();
        const pagePetitionPreview = document.getElementById('page-petition-preview');
        if (pagePetitionPreview) pagePetitionPreview.classList.add('hidden');
        if (currentSelectedCardIndex === 4 && pageProcessLocation) {
          pageProcessLocation.classList.remove('hidden');
        } else {
          pageRequestsStep.classList.remove('hidden');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (previewDeclarationCheckbox && btnPreviewSubmit) {
      previewDeclarationCheckbox.addEventListener('change', (e) => {
        btnPreviewSubmit.disabled = !e.target.checked;
      });
    }

    if (btnPreviewSubmit) {
      btnPreviewSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        // Show confirmation modal instead of directly submitting
        if (modalConfirmSubmit) {
          modalConfirmSubmit.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }
      });
    }

    function closeSubmitModal() {
      if (modalConfirmSubmit) {
        modalConfirmSubmit.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }

    if (modalSubmitClose) modalSubmitClose.addEventListener('click', closeSubmitModal);
    if (btnSubmitModalCancel) btnSubmitModalCancel.addEventListener('click', closeSubmitModal);

    if (btnSubmitModalConfirm) {
      btnSubmitModalConfirm.addEventListener('click', (e) => {
        e.preventDefault();
        closeSubmitModal();

        // Update the sent time and date dynamically
        const sentDateTime = document.getElementById('sent-date-time');
        if (sentDateTime) {
          const now = new Date();
          const day = String(now.getDate()).padStart(2, '0');
          const month = String(now.getMonth() + 1).padStart(2, '0');
          const year = now.getFullYear();
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          sentDateTime.textContent = `${day}/${month}/${year} às ${hours}:${minutes}`;
        }

        // Show Final Success Toast
        const protocolNumber = `EC-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
        const protocolElement = document.getElementById('sent-process-number');
        if (protocolElement) protocolElement.textContent = protocolNumber;

        showNotification(
            'Relatório concluído!',
            `O protocolo interno ${protocolNumber} foi gerado somente para esta sessão.`
            );

        // Hide petition preview page
        const pagePetitionPreview = document.getElementById('page-petition-preview');
        if (pagePetitionPreview) pagePetitionPreview.classList.add('hidden');

        // Show page petition sent
        if (pagePetitionSent) {
          pagePetitionSent.classList.remove('hidden');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (btnPetitionSentFinish) {
      btnPetitionSentFinish.addEventListener('click', () => {
        if (pagePetitionSent) {
          pagePetitionSent.classList.add('hidden');
        }
        
        // Reset all simulation state and forms
        protocolsArray = [];
        witnessesArray = [];
        currentSelectedCardIndex = null;
        pendingTransitoRequests = null;
        syncTrafficStepperLayout();
        
        // Reset forms
        if (authorForm) authorForm.reset();
        if (defendantForm) defendantForm.reset();
        if (defendantFormVicio) defendantFormVicio.reset();
        if (defendantFormTransito) {
          defendantFormTransito.reset();
          // Reset toggle
          const btnTransitoEmpresa = document.getElementById('transito-type-empresa');
          if (btnTransitoEmpresa) btnTransitoEmpresa.click();
        }
        if (factsForm) factsForm.reset();
        if (factsFormVicio) factsFormVicio.reset();
        if (factsFormToi) factsFormToi.reset();
        if (requestsForm) requestsForm.reset();
        if (requestsFormTransito) requestsFormTransito.reset();
        if (processLocationForm) processLocationForm.reset();
        if (requestsFormToi) requestsFormToi.reset();
        if (requestsFormNegativacao) requestsFormNegativacao.reset();
        if (proofsForm) proofsForm.reset();
        
        // Reset UI custom states
        const authCivilSpan = document.getElementById('auth-civil-span');
        if (authCivilSpan) {
          authCivilSpan.textContent = 'Selecione...';
          authCivilSpan.className = 'text-gray-500';
        }
        const authCivilInput = document.getElementById('auth-civil');
        if (authCivilInput) authCivilInput.value = '';

        if (reqVicioDropdownSpan) {
          reqVicioDropdownSpan.textContent = 'Selecione...';
          reqVicioDropdownSpan.className = 'text-gray-500';
        }
        if (reqVicioDropdownValue) reqVicioDropdownValue.value = '';
        
        const authProfissaoSpan = document.getElementById('auth-profissao-span');
        if (authProfissaoSpan) {
          authProfissaoSpan.textContent = 'Selecione...';
          authProfissaoSpan.className = 'text-gray-500';
        }
        const authProfissaoInput = document.getElementById('auth-profissao');
        if (authProfissaoInput) authProfissaoInput.value = '';

        const defConcessionariaSpan = document.getElementById('def-concessionaria-span');
        if (defConcessionariaSpan) {
          defConcessionariaSpan.textContent = 'Selecione...';
          defConcessionariaSpan.className = 'text-gray-500';
        }
        const lblDefConcessionaria = document.querySelector('[data-template-id="lbl-def-concessionaria"]');
        if (lblDefConcessionaria) {
          lblDefConcessionaria.textContent = 'Indique a Concessionária do serviço público *';
        }
        const defConcessionariaInput = document.getElementById('def-concessionaria');
        if (defConcessionariaInput) defConcessionariaInput.value = '';
        const defCnpjInput = document.getElementById('def-cnpj');
        if (defCnpjInput) defCnpjInput.value = '';

        // Reset file upload indicators
        document.querySelectorAll('.file-name-indicator').forEach(ind => {
          ind.classList.add('hidden');
          ind.textContent = 'Nenhum arquivo selecionado';
          ind.className = 'file-name-indicator text-xs text-gray-500 italic hidden';
        });
        
        const vicioUploadedFileRow = document.getElementById('vicio-uploaded-file-row');
        const vicioUploadButtonZone = document.getElementById('vicio-upload-button-zone');
        if (vicioUploadedFileRow) vicioUploadedFileRow.classList.add('hidden');
        if (vicioUploadButtonZone) vicioUploadButtonZone.classList.remove('hidden');

        // Restore forms visibility instead of summaries
        if (authorSummary) authorSummary.classList.add('hidden');
        if (authorForm) authorForm.classList.remove('hidden');
        if (defendantSummary) defendantSummary.classList.add('hidden');
        
        // Reset check indicators
        const reqCheckItem1 = document.querySelector('[data-template-id="req-need-item1"]');
        if (reqCheckItem1) {
          reqCheckItem1.innerHTML = 'Conta gov.br com nível prata ou ouro';
        }
        
        // Reset user headers
        const userLevelVal = document.querySelector('[data-template-id="header-user-level-val"]');
        const userTooltip = document.querySelector('[data-template-id="header-user-tooltip"]');
        if (userLevelVal) {
          userLevelVal.textContent = 'Prata';
          userLevelVal.className = 'canva-text text-blue-500 font-extrabold text-xs uppercase';
        }
        if (userTooltip) {
          userTooltip.textContent = 'Olá, Meu Nome (Nível Prata)';
        }

        goToHome();
      });
    }

    if (proofsForm) {
      // Toggle condicional para Testemunhas e Gerenciamento de Lista de Testemunhas
      const hasWitnessesRadio = document.getElementsByName('has-witnesses');
      const witnessesPanel = document.getElementById('witnesses-panel');
      const btnAddWitnessBox = document.getElementById('btn-add-witness-box');
      const btnAddWitness = document.getElementById('btn-add-witness');
      const witnessFormCard = document.getElementById('witness-form-card');
      const btnCancelWitness = document.getElementById('btn-cancel-witness');
      const btnSaveWitness = document.getElementById('btn-save-witness');
      const witnessesListContainer = document.getElementById('witnesses-list-container');
      const witnessesList = document.getElementById('witnesses-list');

      // Inputs do formulário de testemunhas
      const inputWitnessName = document.getElementById('witness-name');
      const inputWitnessCpf = document.getElementById('witness-cpf');
      const inputWitnessAddress = document.getElementById('witness-address');
      const inputWitnessPhone = document.getElementById('witness-phone');
      const inputWitnessEmail = document.getElementById('witness-email');

      function renderWitnesses() {
        if (witnessesArray.length === 0) {
          witnessesListContainer.classList.add('hidden');
          witnessesList.innerHTML = '';
        } else {
          witnessesListContainer.classList.remove('hidden');
          witnessesList.innerHTML = witnessesArray.map((w, index) => `
            <div class="flex justify-between items-start py-3 text-xs text-gray-700 border-b border-gray-100 last:border-b-0 text-left">
              <div class="space-y-1">
                <div class="font-bold text-gray-900 text-sm">${w.name}</div>
                ${w.cpf ? `<div class="text-gray-500 font-medium">CPF: <span class="font-mono">${w.cpf}</span></div>` : ''}
                <div class="text-gray-600"><span class="font-semibold text-gray-500">Endereço:</span> ${w.address}</div>
                <div class="text-gray-600"><span class="font-semibold text-gray-500">Contato:</span> ${w.phone} ${w.email ? ` | ${w.email}` : ''}</div>
              </div>
              <button type="button" class="btn-delete-witness text-red-600 hover:text-red-800 font-semibold px-2 py-1 rounded border border-red-200 hover:bg-red-50 transition text-[10px] inline-flex items-center gap-1 shrink-0 ml-2" data-index="${index}">
                <i class="fa fa-trash-o" aria-hidden="true"></i> Excluir
              </button>
            </div>
          `).join('');

          // Add delete listeners
          witnessesList.querySelectorAll('.btn-delete-witness').forEach(btn => {
            btn.addEventListener('click', (e) => {
              const index = parseInt(btn.getAttribute('data-index'));
              witnessesArray.splice(index, 1);
              renderWitnesses();
              checkWitnessLimit();
            });
          });
        }
      }

      function checkWitnessLimit() {
        if (witnessesArray.length >= 5) {
          btnAddWitnessBox.classList.add('hidden');
          witnessFormCard.classList.add('hidden');
        } else {
          btnAddWitnessBox.classList.remove('hidden');
        }
      }

      if (btnAddWitness) {
        btnAddWitness.addEventListener('click', (e) => {
          e.preventDefault();
          if (witnessesArray.length >= 5) {
            showNotification('Limite Atingido', 'Você já atingiu o limite máximo de 5 testemunhas.', true);
            return;
          }
          // Show form and hide add button box
          witnessFormCard.classList.remove('hidden');
          btnAddWitnessBox.classList.add('hidden');
        });
      }

      if (btnCancelWitness) {
        btnCancelWitness.addEventListener('click', (e) => {
          e.preventDefault();
          witnessFormCard.classList.add('hidden');
          checkWitnessLimit();
          // Reset form fields
          inputWitnessName.value = '';
          inputWitnessCpf.value = '';
          inputWitnessAddress.value = '';
          inputWitnessPhone.value = '';
          inputWitnessEmail.value = '';
        });
      }

      if (btnSaveWitness) {
        btnSaveWitness.addEventListener('click', (e) => {
          e.preventDefault();
          const name = inputWitnessName.value.trim();
          const cpf = inputWitnessCpf.value.trim();
          const address = inputWitnessAddress.value.trim();
          const phone = inputWitnessPhone.value.trim();
          const email = inputWitnessEmail.value.trim();

          if (!name || !address || !phone) {
            showNotification('Campos Obrigatórios', 'Por favor, preencha todos os campos obrigatórios (*).', true);
            return;
          }

          witnessesArray.push({ name, cpf, address, phone, email });
          renderWitnesses();

          // Reset form and adjust visibility
          witnessFormCard.classList.add('hidden');
          checkWitnessLimit();

          inputWitnessName.value = '';
          inputWitnessCpf.value = '';
          inputWitnessAddress.value = '';
          inputWitnessPhone.value = '';
          inputWitnessEmail.value = '';
        });
      }

      if (hasWitnessesRadio && witnessesPanel) {
        hasWitnessesRadio.forEach(radio => {
          radio.addEventListener('change', (e) => {
            if (e.target.value === 'sim') {
              witnessesPanel.classList.remove('hidden');
              renderWitnesses();
              checkWitnessLimit();
            } else {
              witnessesPanel.classList.add('hidden');
            }
          });
        });
      }

      // Toggle condicional para Outros Documentos
      const hasOtherDocsRadio = document.getElementsByName('has-other-docs');
      const otherDocsPanel = document.getElementById('other-docs-panel');
      if (hasOtherDocsRadio && otherDocsPanel) {
        hasOtherDocsRadio.forEach(radio => {
          radio.addEventListener('change', (e) => {
            if (e.target.value === 'sim') {
              otherDocsPanel.classList.remove('hidden');
            } else {
              otherDocsPanel.classList.add('hidden');
            }
          });
        });
      }

      // Toggle condicional para Mídia
      const hasMediaRadio = document.getElementsByName('has-media');
      const mediaPanel = document.getElementById('media-panel');
      if (hasMediaRadio && mediaPanel) {
        hasMediaRadio.forEach(radio => {
          radio.addEventListener('change', (e) => {
            if (e.target.value === 'sim') {
              mediaPanel.classList.remove('hidden');
            } else {
              mediaPanel.classList.add('hidden');
            }
          });
        });
      }

      proofsForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // REQUIRE AT LEAST ONE WITNESS (Testemunha) TO BE ADDED
        const hasWitnessesSelected = document.querySelector('input[name="has-witnesses"]:checked')?.value;
        if (hasWitnessesSelected === 'sim' && witnessesArray.length === 0) {
          showNotification('Aviso', 'Por favor, adicione pelo menos uma testemunha na lista ou marque "Não".', true);
          return;
        }

        // Advance to Step 5: Pedidos (page-requests-step)
        if (pageOtherProofs) pageOtherProofs.classList.add('hidden');
        if (pageRequestsStep) pageRequestsStep.classList.remove('hidden');
        showCorrectRequestsForm();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Save Author Form Submission
    if (authorForm) {
      authorForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Populate summary values from form
        const rawCpf = document.getElementById('auth-cpf').value;
        const rawNome = document.getElementById('auth-nome').value;
        const valCivil = document.getElementById('auth-civil-span').textContent;
        const valProfissao = document.getElementById('auth-profissao-span').textContent;
        const valNascimento = document.getElementById('auth-nascimento-span').textContent;
        const valCep = document.getElementById('auth-cep').value;
        const valRua = document.getElementById('auth-rua').value;
        const valNumero = document.getElementById('auth-numero').value;
        const valComplemento = document.getElementById('auth-complemento').value || 'Não informado';
        const valBairro = document.getElementById('auth-bairro').value;
        const valCidade = document.getElementById('auth-cidade').value;
        const valEstado = document.getElementById('auth-estado').value;
        const valIdentidade = document.getElementById('auth-identidade-txt').value || 'Não informado';
        const valTelefone = document.getElementById('auth-telefone').value;
        const valEmail = document.getElementById('auth-email').value;

        // Set summary texts
        document.getElementById('summary-name').textContent = rawNome;
        document.getElementById('summary-cpf').textContent = rawCpf;
        document.getElementById('sum-val-civil').textContent = valCivil;
        document.getElementById('sum-val-profissao').textContent = valProfissao;
        document.getElementById('sum-val-nascimento').textContent = valNascimento;
        document.getElementById('sum-val-cep').textContent = valCep;
        document.getElementById('sum-val-rua').textContent = valRua;
        document.getElementById('sum-val-numero').textContent = valNumero;
        document.getElementById('sum-val-complemento').textContent = valComplemento;
        document.getElementById('sum-val-bairro').textContent = valBairro;
        document.getElementById('sum-val-cidade').textContent = valCidade;
        document.getElementById('sum-val-estado').textContent = valEstado;
        document.getElementById('sum-val-identidade-txt').textContent = valIdentidade;
        document.getElementById('sum-val-telefone').textContent = valTelefone;
        document.getElementById('sum-val-email').textContent = valEmail;

        // Update upload dynamic file text values
        const uploadIndicators = document.querySelectorAll('.file-name-indicator');
        const addrIndicator = uploadIndicators[0];
        const photoIndicator = uploadIndicators[1];

        const sumValAddr = document.getElementById('sum-val-upload-address');
        const sumValPhoto = document.getElementById('sum-val-upload-photo');

        if (addrIndicator && !addrIndicator.classList.contains('hidden')) {
          sumValAddr.querySelector('span').textContent = addrIndicator.textContent;
          sumValAddr.classList.remove('hidden');
        } else {
          sumValAddr.querySelector('span').textContent = 'Nenhum arquivo enviado';
        }

        if (photoIndicator && !photoIndicator.classList.contains('hidden')) {
          sumValPhoto.querySelector('span').textContent = photoIndicator.textContent;
          sumValPhoto.classList.remove('hidden');
        } else {
          sumValPhoto.querySelector('span').textContent = 'Nenhum arquivo enviado';
        }

        authorForm.classList.add('hidden');
        authorSummary.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Masking Helper Functions
    function applyCPFMask(inputEl) {
      if (!inputEl) return;
      inputEl.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 9) {
          value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4');
        } else if (value.length > 6) {
          value = value.replace(/^(\d{3})(\d{3})(\d{1,3})$/, '$1.$2.$3');
        } else if (value.length > 3) {
          value = value.replace(/^(\d{3})(\d{1,3})$/, '$1.$2');
        }
        e.target.value = value;
      });
    }

    function applyPhoneMask(inputEl) {
      if (!inputEl) return;
      inputEl.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 10) {
          value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (value.length > 6) {
          value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
        } else if (value.length > 2) {
          value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
        } else if (value.length > 0) {
          value = '(' + value;
        }
        e.target.value = value;
      });
    }

    // Apply Masks to Elements
    applyCPFMask(document.getElementById('govbr-cpf-input'));
    applyCPFMask(document.getElementById('witness-cpf'));
    applyPhoneMask(document.getElementById('auth-telefone'));
    applyPhoneMask(document.getElementById('witness-phone'));

    // Login Form Submission simulation
    if (govbrLoginForm) {
      govbrLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cpf = govbrCpfInput.value;
        if (cpf.replace(/\D/g, '').length < 11) {
          showNotification('CPF Inválido', 'Por favor, digite um CPF válido.', true);
          return;
        }

        // Show loading state
        const originalBtnText = govbrSubmitBtn.innerHTML;
        govbrSubmitBtn.disabled = true;
        govbrSubmitBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2" aria-hidden="true"></i> Autenticando...';

        setTimeout(() => {
          // Success Simulation
          govbrSubmitBtn.innerHTML = originalBtnText;
          govbrSubmitBtn.disabled = false;
          govbrCpfInput.value = '';

          // Transition to transitional Loading Overlay
          const loadingOverlay = document.getElementById('govbr-loading-overlay');
          if (loadingOverlay) {
            loadingOverlay.classList.remove('hidden');
          }

          setTimeout(() => {
            // Hide loading overlay
            if (loadingOverlay) {
              loadingOverlay.classList.add('hidden');
            }

            // Transition back to app
            govbrWrapper.classList.add('hidden');
            appWrapper.classList.remove('hidden');

            // Elevate user level and change header level label
            const userLevelVal = document.querySelector('[data-template-id="header-user-level-val"]');
            const userTooltip = document.querySelector('[data-template-id="header-user-tooltip"]');
            if (userLevelVal) {
              userLevelVal.textContent = 'Ouro';
              userLevelVal.className = 'canva-text text-amber-500 font-extrabold text-xs uppercase';
            }
            if (userTooltip) {
              userTooltip.textContent = 'Olá, Meu Nome (Nível Ouro)';
            }

            // Show Toast Success
            showNotification(
                'Autenticação Realizada!',
                'Sua conta gov.br (Nível Ouro) foi conectada com sucesso!'
                );
            
            // Also check off the requirements list
            const reqCheckItem1 = document.querySelector('[data-template-id="req-need-item1"]');
            if (reqCheckItem1) {
              reqCheckItem1.innerHTML = 'Conta gov.br conectada (Nível Ouro) <i class="fa fa-check text-green-500 ml-1"></i>';
            }

            // Open the saved complaints modal overlay
            if (savedComplaintsModal) {
              setTimeout(() => {
                savedComplaintsModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
              }, 1000);
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 3000); // Display loading screen for 3 seconds as requested
        }, 1500);
      });
    }

    // Saved Complaints Modal Event Listeners
    if (savedModalCloseBtn) {
      savedModalCloseBtn.addEventListener('click', () => {
        savedComplaintsModal.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Go directly to the Step 1: Qualification page
        showOnlyPage(pageAuthorQualification);
        const subNav = document.getElementById('header-subnav');
        if (subNav) subNav.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (savedModalBtnNew) {
      savedModalBtnNew.addEventListener('click', () => {
        savedComplaintsModal.classList.add('hidden');
        document.body.style.overflow = '';
        // Go directly to the Step 1: Qualification page
        pageHome.classList.add('hidden');
        pageRequirements.classList.add('hidden');
        pageAuthorQualification.classList.remove('hidden');
        const subNav = document.getElementById('header-subnav');
        if (subNav) subNav.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    savedContinueBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        savedComplaintsModal.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Go directly to the Step 1: Qualification page
        pageHome.classList.add('hidden');
        pageRequirements.classList.add('hidden');
        pageAuthorQualification.classList.remove('hidden');
        const subNav = document.getElementById('header-subnav');
        if (subNav) subNav.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // Privacy Modal Elements
    const privacyModalOverlay = document.getElementById('privacy-modal-overlay');
    const privacyModalCloseBtn = document.getElementById('privacy-modal-close-btn');
    const privacyModalBtnClose = document.getElementById('privacy-modal-btn-close');
    const footerLinkPrivacy = document.getElementById('footer-link-privacy');

    if (footerLinkPrivacy) {
      footerLinkPrivacy.addEventListener('click', (e) => {
        e.preventDefault();
        privacyModalOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      });
    }

    function closePrivacyModal() {
      privacyModalOverlay.classList.add('hidden');
      document.body.style.overflow = '';
    }

    if (privacyModalCloseBtn) privacyModalCloseBtn.addEventListener('click', closePrivacyModal);
    if (privacyModalBtnClose) privacyModalBtnClose.addEventListener('click', closePrivacyModal);
    if (privacyModalOverlay) {
      privacyModalOverlay.addEventListener('click', (e) => {
        if (e.target === privacyModalOverlay) closePrivacyModal();
      });
    }

    const originalStepperMarkup = new WeakMap();

    function syncTrafficStepperLayout() {
      const isTraffic = currentSelectedCardIndex === 4;
      const isFlight = currentSelectedCardIndex === 3;
      const pageIds = [
        'page-author-qualification',
        'page-defendant-qualification',
        'page-facts-arguments',
        'page-flight-problem',
        'page-flight-losses',
        'page-other-proofs',
        'page-requests-step',
        'page-petition-preview'
      ];
      const flightActiveStep = {
        'page-author-qualification': 1,
        'page-defendant-qualification': 2,
        'page-facts-arguments': 3,
        'page-flight-problem': 4,
        'page-flight-losses': 5,
        'page-other-proofs': 6,
        'page-requests-step': 7,
        'page-petition-preview': 8
      };
      const flightSteps = [
        'Seus dados',
        'Empresas',
        'Sua viagem',
        'Ocorrido',
        'Impactos',
        'Comprovantes',
        'Resultado',
        'Resumo'
      ];

      pageIds.forEach(pageId => {
        const page = document.getElementById(pageId);
        const stepper = page?.querySelector('.flex.items-center.justify-between.text-center.relative');
        if (!stepper) return;
        if (!originalStepperMarkup.has(stepper)) {
          originalStepperMarkup.set(stepper, stepper.innerHTML);
        }

        const factsMainTitle = document.querySelector('[data-template-id="facts-main-title"]');
        if (factsMainTitle) {
          factsMainTitle.textContent = currentSelectedCardIndex === 3 ? 'Dados do voo' : 'Relato do problema';
        }

        if (isFlight) {
          const activeStep = flightActiveStep[pageId] || 1;
          stepper.classList.remove('traffic-stepper');
          stepper.classList.add('flight-stepper');
          stepper.innerHTML = `
            <div class="absolute left-4 right-4 top-5 h-0.5 bg-gray-200 -z-10"></div>
            ${flightSteps.map((label, index) => {
              const number = index + 1;
              const completed = number < activeStep;
              const active = number === activeStep;
              const circleClass = completed
                ? 'border-emerald-600 bg-emerald-50 text-emerald-600'
                : active
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-gray-300 bg-white text-gray-500';
              const labelClass = active ? 'font-bold text-blue-700' : 'font-medium text-gray-500';
              return `<div class="flex-1 min-w-0 flex flex-col items-center${number > activeStep ? ' opacity-60' : ''}">
                <div class="w-9 h-9 rounded-full border-2 ${circleClass} font-bold flex items-center justify-center text-xs shadow-sm">
                  ${completed ? '<i class="fa fa-check" aria-hidden="true"></i>' : number}
                </div>
                <span class="text-[11px] ${labelClass} mt-2 leading-tight px-1">${label}</span>
              </div>`;
            }).join('')}
          `;
          return;
        }

        if (stepper.classList.contains('flight-stepper')) {
          stepper.innerHTML = originalStepperMarkup.get(stepper);
          stepper.classList.remove('flight-stepper');
        }
        stepper.classList.toggle('traffic-stepper', isTraffic);

        const petitionStep = Array.from(stepper.children).find(child =>
          child.classList.contains('flex-1') &&
          Array.from(child.querySelectorAll('span')).some(span =>
            span.dataset.templateId === 'step6-label' || ['Petição', 'Revisão'].includes(span.textContent.trim())
          )
        );
        if (!petitionStep) return;

        let localStep = Array.from(stepper.children).find(child =>
          child.classList.contains('traffic-local-step')
        );

        if (isTraffic && !localStep) {
          localStep = document.createElement('div');
          localStep.className = 'traffic-local-step flex-1 flex flex-col items-center opacity-60';
          localStep.innerHTML = `
            <div class="w-10 h-10 rounded-full border-2 border-gray-300 bg-white text-gray-500 font-bold flex items-center justify-center text-sm">6</div>
            <span class="text-xs font-medium text-gray-500 mt-2">Local</span>
          `;
          stepper.insertBefore(localStep, petitionStep);
        } else if (!isTraffic && localStep) {
          localStep.remove();
          localStep = null;
        }

        const petitionCircle = petitionStep.querySelector('.w-10.h-10');
        if (petitionCircle && !petitionCircle.querySelector('i')) {
          petitionCircle.textContent = isTraffic ? '7' : '6';
        }

        const academicLabels = {
          'Autor': 'Seus dados',
          'Réu': 'Outra parte',
          'Fatos e Fundamentos': 'Relato',
          'Outras Provas': 'Comprovantes',
          'Pedidos': 'Resultado',
          'Petição': 'Resumo',
          'Local': 'Encaminhamento'
        };
        stepper.querySelectorAll('span').forEach(label => {
          const replacement = academicLabels[label.textContent.trim()];
          if (replacement) label.textContent = replacement;
        });
      });
    }

    // Navigation back functions
    function goToHome() {
      if (window.location.search) {
        window.history.replaceState({}, '', window.location.pathname);
      }
      showOnlyPage(!academicSessionUser ? pageAcademicAccess : (evaluationProfile ? pageHome : pageEvaluationProfile));
      const subNav = document.getElementById('header-subnav');
      if (subNav) subNav.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.getElementById('nav-new-evaluation')?.addEventListener('click', event => {
      event.preventDefault();
      showOnlyPage(!academicSessionUser ? pageAcademicAccess : (evaluationProfile ? pageHome : pageEvaluationProfile));
    });

    const backBtn = document.getElementById('req-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToHome();
      });
    }

    const logoLink = document.getElementById('header-logo-link');
    if (logoLink) {
      logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        goToHome();
      });
    }

    const titleCont = document.getElementById('header-title-container');
    if (titleCont) {
      titleCont.addEventListener('click', (e) => {
        e.preventDefault();
        goToHome();
      });
    }

    const titleContMobile = document.getElementById('header-title-container-mobile');
    if (titleContMobile) {
      titleContMobile.addEventListener('click', (e) => {
        e.preventDefault();
        goToHome();
      });
    }

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      items.forEach(item => {
        const text = (item.textContent + ' ' + item.dataset.keywords).toLowerCase();
        item.style.display = text.includes(query) ? '' : 'none';
      });
      systemItems.forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(query) ? '' : 'none';
      });
      document.querySelectorAll('.system-group').forEach(group => {
        const visible = Array.from(group.querySelectorAll('.system-service-item')).some(item => item.style.display !== 'none');
        group.style.display = visible ? '' : 'none';
      });
    });

    function renderSystemSpecificQuestion(system) {
      const container = document.getElementById('system-specific-question');
      if (!container) return;
      const questions = {
        'Petição Cidadã': 'Foi fácil entender quais informações eram necessárias para preparar a petição?',
        'eproc': 'Foi fácil localizar e acompanhar o processo desejado?',
        'PJe': 'O acesso, a assinatura e o envio funcionaram sem interrupções?',
        'Portal de Serviços': 'Você encontrou rapidamente o serviço que precisava?',
        'Consulta Processual': 'As movimentações apresentadas foram fáceis de compreender?',
        'Sistema Push': 'Os avisos recebidos foram claros e enviados no momento adequado?',
        'Diário da Justiça Eletrônico': 'Foi fácil localizar a publicação procurada?',
        'Balcão Virtual': 'O atendimento remoto resolveu sua necessidade?',
        'Primeiro Atendimento dos Juizados': 'As orientações recebidas foram suficientes para prosseguir?',
        'Ouvidoria e SIC': 'Foi fácil registrar e acompanhar sua manifestação?',
        'CEJUSC e Conciliação': 'As etapas da tentativa de acordo foram explicadas com clareza?',
        'Certidão Judicial Eletrônica': 'Foi fácil escolher e solicitar o modelo correto de certidão?',
        'GRERJ Eletrônica': 'O cálculo e a emissão da guia foram compreensíveis?',
        'Depósito Judicial': 'Foi fácil emitir ou consultar a guia desejada?',
        'Precatórios e RPV': 'As informações sobre pagamento e situação estavam claras?',
        'Jurisprudência': 'Os filtros ajudaram a encontrar decisões relevantes?',
        'Portal da Transparência': 'Os dados públicos estavam organizados e compreensíveis?',
        'Atos Oficiais': 'Foi fácil localizar o ato oficial desejado?'
      };
      const configuredQuestion = publishedQuestionnaireStore.get(system)?.find(question => question.active);
      container.replaceChildren();
      const strong = document.createElement('strong'); strong.textContent = 'PERGUNTA ESPECÍFICA DO SISTEMA';
      const paragraph = document.createElement('p'); paragraph.textContent = configuredQuestion?.text || questions[system] || 'O serviço atendeu à sua necessidade?';
      if (configuredQuestion && ['text', 'longtext', 'date'].includes(configuredQuestion.type)) {
        const field = configuredQuestion.type === 'longtext' ? document.createElement('textarea') : document.createElement('input');
        if (configuredQuestion.type === 'date') field.type = 'date';
        if (configuredQuestion.type === 'text') field.type = 'text';
        field.name = 'rate-specific';
        field.required = configuredQuestion.required;
        if (configuredQuestion.type === 'longtext') field.rows = 3;
        container.append(strong, paragraph, field);
        if (configuredQuestion.help) { const help = document.createElement('small'); help.textContent = configuredQuestion.help; container.appendChild(help); }
        return;
      }
      const options = document.createElement('div'); options.className = 'evaluation-options';
      const configuredOptions = configuredQuestion?.type === 'scale' ? ['1','2','3','4','5'] : configuredQuestion?.type === 'yesno' ? ['Sim','Não'] : configuredQuestion?.options?.length ? configuredQuestion.options : ['Sim','Parcialmente','Não'];
      configuredOptions.forEach((label, index) => {
        const optionLabel = document.createElement('label');
        const input = document.createElement('input'); input.type = 'radio'; input.name = 'rate-specific'; input.value = label; if (index === 0 && (configuredQuestion?.required ?? true)) input.required = true;
        const span = document.createElement('span'); span.textContent = label;
        optionLabel.append(input, span); options.appendChild(optionLabel);
      });
      container.append(strong, paragraph, options);
    }

    const systemGroupTags = {
      'Peticionamento': '#petição #processo #protocolo',
      'Consulta': '#consulta #andamento #publicação',
      'Atendimento': '#atendimento #orientação #conciliação',
      'Documentos': '#certidão #custas #pagamento',
      'Informação pública': '#transparência #jurisprudência #atos'
    };
    systemItems.forEach(item => {
      const tags = document.createElement('em');
      tags.textContent = systemGroupTags[item.dataset.systemGroup] || '#serviço #digital';
      item.appendChild(tags);
      item.addEventListener('click', () => {
        modalSelectionMode = 'system';
        selectedEvaluationSubject = item.dataset.system || 'Serviço digital';
        selectedEvaluationGroup = item.dataset.systemGroup || 'Outros serviços';
        modalDetails.forEach(detail => detail.classList.add('hidden'));
        document.getElementById('modal-detail-system')?.classList.remove('hidden');
        const modalSystemTitle = document.getElementById('modal-system-title');
        const modalSystemDescription = document.getElementById('modal-system-description');
        const warning = document.querySelector('[data-template-id="modal-warning-text"]');
        if (modalSystemTitle) modalSystemTitle.textContent = selectedEvaluationSubject;
        if (modalSystemDescription) modalSystemDescription.textContent = `Você selecionou ${selectedEvaluationSubject}, na categoria ${selectedEvaluationGroup}. Confirme para continuar.`;
        if (warning) warning.textContent = 'Confira o nome do serviço antes de continuar. A avaliação será vinculada ao assunto selecionado.';
        modalConfirmCheckbox.checked = false;
        modalBtnContinue.disabled = true;
        modalOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      });
    });

    // Open Modal
    items.forEach((item, index) => {
      item.addEventListener('click', () => {
        modalSelectionMode = 'legacy';
        currentSelectedCardIndex = parseInt(item.getAttribute('data-index') || (index + 1));
        syncTrafficStepperLayout();
        
        // Reset checkbox
        modalConfirmCheckbox.checked = false;
        modalBtnContinue.disabled = true;

        // Hide all details, show the selected one
        modalDetails.forEach(detail => detail.classList.add('hidden'));
        const activeDetail = document.getElementById(`modal-detail-${currentSelectedCardIndex}`);
        if (activeDetail) {
          activeDetail.classList.remove('hidden');
        }
        const warning = document.querySelector('[data-template-id="modal-warning-text"]');
        if (warning) warning.textContent = 'Atenção: A escolha do assunto indevido poderá acarretar a extinção do seu processo.';

        // Show Modal
        modalOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close Modal Function
    function closeModal() {
      modalOverlay.classList.add('hidden');
      document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);
    modalBtnCancel.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    // Checkbox validation
    modalConfirmCheckbox.addEventListener('change', (e) => {
      modalBtnContinue.disabled = !e.target.checked;
    });

    // Continue action
    modalBtnContinue.addEventListener('click', () => {
      if (!modalConfirmCheckbox.checked) return;
      closeModal();

      if (modalSelectionMode === 'system') {
        const evaluationSubject = document.getElementById('evaluation-selected-subject');
        if (evaluationSubject) evaluationSubject.textContent = `Serviço avaliado: ${selectedEvaluationSubject}`;
        const evaluationTitle = document.querySelector('#page-service-evaluation .evaluation-heading h1');
        if (evaluationTitle) evaluationTitle.textContent = `Como foi usar ${selectedEvaluationSubject}?`;
        renderSystemSpecificQuestion(selectedEvaluationSubject);
        const genericStages = ['Acesso e autenticação','Localização do serviço','Preenchimento ou solicitação','Envio de documentos','Confirmação ou pagamento','Acompanhamento','Resultado obtido'];
        document.querySelectorAll('.stage-rating strong').forEach((label, index) => { label.textContent = genericStages[index]; });
        const problemStage = document.getElementById('evaluation-problem-stage');
        if (problemStage) {
          problemStage.replaceChildren();
          ['Selecione', ...genericStages, 'Outra'].forEach((label, index) => {
            const option = document.createElement('option');
            option.value = index === 0 ? '' : label;
            option.textContent = label;
            problemStage.appendChild(option);
          });
        }
        showOnlyPage(pageServiceEvaluation);
        initializeEvaluation();
        document.getElementById('header-subnav')?.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      const categoryTitles = {
        1: 'Interrupção de serviço essencial',
        2: 'Vício do produto',
        3: 'Atraso/cancelamento de voo ou problemas com bagagens',
        4: 'Acidente de trânsito',
        5: 'Cobrança ou negativação indevida',
        6: 'Cobrança de recuperação de consumo e apontamento de irregularidade (TOI etc.)'
      };

      const categoryTitle = categoryTitles[currentSelectedCardIndex] || 'Reclamação';
      selectedEvaluationSubject = categoryTitle;
      const evaluationSubject = document.getElementById('evaluation-selected-subject');
      if (evaluationSubject) evaluationSubject.textContent = `Assunto avaliado: ${categoryTitle}`;
      document.querySelectorAll('[data-template-id="defendant-category-title"], [data-template-id="facts-category-title"], [data-template-id="proofs-category-title"], [data-template-id="requests-category-title"], [data-template-id="preview-category-title"], [data-template-id="sent-category-title"]').forEach(el => {
        el.textContent = categoryTitle;
      });

      showOnlyPage(pageServiceEvaluation);
      initializeEvaluation();
      const subNav = document.getElementById('header-subnav');
      if (subNav) subNav.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Acessibilidade: Controle do Dropdown e Funções
    const accessibilityBtn = document.getElementById('accessibility-btn');
    const accessibilityDropdown = document.getElementById('accessibility-dropdown');
    
    if (accessibilityBtn && accessibilityDropdown) {
      accessibilityBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        accessibilityDropdown.classList.toggle('hidden');
      });
      
      document.addEventListener('click', (e) => {
        if (!accessibilityDropdown.classList.contains('hidden') && !e.target.closest('#accessibility-dropdown-container')) {
          accessibilityDropdown.classList.add('hidden');
        }
      });
    }

    // Função para Alternar Alto Contraste
    let contrastEnabled = false;
    function toggleContrast() {
      contrastEnabled = !contrastEnabled;
      if (contrastEnabled) {
        document.body.classList.add('contrast-theme');
      } else {
        document.body.classList.remove('contrast-theme');
      }
    }

    // Função de Ajuste de Tamanho da Fonte
    let fontScale = 1.0;
    function changeFontSize(direction) {
      if (direction === 'in' && fontScale < 1.3) {
        fontScale += 0.05;
      } else if (direction === 'out' && fontScale > 0.85) {
        fontScale -= 0.05;
      } else if (direction === 'reset') {
        fontScale = 1.0;
      }
      document.documentElement.style.fontSize = `${fontScale * 100}%`;
    }

    // Eventos do Dropdown
    const btnContrast = document.getElementById('btn-contrast-dropdown');
    if (btnContrast) {
      btnContrast.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleContrast();
        accessibilityDropdown.classList.add('hidden');
      });
    }

    const btnZoomIn = document.getElementById('btn-zoom-in-dropdown');
    if (btnZoomIn) {
      btnZoomIn.addEventListener('click', (e) => {
        e.stopPropagation();
        changeFontSize('in');
      });
    }

    const btnZoomOut = document.getElementById('btn-zoom-out-dropdown');
    if (btnZoomOut) {
      btnZoomOut.addEventListener('click', (e) => {
        e.stopPropagation();
        changeFontSize('out');
      });
    }

    // Eventos do Painel Flutuante Lateral
    const floatContrastBtn = document.getElementById('float-contrast-btn');
    if (floatContrastBtn) {
      floatContrastBtn.addEventListener('click', toggleContrast);
    }

    // Eventos do GOV.BR
    const govbrBtnContrast = document.getElementById('govbr-btn-contrast');
    if (govbrBtnContrast) {
      govbrBtnContrast.addEventListener('click', toggleContrast);
    }

    const govbrBtnLibras = document.getElementById('govbr-btn-libras');
    if (govbrBtnLibras) {
      govbrBtnLibras.addEventListener('click', () => {
        // Trigger libras toast
        const floatLibrasBtn = document.getElementById('float-libras-btn');
        if (floatLibrasBtn) floatLibrasBtn.click();
      });
    }

    const floatZoomBtn = document.getElementById('float-zoom-btn');
    if (floatZoomBtn) {
      floatZoomBtn.addEventListener('click', () => {
        // Cicla entre aumentar, máximo e reiniciar
        if (fontScale >= 1.2) {
          changeFontSize('reset');
        } else {
          changeFontSize('in');
        }
      });
    }

    const floatLibrasBtn = document.getElementById('float-libras-btn');

    if (floatLibrasBtn) {
    floatLibrasBtn.addEventListener('click', () => {
        showNotification(
        'Língua de Sinais',
        'VLibras ativado com sucesso para acessibilidade.'
        );
    });

    // Parâmetros antigos de categoria não pulam o novo acesso e a triagem.
    }

    // Calendário visual próprio para todos os campos de data e data/hora.
    (() => {
      const calendarInputs = Array.from(document.querySelectorAll('input[type="date"], input[type="datetime-local"]'));
      if (!calendarInputs.length) return;

      const popover = document.createElement('div');
      popover.id = 'modern-calendar-popover';
      popover.hidden = true;
      popover.setAttribute('role', 'dialog');
      popover.setAttribute('aria-label', 'Selecionar data');
      popover.innerHTML = `
        <div class="modern-calendar-header">
          <button type="button" class="modern-calendar-nav" data-calendar-action="previous" aria-label="Mês anterior"><i class="fa fa-chevron-left"></i></button>
          <div class="modern-calendar-title" aria-live="polite"></div>
          <button type="button" class="modern-calendar-nav" data-calendar-action="next" aria-label="Próximo mês"><i class="fa fa-chevron-right"></i></button>
        </div>
        <div class="modern-calendar-weekdays"><span>DOM</span><span>SEG</span><span>TER</span><span>QUA</span><span>QUI</span><span>SEX</span><span>SÁB</span></div>
        <div class="modern-calendar-grid"></div>
        <div class="modern-calendar-time" hidden><label class="text-xs font-bold text-gray-600" for="modern-calendar-time-input">Horário</label><input id="modern-calendar-time-input" type="time" class="border border-gray-300 rounded-lg px-3 py-2"></div>
        <div class="modern-calendar-footer">
          <div><button type="button" class="modern-calendar-link" data-calendar-action="clear">Limpar</button><button type="button" class="modern-calendar-link" data-calendar-action="today">Hoje</button></div>
          <button type="button" class="modern-calendar-apply" data-calendar-action="apply" hidden>Aplicar</button>
        </div>`;
      document.body.appendChild(popover);

      const title = popover.querySelector('.modern-calendar-title');
      const grid = popover.querySelector('.modern-calendar-grid');
      const timeRow = popover.querySelector('.modern-calendar-time');
      const timeInput = popover.querySelector('#modern-calendar-time-input');
      const applyButton = popover.querySelector('[data-calendar-action="apply"]');
      let activeInput = null;
      let viewDate = new Date();
      let selectedDate = null;

      const pad = value => String(value).padStart(2, '0');
      const isoDate = date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
      const displayDate = date => `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
      const validDate = date => date instanceof Date && !Number.isNaN(date.getTime());

      function parseValue(value) {
        if (!value) return null;
        const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/);
        const brMatch = value.match(/^(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}))?/);
        const parts = isoMatch
          ? { year: +isoMatch[1], month: +isoMatch[2], day: +isoMatch[3], hour: +(isoMatch[4] || 0), minute: +(isoMatch[5] || 0) }
          : brMatch
            ? { year: +brMatch[3], month: +brMatch[2], day: +brMatch[1], hour: +(brMatch[4] || 0), minute: +(brMatch[5] || 0) }
            : null;
        if (!parts) return null;
        const date = new Date(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);
        return validDate(date) && date.getFullYear() === parts.year && date.getMonth() === parts.month - 1 && date.getDate() === parts.day ? date : null;
      }

      function setInputDate(input, date, time = '') {
        const mode = input.dataset.calendarMode;
        const chosenTime = mode === 'datetime-local' ? (time || '00:00') : '';
        input.value = `${displayDate(date)}${chosenTime ? ` ${chosenTime}` : ''}`;
        input.dataset.isoValue = `${isoDate(date)}${chosenTime ? `T${chosenTime}` : ''}`;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }

      function renderCalendar() {
        title.textContent = viewDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
        grid.innerHTML = '';
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const firstWeekday = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let index = 0; index < firstWeekday; index += 1) {
          const empty = document.createElement('span');
          empty.className = 'modern-calendar-empty';
          grid.appendChild(empty);
        }
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day += 1) {
          const date = new Date(year, month, day);
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'modern-calendar-day';
          button.textContent = day;
          button.dataset.date = isoDate(date);
          if (isoDate(date) === isoDate(today)) button.classList.add('is-today');
          if (selectedDate && isoDate(date) === isoDate(selectedDate)) button.classList.add('is-selected');
          button.setAttribute('aria-label', date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }));
          grid.appendChild(button);
        }
      }

      function positionPopover() {
        if (!activeInput) return;
        const rect = activeInput.getBoundingClientRect();
        const width = Math.min(340, window.innerWidth - 24);
        const left = Math.max(12, Math.min(rect.left, window.innerWidth - width - 12));
        const estimatedHeight = activeInput.dataset.calendarMode === 'datetime-local' ? 440 : 385;
        const below = rect.bottom + estimatedHeight <= window.innerHeight - 12;
        popover.style.left = `${left}px`;
        popover.style.top = below ? `${rect.bottom + 8}px` : `${Math.max(12, rect.top - estimatedHeight - 8)}px`;
      }

      function closeCalendar() {
        popover.hidden = true;
        activeInput?.setAttribute('aria-expanded', 'false');
        activeInput = null;
      }

      function openCalendar(input) {
        activeInput = input;
        const parsed = parseValue(input.value) || parseValue(input.dataset.isoValue);
        selectedDate = parsed || new Date();
        viewDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const isDateTime = input.dataset.calendarMode === 'datetime-local';
        timeRow.hidden = !isDateTime;
        applyButton.hidden = !isDateTime;
        timeInput.value = parsed ? `${pad(parsed.getHours())}:${pad(parsed.getMinutes())}` : `${pad(new Date().getHours())}:${pad(new Date().getMinutes())}`;
        renderCalendar();
        popover.hidden = false;
        input.setAttribute('aria-expanded', 'true');
        positionPopover();
      }

      calendarInputs.forEach(input => {
        const mode = input.type;
        const initial = parseValue(input.value);
        input.dataset.calendarMode = mode;
        input.dataset.isoValue = initial ? `${isoDate(initial)}${mode === 'datetime-local' ? `T${pad(initial.getHours())}:${pad(initial.getMinutes())}` : ''}` : '';
        input.type = 'text';
        input.readOnly = true;
        input.autocomplete = 'off';
        input.placeholder = mode === 'datetime-local' ? 'dd/mm/aaaa --:--' : 'dd/mm/aaaa';
        input.classList.add('custom-calendar-input');
        input.setAttribute('aria-haspopup', 'dialog');
        input.setAttribute('aria-expanded', 'false');
        if (initial) {
          const initialTime = mode === 'datetime-local' ? `${pad(initial.getHours())}:${pad(initial.getMinutes())}` : '';
          input.value = `${displayDate(initial)}${initialTime ? ` ${initialTime}` : ''}`;
          input.defaultValue = input.value;
        }
        input.addEventListener('click', () => openCalendar(input));
        input.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
            event.preventDefault();
            openCalendar(input);
          } else if (event.key === 'Escape') closeCalendar();
        });
      });

      grid.addEventListener('click', event => {
        const dayButton = event.target.closest('[data-date]');
        if (!dayButton || !activeInput) return;
        selectedDate = parseValue(dayButton.dataset.date);
        if (activeInput.dataset.calendarMode === 'date') {
          setInputDate(activeInput, selectedDate);
          closeCalendar();
        } else {
          renderCalendar();
        }
      });

      popover.addEventListener('click', event => {
        const action = event.target.closest('[data-calendar-action]')?.dataset.calendarAction;
        if (!action || !activeInput) return;
        if (action === 'previous' || action === 'next') {
          viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + (action === 'next' ? 1 : -1), 1);
          renderCalendar();
        } else if (action === 'today') {
          selectedDate = new Date();
          viewDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
          if (activeInput.dataset.calendarMode === 'date') {
            setInputDate(activeInput, selectedDate);
            closeCalendar();
          } else renderCalendar();
        } else if (action === 'clear') {
          activeInput.value = '';
          activeInput.dataset.isoValue = '';
          activeInput.dispatchEvent(new Event('change', { bubbles: true }));
          closeCalendar();
        } else if (action === 'apply' && selectedDate) {
          setInputDate(activeInput, selectedDate, timeInput.value || '00:00');
          closeCalendar();
        }
      });

      document.addEventListener('click', event => {
        if (!popover.hidden && !popover.contains(event.target) && !calendarInputs.includes(event.target)) closeCalendar();
      });
      document.addEventListener('reset', event => {
        setTimeout(() => {
          calendarInputs.filter(input => event.target.contains(input)).forEach(input => {
            const parsed = parseValue(input.value);
            input.dataset.isoValue = parsed ? `${isoDate(parsed)}${input.dataset.calendarMode === 'datetime-local' ? `T${pad(parsed.getHours())}:${pad(parsed.getMinutes())}` : ''}` : '';
          });
        }, 0);
      }, true);
      window.addEventListener('resize', closeCalendar);
      window.addEventListener('scroll', closeCalendar, true);
    })();

    // Seletor visual próprio para todos os campos de horário independentes.
    (() => {
      const timeFields = Array.from(document.querySelectorAll('input[type="time"]')).filter(input => input.id !== 'modern-calendar-time-input');
      if (!timeFields.length) return;
      const timePopover = document.createElement('div');
      timePopover.id = 'modern-time-popover';
      timePopover.hidden = true;
      timePopover.setAttribute('role', 'dialog');
      timePopover.setAttribute('aria-label', 'Selecionar horário');
      timePopover.innerHTML = `
        <div class="modern-time-title">Selecione o horário</div>
        <div class="modern-time-columns">
          <div><span class="modern-time-column-label">Hora</span><div class="modern-time-options" data-time-list="hours"></div></div>
          <div><span class="modern-time-column-label">Minutos</span><div class="modern-time-options" data-time-list="minutes"></div></div>
        </div>
        <div class="modern-time-footer">
          <div><button type="button" class="modern-calendar-link" data-time-action="clear">Limpar</button><button type="button" class="modern-calendar-link" data-time-action="now">Agora</button></div>
          <button type="button" class="modern-calendar-apply" data-time-action="apply">Aplicar</button>
        </div>`;
      document.body.appendChild(timePopover);
      const hoursList = timePopover.querySelector('[data-time-list="hours"]');
      const minutesList = timePopover.querySelector('[data-time-list="minutes"]');
      let activeTimeField = null;
      let chosenHour = null;
      let chosenMinute = null;
      const padTime = value => String(value).padStart(2, '0');

      hoursList.innerHTML = Array.from({ length: 24 }, (_, hour) => `<button type="button" class="modern-time-option" data-hour="${hour}">${padTime(hour)}</button>`).join('');
      minutesList.innerHTML = Array.from({ length: 60 }, (_, minute) => `<button type="button" class="modern-time-option" data-minute="${minute}">${padTime(minute)}</button>`).join('');

      function renderTimeSelection() {
        hoursList.querySelectorAll('[data-hour]').forEach(button => button.classList.toggle('is-selected', +button.dataset.hour === chosenHour));
        minutesList.querySelectorAll('[data-minute]').forEach(button => button.classList.toggle('is-selected', +button.dataset.minute === chosenMinute));
        hoursList.querySelector('.is-selected')?.scrollIntoView({ block: 'center' });
        minutesList.querySelector('.is-selected')?.scrollIntoView({ block: 'center' });
      }
      function positionTimePopover() {
        if (!activeTimeField) return;
        const rect = activeTimeField.getBoundingClientRect();
        const width = Math.min(330, window.innerWidth - 24);
        const left = Math.max(12, Math.min(rect.left, window.innerWidth - width - 12));
        const height = 340;
        const below = rect.bottom + height <= window.innerHeight - 12;
        timePopover.style.left = `${left}px`;
        timePopover.style.top = below ? `${rect.bottom + 8}px` : `${Math.max(12, rect.top - height - 8)}px`;
      }
      function closeTimePopover() {
        timePopover.hidden = true;
        activeTimeField?.setAttribute('aria-expanded', 'false');
        activeTimeField = null;
      }
      function openTimePopover(input) {
        activeTimeField = input;
        const match = input.value.match(/^(\d{2}):(\d{2})$/);
        const now = new Date();
        chosenHour = match ? +match[1] : now.getHours();
        chosenMinute = match ? +match[2] : now.getMinutes();
        renderTimeSelection();
        timePopover.hidden = false;
        input.setAttribute('aria-expanded', 'true');
        positionTimePopover();
      }
      function applyTime() {
        if (!activeTimeField || chosenHour === null || chosenMinute === null) return;
        activeTimeField.value = `${padTime(chosenHour)}:${padTime(chosenMinute)}`;
        activeTimeField.dispatchEvent(new Event('input', { bubbles: true }));
        activeTimeField.dispatchEvent(new Event('change', { bubbles: true }));
        closeTimePopover();
      }

      timeFields.forEach(input => {
        input.type = 'text';
        input.readOnly = true;
        input.autocomplete = 'off';
        input.placeholder = '--:--';
        input.classList.add('custom-time-input');
        input.setAttribute('aria-haspopup', 'dialog');
        input.setAttribute('aria-expanded', 'false');
        input.addEventListener('click', () => openTimePopover(input));
        input.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
            event.preventDefault();
            openTimePopover(input);
          } else if (event.key === 'Escape') closeTimePopover();
        });
      });
      timePopover.addEventListener('click', event => {
        const hourButton = event.target.closest('[data-hour]');
        const minuteButton = event.target.closest('[data-minute]');
        const action = event.target.closest('[data-time-action]')?.dataset.timeAction;
        if (hourButton) { chosenHour = +hourButton.dataset.hour; renderTimeSelection(); }
        else if (minuteButton) { chosenMinute = +minuteButton.dataset.minute; renderTimeSelection(); }
        else if (action === 'apply') applyTime();
        else if (action === 'now') {
          const now = new Date();
          chosenHour = now.getHours();
          chosenMinute = now.getMinutes();
          applyTime();
        } else if (action === 'clear' && activeTimeField) {
          activeTimeField.value = '';
          activeTimeField.dispatchEvent(new Event('change', { bubbles: true }));
          closeTimePopover();
        }
      });
      document.addEventListener('click', event => {
        if (!timePopover.hidden && !timePopover.contains(event.target) && !timeFields.includes(event.target)) closeTimePopover();
      });
      window.addEventListener('resize', closeTimePopover);
      window.addEventListener('scroll', closeTimePopover, true);
    })();

    // Dropdowns personalizados das companhias aéreas na qualificação do réu.
    (() => {
      const selects = ['def-voo-vendedora', 'def-voo-operadora']
        .map(id => document.getElementById(id))
        .filter(Boolean);
      if (!selects.length) return;

      const dropdowns = [];

      function closeDropdown(dropdown, returnFocus = false) {
        dropdown.menu.hidden = true;
        dropdown.button.setAttribute('aria-expanded', 'false');
        dropdown.wrapper.classList.remove('is-open');
        if (returnFocus) dropdown.button.focus();
      }

      function closeAll(except = null) {
        dropdowns.forEach(dropdown => {
          if (dropdown !== except) closeDropdown(dropdown);
        });
      }

      function syncDropdown(dropdown) {
        const selected = Array.from(dropdown.select.options)
          .find(option => option.value === dropdown.select.value && option.value);
        dropdown.label.textContent = selected?.textContent || 'Selecione...';
        dropdown.label.classList.toggle('text-gray-500', !selected);
        dropdown.label.classList.toggle('text-gray-800', Boolean(selected));
        dropdown.button.classList.toggle('has-value', Boolean(selected));
        dropdown.options.forEach(optionButton => {
          const isSelected = optionButton.dataset.value === dropdown.select.value;
          optionButton.classList.toggle('is-selected', isSelected);
          optionButton.setAttribute('aria-selected', String(isSelected));
        });
      }

      selects.forEach(select => {
        select.required = false;
        select.hidden = true;
        select.setAttribute('aria-hidden', 'true');
        select.tabIndex = -1;

        const wrapper = document.createElement('div');
        wrapper.className = 'airline-dropdown';

        const button = document.createElement('button');
        button.type = 'button';
        button.id = `${select.id}-custom-trigger`;
        button.className = 'airline-dropdown-trigger';
        button.setAttribute('aria-haspopup', 'listbox');
        button.setAttribute('aria-expanded', 'false');
        button.innerHTML = '<span class="airline-dropdown-label text-gray-500">Selecione...</span><i class="fa fa-chevron-down" aria-hidden="true"></i>';

        const menu = document.createElement('div');
        menu.className = 'airline-dropdown-menu';
        menu.id = `${select.id}-custom-menu`;
        menu.setAttribute('role', 'listbox');
        menu.setAttribute('aria-labelledby', button.id);
        menu.hidden = true;
        button.setAttribute('aria-controls', menu.id);

        Array.from(select.options).filter(option => option.value).forEach(option => {
          const optionButton = document.createElement('button');
          optionButton.type = 'button';
          optionButton.className = 'airline-dropdown-option';
          optionButton.dataset.value = option.value;
          optionButton.setAttribute('role', 'option');
          optionButton.textContent = option.textContent;
          menu.appendChild(optionButton);
        });

        wrapper.append(button, menu);
        select.insertAdjacentElement('afterend', wrapper);
        const associatedLabel = document.querySelector(`label[for="${select.id}"]`);
        if (associatedLabel) associatedLabel.htmlFor = button.id;

        const dropdown = {
          select,
          wrapper,
          button,
          menu,
          label: button.querySelector('.airline-dropdown-label'),
          options: Array.from(menu.querySelectorAll('.airline-dropdown-option'))
        };
        dropdowns.push(dropdown);

        button.addEventListener('click', () => {
          const willOpen = menu.hidden;
          closeAll(dropdown);
          menu.hidden = !willOpen;
          button.setAttribute('aria-expanded', String(willOpen));
          wrapper.classList.toggle('is-open', willOpen);
          if (willOpen) {
            (menu.querySelector('.is-selected') || dropdown.options[0])?.focus();
          }
        });

        button.addEventListener('keydown', event => {
          if (['ArrowDown', 'Enter', ' '].includes(event.key) && menu.hidden) {
            event.preventDefault();
            button.click();
          } else if (event.key === 'Escape') {
            closeDropdown(dropdown);
          }
        });

        menu.addEventListener('click', event => {
          const optionButton = event.target.closest('.airline-dropdown-option');
          if (!optionButton) return;
          select.value = optionButton.dataset.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
          syncDropdown(dropdown);
          closeDropdown(dropdown, true);
        });

        menu.addEventListener('keydown', event => {
          const current = event.target.closest('.airline-dropdown-option');
          if (!current) return;
          const index = dropdown.options.indexOf(current);
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            const direction = event.key === 'ArrowDown' ? 1 : -1;
            dropdown.options[(index + direction + dropdown.options.length) % dropdown.options.length].focus();
          } else if (event.key === 'Escape') {
            event.preventDefault();
            closeDropdown(dropdown, true);
          }
        });

        select.addEventListener('change', () => syncDropdown(dropdown));
        syncDropdown(dropdown);
      });

      document.addEventListener('click', event => {
        dropdowns.forEach(dropdown => {
          if (!dropdown.wrapper.contains(event.target)) closeDropdown(dropdown);
        });
      });

      document.addEventListener('reset', event => {
        setTimeout(() => dropdowns
          .filter(dropdown => event.target.contains(dropdown.select))
          .forEach(syncDropdown), 0);
      }, true);
    })();
