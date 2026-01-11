# Scripts de Automação da API

## 📋 Scripts Disponíveis

### `npm run generate:api`

Gera o cliente TypeScript da API usando swagger-typescript-api baseado no OpenAPI spec do backend.

### `npm run update:api-exports`

Atualiza automaticamente as exportações de tipos no `src/core/sdk/index.tsx` baseado nas interfaces encontradas no `api.ts` gerado.

### `npm run regenerate:api`

**Combinação dos dois comandos acima** - Gera a API e atualiza as exportações automaticamente.

## 🚀 Como Usar

### Após mudanças no backend:

```bash
# Opção 1: Comando único (recomendado)
npm run regenerate:api

# Opção 2: Passo a passo
npm run generate:api
npm run update:api-exports
```

### Importação de DTOs:

```typescript
import { UserDTO, ProjectDTO, ServiceOrderDTO } from '@/core/sdk';

// Agora você tem acesso a todos os tipos automaticamente!
const user: UserDTO = { ... };
```

## 🤖 Automação

O script `update-api-exports.js` automaticamente:

- ✅ Lê todas as interfaces exportadas do `api.ts`
- ✅ Organiza por categoria (DTOs, Requests, Records, etc.)
- ✅ Atualiza o `index.tsx` com as exportações organizadas
- ✅ Remove exportações antigas e adiciona novas

**Nunca mais precisa atualizar manualmente as exportações!** 🎉

## 📁 Estrutura Gerada

```
src/core/sdk/
├── api.ts          # Cliente API gerado + interfaces
├── index.tsx       # Exportações + instância configurada
└── scripts/
    └── update-api-exports.js  # Script de automação
```
