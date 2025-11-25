import './App.css'
import { useState } from "react";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import { navItems } from "./utils/constants.js";
import { PageContext } from "./utils/context.js";

function App() {
    const [page, setPage] = useState(navItems[0]);

    return (
        <PageContext value={{ page, setPage }}>
            <div className="container-fluid">
                <Header />
                <Main page={page} />
                <Footer />
            </div>
        </PageContext>
    )
}

export default App;
