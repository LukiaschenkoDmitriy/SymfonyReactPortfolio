import "./Gallery.scss";

import React, { useState } from "react";

import GalleryModal from "./gallery-modal/GalleryModal";

// This file defines the Gallery component, which displays a grid of images.
// Clicking on an image opens a modal with the clicked image, allowing for a larger view.
// The component maintains state for the visibility of the modal and the current image position.
// The `GalleryModal` component is used to show the image in a modal view.

export interface GalleryProps {
    images: string[]
}

const Gallery: React.FC<GalleryProps> = ({images}) => {

    const [showModalWindow, setShowModalWindow] = useState<boolean>(false);
    const [imagePosition, setImagePosition] = useState<number>(0);

    return (
        <>
            <div className="sr-gallery row">
                {images.map((image: string, index:number) => (
                    <div className="col-12 col-md-12 col-lg-6 col-xl-6 my-3" key={image}>
                        <div className="image" onClick={() => {setImagePosition(index); setShowModalWindow(true);}}>
                            <img src={image} alt="Gallery" className="img-fluid"/>
                        </div>
                    </div>
                ))}
            </div>
            <GalleryModal images={images} show={showModalWindow} setShow={setShowModalWindow} position={imagePosition}/>   
        </>
    )
}

export default Gallery;