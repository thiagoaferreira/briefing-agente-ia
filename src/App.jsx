import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Send, Plus, Trash2, Sparkles, Bot, Zap } from 'lucide-react';

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

  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    segmento: '',
    descricaoNegocio: '',
    produtosServicos: '',
    diferenciais: '',
    missaoValores: '',
    perfilCliente: '',
    doresNecessidades: '',
    linguagemCliente: '',
    nivelTecnico: '',
    canalAtendimento: [],
    horarioAtendimento: '',
    volumeAtendimentos: '',
    tempoRespostaEsperado: '',
    principaisDuvidas: '',
    objecoesComuns: '',
    tomVoz: '',
    personalidade: [],
    exemplosInteracao: '',
    evitar: '',
    fluxoAtendimento: '',
    quandoTransferir: '',
    informacoesCapturar: '',
    acoesPosAtendimento: '',
    sistemasIntegrar: '',
    dadosDisponiveis: '',
    acoesExecutar: '',
    naoPodeFalar: '',
    limitesAgente: '',
    politicasEspecificas: '',
    exemplosErros: '',
    faqItems: [
      { pergunta: '', resposta: '' },
      { pergunta: '', resposta: '' },
      { pergunta: '', resposta: '' },
      { pergunta: '', resposta: '' },
      { pergunta: '', resposta: '' }
    ],
    observacoesAdicionais: '',
    webhookUrl: 'https://webhook.dev.1000ideiasia.com.br/webhook/1a651488-6e4c-4f3d-9aa4-919c3c9861a4'
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleFaqChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      faqItems: prev.faqItems.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addFaqItem = () => {
    setFormData(prev => ({
      ...prev,
      faqItems: [...prev.faqItems, { pergunta: '', resposta: '' }]
    }));
  };

  const removeFaqItem = (index) => {
    if (formData.faqItems.length > 5) {
      setFormData(prev => ({
        ...prev,
        faqItems: prev.faqItems.filter((_, i) => i !== index)
      }));
    }
  };

  const sendToN8N = async () => {
    if (!formData.nomeEmpresa || !formData.segmento || !formData.descricaoNegocio) {
      alert('Por favor, preencha pelo menos os campos obrigatórios da seção "Informações sobre o Negócio".');
      return;
    }

    const faqsPreenchidos = formData.faqItems.filter(item => 
      item.pergunta.trim() !== '' && item.resposta.trim() !== ''
    );
    
    if (faqsPreenchidos.length < 5) {
      alert('Por favor, preencha pelo menos 5 perguntas e respostas no FAQ.');
      return;
    }

    try {
      const response = await fetch(formData.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          dataEnvio: new Date().toISOString(),
          timestamp: Date.now()
        })
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

  const Section = ({ title, section, icon: Icon, children }) => (
    <div className="rounded-2xl mb-6 overflow-hidden shadow-lg">
      <button
        onClick={() => toggleSection(section)}
        className="w-full px-8 py-6 bg-gradient-to-r from-[#0055e5] to-[#9c27b0] flex justify-between items-center hover:opacity-90 transition-all group"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
            <Icon className="text-white" size={24} />
          </div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        <div className="flex-shrink-0">
          {expandedSections[section] ? 
            <ChevronUp size={24} className="text-white" /> : 
            <ChevronDown size={24} className="text-white/80" />
          }
        </div>
      </button>
      {expandedSections[section] && (
        <div className="p-8 bg-white">
          {children}
        </div>
      )}
    </div>
  );

  const Input = ({ label, field, placeholder, type = "text", rows = 3, required = false }) => (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055e5] focus:border-transparent transition-all outline-none resize-none"
        />
      ) : (
        <input
          type={type}
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0055e5] focus:border-transparent transition-all outline-none"
        />
      )}
    </div>
  );

  const CheckboxGroup = ({ label, field, options }) => (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3">{label}</label>
      <div className="grid grid-cols-2 gap-3">
        {options.map(option => (
          <label key={option} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
            <input
              type="checkbox"
              checked={formData[field].includes(option)}
              onChange={() => handleCheckboxChange(field, option)}
              className="mr-3 h-5 w-5 text-[#0055e5] focus:ring-[#0055e5] border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 font-medium">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0055e5] to-[#9c27b0] text-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-8">
            <img 
              src="https://1000ideiascompany.com.br/wp-content/uploads/2025/04/Logo_horizontal_1000Ideias-Preto-origi-sem-fundo-e1745093705536.png" 
              alt="1000Ideias Company" 
              className="h-16 mb-6 bg-white px-6 py-3 rounded-xl"
            />
          </div>
          <h1 className="text-5xl font-extrabold mb-4 text-center">
            Briefing de Agente de IA
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto text-center">
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

        {/* Sections */}
        <Section title="1. Informações sobre o Negócio" section="negocio" icon={Zap}>
          <Input label="Nome da Empresa" field="nomeEmpresa" placeholder="Ex: 1000Ideias Company" required />
          <Input label="Segmento/Nicho" field="segmento" placeholder="Ex: Automação com IA, Tráfego Pago, Marketing Digital..." required />
          <Input label="Descrição do Negócio" field="descricaoNegocio" type="textarea" rows={4} 
                 placeholder="Descreva o que a empresa faz, seus principais objetivos e diferenciais..." required />
          <Input label="Produtos/Serviços Oferecidos" field="produtosServicos" type="textarea" 
                 placeholder="Liste e descreva brevemente os principais produtos/serviços" required />
          <Input label="Diferenciais Competitivos" field="diferenciais" type="textarea" 
                 placeholder="O que diferencia sua empresa da concorrência?" />
          <Input label="Missão, Visão e Valores" field="missaoValores" type="textarea" 
                 placeholder="Princípios e propósito da empresa" />
        </Section>

        <Section title="2. Público-Alvo" section="publico" icon={Bot}>
          <Input label="Perfil do Cliente Ideal" field="perfilCliente" type="textarea" 
                 placeholder="Idade, profissão, cargo, tamanho da empresa, localização..." required />
          <Input label="Principais Dores e Necessidades" field="doresNecessidades" type="textarea" rows={4}
                 placeholder="Quais problemas seu cliente está tentando resolver?" required />
          <Input label="Linguagem do Cliente" field="linguagemCliente" type="textarea" 
                 placeholder="Como seu público se comunica? Formal? Informal? Termos técnicos?" required />
          <Input label="Nível Técnico do Público" field="nivelTecnico" 
                 placeholder="Ex: Leigo, Intermediário, Especialista" />
        </Section>

        <Section title="3. Configurações de Atendimento" section="atendimento" icon={Sparkles}>
          <CheckboxGroup 
            label="Canais de Atendimento" 
            field="canalAtendimento"
            options={['WhatsApp', 'Site/Chat', 'Instagram', 'Facebook', 'E-mail', 'Telefone']}
          />
          <Input label="Horário de Atendimento" field="horarioAtendimento" 
                 placeholder="Ex: Segunda a Sexta, 9h às 18h" />
          <Input label="Volume Médio de Atendimentos" field="volumeAtendimentos" 
                 placeholder="Ex: 200 atendimentos/dia" />
          <Input label="Tempo de Resposta Esperado" field="tempoRespostaEsperado" 
                 placeholder="Ex: Imediato, até 5 minutos, até 1 hora" />
          <Input label="Principais Dúvidas dos Clientes" field="principaisDuvidas" type="textarea" rows={5}
                 placeholder="Liste as 10-15 perguntas mais frequentes que os clientes fazem" required />
          <Input label="Objeções Comuns" field="objecoesComuns" type="textarea" rows={4}
                 placeholder="Quais objeções os clientes costumam levantar? Como superá-las?" />
        </Section>

        <Section title="4. Tom de Voz e Personalidade" section="tom" icon={Bot}>
          <Input label="Tom de Voz Desejado" field="tomVoz" type="textarea" 
                 placeholder="Ex: Profissional e acolhedor, Descontraído e próximo, Técnico e preciso..." required />
          <CheckboxGroup 
            label="Características da Personalidade" 
            field="personalidade"
            options={[
              'Amigável', 'Profissional', 'Empático', 'Objetivo', 
              'Prestativo', 'Consultivo', 'Proativo', 'Paciente'
            ]}
          />
          <Input label="Exemplos de Interação Ideal" field="exemplosInteracao" type="textarea" rows={5}
                 placeholder="Forneça 2-3 exemplos de diálogos que representam o atendimento ideal" />
          <Input label="O que Evitar na Comunicação" field="evitar" type="textarea" 
                 placeholder="Ex: Gírias específicas, termos técnicos demais, respostas muito longas..." />
        </Section>

        <Section title="5. Processos e Fluxos" section="processos" icon={Zap}>
          <Input label="Fluxo de Atendimento Ideal" field="fluxoAtendimento" type="textarea" rows={6}
                 placeholder="Descreva o passo a passo do atendimento: saudação, qualificação, solução, encerramento..." required />
          <Input label="Quando Transferir para Humano" field="quandoTransferir" type="textarea" rows={4}
                 placeholder="Em quais situações o agente deve transferir para atendimento humano?" required />
          <Input label="Informações a Capturar" field="informacoesCapturar" type="textarea" 
                 placeholder="Nome, email, telefone, empresa, cargo, necessidade específica..." />
          <Input label="Ações Pós-Atendimento" field="acoesPosAtendimento" type="textarea" 
                 placeholder="Enviar email, agendar follow-up, criar ticket, adicionar ao CRM..." />
        </Section>

        <Section title="6. Integrações e Dados" section="integracao" icon={Sparkles}>
          <Input label="Sistemas a Integrar" field="sistemasIntegrar" type="textarea" 
                 placeholder="CRM, ERP, plataforma de agendamento, base de conhecimento..." />
          <Input label="Dados Disponíveis" field="dadosDisponiveis" type="textarea" 
                 placeholder="Quais informações o agente terá acesso? Produtos, preços, estoque, agenda..." />
          <Input label="Ações que o Agente Pode Executar" field="acoesExecutar" type="textarea" 
                 placeholder="Agendar reuniões, enviar propostas, criar tickets, consultar pedidos..." />
        </Section>

        <Section title="7. Restrições e Limitações" section="restricoes" icon={Bot}>
          <Input label="Assuntos Proibidos" field="naoPodeFalar" type="textarea" rows={4}
                 placeholder="Sobre o que o agente NÃO deve falar ou responder?" required />
          <Input label="Limites de Atuação" field="limitesAgente" type="textarea" 
                 placeholder="O que o agente não pode fazer? Ex: dar descontos acima de X%, aprovar cancelamentos..." required />
          <Input label="Políticas Específicas" field="politicasEspecificas" type="textarea" rows={4}
                 placeholder="LGPD, política de trocas, garantias, SLA..." />
          <Input label="Exemplos de Erros a Evitar" field="exemplosErros" type="textarea" 
                 placeholder="Situações ou respostas que já deram problema no passado" />
        </Section>

        <Section title="8. FAQ - Perguntas e Respostas Frequentes" section="faq" icon={Sparkles}>
          <p className="text-sm text-gray-600 mb-6 bg-blue-50 p-4 rounded-xl border-l-4 border-[#0055e5]">
            💡 Adicione pelo menos 5 perguntas e respostas que são comuns no seu atendimento. 
            Isso ajudará o agente a responder de forma mais precisa e consistente.
          </p>
          
          {formData.faqItems.map((item, index) => (
            <div key={index} className="mb-6 p-6 border-2 border-gray-200 rounded-2xl bg-white hover:border-[#0055e5] transition-colors">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 text-lg">FAQ #{index + 1}</h3>
                {formData.faqItems.length > 5 && (
                  <button
                    onClick={() => removeFaqItem(index)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
                    type="button"
                  >
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
                  onChange={(e) => handleFaqChange(index, 'pergunta', e.target.value)}
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
                  onChange={(e) => handleFaqChange(index, 'resposta', e.target.value)}
                  placeholder="Ex: O prazo de entrega varia de 3 a 7 dias úteis após a confirmação do pagamento..."
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
        </Section>

        {/* Observações Finais */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <Input label="Observações Adicionais" field="observacoesAdicionais" type="textarea" rows={5}
                 placeholder="Qualquer informação adicional importante para o desenvolvimento do agente..." />
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
      <div className="bg-gradient-to-r from-[#0055e5] to-[#9c27b0] text-white py-8">
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
