# 🐾 API Adopets

API RESTful desenvolvida com **Node.js**, **TypeScript**, **TypeORM** e **SQLite**, focada em facilitar a **adoção de pets** por meio de uma plataforma que conecta abrigos e adotantes.

---

## 📋 Índice

- [📖 Visão Geral](#-visão-geral)
- [✅ Tecnologias e Padrões Aplicados](#-tecnologias-e-padrões-aplicados)
- [⚙️ Funcionalidades](#-funcionalidades)
- [📁 Estrutura de Arquivos](#-estrutura-de-arquivos)
- [📌 Endpoints da API](#-endpoints-da-api)
- [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
- [👤 Autor](#-autor)
- [📄 Licença](#-licença)

---

## 📖 Visão Geral

Plataforma para facilitar o processo de adoção de pets:

1. Usuários **(adotantes)** podem adotar vários pets.
2. Usuários **(abrigos)** podem cadastrar vários pets.
3. Abrigos podem cadastrar pets que ainda não foram adotados.
4. Usuários podem consultar todos os abrigos cadastrados com pets disponíveis.
5. Adoção de pets realizada diretamente pela plataforma.

---

## ✅ Tecnologias e Padrões Aplicados

- Padrões de projeto: **Factory**, **Repository**, **DataSource**
- Uso de **tipagem com TypeScript**
- Criação de **interfaces**, **enums** e **types**
- Organização em camadas: **Controller**, **Service**, **Repository**
- Aplicação do **Princípio da Inversão de Dependência (DIP)** do SOLID

Exemplo de interface:

```ts
// interfaces/IAdopterService.ts
export default interface IAdopterService {
  findAllAdopters(): Promise<AdopterEntity[]>;
  findAdopterById(adopterId: number): Promise<AdopterEntity>;
  createAdopter(dto: CreateAdopterDto): Promise<AdopterEntity>;
  // ...
}
```
---

## ⚙️ Funcionalidades
- CRUD completo para as rotas: /adopters, /shelters e /pets
- Middleware para tratamento de erros
- Utilitário errorHandler
- Criptografia de senha com salt e hash
- Autenticação com JWT
- Validações com Yup

---

## 📁 Estrutura de Arquivos
```bash
al-2024-api-adopets
├── docs/
├── src/
│   ├── controllers/
│   ├── dataSource/
│   │   ├── config/
│   │   │   └── dataSource.ts
│   │   ├── entities/
│   │   ├── repositories/
│   │   └── storage/
│   │       └── database_development.sqlite
│   ├── factories/
│   ├── interfaces/
│   │   ├── enums/
│   │   └── types/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.ts
├── .gitignore
├── eslint.config.js
├── package-lock.json
├── package.json
├── README.md
├── server.ts
└── tsconfig.json
```

---

## 📌 Endpoints da API
A seguir estão os principais endpoints disponíveis na API, organizados por recurso e com uma breve descrição de suas funcionalidades:

### * /adopters
- `GET /adopters` → Listar todos os adotantes cadastrados
- `GET /adopters/:adopterId` → Buscar um adotante específico por ID
- `POST /adopters` → Cadastrar um novo adotante
- `PUT /adopters/:adopterId` → Atualizar os dados de um adotante existente
- `DELETE /adopters/:adopterId` → Remover um adotante do sistema
- `GET /adopters/:adopterId/pets` → Listar todos os pets adotados por um adotante
- `GET /adopters/:adopterId/pets/:petId` → Visualizar um pet específico adotado por um adotante
- `PUT /adopters/:adopterId/pets/:petId` → Realizar a adoção de um pet

### * /shelters
- `GET /shelters` → Listar todos os abrigos cadastrados
- `GET /shelters/:shelterId` → Buscar um abrigo específico por ID
- `POST /shelters` → Cadastrar um novo abrigo
- `PUT /shelters/:shelterId` → Atualizar as informações de um abrigo
- `DELETE /shelters/:shelterId` → Remover um abrigo
- `GET /shelters/:shelterId/pets` → Listar todos os pets sob responsabilidade do abrigo
- `GET /shelters/:shelterId/pets/:petId` → Obter informações de um pet específico do abrigo
- `PUT /shelters/:shelterId/pets/:petId` → Cadastrar ou transferir um pet para o abrigo

### /pets – Pets
- `GET /pets` → Listar todos os pets disponíveis
- `GET /pets/:petId` → Buscar um pet específico por ID
- `POST /pets` → Cadastrar um novo pet
- `PUT /pets/:petId` → Atualizar os dados de um pet
- `DELETE /pets/:petId` → Remover um pet do sistema

## 🚀 Como Executar o Projeto
 ### Pré-requisitos
  - Node.js (v20 ou superior)
  - npm ou Yarn

### Instruções

#### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/al-2024-api-adopets.git
```

#### 2. Acesse o diretório do projeto
```bash
cd al-2024-api-adopets
```

#### 3. Instale as dependências
```bash
npm install
```

#### 4. Execute o projeto em ambiente de desenvolvimento
```bash
npm run dev
```

#### A API estará disponível em:
http://localhost:3000

---

## 👤 Autor
Desenvolvido por Kauan Santos Lima

---

## 📄 Licença
Licença ainda não definida.

