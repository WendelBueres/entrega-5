# KContacts

## Funcionalidades:
### O Back-End do KContacts é responsável por:

- Criar, alterar, excluir e consultar contatos de clientes em um Banco de Dados Relacional.

### O Front-End do KContacts é responsável por:

- Renderizar formulário para registros no BackEnd de forma amigável.
- Renderizar os dados armazenados no Banco de Dados Relacional.

## Tecnologias usadas:
Esse projeto teve seu Front-End programado em TypeScript por meio do framework ReactJS, foi utilizada a biblioteca de estilização Material UI (MUI), o Back-End foi programado em JavaScript por meio do framework ExpressJS e Prisma-ORM, o Banco de Dados Relacional foi implementado por meio do SGBD PostgreSQL.

## Instruções para executar o KContacts
### Instalação de dependências e configuração de váriaveis de ambiente:
- Por meio do terminal, na pasta raiz do projeto acesse a pasta do backend por meio do comando: ```cd backend```.
- Instale os dependências essenciais para o Back-End projeto por meio do comando: ```yarn install```.
- Acesse a pasta do Front-End por meio do comando: ```cd frontend```.
- Instale as dependências esseciais para o Front-End do projeto por meio do comando: ```yarn install```.
- Crie um banco de dados PostgreSQL.
- Preencha as váriaveis de ambiente (.env) conforme o exemplo (.env.example).

### Executando o KContacts:
- Na pasta raiz do projeto abra um terminal e acesse a pasta backend: ```cd backend```. 
- Execute as migrações do Prisma-ORM por meio do comando: ```yarn prisma db push```.
- Inicie o servidor backend por meio do comando: ```yarn dev```.
- Na pasta raiz do projeto abra um novo terminal e acesse a pasta frontend: ```cd frontend``` 
- Inicie o servidor React por meio do comando: ```yarn start``` 

Para a aplicação funcionar corretamente os dois terminais devem ficar em execução.

### Testes parcialmente implementados
- Acesse a pasta do Front-End por meio do comando: ```cd frontend```.
- Execute por meio do comando: ```yarn test```.

### Endereços da aplicação:
- frontend: localhost:3000
- backend: localhost:8000

