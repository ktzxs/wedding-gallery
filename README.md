# 💍 Wedding Gallery (Galeria de Casamento)

Bem-vindo ao repositório do **Wedding Gallery**! Este é um projeto desenvolvido para ser um site de casamento onde os convidados podem compartilhar as fotos que tiraram durante o evento e visualizar os registros feitos por outros convidados.

Uma forma interativa e colaborativa de eternizar os momentos especiais do casamento sob diferentes perspectivas! 📸✨

## 🏗️ Estrutura do Projeto

Este projeto é um **Monorepo** gerenciado pelo [Turborepo](https://turbo.build/) e [pnpm](https://pnpm.io/). Ele está dividido nas seguintes aplicações principais:

- `apps/web`: O frontend da aplicação (o site que os convidados acessarão).
- `apps/api`: O backend da aplicação (responsável por gerenciar os uploads de fotos, banco de dados, etc).
- `packages/`: Dependências e configurações compartilhadas entre as aplicações (caso houver).

## 🚀 Tecnologias Utilizadas

- **Gerenciador de Pacotes:** pnpm
- **Monorepo:** Turborepo
- **Node.js:** `>= 20`

## 🛠️ Como Executar o Projeto Localmente

### Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [pnpm](https://pnpm.io/installation) (versão 11+)

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone <url-do-seu-repositorio>
   cd wedding-gallery
   ```

2. **Instale as dependências:**
   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente:**
   - Navegue até `apps/api` e copie o arquivo de exemplo para criar o seu próprio:
     ```bash
     cp apps/api/.env.example apps/api/.env
     ```
   - Preencha as variáveis necessárias dentro do `.env`.
   - Faça o mesmo para o frontend (`apps/web`), se houver um arquivo `.env.example`.

4. **Inicie o ambiente de desenvolvimento:**
   Na raiz do projeto (onde está o `package.json` principal), execute:
   ```bash
   pnpm dev
   ```
   
   *O Turborepo iniciará automaticamente o frontend e a API de forma simultânea.*

## 📜 Scripts Disponíveis (Raiz)

- `pnpm dev`: Inicia todas as aplicações em modo de desenvolvimento.
- `pnpm build`: Compila todas as aplicações e pacotes para produção.
- `pnpm lint`: Executa a verificação de código (linting) em todo o monorepo.
- `pnpm start`: Inicia as aplicações compiladas.

---
Feito com ❤️ para tornar o dia do casamento inesquecível!
