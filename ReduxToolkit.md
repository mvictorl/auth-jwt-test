# Configure the Redux Toolkit `store`:

```ts
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'

const store = configureStore({
	reducer: {
		auth: authSlice,
	},
})

// Type of store
export type IRootState = ReturnType<typeof store.getState>
// Type of dispatch
export type AppDispatch = typeof store.dispatch
// Export store
export default store
```

## Typing of `configureStore()`:

```ts
type ConfigureEnhancersCallback = (
	defaultEnhancers: StoreEnhancer[]
) => StoreEnhancer[]

interface ConfigureStoreOptions<
	S = any,
	A extends Action = AnyAction,
	M extends Middlewares<S> = Middlewares<S>
> {
	// Single function if it's root reducer, or object of slice reducers - root reducer will be create automatically
	reducer: Reducer<S, A> | ReducersMapObject<S, A>
	// An optional array of Redux middleware functions
	middleware?: ((getDefaultMiddleware: CurriedGetDefaultMiddleware<S>) => M) | M
	// An optional boolean enable support for the `Redux DevTools` browser extension
	devTools?: boolean | DevToolsOptions
	// An optional initial state value to be passed to the Redux `createStore` function
	preloadedState?: DeepPartial<S extends any ? S : S>
	// An optional array of Redux store enhancers, or a callback function to customize the array of enhancers
	enhancers?: StoreEnhancer[] | ConfigureEnhancersCallback
}

function configureStore<S = any, A extends Action = AnyAction>(
	options: ConfigureStoreOptions<S, A>
): EnhancedStore<S, A>
```

## Example of `configureStore()`:

### Basic example

```ts
import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './reducers'

const store = configureStore({ reducer: rootReducer })
// The store now has redux-thunk added and the Redux DevTools Extension is turned on
```

### Full example

#### **`file: todos/todosReducer.ts noEmit:`**

```ts
import type { Reducer } from '@reduxjs/toolkit'
declare const reducer: Reducer<{}>
export default reducer
```

#### **`file: visibility/visibilityReducer.ts noEmit:`**

```ts
import type { Reducer } from '@reduxjs/toolkit'
declare const reducer: Reducer<{}>
export default reducer
```

#### **`file: store.ts:`**

```ts
import { configureStore } from '@reduxjs/toolkit'
// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger'
// And use redux-batched-subscribe as an example of adding enhancers
import { batchedSubscribe } from 'redux-batched-subscribe'

import todosReducer from './todos/todosReducer'
import visibilityReducer from './visibility/visibilityReducer'

const reducer = {
	todos: todosReducer,
	visibility: visibilityReducer,
}

const preloadedState = {
	todos: [
		{
			text: 'Eat food',
			completed: true,
		},
		{
			text: 'Exercise',
			completed: false,
		},
	],
	visibilityFilter: 'SHOW_COMPLETED',
}

const debounceNotify = _.debounce(notify => notify())

const store = configureStore({
	reducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
	devTools: process.env.NODE_ENV !== 'production',
	preloadedState,
	enhancers: [batchedSubscribe(debounceNotify)],
})

// The store has been created with these options:
// - The slice reducers were automatically passed to combineReducers()
// - redux-thunk and redux-logger were added as middleware
// - The Redux DevTools Extension is disabled for production
// - The middleware, batched subscribe, and devtools enhancers were composed together
```
