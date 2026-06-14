# MEMORIA.md — Impontuality Landing Page
Última atualização: 2026-06-14 (Neo-Minimalista Futurista)

## 1. ESTADO ATUAL (o que existe e funciona AGORA)
- [Estrutura Base] - status: ✅ funcionando (HTML/CSS/JS inicial)
- [Pixels de Rastreamento] - status: ✅ funcionando (Meta, TikTok, OmniGrowth)
- [Notificações Sociais] - status: ❌ Removido (Ruído Visual)
- [Narrativa Visual] - status: ⚠️ parcial (Em reestruturação para Storytelling 'Neo-Minimalista Futurista')

## 2. DECISÕES DE ARQUITETURA (e por quê)
- Decisão: Estética 'Neo-Minimalista Futurista'
  Razão: Criar uma experiência clean, magnética e de vanguarda, alinhada com a tecnologia e o futuro.
- Decisão: Fluidez 'Liquid Motion' com GSAP
  Razão: Animações ultra-suaves e micro-interações que reagem ao toque, proporcionando uma sensação de fluidez nativa no mobile.
- Decisão: Narrativa de Elite e Impacto
  Razão: Contar a história da marca através de camadas visuais e textuais que se revelam, gerando curiosidade e desejo.

## 3. CONTRATOS ATIVOS (fonte única de verdade de nomes/tipos)
- Eventos de Tracking (TikTok/Meta):
  - `PageView` / `page()` no carregamento da página.
  - `AddToCart` no clique dos botões da vitrine (envia `content_ids` e `content_name`).
  - `ScrollDepth` disparado nas marcas de 25%, 50%, 75%, 100%.
  - `TimeOnSite` disparado em 30s e 60s.
  Usado por: `script.js` -> APIs de terceiros.

## 4. DÉBITOS TÉCNICOS CONHECIDOS (não esquecer, não fingir que não existe)
- [Ativos Visuais Futuristas] - Severidade: [Alta] - Necessidade de imagens/vídeos de alta qualidade, futuristas e clean.
- [Performance GSAP] - Severidade: [Média] - Otimizar animações para garantir fluidez em dispositivos mobile mais antigos.

## 5. VARIÁVEIS DE AMBIENTE NECESSÁRIAS
- N/A — Atualmente o projeto é 100% estático (GitHub Pages) sem backend ou processo de build que exija variáveis de ambiente em tempo de compilação. IDs de Pixel estão no código do cliente.

## 6. PRÓXIMOS PASSOS DECLARADOS
1. Coletar ativos visuais futuristas e clean.
2. Reorganizar HTML para narrativa e animações GSAP, removendo notificações.
3. Aplicar CSS 'Neo-Minimalista Futurista' e tipografia moderna.
4. Integrar animações GSAP para 'Liquid Motion' e micro-interações.
5. Refinar narrativa e elementos visuais para impacto.
6. Testar performance e usabilidade mobile.
7. Deploy no GitHub Pages.

## 7. ERROS JÁ RESOLVIDOS (não repetir o mesmo bug)
- 2026-06-11 — Erro de JS (`addEventListener` on null) — Elementos faltantes quebrando a execução em 28% dos devices. — Adicionado condicional `if (elemento)` antes de atrelar eventos no `script.js`.
- 2026-06-11 — Alto Bounce Rate (Mobile) — Falta de conexão imediata na Hero section e rolagem ineficiente. — Substituído por imagem 100vh, copy agressiva e inserção de Sticky CTA (botão fixo no rodapé).
