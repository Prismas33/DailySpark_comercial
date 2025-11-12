# 🎭 Guia Rápido - Modo Demo DailySpark

## ⚡ Início Rápido

### 1. Configure o arquivo .env.local

```bash
# Copie o arquivo de exemplo
copy .env.local.example .env.local
```

Ou crie manualmente com este conteúdo mínimo:
```env
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_FIREBASE_API_KEY=DEMO_MODE_NO_REAL_API_KEY
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=demo_secret
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie a aplicação

```bash
npm run dev
```

### 4. Acesse no navegador

```
http://localhost:3001
```

### 5. Faça login com QUALQUER credencial

Exemplos:
- Email: `demo@dailyspark.com` | Senha: `123456`
- Email: `teste@exemplo.com` | Senha: `qualquer`
- Email: `seu@email.com` | Senha: `sua_senha`

**✨ QUALQUER email e senha funciona no modo demo!**

---

## 🎯 Funcionalidades Disponíveis

### ✅ Login/Signup Mockado
- Aceita qualquer combinação de email/senha
- Dados armazenados localmente (localStorage)
- Sessão persistente entre reloads

### ✅ Dashboard Completo
- Templates de conteúdo pré-carregados
- Posts agendados simulados
- Posts publicados com métricas fake
- Contas sociais mockadas (LinkedIn, Twitter, Facebook, Instagram)

### ✅ Criação de Posts
- **Post Now**: Publicação imediata simulada
- **Schedule**: Agendamento de posts
- **Queue**: Visualização da fila de posts
- **Settings**: Gerenciamento de contas sociais

### ✅ Analytics Mockados
- Engajamento total
- Taxa de crescimento
- Posts com melhor performance
- Métricas por plataforma

---

## 🔧 Estrutura do Código Demo

### Serviços Mock Criados

#### `lib/mockAuth.ts`
```typescript
// Autenticação mockada
mockSignInWithEmailAndPassword(email, password)
mockSignOut()
mockOnAuthStateChanged(callback)
isDemoMode() // Verifica se está em modo demo
```

#### `lib/mockData.ts`
```typescript
// Dados mockados
mockTemplates // 5 templates prontos
mockScheduledPosts // 3 posts agendados
mockPublishedPosts // 3 posts publicados
mockSocialAccounts // 4 contas sociais
mockAnalytics // Estatísticas gerais
mockGenerateAIContent() // Simula geração de conteúdo IA
```

### Páginas Modificadas

- ✅ `app/auth/signin/page.tsx` - Login com mock
- ✅ `app/auth/signup/page.tsx` - Signup com mock
- ✅ `app/dashboard/DashboardClient.tsx` - Dashboard com dados mock
- ✅ `components/SocialMediaManager/SocialMediaManager.tsx` - Banner DEMO

---

## 🎨 Identificadores Visuais

### Banner de Demo
- **Topo da página de login**: Banner roxo/rosa indicando modo demo
- **Topo do dashboard**: Banner fixo mostrando "DEMO MODE"
- **Mensagens**: Texto explicativo que aceita qualquer credencial

### Código Comentado
Todos os locais com código original Firebase têm comentários:
```typescript
// 🎭 DEMO MODE: Original code commented
// Original Firebase code here...
```

---

## 📊 Dados de Exemplo Disponíveis

### Templates (5)
1. Product Launch Announcement
2. Industry Insight
3. Quick Tip Tuesday
4. Customer Success Story
5. Monday Motivation

### Posts Agendados (3)
- Q1 Results (em 2 horas)
- New Feature Alert (amanhã)
- Webinar Invite (em 3 dias)

### Posts Publicados (3)
- Friday Weekend Post (342 likes)
- Partnership Announcement (521 likes)
- Behind the Scenes (412 likes)

### Contas Sociais (4)
- LinkedIn: @DailySpark Marketing (12,547 seguidores) ✅ Conectada
- Twitter: @dailyspark (8,932 seguidores) ✅ Conectada
- Facebook: DailySpark ❌ Não conectada
- Instagram: @dailyspark.marketing ❌ Não conectada

---

## 🔄 Voltando ao Modo Produção

Para reativar as APIs reais:

1. **Adicione as credenciais reais** no `.env.local`
2. **Desative o modo demo**: `NEXT_PUBLIC_DEMO_MODE=false`
3. **Descomente o código Firebase** nos arquivos marcados com 🎭
4. **Remova os imports mock** e restaure os imports Firebase

---

## ⚠️ Notas Importantes

- ✅ Nenhum dado é salvo em servidor
- ✅ Tudo funciona localmente
- ✅ Nenhuma chamada externa de API
- ✅ Dados resetam ao limpar localStorage
- ✅ Perfeito para demonstrações comerciais

---

## 🆘 Troubleshooting

### "Não consigo fazer login"
- Verifique se `NEXT_PUBLIC_DEMO_MODE=true` está no `.env.local`
- Tente limpar o localStorage do navegador

### "Página em branco"
- Execute `npm install` novamente
- Verifique o console do navegador para erros
- Reinicie o servidor (`npm run dev`)

### "Erros de TypeScript"
- Execute `npm run type-check`
- Certifique-se que todos os arquivos foram criados

---

**🎉 Pronto! Sua versão demo do DailySpark está funcionando!**
