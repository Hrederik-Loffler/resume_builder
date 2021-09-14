import React from 'react';
import {PageWrapper}  from "@app/common";
import {Card, Page} from "@shopify/polaris";



const HomePage = () => {

    return (
        <PageWrapper title={'Главная'}>
            <Page title={"Главная"}>
                <Card title="Online store dashboard" sectioned>
                    Главная
                </Card>
            </Page>
        </PageWrapper>
    )
}
export default HomePage;
