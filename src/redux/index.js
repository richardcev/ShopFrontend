import { createStore, combineReducers, applyMiddleware } from "redux";
import CartReducer from "./states/CartReducer";
import UserReducer from "./states/UserReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import ProductReducer from "./states/ProductReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Importa el objeto 'storage'

const persistConfig = {
  key: 'root',
  storage, // Utiliza el objeto 'storage' importado
};

const rootReducer = combineReducers({
  products: ProductReducer,
  cartproducts: CartReducer,
  users: UserReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function generateStore() {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  const persistor = persistStore(store); // Crea un persistor aparte
  return { store, persistor }; // Devuelve tanto el store como el persistor
}
