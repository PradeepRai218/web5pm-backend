"use client"
import { Provider } from "react-redux";
import { store } from "./redux/store";

function MainRootFile({children}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export default MainRootFile;