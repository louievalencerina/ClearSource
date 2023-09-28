import { Box, Button, Grid, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditForm() {
    //Current Reservation Id
    const { id } = useParams();
    const navigate = useNavigate()

    //Form variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [guestNumber, setGuestNumber] = useState('');

    //Error handling variable
    const [error, setError] = useState(null);

    //DateTime variables
    const [selectedDate, setDate] = useState(null);
    const [selectedTime, setTime] = useState(null);
    const minimumTime = dayjs().set('hour', 18).startOf('hour'); //DayJS object representing 6:00pm
    const maximumTime = dayjs().hour(21).minute(30); //DayJS object representing 9:30pm
    const minimumDate = dayjs().add(2, 'day'); //DayJS object representing the day after tomorrow (DateNow + 2)

    //REST response variable
    const [currentReservation, setCurrentReservation] = useState({
        id: id,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        reservation_datetime: '',
        guestNumber: 0
        // "ID": 17,
        // "reservation_first_name": "John Louie",
        // "reservation_last_name": "Valencerina",
        // "phone_number": "09055695915",
        // "reservation_datetime": "2023-09-28T19:30:00Z",
        // "number_of_guests": 5
    })

    //TextField Handlers
    const handleFirstNameChange = (event) => {
        const newValue = event.target.value;
        setCurrentReservation((prevState) => ({
            ...prevState,
            firstName: newValue
        }));
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event) => {
        const newValue = event.target.value;
        setCurrentReservation((prevState) => ({
            ...prevState,
            lastName: newValue
        }));
        setLastName(event.target.value);
    };
    const handlePhoneNumberChange = (event) => {
        const newValue = event.target.value;
        setCurrentReservation((prevState) => ({
            ...prevState,
            phoneNumber: newValue
        }));
        setPhoneNumber(event.target.value);
    };
    const handleGuestNumberChange = (event) => {
        const newValue = event.target.value;
        setCurrentReservation((prevState) => ({
            ...prevState,
            guestNumber: newValue
        }));
        setGuestNumber(event.target.value);
    };

    //Date and Time Handlers
    const handleDateChange = (date) => {
        setDate(date);
    };
    const handleTimeChange = (time) => {
        setTime(time);
    };

    //Function that concatenates date and time to form a DateTime value
    function combineDateTime(selectedDate, selectedTime) {
        if (selectedDate && selectedTime) {
            const formattedDate = selectedDate.format('YYYY-MM-DD');
            const formattedTime = selectedTime.format('HH:mm');
            const datetime = `${formattedDate} ${formattedTime}`;
            return datetime;
        }
        return null;
    }

    //Reservation Object
    const reservation_data = {
        "reservation_first_name": firstName,
        "reservation_last_name": lastName,
        "phone_number": phoneNumber,
        "reservation_datetime": combineDateTime(selectedDate, selectedTime),
        "number_of_guests": guestNumber
    }

    const isDateValid = (dateInput) => {
        const currentDate = dayjs(); //Stores Current Date
        const dateObj = dayjs(dateInput); // Gets date on parameter and converts it to a dayjs object

        // Calculate the difference in days
        const daysDifference = dateObj.diff(currentDate, 'day'); //Gets the difference in days
        console.log(daysDifference)
        return daysDifference >= 2 ? true : false;
    };

    //Handles the submit button
    const handleSubmit = async () => {
        console.log(reservation_data);
        try {
            if (isDateValid(reservation_data.reservation_datetime)) {
                const statusCode = await handlePutRequest(); // Wait for the PUT request to complete
                if (statusCode === 200) {
                    navigate('/list'); // Navigate to the '/list' route
                }
            } else {
                console.log("Please enter a later date")
            }

        } catch (error) {
            // Handle any errors that occur during the PUT request
            console.error('Error:', error);
        }
    };


    //Gets the current Reservation object on load
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/reservations/' + id) //Put this in a separate API folder if there's time
            .then((response) => {
                const responseData = response.data;
                setCurrentReservation({
                    id: responseData.ID,
                    firstName: responseData.reservation_first_name,
                    lastName: responseData.reservation_last_name,
                    phoneNumber: responseData.phone_number,
                    reservation_datetime: responseData.reservation_datetime,
                    guestNumber: responseData.number_of_guests,
                });
                setFirstName(responseData.reservation_first_name);
                setLastName(responseData.reservation_last_name);
                setPhoneNumber(responseData.phone_number);
                setGuestNumber(responseData.number_of_guests);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    //Handles the PUT request that updates the reservation_data object to the Reservation table by ID
    const handlePutRequest = async () => {
        try {
            const response = await axios.put('http://127.0.0.1:8000/reservations/' + id, reservation_data); //Put this in a separate API folder if there's time
            console.log('Response from server:', response.data);
            return response.status //Returns status code
        } catch (error) {
            console.error('Error:', error);
            throw error; // Re-throw the error so it can be caught by the caller
        }
    };


    const errorMessage = React.useMemo(() => { //Error handling for TimePicker field
        switch (error) {
            case 'minTime': //If min/max time, return error message
            case 'maxTime': {
                return 'Please select a time between 6:00pm and 9:30pm';
            }

            case 'invalidDate': { //if invalid date
                return 'Your date is not valid';
            }

            default: {
                return '';
            }
        }
    }, [error]);
    console.log(currentReservation);
    return (
        <Box
            sx={{
                width: {
                    xs: '100%', // Full width on extra-small screens
                    lg: '50%', // 50% width on large screens
                },
            }}
            bgcolor={'whitesmoke'}
            padding={'24px'}
            borderRadius={'12px'}
        >
            {currentReservation && (
                <>
                    <h3 style={{ fontFamily: 'monospace', color: 'black' }}>Personal Details</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="First Name"
                                value={currentReservation.firstName}
                                variant="outlined"
                                fullWidth
                                onChange={handleFirstNameChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="Last Name"
                                value={currentReservation.lastName}
                                variant="outlined"
                                fullWidth
                                onChange={handleLastNameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Phone Number"
                                value={currentReservation.phoneNumber}
                                variant="outlined"
                                fullWidth
                                onChange={handlePhoneNumberChange}
                            />
                        </Grid>
                    </Grid>

                    <h3 style={{ fontFamily: 'monospace', color: 'black' }}>Reservation Details</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={3}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en'}>
                                <DateField label="Date" format="YYYY-MM-DD" fullWidth minDate={minimumDate} onChange={handleDateChange} />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en'}>
                                <TimePicker
                                    label="Time"
                                    format="HH:mm"
                                    fullWidth
                                    minutesStep={30}
                                    value={selectedTime}
                                    onChange={handleTimeChange}
                                    minTime={minimumTime} // Sets 6:00 PM as the minimum time for a reservation
                                    maxTime={maximumTime} // 9:30 PM as the maximum time for a reservation
                                    onError={(newError) => setError(newError)} //Sets the error message
                                    slotProps={{
                                        textField: {
                                            helperText: errorMessage, //Sets the helperText as an error message
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="number"
                                required
                                label="Number of Guests"
                                value={currentReservation.guestNumber}
                                variant="outlined"
                                onChange={handleGuestNumberChange}
                                fullWidth
                                InputProps={{
                                    inputProps: {
                                        min: 1,
                                        max: 5
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button variant="outlined" color="primary" onClick={handleSubmit}>
                            Save
                        </Button>
                    </Box>
                </>)};

        </Box >
    );
}

export default EditForm;