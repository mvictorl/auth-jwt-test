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
8.  **uuid**
9.  **nodemon** (Dev)
10. **prisma** (Dev)

    1.  `npm i prisma -D`
    2.  `npx prisma init`

        (`set NODE_TLS_REJECT_UNAUTHORIZED=0` for resolve "unable to verify the first certificate" error)

    3.  Create Postgres database and edit (set) the DATABASE_URL in the `.env` file to point to existing database:

            ```env
            DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<db_name>"
            ```

    4.  Add models to the `prisma/schema.prisma` file
    5.  `npx prisma migrate dev --name init`
        > _Note:_ `generate` is called under the hood by default, after running `prisma migrate dev`. If the `prisma-client-js` generator is defined in your schema, this will check if `@prisma/client` is installed and install it if it's missing
    6.  Whenever you make changes to your Prisma schema in the future, you manually need to invoke `npx prisma generate` in order to accommodate the changes in your Prisma Client API
    7.  To add the mock data
        1. Create `seed.js` file
        2. Add to `package.json`
        ```json
        "prisma": {
        "seed": "node prisma/seed.js"
        }
        ```
        3.  `npx prisma db seed`
            > Might need to add `"type": "module"` in the `pakage.json` file for use import into `seed.js` file

11.

12. Create `server.js` file

## Client side

### 1. Pakages:

1.  **vite** (for example, CRA not supported tailwind viz. PosCSS)

    `yarn create vite client --template react-ts`

    to start dev-server: `yarn dev`

2.  React Router DOM

    `yarn add react-router-dom` (v.6.x.x)

3.  Redux Toolkit

    `yarn add react-redux @reduxjs/toolkit`

### 2. Cerate global store

1.  Create `store` folder

2.  Create global store configuration file `index.ts`

3.  Modify `main.tsx` file by adding a Redux `Provider` that will present `store` data to the components:

    ```tsx
    import { Provider } from 'react-redux'
    import { store } from './store'

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    	<Provider store={store}>
    		<App />
    	</Provider>
    )
    ```

4.  Create counter Redux _slice_ `store/slices/counter-slice.ts`. _Slice_ describes the logic and provides a reducer for `store` and action creators for components:

    ```ts
    import { createSlice } from '@reduxjs/toolkit'
    import type { PayloadAction } from '@reduxjs/toolkit'
    import { RootState } from '..'
    // Typescript interface of stored data:
    export interface CounterState {
    	value: number
    }
    // Initial state of stored data:
    const initialState: CounterState = {
    	value: 0,
    }

    export const counterSlice = createSlice({
    	name: 'counter',
    	initialState,
    	reducers: {
    		increment: state => {
    			state.value += 1
    		},
    		decrement: state => {
    			state.value -= 1
    		},
    		incrementByAmount: (state, action: PayloadAction<number>) => {
    			state.value += action.payload
    		},
    	},
    })
    // Export the Action creators:
    export const { increment, decrement, incrementByAmount } =
    	counterSlice.actions
    // Other code such as selectors can use the imported `RootState` type
    export const selectCount = (state: RootState) => state.counter.value
    // Export the Reducer:
    export default counterSlice.reducer
    ```

5.  Addind the counter reducers from slice to the specification of the global store:

    ```ts
    import { configureStore } from '@reduxjs/toolkit'
    import counterReducer from './slicer/counter-slice'

    export const store = configureStore({
    	reducer: {
    		counter: counterReducer,
    	},
    })
    // Export Typescript type of the global store:
    export type RootState = ReturnType<typeof store.getState>
    // Export Typescript type of the dispatcher
    export type AppDispatch = typeof store.dispatch
    ```

6.  Example of using global store (counter reducer & action creator) in Counter component:

    ```tsx
    import React from 'react'
    // import { RootState, store } from '../store'
    import { useSelector, useDispatch } from 'react-redux'
    import {
    	decrement,
    	increment,
    	selectCount,
    } from '../store/slices/counter-slice'

    export function Counter() {
    	// const count = useSelector((state: RootState) => state.counter.value)
    	const count = useSelector(selectCount)

    	const dispatch = useDispatch()

    	return (
    		<div>
    			<div>
    				<button
    					aria-label="Increment value"
    					onClick={() => dispatch(increment())}
    				>
    					Increment
    				</button>
    				<h2>{count}</h2>
    				<button
    					aria-label="Decrement value"
    					onClick={() => dispatch(decrement())}
    				>
    					Decrement
    				</button>
    			</div>
    		</div>
    	)
    }
    ```

### 3. Typed _hooks_

1.  While it's possible to import the `RootState` and `AppDispatch` types into each component, it's **better to create typed versions of the `useDispatch` and `useSelector` hooks for usage in your application** (This allows to import actual variables into any component file that needs to use the hooks, and avoids potential circular import dependency issues):

    ```tsx
    import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
    import { RootState, AppDispatch } from '..'

    export const useAppDispatch: () => AppDispatch = useDispatch
    export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
    ```

### 4. Async Logic and Data Fetching (Async Thunk)

1. Create thunk file `store/thunks/todo-thunk.ts` (service):

   ```ts
   import { createAsyncThunk } from '@reduxjs/toolkit'

   export type Todo = {
   	userId: number
   	id: number
   	title: string
   	completed: boolean
   }

   export const getAllTodos = createAsyncThunk(
   	'todo/getAllTodos',
   	async (_, thunkApi) => {
   		try {
   			const response = await fetch(
   				'https://jsonplaceholder.typicode.com/todos'
   			)
   			return (await response.json()) as Todo[]
   		} catch (e) {
   			return thunkApi.rejectWithValue(e)
   		}
   	}
   )
   ```

2. Create todo Redux _slice_ `store/slices/todo-slice.ts` (including Todo reducer):

   ```ts
   import { SerializedError, createSlice } from '@reduxjs/toolkit'
   import { getAllTodos } from '../thunks/todo-thunk'
   import { Todo } from '../thunks/todo-thunk'

   const initialState = {
   	todos: [] as Todo[],
   	isLoading: false,
   	error: '' as SerializedError,
   }

   export const todoSlice = createSlice({
   	name: 'todo',
   	initialState,
   	reducers: {},
   	extraReducers(builder) {
   		builder.addCase(getAllTodos.fulfilled, (state, action) => {
   			state.todos = action.payload
   			state.isLoading = false
   			state.error = '' as SerializedError
   		})
   		builder.addCase(getAllTodos.pending, state => {
   			state.todos = [] as Todo[]
   			state.isLoading = true
   			state.error = '' as SerializedError
   		})
   		builder.addCase(getAllTodos.rejected, (state, action) => {
   			state.todos = [] as Todo[]
   			state.isLoading = false
   			state.error = action.error
   		})
   	},
   })

   export default todoSlice.reducer
   ```

3. Adding necessary constants for Todo selector into hook file `store/hooks/index.ts`:

   ```ts
   import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
   import { RootState, AppDispatch } from '..'

   export const useAppDispatch: () => AppDispatch = useDispatch
   export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

   export const selectTodos = (state: RootState) => state.todo.todos
   export const selectTodoIsLoading = (state: RootState) => state.todo.isLoading
   export const selectTodoError = (state: RootState) => state.todo.error
   ```

4. Adding the Todo reducer from slice to the specification of the global store:

   ```ts
   import { configureStore } from '@reduxjs/toolkit'
   import { setupListeners } from '@reduxjs/toolkit/query'
   import counterReducer from './slices/counter-slice'
   import { userApi } from './APIs/userApi'
   import todoReducer from './slices/todo-slice'

   export const store = configureStore({
   	reducer: {
   		counter: counterReducer,
   		todo: todoReducer,
   		[userApi.reducerPath]: userApi.reducer,
   	},
   	middleware: getDefaultMiddleware =>
   		getDefaultMiddleware().concat(userApi.middleware),
   })
   setupListeners(store.dispatch)

   export type RootState = ReturnType<typeof store.getState>
   export type AppDispatch = typeof store.dispatch
   ```

5. Example of using global store (Todo thunk & selectors) in TodoList component:

   ```tsx
   import React from 'react'
   import {
   	selectTodoError,
   	selectTodoIsLoading,
   	selectTodos,
   	useAppDispatch,
   	useAppSelector,
   } from '../store/hooks'
   import { getAllTodos } from '../store/thunks/todo-thunk'

   const TodoList = () => {
   	const dispatch = useAppDispatch()
   	const todos = useAppSelector(selectTodos)
   	const isLoading = useAppSelector(selectTodoIsLoading)
   	const error = useAppSelector(selectTodoError)

   	const handleGetTodos = () => {
   		dispatch(getAllTodos())
   	}

   	if (isLoading) return <h2>Loading...</h2>
   	if (error) return <h2>Error occurs!</h2>
   	return (
   		<div>
   			<button onClick={handleGetTodos}>Get ToDos</button>
   			<ol style={{ textAlign: 'left' }}>
   				{todos?.map(todo => (
   					<li key={todo.id}>{todo.title}</li>
   				))}
   			</ol>
   		</div>
   	)
   }

   export default TodoList
   ```

### 5. Adding RTK Query

1.  Create users endpoint API `store/APIs/userApi.ts`:

    ```ts
    import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

    interface IUser {
    	id: number
    	name: string
    	// ...
    }

    export const userApi = createApi({
    	reducerPath: 'userApi',
    	baseQuery: fetchBaseQuery({
    		baseUrl: 'https://jsonplaceholder.typicode.com/',
    	}),
    	endpoints: builder => ({
    		getAllUsers: builder.query<IUser[], void>({
    			query: () => `users`,
    		}),
    	}),
    })

    export const { useGetAllUsersQuery } = userApi
    ```

2.  Modify Redux store `store/index.ts`:

    ```tsx
    import { configureStore } from '@reduxjs/toolkit'
    import { setupListeners } from '@reduxjs/toolkit/query'
    import counterReducer from './slices/counter-slice'
    import { userApi } from './APIs/userApi'

    export const store = configureStore({
    	reducer: {
    		counter: counterReducer,
    		// RTK Query reducer:
    		[userApi.reducerPath]: userApi.reducer,
    	},
    	middleware: getDefaultMiddleware =>
    		getDefaultMiddleware().concat(userApi.middleware),
    })
    // For RTK Query 'refetchOnFocus'/'refetchOnReconnect' parameters
    setupListeners(store.dispatch)

    // Infer the `RootState` and `AppDispatch` types from the store itself
    export type RootState = ReturnType<typeof store.getState>
    // Inferred type: {counter: CounterState, users: UsersState}
    export type AppDispatch = typeof store.dispatch
    ```

3.  Lazy Query (query by event)

    1.  Add new endpoint into `store/APIs/userApi.ts`:

        ```ts
        		...
        getOneUser: builder.query<IUser, number>({
        	query: userId => `users/${userId}`,
        }),
        		...
        export const { useLazyGetOneUserQuery } = userApi
        ```

    2.  Using this query by button click:

        ```tsx
        const [trigger, { data, isLoading, isError }] = useLazyGetOneUserQuery()

        const handleGetUser = () => {
        	trigger(id)
        }
        ```

4.  **axios**
    `yarn add axios`

5.  **MUI**

    1. `yarn add @mui/material @emotion/react @emotion/styled`
    2. `yarn add @fontsource/roboto`
    3. add to `main.tsx` file
       ```ts
       import '@fontsource/roboto/300.css'
       import '@fontsource/roboto/400.css'
       import '@fontsource/roboto/500.css'
       import '@fontsource/roboto/700.css'
       ```
    4. `yarn add @mui/icons-material`

6.  React Router DOM

    `yarn add react-router-dom` (v.6.10.x)

    `Router.tsx` describes route structure by `createBrowserRouter` function

7.  `yarn add notistack`

8.  App's Store (Redux Toolkit)
    1. `src/store/index.ts` - describes store (also type of store & type of dispatch)
    2. `src/main.tsx` use `Provider` from 'react-redux' to provide store on the whole app
    3. `src/store/slices/xxxSlice.ts` - "slice" of the store data
9.  Create the instance of axios for configure HTTP-request for adding authorization headers and for the refresh token mechanism (`src/axios/index.ts`)
10.
