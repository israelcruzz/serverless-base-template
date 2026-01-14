````markdown
# Serverless Project Template

![Project Image](./path/to/your/image.png)  
*Replace the path above with your project screenshot or illustration.*

---

## 🇬🇧 English Version

### Overview
This is a **Serverless Framework template** using **Express.js** for building AWS Lambda functions.  
It supports modular architecture and HTTP API routing, making it easy to expand your services (auth, users, uploads, etc.).

### Features
- Node.js 20.x runtime
- Express.js for routing
- Modular controllers
- `serverless-offline` plugin for local development
- Individual Lambda packaging
- ESBuild for bundling and minification
- Supports ANY HTTP method via `httpApi`

### Getting Started

1. **Install dependencies**
```bash
npm install
````

2. **Run locally**

```bash
npx serverless offline
```

The API will be available at `http://localhost:3000`.

3. **Deploy to AWS**

```bash
npx serverless deploy
```

### Project Structure

```
src/
 ├─ Domains/
 │   ├─ Auth/
 │   │   ├─ handler.ts
 │   │   └─ Controllers/
 │   │       └─ SignInController.ts
 │   └─ Users/
 └─ buildApp.ts
serverless.yml
```

### Routes Example

| Method | Path                  | Controller               |
| ------ | --------------------- | ------------------------ |
| GET    | /authentication/auth  | SignInController.handler |
| POST   | /authentication/login | SignInController.handler |

> Adjust routes in Express to match the `serverless.yml` path.

---

## 🇧🇷 Versão em Português

### Visão Geral

Este é um **template Serverless Framework** usando **Express.js** para criar funções AWS Lambda.
Suporta arquitetura modular e roteamento HTTP API, facilitando a expansão do seu projeto (auth, usuários, uploads, etc.).

### Funcionalidades

* Node.js 20.x runtime
* Express.js para roteamento
* Controllers modulares
* Plugin `serverless-offline` para desenvolvimento local
* Pacotes individuais por função Lambda
* ESBuild para bundle e minificação
* Suporte para qualquer método HTTP via `httpApi`

### Como Começar

1. **Instale as dependências**

```bash
npm install
```

2. **Rodar localmente**

```bash
npx serverless offline
```

A API ficará disponível em `http://localhost:3000`.

3. **Deploy para AWS**

```bash
npx serverless deploy
```

### Estrutura do Projeto

```
src/
 ├─ Domains/
 │   ├─ Auth/
 │   │   ├─ handler.ts
 │   │   └─ Controllers/
 │   │       └─ SignInController.ts
 │   └─ Users/
 └─ buildApp.ts
serverless.yml
```

### Exemplo de Rotas

| Método | Caminho               | Controller               |
| ------ | --------------------- | ------------------------ |
| GET    | /authentication/auth  | SignInController.handler |
| POST   | /authentication/login | SignInController.handler |

> Ajuste as rotas no Express para que correspondam ao `serverless.yml`.

```
```
