# MEMORIA.md — Impontuality Landing Page
Última atualização: 2026-06-14

## 1. ESTADO ATUAL (o que existe e funciona AGORA)
- [Estrutura Base] - status: ✅ funcionando (HTML/CSS/JS inicial)
- [Pixels de Rastreamento] - status: ✅ funcionando (Meta, TikTok, OmniGrowth)
- [Notificações Sociais] - status: ✅ funcionando (Social Proof fake)
- [Narrativa Visual] - status: ⚠️ parcial (Em reestruturação para Storytelling 'Human-First' e Autêntico)

## 2. DECISÕES DE ARQUITETURA (e por quê)
- Decisão: Estética 'Human-First' e 'Raw'
  Razão: Transmitir autenticidade e fugir do visual genérico de IA, conectando-se emocionalmente com o público-alvo.
- Decisão: Fluidez Extrema com GSAP
  Razão: Utilizar uma biblioteca de animação de alta performance para criar transições suaves e responsivas, elevando a experiência mobile.
- Decisão: Narrativa Emocional e Genuína
  Razão: Contar a história da marca de forma mais pessoal e impactante, focando nos valores de liberdade e cultura streetwear/eletrônica.

## 3. CONTRATOS ATIVOS (fonte única de verdade de nomes/tipos)
- Eventos de Tracking (TikTok/Meta):
  - `PageView` / `page()` no carregamento da página.
  - `AddToCart` no clique dos botões da vitrine (envia `content_ids` e `content_name`).
  - `ScrollDepth` disparado nas marcas de 25%, 50%, 75%, 100%.
  - `TimeOnSite` disparado em 30s e 60s.
  Usado por: `script.js` -> APIs de terceiros.

## 4. DÉBITOS TÉCNICOS CONHECIDOS (não esquecer, não fingir que não existe)
- [Ativos Visuais 'Raw'] - Severidade: [Alta] - Necessidade de coletar ou criar imagens/vídeos que transmitam a autenticidade e energia 'raw' da marca.
- [Performance GSAP] - Severidade: [Média] - Otimizar animações para garantir fluidez em dispositivos mobile mais antigos.

## 5. VARIÁVEIS DE AMBIENTE NECESSÁRIAS
- N/A — Atualmente o projeto é 100% estático (GitHub Pages) sem backend ou processo de build que exija variáveis de ambiente em tempo de compilação. IDs de Pixel estão no código do cliente.

## 6. PRÓXIMOS PASSOS DECLARADOS
1. Coletar ativos visuais 'raw' (fotos/vídeos).
2. Reorganizar HTML para narrativa e animações GSAP.
3. Aplicar CSS 'Human-First' e tipografia editorial.
4. Integrar animações GSAP para fluidez extrema.
5. Refinar narrativa e elementos visuais.
6. Testar performance e usabilidade mobile.
7. Deploy no GitHub Pages.

## 7. ERROS JÁ RESOLVIDOS (não repetir o mesmo bug)
- 2026-06-11 — Erro de JS (`addEventListener` on null) — Elementos faltantes quebrando a execução em 28% dos devices. — Adicionado condicional `if (elemento)` antes de atrelar eventos no `script.js`.
- 2026-06-11 — Alto Bounce Rate (Mobile) — Falta de conexão imediata na Hero section e rolagem ineficiente. — Substituído por imagem 100vh, copy agressiva e inserção de Sticky CTA (botão fixo no rodapé).
