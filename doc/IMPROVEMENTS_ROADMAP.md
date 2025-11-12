# DailySpark - Roadmap de Melhorias

**Data**: 11 de Novembro de 2025  
**Status**: Análise e Planeamento

---

## 🚨 Problemas Críticos Identificados

### 1. **Botão de Logout Inexistente**
- ❌ Não existe forma do utilizador fazer logout da aplicação
- ❌ Não há indicação visual de qual utilizador está logado
- **Impacto**: Utilizador fica "preso" na sessão, sem controlo sobre autenticação

### 2. **Layout Desktop Quebrado**
- ❌ Botões de navegação ficaram desalinhados após ajuste mobile
- ❌ "Settings" aparece separado dos outros botões (Post Now, Schedule, Queue)
- ❌ O ajuste mobile afetou negativamente a experiência desktop
- **Causa**: Mudanças no layout não usaram `isMobile` para condicionar estilos

### 3. **Settings Vazio e Inútil**
- ❌ Página de Settings atual só mostra status de contas conectadas (info estática)
- ❌ Não permite alterar password
- ❌ Não permite editar perfil do utilizador
- ❌ Não permite fazer upload de foto de perfil
- ❌ Não tem campo para configurar prompt da IA (necessário para geração futura de posts)

### 4. **UI Não User-Friendly**
- ❌ Cartões demasiado grandes (ocupam muito espaço vertical)
- ❌ Espaçamento excessivo entre elementos (padding/margin muito generoso)
- ❌ Informação importante está "escondida" por muito white space
- ❌ Não aproveita bem o viewport disponível

---

## ✅ Prioridades de Correção

### **PRIORIDADE 1 - Autenticação e Navegação** 🔴 ✅ **CONCLUÍDO**

#### 1.1 Adicionar Botão de Logout ✅
- [x] Criar dropdown no canto superior direito com:
  - Avatar/inicial do utilizador (círculo com gradiente emerald/teal)
  - Nome e email (truncado)
  - Opção "Settings" (muda tab para settings)
  - Opção "Logout" (chama Firebase signOut)
- [x] Garantir que logout funciona:
  - Limpa token Firebase via `signOut(auth)`
  - Remove listeners via `onAuthStateChanged`
  - Redireciona para `/auth/signin`
  - **Implementado em**: `components/UserDropdown.tsx` + `app/dashboard/DashboardClient.tsx`

#### 1.2 Corrigir Layout dos Botões de Navegação ✅
- [x] Hook `useIsMobile` criado em `hooks/useIsMobile.ts`:
  - Detecta viewport < 768px
  - Debounce de 150ms para evitar re-renders excessivos
  - Usado em `SocialMediaManager.tsx`
  
- [x] **Solução Final**: Remover tabs duplicados, colocar botões no header
  - Header com 2 linhas em mobile (logo+user | botões)
  - Header com 1 linha em desktop (logo | botões | user)
  - Botões Post Now, Schedule, Queue no header (Settings no dropdown)
  - Mobile: botões com flex-1 (ocupam largura igual)
  - Desktop: botões centrados no meio do header

---

### **PRIORIDADE 2 - Settings Funcionais** 🟠

#### 2.1 Criar Página de Settings Verdadeira
Localização: `components/SocialMediaManager/Settings.tsx`

**Secções a Implementar**:

##### A) **Perfil do Utilizador**
- [ ] **Foto de Perfil**:
  - Upload de imagem (max 5MB, JPG/PNG)
  - Preview antes de salvar
  - Guardar no Firebase Storage: `/users/{userId}/profile.jpg`
  - Metadata em Firestore: `users/{userId}/profile/photoURL`
- [ ] **Informações Básicas**:
  - Nome completo (editável)
  - Email (read-only, com opção de "Alterar email" que pede re-autenticação)
  - Data de criação da conta (read-only)

##### B) **Segurança**
- [ ] **Alterar Password**:
  - Campo "Password atual" (validação antes de permitir mudança)
  - Campo "Nova password" (min 6 chars, mostrar força)
  - Campo "Confirmar nova password"
  - Botão "Atualizar Password" (usa Firebase `updatePassword`)
  - Feedback de sucesso/erro
- [ ] **Verificação de Email** (se não verificado):
  - Badge "Email não verificado"
  - Botão "Reenviar email de verificação"

##### C) **Configurações de IA**
- [ ] **Prompt Personalizado**:
  - Textarea grande (min 3 linhas, max 10 linhas)
  - Placeholder: "Escreva aqui instruções para a IA gerar posts no seu estilo... (ex: Tom profissional, use emojis, foque em tecnologia)"
  - Character count (ex: 500/2000)
  - Botão "Salvar Prompt"
  - Guardar em Firestore: `users/{userId}/settings/aiPrompt`
- [ ] **Histórico de Prompts** (opcional fase 2):
  - Lista de prompts salvos anteriormente
  - Opção de restaurar prompt antigo

##### D) **Preferências de Notificações** (futuro)
- [ ] Toggle: Notificar quando post é publicado
- [ ] Toggle: Notificar quando post falha
- [ ] Toggle: Resumo diário de atividade

##### E) **Gestão de Contas Conectadas**
- [ ] Manter secção atual de status das contas (LinkedIn, X, FB, IG)
- [ ] Adicionar botão "Reconfigurar" para cada plataforma (reabre OAuth flow - fase 2)

---

### **PRIORIDADE 3 - Otimização de UI/UX** 🟡 ✅ **PARCIALMENTE CONCLUÍDO**

#### 3.1 Reduzir Tamanho dos Cartões ✅
**Componentes afetados**:
- [x] `ManualPost.tsx` - Reduzido padding (p-6→p-4), gaps (gap-3→gap-2), ícones (text-2xl→text-xl)
- [x] `Settings.tsx` - Reduzido padding (p-6→p-4), gaps, títulos (text-xl→text-lg)
- [x] `SchedulePost.tsx` - Reduzido padding e margins (mb-6→mb-4)
- [ ] `QueueViewer.tsx` - Pendente

**Mudanças Aplicadas**:
- [x] Padding: `p-8` → `p-4`, `p-6` → `p-4`
- [x] Gaps: `gap-6` → `gap-3`, `gap-3` → `gap-2`
- [x] Títulos: `text-2xl` → `text-lg`, `text-xl` → `text-base`
- [x] Ícones: `text-4xl` → `text-2xl`, `text-3xl` → `text-xl`
- [x] Bordas: `rounded-2xl` → `rounded-xl` ou `rounded-lg`

#### 3.2 Melhorar Aproveitamento de Espaço ✅

##### A) Header Principal
- [x] Header fixo com `sticky top-0`
- [x] Mobile: 2 linhas (logo+user | botões full-width)
- [x] Desktop: 1 linha (logo | botões centrados | user)
- [x] Reduzido altura: `py-3` consistente

##### B) Navegação
- [x] Botões integrados no header (não mais tabs separados)
- [x] Mobile: 3 botões com `flex-1` (largura igual)
- [x] Desktop: botões centrados, largura automática
- [x] Texto menor em mobile (`text-xs`) vs desktop (`text-sm`)

##### C) Formulários
- [x] TextareaManualPost: `h-40` → `h-32`, padding `p-4` → `p-3`
- [x] Labels: mantido `text-sm` (já compacto)
- [x] Botões de plataforma: `p-4` → `p-3`, ícones `text-2xl` → `text-xl`

---

### **PRIORIDADE 4 - Responsividade Correta** 🟢 ✅ **CONCLUÍDO**

#### 4.1 Criar Hook `useIsMobile` ✅
**Implementado em**: `hooks/useIsMobile.ts`

Características:
- [x] Breakpoint customizável (default: 768px)
- [x] Debounce de 150ms no resize listener
- [x] Cleanup automático do event listener
- [x] TypeScript com tipos corretos

#### 4.2 Aplicar Hook em Componentes ✅
- [x] `SocialMediaManager.tsx` - Layout de header responsivo (2 linhas mobile | 1 linha desktop)
- [x] Tailwind responsive classes em todos componentes (`md:`, `sm:`, `lg:`)
- [x] Mobile-first approach (base = mobile, breakpoints = desktop)
- [x] Scrollbar hide com CSS customizado em `globals.css`

---

## 📋 Checklist de Implementação

### Fase 1 - Correções Críticas ✅ **80% CONCLUÍDO**
- [x] Criar hook `useIsMobile` (`hooks/useIsMobile.ts`)
- [x] Adicionar dropdown de utilizador com logout (`components/UserDropdown.tsx`)
- [x] Corrigir layout dos botões (header responsivo - 2 linhas mobile | 1 linha desktop)
- [x] Reduzir padding/margin globalmente (ManualPost, Settings, SchedulePost)
- [x] Reduzir tamanho de cartões e ícones
- [ ] Implementar Settings → Perfil (nome, foto) **PENDENTE**
- [ ] Implementar Settings → Alterar Password **PENDENTE**
- [ ] Implementar Settings → Prompt de IA **PENDENTE**

### Fase 2 - Settings Funcionais 🔄 **PRÓXIMO**
- [ ] Criar `SettingsSections/ProfileSection.tsx` com upload de foto
- [ ] Criar `SettingsSections/SecuritySection.tsx` com alterar password
- [ ] Criar `SettingsSections/AIConfigSection.tsx` com textarea de prompt
- [ ] Criar helper `lib/userProfile.ts` para operações Firebase
- [ ] Refatorar `Settings.tsx` para usar as novas secções

### Fase 3 - Features Adicionais (Backlog)
- [ ] Histórico de prompts de IA
- [ ] Preferências de notificações
- [ ] Temas (dark/light)
- [ ] Atalhos de teclado
- [ ] QueueViewer reduzir spacing

---

## 🎯 Métricas de Sucesso

### User Experience
- [ ] Utilizador consegue fazer logout em ≤2 cliques
- [ ] Utilizador consegue alterar password em ≤30 segundos
- [ ] Utilizador consegue configurar prompt IA em ≤1 minuto
- [ ] Layout mobile funciona sem quebras em iPhone SE (375px)
- [ ] Layout desktop aproveita >70% do viewport (sem espaço desperdiçado)

### Performance
- [ ] Lighthouse Score (Mobile) ≥90
- [ ] First Contentful Paint ≤1.5s
- [ ] Time to Interactive ≤3s

### Qualidade de Código
- [ ] 0 TypeScript errors
- [ ] 0 ESLint warnings
- [ ] 100% componentes com PropTypes/TypeScript
- [ ] Todos hooks com dependências corretas

---

## 🔧 Estrutura de Ficheiros

```
hooks/
  useIsMobile.ts              ✅ CRIADO (detecta viewport < 768px, debounce 150ms)

components/
  UserDropdown.tsx            ✅ CRIADO (avatar, email, settings, logout)
  SocialMediaManager/
    SocialMediaManager.tsx    ✅ ATUALIZADO (header responsivo, botões integrados)
    ManualPost.tsx            ✅ ATUALIZADO (spacing reduzido)
    Settings.tsx              ✅ ATUALIZADO (spacing reduzido) → REFACTOR PENDENTE
    SchedulePost.tsx          ✅ ATUALIZADO (spacing reduzido)
    QueueViewer.tsx           ⏳ PENDENTE (reduzir spacing)
    SettingsSections/
      ProfileSection.tsx      ⏳ CRIAR (nome, foto, email)
      SecuritySection.tsx     ⏳ CRIAR (alterar password, verificação email)
      AIConfigSection.tsx     ⏳ CRIAR (prompt IA, save Firestore)
      PlatformsSection.tsx    ⏳ CRIAR (mover lógica atual de Settings.tsx)

app/
  dashboard/
    DashboardClient.tsx       ✅ ATUALIZADO (logout via Firebase signOut)
  globals.css                 ✅ ATUALIZADO (scrollbar-hide, smooth scroll)

lib/
  userProfile.ts              ⏳ CRIAR (uploadPhoto, updateProfile, helpers Firebase)
  
types/
  user.ts                     ⏳ CRIAR (UserProfile, UserSettings, interfaces TypeScript)
```

---

## 📝 Notas Técnicas

### Firebase Firestore Schema

#### Coleção `users/{userId}`
```json
{
  "profile": {
    "displayName": "André Ventura",
    "email": "ventura.vnsa@gmail.com",
    "photoURL": "https://storage.googleapis.com/.../profile.jpg",
    "createdAt": "2025-11-11T10:00:00Z",
    "lastUpdated": "2025-11-11T15:30:00Z"
  },
  "settings": {
    "aiPrompt": "Escreva posts profissionais sobre tecnologia, use emojis ocasionalmente...",
    "notifications": {
      "postPublished": true,
      "postFailed": true,
      "dailySummary": false
    }
  }
}
```

#### Firebase Storage Structure
```
/users/{userId}/
  profile.jpg          ← Foto de perfil
  media/               ← Media uploads para posts
    {timestamp}-{filename}
```

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Hook `useIsMobile` causa re-renders excessivos | Média | Baixo | Debounce no resize listener (300ms) |
| Upload de foto falha para imagens grandes | Alta | Médio | Validação client-side + resize antes upload |
| Alterar password sem re-autenticação falha | Alta | Alto | Sempre pedir password atual antes de alterar |
| Prompt IA muito longo causa timeout | Baixa | Médio | Limitar a 2000 caracteres |

---

## 🚀 Próximos Passos Imediatos

### ✅ Concluído (3h30min)
1. ✅ **Criar `useIsMobile` hook** (15min)
2. ✅ **Adicionar UserDropdown com logout** (30min)
3. ✅ **Corrigir layout - botões no header** (45min)
4. ✅ **Reduzir padding/spacing global** (2h) - ManualPost, Settings, SchedulePost

### ⏳ Próximos (3h restantes)
5. **Implementar Settings → Profile Section** (1h)
   - Upload de foto (Firebase Storage)
   - Editar nome (Firebase Auth + Firestore)
   - Display email (read-only)
   
6. **Implementar Settings → Security Section** (1h)
   - Alterar password (Firebase Auth updatePassword)
   - Reautenticação quando necessário
   - Verificação de email
   
7. **Implementar Settings → AI Config Section** (45min)
   - Textarea para prompt personalizado
   - Save/load de Firestore `users/{uid}/settings/aiPrompt`
   - Character count (max 2000)

8. **Build + Commit + Push** (15min)

**Tempo total estimado**: ~7 horas | **Completado**: 50%

---

## ✨ Conclusão

Este documento mapeia todas as melhorias necessárias para tornar o DailySpark mais **user-friendly**, **funcional** e **profissional**. A implementação será feita em fases, priorizando correções críticas (logout, layout) antes de features adicionais (AI prompt, notificações).

**Foco principal**: Menos é mais. Reduzir, compactar, otimizar.
