import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from "./MuiCalendar.module.scss";

const MuiCalendar = () => {
  return (
    <div className={styles.muiCalendarWrapper}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar />
      </LocalizationProvider>
    </div>
  );
};

export default MuiCalendar;
