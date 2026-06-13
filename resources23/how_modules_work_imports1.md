we have two modules + some more modules
- src/movie_mongoose/movies-module.ts
- app.module.ts

If i didnt include these two in movies-module.ts, nest failed to resolve dependencies
- STSProvider,
- DynamoDbMovieProvider23


How NestJS handles Dependency Injection (DI) scopes.
- In NestJS, modules are singletons by default, but they are tightly encapsulated. 
- When you declare a provider inside a module's providers array, 
- that provider is only visible and available inside that specific module's context.
- so, if we dont include <STSProvider> & <DynamoDbMovieProvider23> in `movies-module.ts`
    nestJS cant resolve dependencies
- even though its root module; it doesnt matter -- you included those providers in `app.module.ts`; 
    nestJS simply wont look into `app.module.ts` (or) `cats23.module.ts`

how NestJS resolves
- When nestjs processes Movies23Module (or) `movies-module.ts` --- it encapsulates the Movies23Module
- NestJS WILL only look for <STSProvider> in 2 places
    providers[] array       : we must directly add <STSProvider> here
    imports[] array         : we import a some23.module.ts; but STSProvider must be exported from `some23.module.ts` 


# Make it Global
- if STSProvider is needed in multiple modules -- Movies23Module, UsersModule, BillingModule
- we can do this in 2 ways

01) dedicated23 ---------> dedicated shared module
- create Aws23Module -- add STSProvider in both providers[] & exports[] array
- then import Aws23Module -- whereever needed in Movies23Module (or) UsersModule

02) globalDecorator23 ----> add @Global() decorator on Aws23Module
- then import it in app.module.ts; we dont have import it again & again in each module

<!-- *************************************************************************** -->

`NestJS: Modules and their providers are singletons by default`
- When NestJS boots up, it scans your application tree. 
- The very first time it encounters Aws23Module (for example, in Movies23Module)
    it instantiates that module and runs its STSProvider factory exactly once. 
    It then caches that instance in memory.
- When it moves on to process UsersModule/Cats23Module and sees imports: [Aws23Module], 
    NestJS looks at its internal cache, sees that Aws23Module already exists
    and reuses the exact same instance.
- both <dedicated23> & <globalDecorator23> ---> only 1 instance of everything is created

`Putting STSProvider in the providers array of every module`
- Bad practice
- NestJS treats them as entirely separate declarations.
- 

<!-- ************************************************************************************ -->

#### Scenario A: Putting `STSProvider` in the `providers` array of every module (Bad)

If you copy-paste the provider into multiple `providers` arrays, NestJS treats them as entirely separate declarations.

* **`Movies23Module`** creates ---> `STSService` (Instance #1)
* **`UsersModule`** creates ---> `STSService` (Instance #2)
* **Result:** You waste memory, and your `STSClient` opens duplicate connection pools to AWS.

#### Scenario B: Importing `Aws23Module` into every module (Good/Correct)

Because modules are singletons, they act as a unified bridge to a single instance.

* **`Aws23Module`** boots up ---> creates `STSService` (Instance #1) and caches it.
* **`Movies23Module`** imports `Aws23Module` ---> NestJS injects `STSService` (Instance #1).
* **`UsersModule`** imports `Aws23Module` ---> NestJS injects `STSService` (Instance #1).
* **Result:** Only **one** instance of your service and your AWS connection pool exists for the entire life of your application.

<!-- ************************************************************************************ -->

Adding something to a providers array says
- Hey NestJS, build a new copy of this thing for this module

Adding a module to an imports array says
- Hey NestJS, let me borrow the existing single copy of everything this other module has exported

most NestJS developers use dedicated23 approach
- we can simply copy the Aws23Module and paste it elsewhere
- the modules are self-contained