import { useEffect, useState } from "react";

const Modal_GroupL = (props) => {

    // 모달
    useEffect(() => {
        document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;

        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, []);

    const modalClose = () => {
        props.closeModal();
        console.log(props.closeModal());
    }


    return (
        <>
            {/* <div className="groupL_modalBody" onClick={(e) => e.stopPropagation()}> */}
            <div className="groupL_modal">
                <div className="groupL_modalImgbox">
                    <img className="groupL_modalImg" src={require("../img/writesample/write_6.PNG")} />
                </div>
                <div className="groupL_write">
                    <div className="groupL_modalHeader">
                        <div className="groupL_date">{props.diaryDetailInfo ? props.diaryDetailInfo.createdDt : ""}</div>
                        <div className="groupL_modalHeaderRight">
                            <div className="groupL_weather"></div>
                            <div className="groupL_mood"></div>
                        </div>
                    </div>
                    {/* <div className="groupL_content">
                        <div className="groupL_dairyContents">{dairyContents}</div>
                    </div> */}
                    <div className="group_dairyContents">{props.diaryDetailInfo ? props.diaryDetailInfo.diaryContent : ""}</div>
                    {props.children}
                </div>
            </div>
            {/* </div> */}

        </>
    );
};

export default Modal_GroupL;