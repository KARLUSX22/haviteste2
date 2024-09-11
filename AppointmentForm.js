// src/components/AppointmentForm.js
import React, { useState } from 'react';

const AppointmentForm = ({ onAddAppointment }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !date || !time) {
      alert('Todos os campos são obrigatórios!');
      return;
    }
    onAddAppointment({ name, date, time });
    setName('');
    setDate('');
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Data:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Hora:
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Agendar</button>
    </form>
  );
};

export default AppointmentForm;
