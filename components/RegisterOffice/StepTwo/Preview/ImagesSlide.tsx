import React, { FC } from "react";
import { Carousel } from "primereact/carousel";
import { Card } from "@mantine/core";

interface ImageProps {
	images: any[]
}

const ImagesSlide: FC<ImageProps> = (props) => {
	const images = props.images

	const productTemplate = (image: any) => {
		return (
			<div>
				<img src={image.objectURL} style={{ maxWidth: '100%' }} />
			</div>
		);
	};

	return (
		<Card withBorder>
			<Carousel
				value={images}
				numVisible={1}
				numScroll={1}
				itemTemplate={productTemplate}
				circular
				autoplayInterval={3000}
			/>
		</Card>

	);
};

export default ImagesSlide

