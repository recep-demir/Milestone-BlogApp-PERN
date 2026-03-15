"use strict"

require('dotenv').config()
const swaggerAutogen = require('swagger-autogen')()
const packageJson = require('./package.json')

// Modelleri en üste, obje dışına alıyoruz
// Dosya yollarının başına 'src/' eklediğimizden emin oluyoruz
const Blog = require('./src/models/Blog');
const Category = require('./src/models/Category');
const Comment = require('./src/models/Comment');
const User = require('./src/models/User');

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
    // Burası şimdilik manuel kalsın, sunucu açılınca düzeltebiliriz
    Token: {
      access: "string",
      refresh: "string"
    }
  }
}

const routes = ['./index.js']
// Dosya yolu src/ altında olduğu için burayı da güncelledik:
const outputFile = './src/configs/swagger.json' 

swaggerAutogen(outputFile, routes, document)