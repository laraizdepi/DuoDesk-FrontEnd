import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';

import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from '@mantine/core';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import Image from 'next/image'
import { Center, Col, Grid, Group, Progress, Text } from '@mantine/core';

const UploadImages = () => {
    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);
    const fileUploadRef = useRef(null);

    const onTemplateUpload = (e: { files: any[]; }) => {
        let _totalSize = 0;
        e.files.forEach((file: { size: any; }) => {
            _totalSize += (file.size || 0);
        });

        setTotalSize(_totalSize);
    }
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

    const progressBarTemplate = (value: any) => {
        return (
            <Progress value={value} />
        )
    }

    const chooseOptions = { icon: 'pi pi-fw pi-images', label: "Escoger archivos", iconOnly: false, className: 'custom-choose-btn p-button-rounded p-button-success p-button', style: { backgroundColor: '#4C6EF5', margin: 'auto' } };
    const [image, setImage] = useState('')

    return (
        <div>
            {/* <Toast ref={toast}></Toast> */}
            <Tooltip target=".custom-choose-btn" content="Elegir archivo(s)" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Confirmar archivos" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Resetear" position="bottom" />

            <div className="card">
                <FileUpload
                    ref={fileUploadRef}
                    url="https://primefaces.org/primereact/showcase/upload.php"
                    multiple accept="image/*"
                    maxFileSize={10000000}
                    onUpload={(event: any) => {
                        console.log(event.files)
                        setImage(event.files[0].objectURL as string)
                    }}
                    onError={onTemplateClear}
                    onClear={onTemplateClear}
                    headerTemplate={headerTemplate}
                    itemTemplate={itemTemplate}
                    emptyTemplate={emptyTemplate}
                    chooseOptions={chooseOptions}
                    progressBarTemplate={progressBarTemplate}
                    withCredentials
                />
            </div>
            <img src={image} />
        </div>
    )
}
export default UploadImages