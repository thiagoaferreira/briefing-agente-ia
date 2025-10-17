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

  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [segmento, setSegmento] = useState('');
  const [descricaoNegocio, setDescricaoNegocio] = useState('');
  const [produtosServicos, setProdutosServicos] = useState('');
  const [diferenciais, setDiferenciais] = useState('');
  const [missaoValores, setMissaoValores] = useState('');
  const [perfilCliente, setPerfilCliente] = useState('');
  const [doresNecessidades, setDoresNecessidades] = useState('');
  const [linguagemCliente, setLinguagemCliente] = useState('');
  const [nivelTecnico, setNivelTecnico] = useState('');
  const [observacoesAdicionais, setObservacoesAdicionais] = useState('');

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sendToN8N = async () => {
    if (!nomeEmpresa || !segmento || !descricaoNegocio) {
      alert('Por favor, preencha pelo menos os campos obrigatórios da seção "Informações sobre o Negócio".');
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
              <InputField
                label="Nome da Empresa"
                value={nomeEmpresa}
                onChange={(e) => setNomeEmpresa(e.target.value)}
                placeholder="Ex: 1000Ideias Company"
                required
              />
              <InputField
                label="Segmento/Nicho"
                value={segmento}
                onChange={(e) => setSegmento(e.target.value)}
                placeholder="Ex: Automação com IA, Tráfego Pago..."
                required
              />
              <InputField
                label="Descrição do Negócio"
                value={descricaoNegocio}
                onChange={(e) => setDescricaoNegocio(e.target.value)}
                placeholder="Descreva o que a empresa faz..."
                type="textarea"
                rows={4}
                required
              />
              <InputField
                label="Produtos/Serviços Oferecidos"
                value={produtosServicos}
                onChange={(e) => setProdutosServicos(e.target.value)}
                placeholder="Liste os principais produtos/serviços"
                type="textarea"
                rows={3}
                required
              />
              <InputField
                label="Diferenciais Competitivos"
                value={diferenciais}
                onChange={(e) => setDiferenciais(e.target.value)}
                placeholder="O que diferencia sua empresa?"
                type="textarea"
                rows={3}
              />
              <InputField
                label="Missão, Visão e Valores"
                value={missaoValores}
                onChange={(e) => setMissaoValores(e.target.value)}
                placeholder="Princípios da empresa"
                type="textarea"
                rows={3}
              />
            </div>
          )}
        </div>

        {/* Section 2: Público */}
        <div className="rounded-2xl mb-6 overflow-hidden shadow-lg">
          <SectionHeader 
            title="2. Público-Alvo" 
            icon={Bot} 
            isExpanded={expandedSections.publico}
            onClick={() => toggleSection('publico')}
          />
          {expandedSections.publico && (
            <div className="p-8 bg-white">
              <InputField
                label="Perfil do Cliente Ideal"
                value={perfilCliente}
                onChange={(e) => setPerfilCliente(e.target.value)}
                placeholder="Idade, profissão, cargo..."
                type="textarea"
                rows={3}
                required
              />
              <InputField
                label="Principais Dores e Necessidades"
                value={doresNecessidades}
                onChange={(e) => setDoresNecessidades(e.target.value)}
                placeholder="Quais problemas seu cliente está tentando resolver?"
                type="textarea"
                rows={4}
                required
              />
              <InputField
                label="Linguagem do Cliente"
                value={linguagemCliente}
                onChange={(e) => setLinguagemCliente(e.target.value)}
                placeholder="Formal? Informal? Termos técnicos?"
                type="textarea"
                rows={3}
                required
              />
              <InputField
                label="Nível Técnico do Público"
                value={nivelTecnico}
                onChange={(e) => setNivelTecnico(e.target.value)}
                placeholder="Ex: Leigo, Intermediário, Especialista"
              />
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
