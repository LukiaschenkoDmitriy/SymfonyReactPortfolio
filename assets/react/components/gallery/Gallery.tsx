import "./Gallery.scss";

import { Button, Modal } from "react-bootstrap";

import React, { useState } from "react";
import { bool } from "prop-types";
import GalleryModal from "./gallery-modal/GalleryModal";

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