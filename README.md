<div align="center">

# 🧠 CodeYourMind (CYM)

### Transforme intenção em ação

<p>
<img src="https://img.shields.io/static/v1?label=status&message=em%20desenvolvimento&color=success&style=for-the-badge" />

<img src="https://img.shields.io/github/license/arthurjd03/codeyourmind?style=for-the-badge" />

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

Uma plataforma para **gestão de metas, progresso pessoal e controle financeiro**, criada para ajudar pessoas a desenvolver **disciplina e produtividade**.

</div>

# 🚀 Sobre o projeto

O **CodeYourMind (CYM)** é uma aplicação desenvolvida para ajudar usuários a:

- definir metas pessoais
- acompanhar progresso diário
- visualizar evolução ao longo do tempo
- organizar objetivos de forma clara

O projeto foi construído com foco em:

- arquitetura escalável
- organização de código
- boas práticas de desenvolvimento front-end
- componentização

---

# 🧩 Funcionalidades

✔️ Criação de metas  
✔️ Classificação por categoria  
✔️ Acompanhamento de progresso  
✔️ Visualização de progresso com barras  
✔️ Controle financeiro simples  
✔️ Interface responsiva  
✔️ Feedback visual com notificações

---

# ⚙️ Tecnologias utilizadas no CodeYourMind (CYM)

## 🖥️ Frontend
- **React**
Biblioteca principal para construção da interface.
- TypeScript
Utilizado para tipagem estática, interfaces e maior segurança no código.
- Vite
Ferramenta de build e servidor de desenvolvimento com Fast Refresh.

## 🎨 Estilização
- CSS Modules
Estilização modular com escopo local para cada componente.
Mobile-First Design
Toda estilização pensada primeiro para telas menores.

## 🧭 Navegação
- React Router
 Responsável pelo sistema de rotas da aplicação (SPA).

## 🧠 Gerenciamento de Estado
- React Context API
 Utilizado para gerenciamento de estado global.

#🔔 Sistema de Notificações
- React Toastify
Biblioteca para notificações visuais.
No CYM ela foi desacoplada usando:

Adapter Pattern
(toastifyAdapter)

Isso permite trocar a biblioteca no futuro sem alterar o resto do sistema.

🔑 Identificadores
UUID
Utilizado para gerar identificadores únicos para entidades como metas e transações.

---

## 🏗️ Arquitetura do projeto

A aplicação segue uma estrutura organizada e modular para facilitar manutenção e escalabilidade.

```bash
src
│
├── adapters
├── assets
├── components
├── constants
├── contexts
├── hooks
├── models
├── pages
├── routes
├── styles
├── templates
├── utils
│
├── App.tsx
└── main.tsx
```

Cada pasta possui responsabilidades específicas dentro da aplicação.

Exemplo:

| Pasta | Responsabilidade |
|------|----------------|
components | Componentes reutilizáveis |
pages | Páginas da aplicação |
models | Modelos de dados |
hooks | Hooks customizados |
utils | Funções utilitárias |

---

## 📊 Modelos de dados

### GoalModel

### TransactionModel

---

## 🧠 Conceitos aplicados

O projeto aplica conceitos importantes do ecossistema **React**:

- componentização
- separação de responsabilidades
- gerenciamento de estado
- reutilização de componentes
- arquitetura escalável

---
```bash
## 📦 Instalação

Clone o repositório:


git clone https://github.com/arthurjd03/codeyourmind.git


Entre na pasta do projeto:


cd codeyourmind


Instale as dependências:


npm install


Execute o projeto:


npm run dev
```

---

## 🌐 Estrutura visual

A interface foi construída priorizando:

- simplicidade
- clareza de informação
- experiência do usuário
- responsividade

---

## 🔮 Próximos passos

Planejamentos futuros para o projeto:

- autenticação
- banco de dados
- salvamento de metas na nuvem
- dashboard analítico

---

## 👨‍💻 Autor

**Arthur José**

Estudante de Engenharia de Software e desenvolvedor focado em front-end.
🔗 [LinkedIn](https://linkedin.com/in/arthurjose01)

---
</p>
