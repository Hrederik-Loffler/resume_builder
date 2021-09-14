import React from "react";
import {Layout} from "@shopify/polaris";

export const PageWrapper = (props) =>
    <Layout>
        <Layout.Section>
            {props.children}
        </Layout.Section>
    </Layout>
