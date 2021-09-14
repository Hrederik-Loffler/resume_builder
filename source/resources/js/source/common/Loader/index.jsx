import React from "react";
import {Spinner} from "@shopify/polaris";
import styles from "./styles.module.scss";

export const Loader = () =>
    <div className={styles.root}>
        <Spinner accessibilityLabel="Spinner example" size="large"/>
    </div>

