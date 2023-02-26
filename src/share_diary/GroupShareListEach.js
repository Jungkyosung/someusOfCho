import axios from 'axios';
import './groupsharelisteach.css';
import trueimage from '../img/group_half.png';


const GroupShareListEach = ({ list }) => {

    // const [ diaryId, setDiaryId ] = useState(0);

    // const handlerClick = () => {
    //     axios.get(`http://localhost:8080/api/someus/private/${diaryId}`)
    //         .then((response) => {
    //             console.log(response);
    //             setDiaryId(response.data.list.diaryId);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }
    return (
        // <div className='eachdiary'
        //      onClick={ handlerClick }>
        //     <div className='diaryimg'>{ list.diaryImg }</div>
        //     <div className='diarydate'>{ list.createdDt }</div>
        // </ div>
        <div className='group_eachdiary'>
            {list.number === 0 ? <div className='group_diaryimg1' /> : <div className='group_diaryimg2' /> }
            <div className='group_diarydate'>{list.createdDt}</div>
        </ div>
    );
}

export default GroupShareListEach;