# API RESTful Sign in/Sign up

## Sumário
1. [Introdução](#Introdução)
2. [Instalação](#Instalação)
3. [Rotas](#Rotas)
4. [Requisitos](#Requisitos)
5. [Testes](#Testes)


## Introdução

O objetivo dessa aplicação é expor uma API RESTful de sign up/sign in e utilizar o token gerado para busca de CEP.


Pacotes principais:
- Express para criação das rotas e inicio dos server.
- JWT para persistência do token por 30 minutos.
- Elephantsql para utilização do banco de dados NoSQL (MongoDB).
- Eslint para realização de testes.

## Instalação

Este projeto foi desenvolvido com a versão 14.7.4 do Nodejs.

Deve-se configurar as variável de ambiente .env

Exemplo: 

```
SECRET=XXXX
EXPIRESIN='30m'

DATABASE=teste
HOST=teste.db.elephantsql.com
PASSWORD=ahsgdhagdjad
```

Deve-se instalar as dependência utilizando:
```
npm install ou npm i
```

Para iniciar aplicação: 
```
npm run dev
```

## Rotas/Endpoints

### Sign up
POST http://localhost:5000/signup

```java
{
   "email": "lauraxavier@teste.com.br",
   "senha": "123456"
}
```

-----

### Sign in
POST http://localhost:5000/signin

```java
{
   "email": "lauraxavier@teste.com.br",
   "senha": "123456"
}
```

-----

### CEP
PUT http://localhost:5000/cep/user_id

Exemplo
```java

"http://localhost:5000/cep/:1"

```

**Observação:** será necessário preencher o user_id com o usuário do cliente que deseja obter as informações.
Também será preciso passar no header o parâmento authentication, utilizando a opção Token Bearer.
O user_id e token foram retornados na rota de sign-in. 

## Requisitos
Busca de CEP

- Dado um CEP válido, deve retornar o endereço correspondente.

- Dado um CEP válido, que não exista o endereço, deve substituir um dígito da direita para a esquerda por zero até que o endereço seja localizado (Exemplo: Dado 22333999 tentar com 22333990, 22333900 …).

- Dado um CEP inválido, deve retornar uma mensagem reportando o erro: "CEP inválido".

- Os serviços devem receber e responder JSON;

- Deve-se documentar a estratégia utilizada para a criação da aplicação, a arquitetura utilizada e os padrões. 

- Em caso de uso do Git/Bitbucket não esqueça de criar o .gitignore.
    
2. Extras:
- Preferencialmente use um versionador e faça commits granulares;
- Api com autorização;
- Boas práticas de design de api;
- Swagger com a documentação;
- Tecnologias preferenciais: java ou node.js - justifique, no readme a escolha da tecnologia.

- logs estruturados;
- endpoint para saúde da aplicação;
- endpoint para métricas da aplicação;
- considere a performance do algoritmo e o tempo de resposta da aplicação, sabendo que a API  pode receber flutuações de tráfego agressivas.

3. Questão

- Quando você digita a URL de um site (http://www.netshoes.com.br) no browser e pressiona enter, explique da forma que preferir, o que ocorre nesse processo do protocolo HTTP entre o Client e o Server.

- Detalhe sua linha de raciocínio;
- Elabore um plano de entendimento, por exemplo, lista, de forma a elencar os passos;

## Testes
Os testes foram realizados utilizando o Eslint.
O arquivo pode ser encontrado em -> .eslintrc.json