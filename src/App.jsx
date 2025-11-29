import './App.css'
import { useState } from "react";

import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";

import { navItems } from "./utils/constants.js";
import { SWContext } from "./utils/context.js";

function App() {
    const [page, setPage] = useState(navItems[0]);

    return (
        <div className="mx-2">
            <SWContext.Provider value={{ page, changePage: setPage }}>
                <Header />
                <Main />
            </SWContext.Provider>

            <Footer />
        </div>
    );
}

export default App;

