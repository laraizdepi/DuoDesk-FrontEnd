import { FC } from "react"
import ImagesSlide from './ImagesSlide'

interface ImageProps {
    images?: string[]
}

const ImagesAll: FC<ImageProps> = (props) => {
    const allImages = props.images
    // return (
    //     <div>
    //         {allImages.map((image: any) =>{
    //             return(
    //                 <h1>{image}</h1>
    //             )
    //         })}
    //     </div>
    // )
    return (
        <div>
            {allImages.map((image: any) => {
                return (
                    <div>
                        <image src ={image.src}></image>
                    </div>
                    
                )
            }
            )}
        </div>
    )
}

export default ImagesAll