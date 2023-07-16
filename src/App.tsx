import { Header } from "./components/index";
import { Calculator } from "./components/index";
import "./assets/sass/global.scss";

export function App() {
    function addThemeToBody() {
        document.querySelector("body")?.setAttribute("data-theme", "dark");
    }
    addThemeToBody();

    return (
        <section className="calculator">
            <Header />
            <Calculator />
        </section>
    );
}
