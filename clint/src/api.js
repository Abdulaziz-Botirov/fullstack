const specs = swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'E-Commerce API',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:5000', 
         },
      ],
    },
    apis: ['./routes/*.js'],
  });
  
  app.use(cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204
  }));