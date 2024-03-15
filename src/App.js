import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import UploadFiled from "./component/UploadFiled/UploadFiled";

// Redux setup
const rootReducer = combineReducers({
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// App component
function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <UploadFiled />
      </Provider>
    </StrictMode>
  );
}

export default App;
