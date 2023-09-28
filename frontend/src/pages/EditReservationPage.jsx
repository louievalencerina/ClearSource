import Taskbar from '../components/Taskbar'; 
import EditReservationForm from '../components/EditForm'; 

export default function ReservationListPage() {
    return (
        <div className='fullscreen-div'>
            <Taskbar />
            <EditReservationForm />
        </div>
    )
}