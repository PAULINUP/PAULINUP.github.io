# MEMORIA.md — Impontuality Landing Page
Última atualização: 2026-06-11

## 1. ESTADO ATUAL (o que existe e funciona AGORA)
- **Frontend / Landing Page** — status: ✅ funcionando
  - Hero section imersiva (100vh) focada em conversão mobile.
  - Poema manifesto ("I'am from Bras(z)il").
  - Prova social (Comunidade Impontuality) com grid de fotos.
  - Loja com botões "Vestir Agora" (cor Dourado-Âmbar) com gatilho de escassez.
  - Tracking (TikTok Pixel, Meta Pixel, Microsoft Clarity) ativos e blindados.
  - Otimizações de performance (Lazy loading e throttle de scroll) implementadas.

## 2. DECISÕES DE ARQUITETURA (e por quê)
- Decisão: Abordagem Mobile-First Estrita
  Razão: 100% do tráfego detectado pelo Clarity vem de dispositivos móveis via Instagram.
  Data: 2026-06-11
  Alternativas rejeitadas: Layouts focados em Desktop, pois a retenção mobile estava crítica (27 segundos).
- Decisão: Injeção direta de Pixels com verificações de nulidade (`typeof !== 'undefined'`)
  Razão: Garantir resiliência se um serviço de terceiros (ex: Clarity) falhar ou for bloqueado por AdBlockers.
  Data: 2026-06-11

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
1. Substituir imagens de placeholder (Unsplash) por fotos oficiais da Impontuality.
2. Avaliar integração futura com um CMS (ex: Netlify CMS ou API da Uma Penca) para injetar produtos dinamicamente.

## 7. ERROS JÁ RESOLVIDOS (não repetir o mesmo bug)
- 2026-06-11 — Erro de JS (`addEventListener` on null) — Elementos faltantes quebrando a execução em 28% dos devices. — Adicionado condicional `if (elemento)` antes de atrelar eventos no `script.js`.
- 2026-06-11 — Alto Bounce Rate (Mobile) — Falta de conexão imediata na Hero section e rolagem ineficiente. — Substituído por imagem 100vh, copy agressiva e inserção de Sticky CTA (botão fixo no rodapé).
