import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Send, Plus, Trash2 } from 'lucide-react';

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
    // Seção 1: Negócio
    nomeEmpresa: '',
    segmento: '',
    descricaoNegocio: '',
    produtosServicos: '',
    diferenciais: '',
    missaoValores: '',
    
    // Seção 2: Público-Alvo
    perfilCliente: '',
    doresNecessidades: '',
    linguagemCliente: '',
    nivelTecnico: '',
    
    // Seção 3: Atendimento
    canalAtendimento: [],
    horarioAtendimento: '',
    volumeAtendimentos: '',
    tempoRespostaEsperado: '',
    principaisDuvidas: '',
    objecoesComuns: '',
    
    // Seção 4: Tom e Personalidade
    tomVoz: '',
    personalidade: [],
    exemplosInteracao: '',
    evitar: '',
    
    // Seção 5: Processos
    fluxoAtendimento: '',
    quandoTransferir: '',
    informacoesCapturar: '',
    acoesPosAtendimento: '',
    
    // Seção 6: Integração
    sistemasIntegrar: '',
    dadosDisponiveis: '',
    acoesExecutar: '',
    
    // Seção 7: Restrições
    naoPodeFalar: '',
    limitesAgente: '',
    politicasEspecificas: '',
    exemplosErros: '',
    
    // Seção 8: FAQ
    faqItems: [
      { pergunta: '', resposta: '' },
      { pergunta: '', resposta: '' },
      { pergunta: '', resposta: '' },
      { pergunta: '', resposta: '' },
      { pergunta: '', resposta: '' }
    ],
    
    // Extras
    observacoesAdicionais: '',
    
    // Webhook N8N - Fixo
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
    // Validação básica dos campos obrigatórios
    if (!formData.nomeEmpresa || !formData.segmento || !formData.descricaoNegocio) {
      alert('Por favor, preencha pelo menos os campos obrigatórios da seção "Informações sobre o Negócio".');
      return;
    }

    // Validação do FAQ (pelo menos 5 perguntas preenchidas)
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
        // Opcional: limpar formulário ou redirecionar
      } else {
        const errorData = await response.text();
        alert('❌ Erro ao enviar dados.\n\nDetalhes: ' + errorData);
      }
    } catch (error) {
      alert('❌ Erro ao enviar dados.\n\nVerifique sua conexão: ' + error.message);
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `briefing-agente-ia-${formData.nomeEmpresa || 'cliente'}.json`;
    link.click();
  };

  const Section = ({ title, section, children }) => (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
      <button
        onClick={() => toggleSection(section)}
        className="w-full px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 flex justify-between items-center hover:from-blue-100 hover:to-indigo-100 transition-colors"
      >
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {expandedSections[section] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {expandedSections[section] && (
        <div className="p-6 bg-white">
          {children}
        </div>
      )}
    </div>
  );

  const Input = ({ label, field, placeholder, type = "text", rows = 3, required = false }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      ) : (
        <input
          type={type}
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}
    </div>
  );

  const CheckboxGroup = ({ label, field, options }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="space-y-2">
        {options.map(option => (
          <label key={option} className="flex items-center">
            <input
              type="checkbox"
              checked={formData[field].includes(option)}
              onChange={() => handleCheckboxChange(field, option)}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Formulário de Briefing</h1>
          <p className="text-gray-600 mb-4">Agente de IA - Atendimento ao Cliente</p>
          <p className="text-sm text-gray-500">Preencha o máximo de informações possível para criar um agente personalizado e eficiente.</p>
        </div>

        <Section title="1. Informações sobre o Negócio" section="negocio">
          <Input label="Nome da Empresa" field="nomeEmpresa" placeholder="Ex: TechSolutions Brasil" required />
          <Input label="Segmento/Nicho" field="segmento" placeholder="Ex: SaaS, E-commerce, Consultoria..." required />
          <Input label="Descrição do Negócio" field="descricaoNegocio" type="textarea" rows={4} 
                 placeholder="Descreva o que a empresa faz, seus principais objetivos..." required />
          <Input label="Produtos/Serviços Oferecidos" field="produtosServicos" type="textarea" 
                 placeholder="Liste e descreva brevemente os principais produtos/serviços" required />
          <Input label="Diferenciais Competitivos" field="diferenciais" type="textarea" 
                 placeholder="O que diferencia sua empresa da concorrência?" />
          <Input label="Missão, Visão e Valores" field="missaoValores" type="textarea" 
                 placeholder="Princípios e propósito da empresa" />
        </Section>

        <Section title="2. Público-Alvo" section="publico">
          <Input label="Perfil do Cliente Ideal" field="perfilCliente" type="textarea" 
                 placeholder="Idade, profissão, cargo, tamanho da empresa, localização..." required />
          <Input label="Principais Dores e Necessidades" field="doresNecessidades" type="textarea" rows={4}
                 placeholder="Quais problemas seu cliente está tentando resolver?" required />
          <Input label="Linguagem do Cliente" field="linguagemCliente" type="textarea" 
                 placeholder="Como seu público se comunica? Formal? Informal? Termos técnicos?" required />
          <Input label="Nível Técnico do Público" field="nivelTecnico" 
                 placeholder="Ex: Leigo, Intermediário, Especialista" />
        </Section>

        <Section title="3. Configurações de Atendimento" section="atendimento">
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

        <Section title="4. Tom de Voz e Personalidade" section="tom">
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

        <Section title="5. Processos e Fluxos" section="processos">
          <Input label="Fluxo de Atendimento Ideal" field="fluxoAtendimento" type="textarea" rows={6}
                 placeholder="Descreva o passo a passo do atendimento: saudação, qualificação, solução, encerramento..." required />
          <Input label="Quando Transferir para Humano" field="quandoTransferir" type="textarea" rows={4}
                 placeholder="Em quais situações o agente deve transferir para atendimento humano?" required />
          <Input label="Informações a Capturar" field="informacoesCapturar" type="textarea" 
                 placeholder="Nome, email, telefone, empresa, cargo, necessidade específica..." />
          <Input label="Ações Pós-Atendimento" field="acoesPosAtendimento" type="textarea" 
                 placeholder="Enviar email, agendar follow-up, criar ticket, adicionar ao CRM..." />
        </Section>

        <Section title="6. Integrações e Dados" section="integracao">
          <Input label="Sistemas a Integrar" field="sistemasIntegrar" type="textarea" 
                 placeholder="CRM, ERP, plataforma de agendamento, base de conhecimento..." />
          <Input label="Dados Disponíveis" field="dadosDisponiveis" type="textarea" 
                 placeholder="Quais informações o agente terá acesso? Produtos, preços, estoque, agenda..." />
          <Input label="Ações que o Agente Pode Executar" field="acoesExecutar" type="textarea" 
                 placeholder="Agendar reuniões, enviar propostas, criar tickets, consultar pedidos..." />
        </Section>

        <Section title="7. Restrições e Limitações" section="restricoes">
          <Input label="Assuntos Proibidos" field="naoPodeFalar" type="textarea" rows={4}
                 placeholder="Sobre o que o agente NÃO deve falar ou responder?" required />
          <Input label="Limites de Atuação" field="limitesAgente" type="textarea" 
                 placeholder="O que o agente não pode fazer? Ex: dar descontos acima de X%, aprovar cancelamentos..." required />
          <Input label="Políticas Específicas" field="politicasEspecificas" type="textarea" rows={4}
                 placeholder="LGPD, política de trocas, garantias, SLA..." />
          <Input label="Exemplos de Erros a Evitar" field="exemplosErros" type="textarea" 
                 placeholder="Situações ou respostas que já deram problema no passado" />
        </Section>

        <Section title="8. FAQ - Perguntas e Respostas Frequentes" section="faq">
          <p className="text-sm text-gray-600 mb-4">
            Adicione pelo menos 5 perguntas e respostas que são comuns no seu atendimento. 
            Isso ajudará o agente a responder de forma mais precisa e consistente.
          </p>
          
          {formData.faqItems.map((item, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-700">FAQ #{index + 1}</h3>
                {formData.faqItems.length > 5 && (
                  <button
                    onClick={() => removeFaqItem(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    type="button"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pergunta {index < 5 && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  value={item.pergunta}
                  onChange={(e) => handleFaqChange(index, 'pergunta', e.target.value)}
                  placeholder="Ex: Qual é o prazo de entrega?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resposta {index < 5 && <span className="text-red-500">*</span>}
                </label>
                <textarea
                  value={item.resposta}
                  onChange={(e) => handleFaqChange(index, 'resposta', e.target.value)}
                  placeholder="Ex: O prazo de entrega varia de 3 a 7 dias úteis após a confirmação do pagamento..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          ))}
          
          <button
            onClick={addFaqItem}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
            type="button"
          >
            <Plus size={20} />
            Adicionar Mais uma Pergunta
          </button>
        </Section>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <Input label="Observações Adicionais" field="observacoesAdicionais" type="textarea" rows={5}
                 placeholder="Qualquer informação adicional importante para o desenvolvimento do agente..." />
        </div>

        <div className="mt-6">
          <button
            onClick={sendToN8N}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
          >
            <Send size={24} />
            Enviar Dados do Briefing
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>🔒 Seus dados serão enviados com segurança para processamento</p>
          <p className="mt-1">Após o envio, nossa equipe criará o agente personalizado para você</p>
        </div>
      </div>
    </div>
  );
};

export default AIAgentForm;
