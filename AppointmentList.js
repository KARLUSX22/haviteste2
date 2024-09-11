// src/components/AppointmentList.js
import React from 'react';

const AppointmentList = ({ appointments, onRemoveAppointment }) => {
  return (
    <div>
      <h2>Agendamentos</h2>
      <ul>
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <li key={index}>
              {appointment.name} - {appointment.date} às {appointment.time}
              <button onClick={() => onRemoveAppointment(index)}>Remover</button>
            </li>
          ))
        ) : (
          <li>Nenhum agendamento encontrado.</li>
        )}
      </ul>
    </div>
  );
};

export default AppointmentList;
