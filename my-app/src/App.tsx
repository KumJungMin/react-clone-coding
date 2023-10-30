import { useRecoilState, useRecoilValue } from "recoil";
import { minuteState, hourSelector } from "./atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const hours = useRecoilValue(hourSelector);

  function onMinuteChange(e: React.FormEvent<HTMLInputElement>) {
    const value = +e.currentTarget.value;
    setMinutes(value);
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
      />
    </div>
  );
}

export default App;
