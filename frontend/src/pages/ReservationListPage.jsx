import Taskbar from '../components/Taskbar'; 
import ReservationList from '../components/ReservationList'; 

export default function ReservationListPage() {
    return (
        <div className='fullscreen-div'>
            <Taskbar />
            <ReservationList />
        </div>
    )
}