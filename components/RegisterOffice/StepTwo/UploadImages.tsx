import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';

import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Center, Col, Grid, Group, Progress, Text, Button } from '@mantine/core';
import Image from 'next/image'
import { Tooltip } from 'primereact/tooltip';
import { Field } from 'formik';
import axios from 'axios';

const UploadImages = () => {
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<any>();

    const onTemplateClear = () => {
        setTotalSize(0);
    }
    const onTemplateRemove = (file: { name?: {} | null | undefined; objectURL?: string | undefined; size?: any; }, callback: () => void) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    const headerTemplate = (options: { className: any; chooseButton: any; uploadButton: any; cancelButton: any; }) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
            </div>
        );
    }

    const itemTemplate = (file: { name: {} | null | undefined; objectURL: string; }, props: { formatSize: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; onRemove: any; }) => {
        return (
            <Grid justify="space-between" align="center">
                <Col span={8}>
                    <Group direction="row">
                        <Col span={6}>
                            <Image src={file.objectURL} width="100" height="100" />
                        </Col>
                        <Col span={6}>
                            <Text style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</Text>
                        </Col>
                    </Group>
                </Col>
                <Col span={4}>
                    <Button
                        type="button"
                        color="pink"
                        onClick={() => onTemplateRemove(file, props.onRemove)}>
                        Eliminar
                    </Button>
                </Col>
            </Grid>
        )
    }

    const emptyTemplate = () => {
        return (
            <Center>
                <Text>Arrastra y suelta tus imagenes</Text>
            </Center>
        )
    }

    const chooseOptions = { icon: 'pi pi-fw pi-images', label: "Escoger archivos", iconOnly: false, className: 'custom-choose-btn p-button-rounded p-button-success p-button', style: { backgroundColor: '#4C6EF5', margin: 'auto' } };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', label: "Guardar imagenes" ,iconOnly: false, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined', style: {backgroundColor: '#12b886', margin: 'auto', color:'#fff'} };

    return (
        <div>
            {/* <Toast ref={toast}></Toast> */}
            <Tooltip target=".custom-choose-btn" content="Elegir archivo(s)" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Confirmar archivos" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Resetear" position="bottom" />

            <div className="card">
                <Field name="spaceImages">
                    {({ field, form, meta }: any) => (
                        <FileUpload
                            ref={fileUploadRef}
                            multiple accept="image/*"
                            maxFileSize={10000000}
                            customUpload
                            uploadHandler={async(event: any) => {
                                console.log(event.files)
                                const data = new FormData()
                                data.append('spaceImages', event.files[0])
                                data.append('spaceImages', event.files[1])
                                data.append('spaceImages', event.files[2])
                                // const req = await axios.post('http://localhost:5000/offices', data)
                                // console.log(req)
                                form.setFieldValue(field.name, event.files)
                                console.log(event.options)
                                fileUploadRef.current.clear()
                                
                            }}
                            onError={onTemplateClear}
                            onClear={onTemplateClear}
                            headerTemplate={headerTemplate}
                            itemTemplate={itemTemplate}
                            emptyTemplate={emptyTemplate}
                            chooseOptions={chooseOptions}
                            uploadOptions={uploadOptions}
                        />
                    )}
                </Field>
            </div>
        </div>
    )
}
export default UploadImages