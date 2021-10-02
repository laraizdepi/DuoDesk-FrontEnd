import React, { FC } from "react";
import { Carousel } from "primereact/carousel";

interface ImageProps {
	images?: string[]
}

const ImagesSlide: FC<ImageProps> = (props) => {
	const ImagesProp = props.images

	const productTemplate = (image: any) => {
		return (
			<div>
				<img src={image.src} style={{ maxWidth: '100%' }} />
			</div>
		);
	};

	return (
		<div className="card">
			<Carousel
				value={ImagesProp}
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

