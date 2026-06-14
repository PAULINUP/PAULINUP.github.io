# MEMORIA.md — Impontuality Landing Page
Última atualização: 2026-06-12

## 1. ESTADO ATUAL (o que existe e funciona AGORA)
- [Estrutura Base] - status: ✅ funcionando (HTML/CSS/JS inicial)
- [Pixels de Rastreamento] - status: ✅ funcionando (Meta, TikTok, OmniGrowth)
- [Notificações Sociais] - status: ✅ funcionando (Social Proof fake)
- [Narrativa Visual] - status: ⚠️ parcial (Em reestruturação para Storytelling Magnético)

## 2. DECISÕES DE ARQUITETURA (e por quê)
- Decisão: Mobile-First Scroll Snapping
  Razão: Proporcionar uma experiência de "app nativo" no smartphone, focando em uma seção por vez.
- Decisão: Storytelling Progressivo (Nascimento 2021)
  Razão: Conectar emocionalmente o usuário antes de pedir a compra (liberdade e espírito livre).
- Decisão: Cupom Magnético EDM20
  Razão: Gatilho de conversão imediata (20% OFF) integrado à estética visual.

## 3. CONTRATOS ATIVOS (fonte única de verdade de nomes/tipos)
- Eventos de Tracking (TikTok/Meta):
  - `PageView` / `page()` no carregamento da página.
  - `AddToCart` no clique dos botões da vitrine (envia `content_ids` e `content_name`).
  - `ScrollDepth` disparado nas marcas de 25%, 50%, 75%, 100%.
  - `TimeOnSite` disparado em 30s e 60s.
  Usado por: `script.js` -> APIs de terceiros.

## 4. DÉBITOS TÉCNICOS CONHECIDOS (não esquecer, não fingir que não existe)
- Atualização Manual de Produtos — Severidade: Média — Os dados dos produtos, preços e links de checkout estão "hardcoded" no `index.html`. Qualquer mudança no catálogo exige commit manual.
- Gestão de Imagens Estáticas — Severidade: Baixa — Imagens da comunidade e produtos estão apontando para o Unsplash. Precisarão ser substituídas por URLs das fotos oficiais da marca.

## 5. VARIÁVEIS DE AMBIENTE NECESSÁRIAS
- N/A — Atualmente o projeto é 100% estático (GitHub Pages) sem backend ou processo de build que exija variáveis de ambiente em tempo de compilação. IDs de Pixel estão no código do cliente.

## 6. PRÓXIMOS PASSOS DECLARADOS
1. Implementar o "Hero Hook" (Animação de entrada magnética).
2. Adicionar a seção de história (Narrativa 2021 -> Liberdade).
3. Estilizar o cupom EDM20 com animação neon.
4. Otimizar performance para smartphone.
5. Deploy no GitHub Pages.

## 7. ERROS JÁ RESOLVIDOS (não repetir o mesmo bug)
- 2026-06-11 — Erro de JS (`addEventListener` on null) — Elementos faltantes quebrando a execução em 28% dos devices. — Adicionado condicional `if (elemento)` antes de atrelar eventos no `script.js`.
- 2026-06-11 — Alto Bounce Rate (Mobile) — Falta de conexão imediata na Hero section e rolagem ineficiente. — Substituído por imagem 100vh, copy agressiva e inserção de Sticky CTA (botão fixo no rodapé).
