import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Send, Plus, Trash2, Sparkles, Bot, Zap } from 'lucide-react';

const InputField = ({ label, value, onChange, placeholder, required, type = "text", rows = 3 }) => (
  <div className="mb-6">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === "textarea" ? (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055e5] focus:border-transparent transition-all outline-none resize-none"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055e5] focus:border-transparent transition-all outline-none"
      />
    )}
  </div>
);

const CheckboxGroup = ({ label, options, selectedValues, onChange }) => (
  <div className="mb-6">
    <label className="block text-sm font-semibold text-gray-700 mb-3">{label}</label>
    <div className="grid grid-cols-2 gap-3">
      {options.map(option => (
        <label key={option} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
          <input
            type="checkbox"
            checked={selectedValues.includes(option)}
            onChange={() => onChange(option)}
            className="mr-3 h-5 w-5 text-[#0055e5] focus:ring-[#0055e5] border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700 font-medium">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

const SectionHeader = ({ title, icon: Icon, isExpanded, onClick }) => (
  <button
    onClick={onClick}
    className="w-full px-8 py-6 bg-gradient-to-r from-[#0055e5] to-[#9c27b0] flex justify-between items-center hover:opacity-90 transition-all"
  >
    <div className="flex items-center gap-4">
      <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
        <Icon className="text-white" size={24} />
      </div>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    {isExpanded ? <ChevronUp size={24} className="text-white" /> : <ChevronDown size={24} className="text-white/80" />}
  </button>
);

const AIAgentForm = () => {
  const [expandedSections, setExpandedSections] = useState({
    negocio: true,
    publico: false,
    atendimento: false,
    tom: false,
    processos: false,
    integracao: false,
    restricoes: false,
    faq: false
  });

  // Section 1 - Negócio
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [segmento, setSegmento] = useState('');
  const [descricaoNegocio, setDescricaoNegocio] = useState('');
  const [produtosServicos, setProdutosServicos] = useState('');
  const [diferenciais, setDiferenciais] = useState('');
  const [missaoValores, setMissaoValores] = useState('');

  // Section 2 - Público
  const [perfilCliente, setPerfilCliente] = useState('');
  const [doresNecessidades, setDoresNecessidades] = useState('');
  const [linguagemCliente, setLinguagemCliente] = useState('');
  const [nivelTecnico, setNivelTecnico] = useState('');

  // Section 3 - Atendimento
  const [canaisAtendimento, setCanaisAtendimento] = useState([]);
  const [horarioAtendimento, setHorarioAtendimento] = useState('');
  const [volumeAtendimentos, setVolumeAtendimentos] = useState('');
  const [tempoResposta, setTempoResposta] = useState('');
  const [principaisDuvidas, setPrincipaisDuvidas] = useState('');
  const [objecoesComuns, setObjecoesComuns] = useState('');

  // Section 4 - Tom
  const [tomVoz, setTomVoz] = useState('');
  const [personalidade, setPersonalidade] = useState([]);
  const [exemplosInteracao, setExemplosInteracao] = useState('');
  const [evitar, setEvitar] = useState('');

  // Section 5 - Processos
  const [fluxoAtendimento, setFluxoAtendimento] = useState('');
  const [quandoTransferir, setQuandoTransferir] = useState('');
  const [informacoesCapturar, setInformacoesCapturar] = useState('');
  const [acoesPosAtendimento, setAcoesPosAtendimento] = useState('');

  // Section 6 - Integração
  const [sistemasIntegrar, setSistemasIntegrar] = useState('');
  const [dadosDisponiveis, setDadosDisponiveis] = useState('');
  const [acoesExecutar, setAcoesExecutar] = useState('');

  // Section 7 - Restrições
  const [naoPodeFalar, setNaoPodeFalar] = useState('');
  const [limitesAgente, setLimitesAgente] = useState('');
  const [politicasEspecificas, setPoliticasEspecificas] = useState('');
  const [exemplosErros, setExemplosErros] = useState('');

  // Section 8 - FAQ
  const [faqItems, setFaqItems] = useState([
    { pergunta: '', resposta: '' },
    { pergunta: '', resposta: '' },
    { pergunta: '', resposta: '' },
    { pergunta: '', resposta: '' },
    { pergunta: '', resposta: '' }
  ]);

  const [observacoesAdicionais, setObservacoesAdicionais] = useState('');

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleCanal = (canal) => {
    setCanaisAtendimento(prev =>
      prev.includes(canal) ? prev.filter(c => c !== canal) : [...prev, canal]
    );
  };

  const togglePersonalidade = (trait) => {
    setPersonalidade(prev =>
      prev.includes(trait) ? prev.filter(t => t !== trait) : [...prev, trait]
    );
  };

  const updateFaq = (index, field, value) => {
    setFaqItems(prev => prev.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const addFaqItem = () => {
    setFaqItems(prev => [...prev, { pergunta: '', resposta: '' }]);
  };

  const removeFaqItem = (index) => {
    if (faqItems.length > 5) {
      setFaqItems(prev => prev.filter((_, i) => i !== index));
    }
  };

  const sendToN8N = async () => {
    if (!nomeEmpresa || !segmento || !descricaoNegocio) {
      alert('Por favor, preencha pelo menos os campos obrigatórios da seção "Informações sobre o Negócio".');
      return;
    }

    const faqsPreenchidos = faqItems.filter(item =>
      item.pergunta.trim() !== '' && item.resposta.trim() !== ''
    );

    if (faqsPreenchidos.length < 5) {
      alert('Por favor, preencha pelo menos 5 perguntas e respostas no FAQ.');
      return;
    }

    const formData = {
      nomeEmpresa,
      segmento,
      descricaoNegocio,
      produtosServicos,
      diferenciais,
      missaoValores,
      perfilCliente,
      doresNecessidades,
      linguagemCliente,
      nivelTecnico,
      canaisAtendimento,
      horarioAtendimento,
      volumeAtendimentos,
      tempoResposta,
      principaisDuvidas,
      objecoesComuns,
      tomVoz,
      personalidade,
      exemplosInteracao,
      evitar,
      fluxoAtendimento,
      quandoTransferir,
      informacoesCapturar,
      acoesPosAtendimento,
      sistemasIntegrar,
      dadosDisponiveis,
      acoesExecutar,
      naoPodeFalar,
      limitesAgente,
      politicasEspecificas,
      exemplosErros,
      faqItems,
      observacoesAdicionais,
      dataEnvio: new Date().toISOString(),
      timestamp: Date.now()
    };

    try {
      const response = await fetch('https://webhook.dev.1000ideiasia.com.br/webhook/1a651488-6e4c-4f3d-9aa4-919c3c9861a4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('✅ Dados enviados com sucesso!\n\nO briefing do agente foi registrado e será processado.');
      } else {
        const errorData = await response.text();
        alert('❌ Erro ao enviar dados.\n\nDetalhes: ' + errorData);
      }
    } catch (error) {
      alert('❌ Erro ao enviar dados.\n\nVerifique sua conexão: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header/Menu Bar */}
      <div className="bg-black py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-center">
          <img
            src="https://1000ideiascompany.com.br/wp-content/uploads/2025/04/Logo_horizontal_1000Ideias-Preto-origi-sem-fundo-e1745093705536.png"
            alt="1000Ideias Company"
            className="h-12"
          />
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-[#12172d] text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            Briefing de Agente de IA
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Preencha este formulário para criarmos um agente de IA personalizado e inteligente para o seu negócio
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Info Card */}
        <div className="rounded-2xl shadow-xl mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-[#0055e5] to-[#9c27b0] px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Sparkles className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Como funciona?
              </h3>
            </div>
          </div>
          <div className="bg-white p-8">
            <p className="text-gray-600 leading-relaxed text-lg">
              Quanto mais detalhadas forem suas respostas, melhor será o resultado final.
              Nosso sistema de IA utilizará estas informações para criar um agente totalmente
              alinhado com sua marca e objetivos de negócio.
            </p>
          </div>
        </div>

        {/* Section 1: Negócio */}
        <div className="rounded-2xl mb-6 overflow-hidden shadow-lg">
          <SectionHeader
            title="1. Informações sobre o Negócio"
            icon={Zap}
            isExpanded={expandedSections.negocio}
            onClick={() => toggleSection('negocio')}
          />
          {expandedSections.negocio && (
            <div className="p-8 bg-white">
              <InputField label="Nome da Empresa" value={nomeEmpresa} onChange={(e) => setNomeEmpresa(e.target.value)} placeholder="Ex: 1000Ideias Company" required />
              <InputField label="Segmento/Nicho" value={segmento} onChange={(e) => setSegmento(e.target.value)} placeholder="Ex: Automação com IA, Tráfego Pago..." required />
              <InputField label="Descrição do Negócio" value={descricaoNegocio} onChange={(e) => setDescricaoNegocio(e.target.value)} placeholder="Descreva o que a empresa faz..." type="textarea" rows={4} required />
              <InputField label="Produtos/Serviços Oferecidos" value={produtosServicos} onChange={(e) => setProdutosServicos(e.target.value)} placeholder="Liste os principais produtos/serviços" type="textarea" rows={3} required />
              <InputField label="Diferenciais Competitivos" value={diferenciais} onChange={(e) => setDiferenciais(e.target.value)} placeholder="O que diferencia sua empresa?" type="textarea" rows={3} />
              <InputField label="Missão, Visão e Valores" value={missaoValores} onChange={(e) => setMissaoValores(e.target.value)} placeholder="Princípios da empresa" type="textarea" rows={3} />
            </div>
          )}
        </div>

        {/* Section 2: Público */}
        <div className="rounded-2xl mb-6 overflow-hidden shadow-lg">
          <SectionHeader title="2. Público-Alvo" icon={Bot} isExpanded={expandedSections.publico} onClick={() => toggleSection('publico')} />
          {expandedSections.publico && (
            <div className="p-8 bg-white">
              <InputField label="Perfil do Cliente Ideal" value={perfilCliente} onChange={(e) => setPerfilCliente(e.target.value)} placeholder="Idade, profissão, cargo..." type="textarea" rows={3} required />
              <InputField label="Principais Dores e Necessidades" value={doresNecessidades} onChange={(e) => setDoresNecessidades(e.target.value)} placeholder="Quais problemas seu cliente está tentando resolver?" type="textarea" rows={4} required />
              <InputField label="Linguagem do Cliente" value={linguagemCliente} onChange={(e) => setLinguagemCliente(e.target.value)} placeholder="Formal? Informal? Termos técnicos?" type="textarea" rows={3} required />
              <InputField label="Nível Técnico do Público" value={nivelTecnico} onChange={(e) => setNivelTecnico(e.target.value)} placeholder="Ex: Leigo, Intermediário, Especialista" />
            </div>
          )}
        </div>

        {/* Section 3: Atendimento */}
        <div className="rounded-2xl mb-6 overflow-hidden shadow-lg">
          <SectionHeader title="3. Configurações de Atendimento" icon={Sparkles} isExpanded={expandedSections.atendimento} onClick={() => toggleSection('atendimento')} />
          {expandedSections.atendimento && (
            <div className="p-8 bg-white">
              <CheckboxGroup label="Canais de Atendimento" options={['WhatsApp', 'Site/Chat', 'Instagram', 'Facebook', 'E-mail', 'Telefone']} selectedValues={canaisAtendimento} onChange={toggleCanal} />
              <InputField label="Horário de Atendimento" value={horarioAtendimento} onChange={(e) => setHorarioAtendimento(e.target.value)} placeholder="Ex: Segunda a Sexta, 9h às 18h" />
              <InputField label="Volume Médio de Atendimentos" value={volumeAtendimentos} onChange={(e) => setVolumeAtendimentos(e.target.value)} placeholder="Ex: 200 atendimentos/dia" />
              <InputField label="Tempo de Resposta Esperado" value={tempoResposta} onChange={(e) => setTempoResposta(e.target.value)} placeholder="Ex: Imediato, até 5 minutos" />
              <InputField label="Principais Dúvidas dos Clientes" value={principaisDuvidas} onChange={(e) => setPrincipaisDuvidas(e.target.value)} placeholder="Liste as perguntas mais frequentes" type="textarea" rows={5} required />
              <InputField label="Objeções Comuns" value={objecoesComuns} onChange={(e) => setObjecoesComuns(e.target.value)} placeholder="Quais objeções os clientes costumam levantar?" type="textarea" rows={4} />
            </div>
          )}
        </div>

        {/* Section 4: Tom */}
        <div className="rounded-2xl mb-6 overflow-hidden shadow-lg">
          <SectionHeader title="4. Tom de Voz e Personalidade" icon={Bot} isExpanded={expandedSections.tom} onClick={() => toggleSection('tom')} />
          {expandedSections.tom && (
            <div className="p-8 bg-white">
              <InputField label="Tom de Voz Desejado" value={tomVoz} onChange={(e) => setTomVoz(e.target.value)} placeholder="Ex: Profissional e acolhedor..." type="textarea" required />
              <CheckboxGroup label="Características da Personalidade" options={['Amigável', 'Profissional', 'Empático', 'Objetivo', 'Prestativo', 'Consultivo', 'Proativo', 'Paciente']} selectedValues={personalidade} onChange={togglePersonalidade} />
              <InputField label="Exemplos de Interação Ideal" value={exemplosInteracao} onChange={(e) => setExemplosInteracao(e.target.value)} placeholder="Forneça exemplos de diálogos" type="textarea" rows={5} />
              <InputField label="O que Evitar na Comunicação" value={evitar} onChange={(e) => setEvitar(e.target.value)} placeholder="Ex: Gírias, termos técnicos demais..." type="textarea" />
            </div>
          )}
        </div>

        {/* Section 5: Processos */}
        <div className="rounded-2xl mb-6 overflow-hidden shadow-lg">
          <SectionHeader title="5. Processos e Fluxos" icon={Zap} isExpanded={expandedSections.processos} onClick={() => toggleSection('processos')} />
          {expandedSections.processos && (
            <div className="p-8 bg-white">
              <InputField label="Fluxo de Atendimento Ideal" value={fluxoAtendimento} onChange={(e) => setFluxoAtendimento(e.target.value)} placeholder="Descreva o passo a passo" type="textarea" rows={6} required />
              <InputField label="Quando Transferir para Humano" value={quandoTransferir} onChange={(e) => setQuandoTransferir(e.target.value)} placeholder="Em quais situações transferir?" type="textarea" rows={4} required />
              <InputField label="Informações a Capturar" value={informacoesCapturar} onChange={(e) => setInformacoesCapturar(e.target.value)} placeholder="Nome, email, telefone..." type="textarea" />
              <InputField label="Ações Pós-Atendimento" value={acoesPosAtendimento} onChange={(e) => setAcoesPosAtendimento(e.target.value)} placeholder="Enviar email, agendar follow-up..." type="textarea" />
            </div>
          )}
        </div>

        {/* Section 6: Integração */}
        <div className="rounded-2xl mb-6 overflow-hidden shadow-lg">
          <SectionHeader title="6. Integrações e Dados" icon={Sparkles} isExpanded={expandedSections.integracao} onClick={() => toggleSection('integracao')} />
          {expandedSections.integracao && (
            <div className="p-8 bg-white">
              <InputField label="Sistemas a Integrar" value={sistemasIntegrar} onChange={(e) => setSistemasIntegrar(e.target.value)} placeholder="CRM, ERP, plataforma de agendamento..." type="textarea" />
              <InputField label="Dados Disponíveis" value={dadosDisponiveis} onChange={(e) => setDadosDisponiveis(e.target.value)} placeholder="Produtos, preços, estoque..." type="textarea" />
              <InputField label="Ações que o Agente Pode Executar" value={acoesExecutar} onChange={(e) => setAcoesExecutar(e.target.value)} placeholder="Agendar reuniões, enviar propostas..." type="textarea" />
            </div>
          )}
        </div>

        {/* Section 7: Restrições */}
        <div className="rounded-2xl mb-6 overflow-hidden shadow-lg">
          <SectionHeader title="7. Restrições e Limitações" icon={Bot} isExpanded={expandedSections.restricoes} onClick={() => toggleSection('restricoes')} />
          {expandedSections.restricoes && (
            <div className="p-8 bg-white">
              <InputField label="Assuntos Proibidos" value={naoPodeFalar} onChange={(e) => setNaoPodeFalar(e.target.value)} placeholder="Sobre o que o agente NÃO deve falar?" type="textarea" rows={4} required />
              <InputField label="Limites de Atuação" value={limitesAgente} onChange={(e) => setLimitesAgente(e.target.value)} placeholder="O que o agente não pode fazer?" type="textarea" required />
              <InputField label="Políticas Específicas" value={politicasEspecificas} onChange={(e) => setPoliticasEspecificas(e.target.value)} placeholder="LGPD, política de trocas..." type="textarea" rows={4} />
              <InputField label="Exemplos de Erros a Evitar" value={exemplosErros} onChange={(e) => setExemplosErros(e.target.value)} placeholder="Situações que já deram problema" type="textarea" />
            </div>
          )}
        </div>

        {/* Section 8: FAQ */}
        <div className="rounded-2xl mb-6 overflow-hidden shadow-lg">
          <SectionHeader title="8. FAQ - Perguntas e Respostas Frequentes" icon={Sparkles} isExpanded={expandedSections.faq} onClick={() => toggleSection('faq')} />
          {expandedSections.faq && (
            <div className="p-8 bg-white">
              <p className="text-sm text-gray-600 mb-6 bg-blue-50 p-4 rounded-xl border-l-4 border-[#0055e5]">
                💡 Adicione pelo menos 5 perguntas e respostas que são comuns no seu atendimento.
              </p>

              {faqItems.map((item, index) => (
                <div key={index} className="mb-6 p-6 border-2 border-gray-200 rounded-2xl bg-white hover:border-[#0055e5] transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800 text-lg">FAQ #{index + 1}</h3>
                    {faqItems.length > 5 && (
                      <button onClick={() => removeFaqItem(index)} className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg" type="button">
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pergunta {index < 5 && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      value={item.pergunta}
                      onChange={(e) => updateFaq(index, 'pergunta', e.target.value)}
                      placeholder="Ex: Qual é o prazo de entrega?"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055e5] focus:border-transparent transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Resposta {index < 5 && <span className="text-red-500">*</span>}
                    </label>
                    <textarea
                      value={item.resposta}
                      onChange={(e) => updateFaq(index, 'resposta', e.target.value)}
                      placeholder="Ex: O prazo de entrega varia de 3 a 7 dias úteis..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055e5] focus:border-transparent transition-all outline-none resize-none"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={addFaqItem}
                className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[#0055e5] hover:text-[#0055e5] hover:bg-blue-50 transition-all flex items-center justify-center gap-3 font-semibold"
                type="button"
              >
                <Plus size={24} />
                Adicionar Mais uma Pergunta
              </button>
            </div>
          )}
        </div>

        {/* Observações Finais */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <InputField
            label="Observações Adicionais"
            value={observacoesAdicionais}
            onChange={(e) => setObservacoesAdicionais(e.target.value)}
            placeholder="Qualquer informação adicional importante..."
            type="textarea"
            rows={5}
          />
        </div>

        {/* Submit Button */}
        <div className="mb-12">
          <button
            onClick={sendToN8N}
            className="w-full bg-gradient-to-r from-[#0055e5] to-[#9c27b0] text-white px-8 py-6 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-4 group"
          >
            <Send size={28} className="group-hover:translate-x-1 transition-transform" />
            Enviar Briefing do Agente de IA
          </button>

          <div className="text-center mt-6 space-y-2">
            <p className="text-gray-300 flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Seus dados serão enviados com segurança
            </p>
            <p className="text-sm text-gray-400">
              Após o envio, nossa equipe criará o agente personalizado para você
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#12172d] text-white py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-white/90">
            Powered by <span className="font-bold">1000Ideias Company</span> • Transformando Dados em Resultados
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAgentForm;
