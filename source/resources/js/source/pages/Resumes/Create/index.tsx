// @NOTE: Import library functions.
import { Card, FormLayout, Layout, Page, TextField } from '@shopify/polaris';
import { useCallback } from 'react';


// @NOTE: Import custom functions.
// {...}

// @NOTE: Import misc.
// {...}

/**
 * ResumesCreate - page where user can fill data to generate
 * resume based on chosen templates.
 *
 * @returns JSX.Element
 */
export default function ResumesCreate() {

    // @NOTE: Closures.
    const handleCreateResume = useCallback(() => {}, []);

    return (
        <Page
            title="Create resume"
            primaryAction={{
                content: 'Create',
                onAction: handleCreateResume,
            }}
            divider
        >
            <Layout>
                <Layout.AnnotatedSection
                    title="Your information"
                    description="Give us essential information about yourself."
                >
                    <Card sectioned>
                        <FormLayout>
                            <FormLayout.Group>
                                <TextField label="First name" onChange={() => {}} />
                                <TextField label="Second name" onChange={() => {}} />
                            </FormLayout.Group>

                            <TextField label="Email" type="email" onChange={() => {}} />
                            <TextField label="Phone" type="tel" onChange={() => {}} />

                            <FormLayout.Group>
                                <TextField label="Country" onChange={() => {}} />
                                <TextField label="City" onChange={() => {}} />
                            </FormLayout.Group>
                        </FormLayout>
                    </Card>
                </Layout.AnnotatedSection>

                <Layout.AnnotatedSection
                    title="Work Experience"
                    description="Try to include number of work experiences between 1-2. Also, avoid including work experiences that are too old (for example, 10 years ago)."
                >
                    <Card sectioned>
                        <FormLayout>
                            <TextField label="Job title" onChange={() => {}} />

                            <FormLayout.Group>
                                <TextField type="date" label="Start date" onChange={() => {}} />
                                <TextField type="date" label="End date" onChange={() => {}} />
                            </FormLayout.Group>

                            <TextField label="Responsibilites" onChange={() => {}} multiline={8} />
                        </FormLayout>
                    </Card>
                </Layout.AnnotatedSection>

                <Layout.AnnotatedSection title="Education">
                    <Card sectioned>
                        <FormLayout>
                            <TextField label="School name" onChange={() => {}} />
                            <TextField label="Degree" onChange={() => {}} />

                            <FormLayout.Group>
                                <TextField type="date" label="Start date" onChange={() => {}} />
                                <TextField type="date" label="End date" onChange={() => {}} />
                            </FormLayout.Group>
                        </FormLayout>
                    </Card>
                </Layout.AnnotatedSection>

                <Layout.AnnotatedSection title="Professional Accomplishments">
                    <Card sectioned>
                        <TextField label="Accomplishments" onChange={() => {}} multiline={8} />
                    </Card>
                </Layout.AnnotatedSection>

            </Layout>
        </Page>
    )
}
