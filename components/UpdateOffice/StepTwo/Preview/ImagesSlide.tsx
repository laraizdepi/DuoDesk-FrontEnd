import React, { FC } from "react";
import { Carousel } from "react-bootstrap";
import { Card, Image } from "@mantine/core";

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

	if (typeof props.images[0] !== 'string') {
		return (
			<Card withBorder>
				<Carousel>
					{props.images.map((image) => {
						return (
							<Carousel.Item key={image} interval={5000}>
								<Image
									height="12rem"
									src={image.objectURL}
									radius="lg"
									fit="contain"
								/>
							</Carousel.Item>
						)
					})}
				</Carousel>
			</Card>
		)
	}

	return (
		<Card withBorder>
			<Carousel>
				{props.images.map((image) => {
					return (
						<Carousel.Item key={image} interval={5000}>
							<Image
								height="12rem"
								src={image.objectURL}
								radius="lg"
								fit="contain"
							/>
						</Carousel.Item>
					)
				})}
			</Carousel>
		</Card>

	);
};

export default ImagesSlide

