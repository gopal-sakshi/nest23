npm i @nestjs/cli       // NodeJS version > 20
npx nest new nest23

`Main files`

app.controller.ts
app.controller.spec.ts
app.module.ts
app.service.ts
main.ts

<!-- ----------------------------------------------------------------------- -->

`main.ts`
- async function, will bootstrap our application
- NestFactory.create() ===> gives us <nest> instance

`platform-agnostic`
- express (or) fastify
