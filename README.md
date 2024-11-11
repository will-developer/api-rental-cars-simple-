# Compass Car - API Carros

## Introdução

Bem-vindo ao projeto **Compass Car API**! Esta é uma API simples para criar, ler, atualizar e deletar, desenvolvida em **Node.js** usando **Express** e **MySQL**. Este projeto foi construído como parte de um exercício prático para aprender a criar uma aplicação CRUD (Create, Read, Update, Delete) que interage com um banco de dados, o objetivo é gerenciar os carros. Este README irá guiá-lo sobre como configurar, configurar e executar este projeto.

## Funcionalidades

- Adicionar, atualizar, excluir e listar carros.
- Gerenciar itens dos carros (recursos como ar-condicionado, travas elétricas, etc.).
- Gerenciamento do banco de dados usando **MySQL**.
- Validação adequada dos dados de entrada.

## Tecnologias Utilizadas

- **JavaScript** (Node.js)
- **Express.js** (Framework Web)
- **MySQL** (Banco de Dados)
- **Knex** (Query Builder SQL)
- **dotenv** (Variáveis de Ambiente)

## Como Começar

Para começar com este projeto, siga os passos abaixo para configurar o ambiente de desenvolvimento e executar a API.

### Pré-requisitos

- **Node.js** (Last Version)
- **MySQL**
- **npm**

### Passos para Instalação

1. **Clonar o Repositório**

   ```bash
   git clone https://github.com/will-developer/ANOUT24_D01_COMPASSCAR.git
   ```

2. **Instalar Dependências**

   Instale os pacotes necessários:

   ```bash
   npm install
   ```

3. **Configurar Variáveis de Ambiente**

   Crie um arquivo `.env` no diretório raiz e adicione a configuração do banco de dados:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=compasscar
   PORT=3000
   ```

4. **Configurar o Banco de Dados**

   Crie um banco de dados MySQL chamado `compasscar` e crie as tabelas necessárias:

   - **cars**

     - `id`: numérico, auto-incremento
     - `brand`: texto, obrigatório
     - `model`: texto, obrigatório
     - `plate`: texto, obrigatório, único
     - `year`: numérico, obrigatório
     - `created_at`: timestamp, padrão para o horário atual

   - **cars_items**

     - `id`: numérico, auto-incremento
     - `name`: texto, obrigatório
     - `car_id`: numérico, obrigatório, relacionado a `cars.id`
     - `created_at`: timestamp, padrão para o horário atual

   Você pode usar as migrações do `Knex` para configurar o banco de dados. Execute:

   ```bash
   npx knex migrate:latest
   ```

5. **Executar o Projeto**

   Inicie o servidor da API:

   ```bash
   npm start
   ```

   O servidor será iniciado em `http://localhost:3000` por padrão.

## Como Usar

Para testar e utilizar a API, recomendamos o uso do **Postman**, uma ferramenta que facilita o envio de requisições HTTP e visualização das respostas. No Postman, ao testar os endpoints, é necessário usar a URL `http://localhost:3000/*endpoint aqui*`, substituindo `*endpoint aqui*` pelo caminho desejado, como `/api/v1/cars`.

Além disso, é importante configurar o header da requisição para `Content-Type: application/json` ao enviar dados para a API. Veja o exemplo abaixo de como configurar o Postman:

![Captura de tela 2024-11-11 134537](https://github.com/user-attachments/assets/32f9977c-62a9-49ff-aed3-bc5f7a640a58)

&#x20;O Postman permite testar cada endpoint da API de maneira prática, simulando as operações de adicionar, atualizar, buscar, listar e excluir carros.

### Endpoints

1. **Adicionar um Carro**

   - **POST** `/api/v1/cars`

     **Exemplo de Uso no Postman:**

     Para adicionar um carro, utilize o seguinte formato de URL no Postman:

     ```
     http://localhost:3000/api/v1/cars
     ```

     No corpo da requisição, insira os dados do carro conforme o exemplo abaixo:

     ```json
     {
       "brand": "Toyota",
       "model": "Corolla",
       "year": 2020,
       "plate": "ABC-1D23"
     }
     ```

     - **Marca (brand)**: Obrigatório. Deve ser uma string representando a marca do carro.
     - **Modelo (model)**: Obrigatório. Deve ser uma string representando o modelo do carro.
     - **Ano (year)**: Obrigatório. Deve estar entre 2015 e 2025, considerando o ano atual e o próximo ano.
     - **Placa (plate)**: Obrigatório. Deve seguir o formato específico que consiste em:
       - 3 letras (A-Z), seguidas de um traço (-).
       - 1 número (0-9), seguido de outra letra (A-J) ou um número (0-9).
       - Finalizado com 2 números (0-9).

     Exemplos válidos: `ABC-1J23`, `XYZ-1234`.

     Certifique-se de configurar o header `Content-Type: application/json` ao enviar a requisição.

1. **Atualizar Itens do Carro**

   - **PUT** `/api/v1/cars/:id/items`

   **Exemplo de Uso no Postman:**

   Para atualizar os itens de um carro específico, utilize o seguinte formato de URL no Postman:

   ```
   http://localhost:3000/api/v1/cars/1/items
   ```

   Exemplo de corpo da requisição:

   ```json
   ["Ar-condicionado", "Travas Elétricas", "Vidros Elétricos"]
   ```

   Certifique-se de substituir `1` pelo ID do carro que deseja atualizar.

1. **Buscar Carro por ID**

   - **GET** `/api/v1/cars/:id`

   **Exemplo de Uso no Postman:**

   Para buscar um carro específico pelo ID, utilize o seguinte formato de URL no Postman:

   ```
   http://localhost:3000/api/v1/cars/1
   ```

   Certifique-se de substituir `1` pelo ID do carro que deseja buscar.

1. **Listar Todos os Carros** (com paginação e filtros)

   - **GET** `/api/v1/cars`

   A API permite listar todos os carros com suporte a paginação e filtros opcionais. Você pode utilizar os seguintes parâmetros de consulta para obter resultados específicos:

   - **year**: Filtra os carros cujo ano é maior ou igual ao valor informado. Exemplo: `year=2017`
   - **final_plate**: Filtra os carros que possuem o final da placa igual ao valor especificado. Exemplo: `final_plate=0`
   - **brand**: Filtra os carros cuja marca contém a sequência de caracteres informada. Exemplo: `brand=toy`
   - **page**: Define a página dos resultados que será exibida. O valor padrão é 1. Exemplo: `page=2`
   - **limit**: Define a quantidade de registros retornados por página. O valor padrão é 5, e o valor máximo é 10. Exemplo: `limit=2`

   **Exemplos de Uso no Postman:**

   - Para listar carros com ano maior ou igual a 2017:

     ```
     http://localhost:3000/api/v1/cars?year=2017
     ```

   - Para listar carros cuja placa termina em 0:

     ```
     http://localhost:3000/api/v1/cars?final_plate=0
     ```

   - Para listar carros da marca que contém "toy":

     ```
     http://localhost:3000/api/v1/cars?brand=toy
     ```

   - Para listar a segunda página de resultados, com limite de 2 carros por página:

     ```
     http://localhost:3000/api/v1/cars?page=2&limit=2
     ```

1. **Atualizar Informações do Carro**

   - **PATCH** `/api/v1/cars/:id`

   Este endpoint permite atualizar informações parciais de um carro já cadastrado. Todos os campos são opcionais, mas quando forem enviados, devem seguir as seguintes regras de validação:

   - **Marca e Modelo**: Se a marca for enviada, o modelo também deve ser enviado.
   - **Ano**: Deve estar em um intervalo de 10 anos, exemplo (entre 2015 a 2025).
   - **Placa**: Deve seguir o formato correto, por exemplo, ABC-1C34 ou ABC-1234.

   **Exemplo de Uso no Postman:**

   Para atualizar informações de um carro específico, utilize o seguinte formato de URL no Postman:

   ```
   http://localhost:3000/api/v1/cars/1
   ```

   Exemplo de corpo da requisição:

   ```json
   {
     "brand": "Honda",
     "model": "Civic",
     "year": 2022,
     "plate": "XYZ-2D34"
   }
   ```

   Certifique-se de substituir `1` pelo ID do carro que deseja atualizar. Caso algum campo seja enviado com valor vazio ou nulo, ele será ignorado.

1. **Excluir um Carro**

   - **DELETE** `/api/v1/cars/:id`

   **Exemplo de Uso no Postman:**

   Para excluir um carro específico, utilize o seguinte formato de URL no Postman:

   ```
   http://localhost:3000/api/v1/cars/1
   ```

   Certifique-se de substituir `1` pelo ID do carro que deseja excluir.
