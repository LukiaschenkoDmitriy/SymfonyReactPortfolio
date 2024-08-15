import "./HeaderButtonMobile.scss";

import React, { CSSProperties, useState } from "react";

import { Link } from "react-router-dom";
import { AppRouterInterface } from "app/routers";
import { IoIosArrowUp } from "react-icons/io";

export interface HeaderButtonMobileProps {
    router: AppRouterInterface
    clickHandler: (routerPath: string) => void 
}

const HeaderButtonMobile: React.FC<HeaderButtonMobileProps> = ({ router, clickHandler }) => {
    const [innerButtonStyles, setInnerButonStyles] = useState<CSSProperties>({ overflow: "hidden", height: "0px", transition: "all .5s ease" });
    const [arrowButtonStyles, setArrowButtonStyles] = useState<CSSProperties>({transform:"rotate(0deg)", transition: "all .5s ease"});

    const handlerTitleClick = () => {
        let blockHeight = 70 * router.underCagetories.length;
        if (innerButtonStyles.height === blockHeight+"px") {
            setInnerButonStyles({ height: "0px", overflow: "hidden", transition: "all .5s ease" });
            setArrowButtonStyles({ transform: "rotate(0deg)", transition: "all .5s ease" });
        } else {
            setInnerButonStyles({ height: blockHeight + "px", overflow: "hidden", transition: "all .5s ease" });
            setArrowButtonStyles({ transform: "rotate(180deg)", transition: "all .5s ease" });
        }
    };

    return (
        <>
            <div className="sr-header-button-mobile-container">
                {(router.underCagetories.length == 0) ? 
                    <div data-bs-dismiss="offcanvas">
                        <Link key={router.name+"mobile2"} onClick={() => { clickHandler(router.path) }} to={router.path} className={`sr-header-button-mobile ${router.active ? 'sr-header-button-mobile-active' : ''}`}>
                            {router.name}
                        </Link>
                    </div>
                    :
                    <>
                        <div className="title" onClick={() => { handlerTitleClick() }}>
                            <div>{router.name}</div>
                            <IoIosArrowUp style={arrowButtonStyles}></IoIosArrowUp>
                        </div>
                        <div className="inner-button" style={innerButtonStyles}>
                            {router.underCagetories.map((subcategory) => (
                                <div data-bs-dismiss="offcanvas">
                                    <Link key={subcategory.name+"mobile3"} onClick={() => { clickHandler(subcategory.path) }} to={subcategory.path} className={`sr-header-button-mobile ${subcategory.active ? 'sr-header-button-mobile-active' : ''}`}>
                                        {subcategory.name}
                                    </Link>
                                </div>
                            )) }
                        </div>
                    </>
                }
            </div>    
        </>
    );
}

export default HeaderButtonMobile;