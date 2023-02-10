# Test example JWT authorization

## Server side

### 1. Packages:

1.  **express**
2.  **express-validator**
3.  **cors**
4.  **jsonwebtoken**
5.  **cookie-parser**
6.  **bcryptjs**
7.  **dotenv**
8.  **nodemon** (Dev)
9.  **prisma** (Dev)

    1. `npm i prisma -D`
    2. `npx prisma init` (`set NODE_TLS_REJECT_UNAUTHORIZED=0` for resolve "unable to verify the first certificate" error)
    3. Create Postgres database and edit (set) the DATABASE_URL in the `.env` file to point to existing database:

       ```env
       DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<db_name>"
       ```

    4. Add models to the `prisma/schema.prisma` file
    5. `npx prisma migrate dev --name init`
       > _Note:_ `generate` is called under the hood by default, after running `prisma migrate dev`. If the `prisma-client-js` generator is defined in your schema, this will check if `@prisma/client` is installed and install it if it's missing
    6. Whenever you make changes to your Prisma schema in the future, you manually need to invoke `npx prisma generate` in order to accommodate the changes in your Prisma Client API
    7. To add the mock data
       1. Create `seed.js` file
       2. Add to `package.json`
          ```json
          "prisma": {
          "seed": "node prisma/seed.js"
          }
          ```
       3. `npx prisma db seed`
          > Maybe need add `"type": "module"` in the `pakage.json` file for use import into `seed.js` file

10.

11. Create `server.js` file

## Client side

1. Pakages:

   1. **vite** (for example, CRA not supported tailwind viz. PosCSS)
      `yarn create vite client --template react-ts` (to start dev-server: `yarn dev`)
   2. **axios**
      `npm i axios`
   3. **MUI**
      1. `npm install @mui/material @emotion/react @emotion/styled`
      2. `npm install @fontsource/roboto`
      3. add to `main.tsx` file
         ```ts
         import '@fontsource/roboto/300.css'
         import '@fontsource/roboto/400.css'
         import '@fontsource/roboto/500.css'
         import '@fontsource/roboto/700.css'
         ```
      4. `npm install @mui/icons-material`
   4. React Router DOM

      `npm i react-router-dom` (v.6.x.x)

   5. Redux Toolkit

      `npm i react-redux @reduxjs/toolkit`

   6.

2. React Router DOM
   1. `Router.tsx` describes route structure by `createBrowserRouter` function
3. App's Store (Redux Toolkit)
   1. `src/store/index.ts` - describes store (also type of store & type of dispatch)
   2. `src/main.tsx` use `Provider` from 'react-redux' to provide store on the whole app
   3. `src/store/slices/xxxSlice.ts` - "slice" of the store data
4. Create the instance of axios for configure HTTP-request for adding authorization headers and for the refresh token mechanism (`src/axios/index.ts`)
5.
