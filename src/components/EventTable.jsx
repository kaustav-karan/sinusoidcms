import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import dayjs from 'dayjs';

const EventTable = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://api.sinusoid.in/events");
        if (response.status === 200) {
          setEvents(response.data);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchEvents();
  }, []);
  const handleRowClick = () => {
    window.location.href = "/events";
  };

  return (
    <div className="mt-16 ml-0 p-4 w-1/2 h-[50vh] overflow-y-auto border border-gray-300">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell align="right">Event Start Date</TableCell>
              <TableCell align="right">Event End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.length > 0 ? (
              events.map((event, idx) => (
                <TableRow
                  key={idx}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={handleRowClick}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell component="th" scope="row">
                    {event.eventName}
                  </TableCell>
                  <TableCell align="right">
                    {dayjs(event?.schedule?.eventStart).format("MMMM D, YYYY h:mm A")}
                  </TableCell>
                  <TableCell align="right">
                    {dayjs(event?.schedule?.eventEnd).format("MMMM D, YYYY h:mm A")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No Events Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EventTable;
