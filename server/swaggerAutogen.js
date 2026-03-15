"use strict"

require('dotenv').config()
const swaggerAutogen = require('swagger-autogen')()
const packageJson = require('./package.json')

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 8000

const document = {
  info: {
    version: packageJson.version,
    title: packageJson.title || 'Blog API',
    description: packageJson.description || 'Blog API dokümantasyonu',
    termsOfService: "http://example.com/terms",
    contact: {
      name: packageJson.author || 'Developer',
      email: "developer@example.com"
    },
    license: {
      name: packageJson.license || 'MIT',
    },
  },
  host: `${HOST}:${PORT}`,
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    Token: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
			description: 'Simple Token Authentication * Example: <b>Token ...tokenKey...</b>'
		}
  },
  security: [{ Token: [] }],
  definitions: {
    "User": require('./src/models/user').schema.obj,
    "Blog": require('./models/blog').schema.obj,
    "Category": require('./src/models/category').schema.obj,
    "Comment": require('./models/comment').schema.obj,
    Token: {
      access: "string",
      refresh: "string"
    }
  }
}

const routes = ['./index.js']
const outputFile = './configs/swagger.json'

swaggerAutogen(outputFile, routes, document)
