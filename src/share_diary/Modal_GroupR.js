import { useEffect, useState } from "react";

const Modal_GroupR = (props) => {

    const dairyContents = ''

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
            {/* <div className="groupR_modalBody" onClick={(e) => e.stopPropagation()}> */}

            <div className="groupR_modal">
                <div className="groupR_modalImgbox">
                    <img className="groupR_modalImg" src={require("../img/writesample/write_4.PNG")} />
                </div>
                <div className="groupL_write">
                    <div className="groupR_modalHeader">
                        <div className="groupR_date">{props.diaryDetailInfo ? props.diaryDetailInfo.createdDt : ""}</div>
                        <div className="groupR_modalHeaderRight">
                            <div className="groupR_weather"></div>
                            <div className="groupR_mood"></div>
                        </div>
                    </div>
                    <div className="group_dairyContents">{props.diaryDetailInfo ? props.diaryDetailInfo.diaryContent : ""}</div>
                    {props.children}
                </div>
            </div>
        </>
    );
};

export default Modal_GroupR;