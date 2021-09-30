import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';

import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';

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
                {uploadButton}
                {cancelButton}
            </div>
        );
    }

    const itemTemplate = (file: { name: {} | null | undefined; objectURL: string | undefined; }, props: { formatSize: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; onRemove: any; }) => {
        return (
            <div className="p-d-flex p-ai-center">
                <div className="p-d-flex p-ai-center" style={{ width: '75%' }}>
                    {/* Preview Of Image */}
                    <img role="presentation" src={file.objectURL} width={300} />
                    <span >
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger p-ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div>
                <span style={{ 'fontSize': '1.3em' }} >Arrastra y Suelta tus images </span>
            </div>
        )
    }

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    return (
        <div>
            {/* <Toast ref={toast}></Toast> */}
            <Tooltip target=".custom-choose-btn" content="Elige" position="bottom" /> 
            <Tooltip target=".custom-upload-btn" content="Sube" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Eliminar" position="bottom" />

            <div className="card">
                <FileUpload
                    ref={fileUploadRef}
                    url="https://primefaces.org/primereact/showcase/upload.php"
                    multiple accept="image/*"
                    maxFileSize={10000000}
                    onUpload={onTemplateUpload}     
                    onError={onTemplateClear} 
                    onClear={onTemplateClear}
                    headerTemplate={headerTemplate} 
                    // itemTemplate={itemTemplate} 
                    emptyTemplate={emptyTemplate}
                    chooseOptions={chooseOptions} 
                    uploadOptions={uploadOptions} 
                    cancelOptions={cancelOptions}
                />
            </div>
        </div>
    )
}
export default UploadImages