import axios from "axios";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './datepicker.css';
import MyDiaryEach from "./MyDiaryEach";
import ko from 'date-fns/locale/ko';
import NaviDiary from "../navigation/NaviDiary";
import '../navigation/navi.css';
import './mydiarylist.css';
import jwt_decode from "jwt-decode";
import TodoList from "./TodoList";
import Modal_Mydiary from "./Modal_Mydiary";


const MyDiaryList = ({ match, history }) => {

    const [list, setList] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const { diaryId } = match.params;
    const [memberId, setMemberId] = useState('');
    const [memberName, setMemberName] = useState('');
    const [modalState, setModalState] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    const closeModal = (index) => {
        setModalState(prevState => {
            const updateArray = [...prevState];
            updateArray[index] = false;
            return updateArray;
        });
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        setMemberId(decode_token.sub);
        setMemberName(decode_token.name);

        let memberId = decode_token.sub;

        axios.get(`http://localhost:8080/api/someus/private/page/${memberId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response);
                setList(response.data.diaryList);

                for (let i = 0; i < list.length; i++) {
                    setModalState(prevState => {
                        const updateModalArray = [...prevState];
                        updateModalArray[i] = false;
                        return updateModalArray;
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                return;
            })
    }, []);

    // ????????? ?????? ??????
    const getDayName = (date) => {
        return date.toLocaleDateString('ko-KR', {
            weekday: 'long',
        }).substr(0, 1);
    };

    // ????????? ???, ???, ?????? ??????
    const createDate = (date) => {
        return new Date(new Date(date.getFullYear()
            , date.getMonth()
            , date.getDate()
            , 0
            , 0
            , 0));
    };

    const handlerClickWrite = () => {
        history.push(`/someus/private/write`)
    };

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    // ?????? ?????? ??? ?????? ????????? ???????????? ????????? ????????????
    const handlerChangeDate = (date) => {
        setSelectedDate(date)
        console.log(formatDate(date))
        const createdDt = formatDate(date);
        axios.get(`http://localhost:8080/api/someus/private/page/${memberId}/${createdDt}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response);
                // ???????????? ????????? ?????? ????????? ???????????? ?????? ??????
                if (list === null) {
                    alert(`????????? ???????????? ????????????.`);
                }
                // ???????????? ????????? ?????? ????????? ???????????? ?????? ?????? ???????????? ?????? ????????? map ?????? ??????
                else {
                    setList(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const handlerClickDetail = (index) => {
        setModalState(prevState => {
            const updateArray = [...prevState];
            updateArray[index] = true;
            return updateArray;
        });

    };

    const result = () => {
        return list && list.map((lst, index) => {
            return (
                <div key={index} id={lst.diaryId}>
                    {modalState[index] && <Modal_Mydiary match={match} closeModal={() => closeModal(index)} id={lst.diaryId} list={lst} />}
                    <button className="diaryeachbutton" type="button" value={lst.diaryId} onClick={() => handlerClickDetail(index)}>
                        <MyDiaryEach list={lst} />
                    </button>
                </div>
            );
        });
    };

    return (
        <>
            <div>
                <NaviDiary history={history} />
                <div className='diarylist_background'
                    style={{ backgroundImage: `url('../img/bg_mylist.png')` }} >
                    {/* <img src={backimg} style={ { backgroundAttachment: 'fixed'}}/> */}
                    <div className='body' >
                        <div className="calendar-container">
                            <div className="calendar-box">
                                <DatePicker
                                    // ?????? ?????? ??????
                                    // selected={startDate}
                                    locale={ko}
                                    selected={selectedDate}
                                    // ????????? ???????????? ?????? ????????? ??????
                                    onChange={handlerChangeDate}
                                    inline
                                    // ???, ??? ?????? ??????
                                    dayClassName={date =>
                                        getDayName(createDate(date)) === '???' ? "saturday"
                                            :
                                            getDayName(createDate(date)) === '???' ? "sunday" : undefined
                                    }
                                    todayButton="today"
                                />
                            </div>
                            <div className="todo-box">
                                <TodoList />
                            </div>
                        </div>
                        <div className='diary-container'>
                            <div>
                                <p className="name_diary">{memberName}??? ??????</p>
                                <p className='date'>{startDate.getMonth() + 1} {startDate.toLocaleString("en-US", { month: "long" })}</p>
                            </div>

                            <button className='write' onClick={handlerClickWrite}>
                                <div className='write-button' />
                                <span> ???????????? </span>
                            </button>

                            <div className='diary'>
                                <div className="diaryWrap">{list && result()}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );

}

export default MyDiaryList;