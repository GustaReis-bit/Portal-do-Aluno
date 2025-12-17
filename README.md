#
 Portal de Alunos DEBAC - API

API RESTful completa para gerenciamento de rematrícula acadêmica, desenvolvida em **NestJS** com arquitetura modular, autenticação robusta e documentação interativa.

## 📋 Sobre o Projeto

Este repositório implementa uma solução enterprise para processos de rematrícula de alunos com:

- ✅ Autenticação segura via JWT
- ✅ Suporte a autenticação com Google OAuth2
- ✅ Controle de acesso baseado em papéis (RBAC)
- ✅ Integração com Supabase (PostgreSQL)
- ✅ Documentação interativa via Swagger
- ✅ Validação de dados com DTOs
- ✅ Arquitetura modular e escalável

## 🛠️ Stack Tecnológico

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| NestJS | ^10.0.0 | Framework Web/API |
| TypeORM | ^0.3.27 | ORM para banco de dados |
| JWT | ^10.0.0 | Autenticação |
| Passport | ^0.7.0 | Estratégias de autenticação |
| Supabase/PostgreSQL | - | Banco de dados |
| Swagger | ^7.0.0 | Documentação API |
| Class Validator | ^0.14.0 | Validação de dados |
| Class Transformer | ^0.5.1 | Transformação de dados |

## 📁 Estrutura do Projeto

```
src/
├── main.ts                          # Ponto de entrada da aplicação
├── app.module.ts                    # Módulo raiz
├── common/                          # Utilitários compartilhados
│   ├── common.module.ts
│   ├── jwt-auth.guard.ts           # Guard de autenticação JWT
│   ├── decorators/
│   │   └── roles.decorator.ts      # Decorator para verificar papéis
│   └── guards/
│       └── roles.guard.ts          # Guard para autorização por papéis
├── modules/
│   ├── admin/                      # Módulo de administradores
│   │   ├── admin.controller.ts
│   │   ├── admin.entity.ts
│   │   ├── admin.module.ts
│   │   ├── admin.service.ts
│   │   └── dto/
│   │       ├── admin-create.dto.ts
│   │       ├── admin-login.dto.ts
│   │       └── admin-update-aluno.dto.ts
│   ├── aluno/                      # Módulo de alunos
│   │   ├── aluno.controller.ts
│   │   ├── aluno.entity.ts
│   │   ├── aluno.module.ts
│   │   ├── aluno.service.ts
│   │   ├── index.ts
│   │   └── dto/
│   │       ├── change-password.dto.ts
│   │       ├── create-aluno.dto.ts
│   │       └── update-aluno.dto.ts
│   ├── auth/                       # Módulo de autenticação
│   │   ├── admin.guard.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── index.ts
│   │   ├── jwt.strategy.ts
│   │   └── dto/
│   │       ├── login.dto.ts
│   │       ├── register-aluno.dto.ts
│   │       └── reset-password.dto.ts
│   └── supabase/                   # Integração com Supabase
│       ├── supabase.module.ts
│       └── supabase.service.ts
└── tsconfig.json                    # Configuração TypeScript

```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 16+)
- npm ou yarn
- Conta Supabase com banco de dados PostgreSQL
- Variáveis de ambiente configuradas

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <seu-repositorio>
   cd PortalAlun-DEBAC
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```

4. **Configure o arquivo `.env`**
   ```env
   # Banco de Dados
   DATABASE_URL=postgresql://user:password@host:port/database
   
   # JWT
   JWT_SECRET=sua_chave_secreta_muito_segura
   JWT_EXPIRATION=7d
   
   # Google OAuth2 (opcional)
   GOOGLE_CLIENT_ID=seu_client_id
   GOOGLE_CLIENT_SECRET=seu_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
   
   # Aplicação
   PORT=3000
   NODE_ENV=development
   ```

### Execução

**Desenvolvimento (com hot reload)**
```bash
npm run dev
```

**Produção**
```bash
npm run build
npm start
```

## 📚 Documentação da API

Após iniciar a aplicação, acesse a documentação interativa:

- **Swagger**: `http://localhost:3000/docs`
- **Swagger JSON**: `http://localhost:3000/docs-json`

## 🔐 Autenticação

### JWT Authentication

Endpoints protegidos exigem header Authorization:

```bash
curl -H "Authorization: Bearer <seu-token-jwt>" http://localhost:3000/alunos
```

### Fluxo de Login

1. **Aluno faz login**
   ```bash
   POST /auth/login
   Body: { "email": "aluno@exemplo.com", "senha": "senha123" }
   ```

2. **Recebe JWT token**
   ```json
   { "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
   ```

3. **Usa token em requisições**
   ```bash
   GET /alunos/profile
   Header: Authorization: Bearer <token>
   ```

## 👥 Papéis e Permissões (Roles)

- **ADMIN**: Acesso total à API, gerenciamento de alunos e rematrícula
- **ALUNO**: Acesso apenas ao seu próprio perfil e funcionalidades de rematrícula

## 🗄️ Banco de Dados

### Integração Supabase

A aplicação utiliza **Supabase** (PostgreSQL gerenciado) para persistência de dados.

**Variável necessária:**
```
DATABASE_URL=postgresql://user:password@host:port/dbname
```

### Entidades Principais

| Entidade | Descrição |
|----------|-----------|
| **Admin** | Usuários administradores com permissões totais |
| **Aluno** | Alunos do sistema com dados de rematrícula |

## 📦 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia em desenvolvimento com hot reload |
| `npm start` | Inicia em produção |
| `npm run build` | Compila TypeScript para JavaScript |

## 🔒 Segurança

- Senhas com hash bcrypt
- Tokens JWT com expiração configurável
- Guards de autenticação em endpoints sensíveis
- Validação de entrada com class-validator
- CORS configurável por ambiente

## 📝 Endpoints Principais

### Autenticação
- `POST /auth/login` - Login de aluno
- `POST /auth/register` - Registro de novo aluno
- `POST /auth/reset-password` - Resetar senha

### Alunos
- `GET /alunos` - Listar alunos (Admin)
- `GET /alunos/profile` - Perfil do aluno logado
- `PUT /alunos/:id` - Atualizar dados do aluno
- `POST /alunos/:id/change-password` - Trocar senha

### Administração
- `POST /admin/login` - Login de administrador
- `PUT /admin/alunos/:id` - Atualizar aluno (Admin)

## 🚨 Tratamento de Erros

A API retorna respostas de erro estruturadas:

```json
{
  "statusCode": 400,
  "message": "Email já cadastrado",
  "error": "Bad Request"
}
```

## 📞 Contato & Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.



Qualquer outra variável necessária

Instale as dependências:

npm install
npm install --save-dev bcrypt

Inicie o projeto em modo desenvolvimento:

npm run dev


Acesse a documentação Swagger:

http://localhost:3000/docs