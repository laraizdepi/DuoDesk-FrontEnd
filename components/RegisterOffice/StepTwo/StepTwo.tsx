import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { ScrollPanel } from 'primereact/scrollpanel';
import AddSpace from './AddSpace'
import Preview from './Preview/Preview';

const StepTwo = () => {
    const [spaces, setSpaces] = useState<any[]>([])

    return (
        <div>
            <Row>
                <Col xs={12} md={6}>
                    <Preview spaces={spaces} />
                </Col>
                <Col xs={12} md={6}>
                    <ScrollPanel style={{width: '100%', height: '853px'}}>
                        <AddSpace spaces={spaces} setSpaces={setSpaces}/>
                    </ScrollPanel>
                </Col>
            </Row>
        </div>
    )
}

export default StepTwo