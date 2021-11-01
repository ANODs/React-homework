import logo from './logo.svg';
import './App.css';
import Calendar from './components/CalendarClass';

let date = new Date();

export default function App() {
  return (
      <Calendar date={ date } />
  );
}

