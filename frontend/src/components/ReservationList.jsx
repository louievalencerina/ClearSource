import { useState, useEffect } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

function ReservationGrid() {
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate()

  const handleGet = () => { //sends a GET request to get Reservation List
    axios.get('http://127.0.0.1:8000/reservations/') //Put this in a separate API folder if there's time
      .then((response) => {
        setResponseData(response.data);
        console.log('Response from server:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const deleteReservation = (reservationID) => { //Sends A DELETE request using reservationID
    const apiUrl = `http://127.0.0.1:8000/reservations/${reservationID}`; //Put this in a separate API folder if there's time
    axios.delete(apiUrl).then((response) => {
      // Handle the success response
      console.log('Reservation deleted successfully:', response.data);
    })
      .catch((error) => {
        // Handle any errors
        console.error('Error deleting reservation:', error);
      });
  };

  const handleUpdateClick = (reservationID, reservationDate, id) => {
    const currentDate = dayjs(); //Stores Current Date
    const reservationDateObj = dayjs(reservationDate); // Gets reservation date on parameter and converts it to a dayjs object

    // Calculate the difference in days
    const daysDifference = reservationDateObj.diff(currentDate, 'day'); //Gets the difference in days

    if (daysDifference >= 2) { //if difference is less than 2
      navigate(`/update/${id}`);
      //to={`/update/${reservation.ID}`} // Set the route for the button link

    } else {
      console.log(`Reservation ID ${reservationID} cannot be deleted because it's within 2 days of the reservation.`);
    }
  };

  const handleDeleteClick = (reservationID, reservationDate) => {
    const currentDate = dayjs(); //Stores Current Date
    const reservationDateObj = dayjs(reservationDate); // Gets reservation date on parameter and converts it to a dayjs object

    // Calculate the difference in days
    const daysDifference = reservationDateObj.diff(currentDate, 'day'); //Gets the difference in days

    if (daysDifference >= 2) { //if difference is less than 2
      deleteReservation(reservationID);
      handleGet();
      console.log(`Delete button clicked for reservation ID ${reservationID}`);
    } else {
      console.log(`Reservation ID ${reservationID} cannot be deleted because it's within 2 days of the reservation.`);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <Box sx={{ overflow: 'auto' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Reservation Date</TableCell>
              <TableCell>Number of Guests</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responseData !== null && responseData.map((reservation) => (
              <TableRow key={reservation.ID}>
                <TableCell>
                  {`${reservation.reservation_first_name} ${reservation.reservation_last_name}`}
                </TableCell>
                <TableCell>{reservation.phone_number}</TableCell>
                <TableCell>{
                  reservation.reservation_datetime
                }</TableCell>
                <TableCell>{reservation.number_of_guests}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleUpdateClick(reservation.ID, reservation.reservation_datetime, reservation.ID)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteClick(reservation.ID, reservation.reservation_datetime)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ReservationGrid;
