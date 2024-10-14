import React from 'react';
import Calendar from '@/components/calendar';
import '../styles/style.css'

const CalendarPage = ({ events }) => {
    return (
        <>
            <h2>Your Todos</h2>
            <Calendar events={events} />
        </>
    );
};

export default CalendarPage;