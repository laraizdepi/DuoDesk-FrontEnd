import React, { useState } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';


const PHOTOS = ['https://a0.muscache.com/im/pictures/26390c8a-f26a-47d1-8da4-933c39990542.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/61c398ac-cbcd-4fb4-88bc-f1251057f52b.jpg?im_w=1200'];

const TestImages = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open gallery
      </button>
      <ReactBnbGallery
        show={isOpen}
        photos={PHOTOS}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}

export default TestImages