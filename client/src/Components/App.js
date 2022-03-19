import React from "react";
import { Routes, Route} from "react-router-dom";
import { Drizzle, generateStore } from "@drizzle/store";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Provider as ReduxProvider } from "react-redux";
import contractEventNotifier from '../middleware/index';
import itemManagerSlice from "../redux-slicers/itemManagerSlice";
import ItemManagerContract from "../contracts/ItemManager.json"
import Main from './Main';
import '../css/App.css'


//  Setup the drizzle instance.
const options = { 
  contracts: [ItemManagerContract],
  events: {
    ItemManager: [
      "SupplyChaninStep",
      "ItemDetails"
    ],
  },
};
const appReducers = { itemManagerSlice: itemManagerSlice.reducer }
const appMiddlewares = [ contractEventNotifier ]
const drizzleStore = generateStore({
  options,
  appMiddlewares,
  appReducers,
  disableReduxDevTools: false  // enable ReduxDevTools!
})
const drizzle = new Drizzle(options, drizzleStore);


const App = () => 
{
    return (
      <>
      <ReduxProvider store={drizzle.store}>
        <DrizzleContext.Provider drizzle={drizzle}>
          <DrizzleContext.Consumer >
          {
            drizzleContext => 
            {
              const { drizzle, drizzleState, initialized } = drizzleContext;
              if (!initialized) 
              {
                return "Loading..."
              }
              return (
                <Routes>
                  <Route path="/" element={<Main className="App" drizzle={drizzle} drizzleState={drizzleState} />} />
                </Routes>)
            }
          }
          </DrizzleContext.Consumer>
        </DrizzleContext.Provider>
      </ReduxProvider>
      </>
    );
}


export default App;
