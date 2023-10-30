import { useRecoilState, useRecoilValue } from "recoil";
import { minuteState, hourSelector } from "./atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);

  function onMinuteChange(e: React.FormEvent<HTMLInputElement>) {
    const value = +e.currentTarget.value;
    setMinutes(value);
  }
  function onHourChange(e: React.FormEvent<HTMLInputElement>) {
    const value = +e.currentTarget.value;
    setHours(value);
  }

  return (
    <div>
      <input
        type="number"
        value={minutes}
        placeholder="Minute"
        onChange={onMinuteChange}
      />
      <input
        type="number"
        value={hours}
        placeholder="hours"
        onChange={onHourChange}
      />
    </div>
  );
}

export default App;
