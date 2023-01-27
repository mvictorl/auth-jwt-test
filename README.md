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

### 2. Backend

1. Create `server.js` file

## Client side

1. Pakages:
   1. **React App** (Use Vite as CRA not supported tailwind viz. PosCSS)
      1. `yarn create vite client --template react-ts` (to start dev-server: `yarn dev`)
   2. **tailwind** (Dev)
      1. `npm install -D tailwindcss postcss autoprefixer`
      2. `npx tailwindcss init -p`
      3. Add the paths to all of your template files in your `tailwind.config.cjs` file:
         ```cjs
         content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
         ],
         ```
      4. Add the @tailwind directives for each of Tailwind’s layers to your `./src/index.css` file:
         ```css
         @tailwind base;
         @tailwind components;
         @tailwind utilities;
         ```
