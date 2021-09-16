import {Spinner} from "@shopify/polaris";
const css = require('./styles.module.css')


export default function Loader() {

    return (
        <div className={css.root}>
            <Spinner accessibilityLabel="Spinner example" size="large"/>
        </div>
    )
}
