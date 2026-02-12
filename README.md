
# Nexa Regata Sauna Company

Projeto React + TypeScript + Vite recriado fielmente a partir de layouts de design para venda de regatas com efeito sauna.

## 🚀 Como Rodar Localmente

1. Clone o repositório.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 📦 Como Buildar para Produção

Execute o comando:
```bash
npm run build
```
O conteúdo será gerado na pasta `/dist`.

## ☁️ Deploy na Vercel

1. Importe o repositório no dashboard da Vercel.
2. Configurações recomendadas:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Adicione as variáveis de ambiente do Supabase (se for integrar):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## 🛡️ Acesso ao Painel Administrativo

O painel está disponível em `/#/admin`.
- **Senha Padrão:** `nexa2024` (Configurável no arquivo `App.tsx`)

## ✅ Checklist Anti-Tela-Branca

- [x] O `index.html` possui fallback visível de "Carregando...".
- [x] Implementado `ErrorBoundary` para capturar falhas de runtime.
- [x] Build configurado via Vite gerando artefatos estáticos.
- [x] Persistência via `localStorage` como fallback seguro para evitar crash por falta de API.
- [x] Uso de `HashRouter` para compatibilidade total com deploys estáticos (evita 404 em reload).
