import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { es } from 'date-fns/locale'
import moment from 'moment'

const locales = {
  'es-MX': es
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const messages = {
  allDay: 'Todo el día',
  previous: 'Anterior',
  next: 'Siguiente',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Mes',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento'
}

export const BigCalendar = ({ myEvents, onSelectEvent }) => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEvents}
        culture='es-MX'
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
        messages={messages}
        onSelectEvent={onSelectEvent}
      />
    </div>
  )
}
