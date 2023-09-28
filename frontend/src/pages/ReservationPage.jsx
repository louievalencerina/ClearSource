import Taskbar from '../components/Taskbar'; // Import the ReservationForm component
import ReservationForm from '../components/ReservationForm'; // Import the ReservationForm component
import '../index.css' 
export default function ReservationPage() {
    return (
        <div className='fullscreen-div'>
            <Taskbar />
            <ReservationForm />
        </div>
    )
}