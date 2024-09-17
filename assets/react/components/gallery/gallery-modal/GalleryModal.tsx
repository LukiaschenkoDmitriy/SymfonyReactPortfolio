import "./GalleryModal.scss";

import React, { useEffect, useState } from "react";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import { Modal } from "react-bootstrap";

// This file defines the GalleryModal component, which displays a full-screen modal for viewing images.
// It allows users to navigate between images using arrow buttons and also select images from a thumbnail preview.
// The component maintains the current image state and updates it based on user interactions or prop changes.

export interface GalleryModalProps {
    images: string[],
    show: boolean,
    setShow: (value: boolean) => void,
    position: number,
}

const GalleryModal: React.FC<GalleryModalProps> = ({images, show, setShow, position}) => {
    
    const [currentImage, setCurrentImage] = useState<number>(position);

    const nextImage = () => {
        if (currentImage < images.length - 1) {
            setCurrentImage(currentImage + 1);
        } else {
            setCurrentImage(0);
        }
    }

    const previousImage =() => {
        if (currentImage > 0) {
            setCurrentImage(currentImage - 1);
        } else {
            setCurrentImage(images.length - 1);
        }
    }

    useEffect(() => {
        setCurrentImage(position);
    }, [show, position])

    return (
        <Modal
            size="xl" fullscreen={true} centered className="sr-modal-window" 
            show={show} onHide={() => { setShow(false) }}>
            <Modal.Header closeButton>
                
            </Modal.Header>
            <Modal.Body className="sr-modal-window-body">
                <div className="sr-modal-body">
                    <div className="current-image">
                        <div className="preview-image" onClick={previousImage}><MdOutlineKeyboardArrowLeft/></div>
                        <img src={images[currentImage]} alt={"slider_image_"+currentImage} className=""/>
                        <div className="next-image" onClick={nextImage}><MdOutlineKeyboardArrowRight /></div>
                    </div>
                    <div className="images-wrapper">
                        <div className="images">
                            {images.map((image: string, index: number) => (
                                <img key={image + index} src={image} alt={image} className={`${index === position? 'active' : ''}`} onClick={() => {setCurrentImage(index)}}/>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default GalleryModal;