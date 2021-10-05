// @NOTE: NOTE: Import library components.
// @ts-ignore
import ReactDOM from "react-dom";

// @NOTE: Import misc.
import "@shopify/polaris/dist/styles.css";
import "bootstrap";
import "grapesjs/dist/css/grapes.min.css";

// @NOTE: Import custom components.
import App from "./source";

const root = document.getElementById("root");
if (root) {
    ReactDOM.render(<App />, root);
}
