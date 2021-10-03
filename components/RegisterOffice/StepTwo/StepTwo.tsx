import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap'
import { ScrollPanel } from 'primereact/scrollpanel';
import AddSpace from './AddSpace'
import Preview from './Preview/Preview';
import { useFormikContext } from 'formik';

const StepTwo = () => {
    const [spaces, setSpaces] = useState<any[]>([])

    const formikContext: any = useFormikContext()

    useEffect(() => {
        formikContext.setFieldValue('spaces', spaces)
        console.log(formikContext.values.spaces)
        console.log(formikContext.values)
    }, [spaces])

    return (
        <div>
            <Row>
                <Col xs={12} md={6}>
                    <Preview spaces={spaces} setSpaces={setSpaces} />
                </Col>
                <Col xs={12} md={6} style={{height: '100%'}}>
                    <ScrollPanel style={{width: '100%'}}>
                        <AddSpace spaces={spaces} setSpaces={setSpaces}/>
                    </ScrollPanel>
                </Col>
            </Row>
        </div>
    )
}

export default StepTwo