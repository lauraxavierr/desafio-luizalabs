module.exports = {
  "openapi": "3.0.1",
  "info": {
    "title": "Desafio Luizalabs",
    "description": "Documentação da API",
    "version": "1.0.0"
  },
  "basePath": "/",
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  },

  "paths": {
    "/signup": {
      "post": {
        "tags": ["User"],
        "summary": "Cadastrar usuário",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string"
                  },
                  "senha": {
                    "type": "string"
                  }
                },
                "example": {
                  "email": "laura.xavier@teste.com.br",
                  "senha": "123456"
                }
              }
            }
          }
        },
        "responses": {
          "401": {
            "description": "Erro ao cadastrar usuário"
          },
          "400": {
            "description": "Erro ao cadastrar usuário"
          },
          "201": {
            "description": "Usuário cadastrado"
          }
        }
      }
    },
    "/signin": {
      "post": {
        "tags": ["User"],
        "summary": "Realizar login",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string"
                  },
                  "senha": {
                    "type": "string"
                  }
                },
                "example": {
                  "email": "laura.xavier@teste.com.br",
                  "senha": "123456"
                }
              }
            }
          }
        },
        "responses": {
          "401": {
            "description": "Erro ao realizar login do usuário"
          },
          "400": {
            "description": "Erro ao realizar login do usuário"
          },
          "200": {
            "description": "Login realizado"
          }
        }
      }
    },
    "/cep/{idUser}": {
      "put": {
        "tags": ["CEP"],
        "summary": "Consultar CEP",
        "security": [{
          "bearerAuth": []
        }],
        "description": "Rota para consultar CEP",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "cep": {
                    "type": "string"
                  }
                },
                "example": {
                  "cep": "05877240"
                }
              }
            }
          }
        },
        "parameters": [{
          "in": "path",
          "name": "idUser",
          "type": "string",
          "required": true
        }],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
  }
}