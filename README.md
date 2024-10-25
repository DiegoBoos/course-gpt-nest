<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Course GPT API

1. Clone project
2. Install dependencies with the ```npm/yarn install``` command
3. Clone ```.env.example``` file and rename to ```.env```
4. Change environment variables in ```.env``` file
5. Run database ```docker compose up -d``` (make sure docker is installed)
6. Run ```npm/yarn run start:dev``` command to start the server
7. Execute seed for creating default courses records in the database ``` http://localhost:3000/seed```  
8. To upload files to the server use the ```http://localhost:3000/files/course``` endpoint with the ```POST``` method and the ```file``` field in the ```Body``` tab and then select ```*form-data```
