import ImageGallery from 'react-image-gallery';


const TestImages = () => {
  return (
    <div>
      <div className={style.imagesMainMediun}>
        <ImageGallery
          items={ImagesAll}
          showIndex
          // showThumbnails={false}
          showPlayButton={false}
          // originalHeight = {'220px'}
          showBullets />
      </div>
    </div>
  )
}

export default TestImages