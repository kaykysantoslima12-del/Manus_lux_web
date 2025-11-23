import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { GlassText, GlassButton, GlassInput, GlassCard } from "@/components/GlassComponents";
import { FiArrowLeft, FiSend, FiImage, FiVideo, FiMic, FiSave, FiSettings, FiMaximize, FiMinusCircle, FiZap, FiEdit3 } from "react-icons/fi";

export default function CanvasPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [assetType, setAssetType] = useState<"Image" | "Video" | "Voice">("Image");
  const [aspectRatio, setAspectRatio] = useState<string>("16:9");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [style, setStyle] = useState("Photorealistic");
  const [generationMode, setGenerationMode] = useState<"Fast" | "Quality">("Fast");

  const styles = [
    { label: "Photorealistic", value: "Photorealistic" },
    { label: "Anime", value: "Anime" },
    { label: "Cyberpunk", value: "Cyberpunk" },
    { label: "Watercolor", value: "Watercolor" },
    { label: "3D Render", value: "3D Render" },
  ];

  const aspectRatios = [
    { label: "16:9 (Widescreen)", value: "16:9" },
    { label: "1:1 (Square)", value: "1:1" },
    { label: "4:3 (Standard)", value: "4:3" },
    { label: "9:16 (Vertical)", value: "9:16" },
  ];

  const handleGenerate = async () => {
    if (!prompt) return;

    setIsLoading(true);
    setResult(null);

    // Lógica de chamada da API da OpenAI
    const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      alert("Erro: Chave da OpenAI não configurada no .env.local");
      setIsLoading(false);
      return;
    }

    // Simulação de chamada de API (Substituir pela chamada real da OpenAI)
    // Exemplo de como a chamada real seria:
    /*
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: "1024x1024", // Usar o aspectRatio para definir o tamanho
      }),
    });
    const data = await response.json();
    setResult(data.data[0].url);
    */
    await new Promise(resolve => setTimeout(resolve, 2000));

    setResult(`Generated asset based on prompt: "${prompt}". (API Integration Pending)`);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-glass text-glass p-4 sm:p-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2 text-glass-cyan hover:text-glass transition-colors z-10"
      >
        <FiArrowLeft />
        Home
      </motion.button>

      <div className="max-w-6xl mx-auto pt-16 sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <GlassText size="2xl" variant="gradient-purple" className="mb-2">
            Canvas (Editor IA)
          </GlassText>
          <p className="text-glass/70 text-lg">
            Crie, edite e gere ativos digitais com a inteligência artificial LUX.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna 1: Editor/Prompt */}
          <GlassCard variant="gradient-purple" className="lg:col-span-1 p-6 h-full">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiEdit3 /> Prompt & Settings
            </h3>
            <div className="space-y-4">
              <GlassInput
                placeholder={`Descreva o que você quer criar (${assetType.toLowerCase()})`}
                variant="gradient-purple"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
              />
              {/* Negative Prompt */}
              <div className="pt-2">
                <label className="block text-glass/80 text-sm font-semibold mb-2 flex items-center gap-1">
                  <FiMinusCircle className="text-glass-orange" /> Negative Prompt (O que evitar)
                </label>
                <GlassInput
                  placeholder="Ex: Sem mãos feias, sem desfoque, sem marca d'água"
                  variant="gradient-orange"
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              {/* Seleção de Tipo de Ativo */}
              <div className="flex gap-2">
                <GlassButton
                  variant={assetType === "Image" ? "cyan" : "magenta"}
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => setAssetType("Image")}
                  disabled={isLoading}
                >
                  <FiImage /> Imagem
                </GlassButton>
                <GlassButton
                  variant={assetType === "Video" ? "cyan" : "magenta"}
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => setAssetType("Video")}
                  disabled={isLoading}
                >
                  <FiVideo /> Vídeo
                </GlassButton>
                <GlassButton
                  variant={assetType === "Voice" ? "cyan" : "magenta"}
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => setAssetType("Voice")}
                  disabled={isLoading}
                >
                  <FiMic /> Voz
                </GlassButton>
              </div>
              {/* Configuração de Estilo */}
              <div className="pt-2">
                <label className="block text-glass/80 text-sm font-semibold mb-2 flex items-center gap-1">
                  <FiSettings className="text-glass-purple" /> Estilo Artístico
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full p-2 rounded-lg bg-glass-darker border border-glass-purple/50 text-glass focus:ring-2 focus:ring-glass-purple focus:border-glass-purple transition-all"
                  disabled={isLoading}
                >
                  {styles.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              {/* Configuração de Aspect Ratio */}
              <div className="pt-2">
                <label className="block text-glass/80 text-sm font-semibold mb-2 flex items-center gap-1">
                  <FiMaximize className="text-glass-cyan" /> Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full p-2 rounded-lg bg-glass-darker border border-glass-purple/50 text-glass focus:ring-2 focus:ring-glass-cyan focus:border-glass-cyan transition-all"
                  disabled={isLoading}
                >
                  {aspectRatios.map((ratio) => (
                    <option key={ratio.value} value={ratio.value}>
                      {ratio.label}
                    </option>
                  ))}
                </select>
              </div>
              {/* Modo de Geração */}
              <div className="pt-2 flex gap-4 items-center">
                <label className="block text-glass/80 text-sm font-semibold flex items-center gap-1">
                  <FiZap className="text-glass-yellow" /> Modo de Geração:
                </label>
                <div className="flex gap-2">
                  <GlassButton
                    variant={generationMode === "Fast" ? "green" : "cyan"}
                    className="text-sm px-3 py-1"
                    onClick={() => setGenerationMode("Fast")}
                    disabled={isLoading}
                  >
                    Fast (10 Coins)
                  </GlassButton>
                  <GlassButton
                    variant={generationMode === "Quality" ? "orange" : "cyan"}
                    className="text-sm px-3 py-1"
                    onClick={() => setGenerationMode("Quality")}
                    disabled={isLoading}
                  >
                    Quality (50 Coins)
                  </GlassButton>
                </div>
              </div>
              <GlassButton
                variant="gradient-purple"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGenerate}
                disabled={isLoading || !prompt}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <FiSend /> Gerar Ativo (Custa 5 COINS)
                  </>
                )}
              </GlassButton>
            </div>
          </GlassCard>

          {/* Coluna 2: Visualização/Resultado */}
          <GlassCard variant="gradient-blue" className="lg:col-span-2 p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FiSave /> Resultado da Geração ({assetType})
              </span>
              <span className="text-sm text-glass/50">Aspect Ratio: {aspectRatio}</span>
            </h3>
            <div className={`h-96 bg-glass-darker/50 border border-glass-cyan/20 rounded-lg flex items-center justify-center`}>
              {isLoading && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-glass-cyan text-xl"
                >
                  Gerando {assetType} LUX...
                </motion.div>
              )}
              {result && (
                <div className="text-center p-4">
                  <p className="text-glass-green font-bold mb-4">Geração Concluída!</p>
                  <p className="text-glass/80">{result}</p>
                  {assetType === "Video" && <p className="text-glass-pink mt-2">Simulação de Player de Vídeo</p>}
                  {assetType === "Voice" && <p className="text-glass-pink mt-2">Simulação de Player de Áudio</p>}
                  <GlassButton variant="gradient-blue" className="mt-4">
                    Baixar / Publicar
                  </GlassButton>
                </div>
              )}
              {!isLoading && !result && (
                <p className="text-glass/50">Seu ativo gerado aparecerá aqui.</p>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
