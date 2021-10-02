import React, { FC } from "react";
import { Carousel } from "primereact/carousel";

interface ImageProps {
	images: any[]
}

const ImagesSlide: FC<ImageProps> = (props) => {
	const images = props.images

	const productTemplate = (image: any) => {
		console.log(images)
		return (
			<div>
				<img src={image.objectURL} style={{ maxWidth: '100%' }} />
			</div>
		);
	};

	return (
		<div className="card">
			<Carousel
				value={images}
				numVisible={1}
				numScroll={1}
				itemTemplate={productTemplate}
				circular
				autoplayInterval={3000}
			/>
		</div>

	);
};

export default ImagesSlide

