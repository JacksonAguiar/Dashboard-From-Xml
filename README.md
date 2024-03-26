# Visualizador de Dashboard XML

Esta aplicação permite aos usuários fazer upload de arquivos XML contendo dados de métricas e visualizá-los em um formato de dashboard. Construído utilizando Vue.js 3 e NestJS.

## Instalação

### Pré-requisitos
- Node.js e npm devem estar instalados em seu sistema. Você pode baixar e instalar a partir [deste link](https://nodejs.org/).

### Clonar o Repositório
```
git clone https://github.com/seu/repositório.git
```
```
cd nome-do-repositório
```
### Configuração do Backend (NestJS)

1. Navegue até o diretório backend:
```
cd backend
```
2. Instale as dependências:
```
npm install
```
3.Inicie o servidor NestJS:
 ```
npm run start
 ```
### Configuração do Frontend (Vue.js)

1. Navegue até o diretório frontend:
```
cd frontend
 ```
2. Em ".env" descomente a variavel "VITE_APP_BACKEND" e salve
3. Instale as dependências:
 ```
npm install
 ```
4. Inicie o servidor de desenvolvimento do Vue.js:
 ```
npm run dev
 ```
5. Acesse a aplicação em seu navegador em `http://localhost:5173`.

### Executando com Docker
1. Execute o comando docker compose:
```
docker-compose up --build
```
2. Acesse a aplicação em seu navegador em `http://localhost:8080`.
3. Para parar os serviços
```
docker-compose down
```

## Uso

1. Faça upload do seu arquivo XML contendo dados de métricas usando o botão de upload fornecido.
2. A aplicação irá analisar o arquivo XML e exibir as métricas em um formato de dashboard.
3. Explore diferentes visualizações e métricas usando o dashboard interativo.
