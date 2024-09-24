import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Dayjs from 'dayjs';
import DiaryModal from './DiaryModal';
import 'react-calendar/dist/Calendar.css';

function CalendarDiary() {
  const [date, setDate] = useState(new Date());
  const [diaryEntries, setDiaryEntries] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDateChange = (selectedDate) => {
    setDate(selectedDate);
    setIsModalOpen(true);
  };

  const saveDiaryEntry = (entry) => {
    const dateKey = Dayjs(date).format('YYYY-MM-DD');
    setDiaryEntries({ ...diaryEntries, [dateKey]: entry });
    setIsModalOpen(false);
  };

  const tileContent = ({ date, view }) => {
    const dateKey = Dayjs(date).format('YYYY-MM-DD');
    if (diaryEntries[dateKey]) {
      return <div className="dot"></div>;
    }
  };

  return (
    <div>
      <Calendar
        onClickDay={onDateChange}
        value={date}
        tileContent={tileContent}
      />
      {isModalOpen && (
        <DiaryModal
          date={date}
          onClose={() => setIsModalOpen(false)}
          onSave={saveDiaryEntry}
          existingEntry={diaryEntries[Dayjs(date).format('YYYY-MM-DD')]}
        />
      )}
    </div>
  );
}

export default CalendarDiary;
