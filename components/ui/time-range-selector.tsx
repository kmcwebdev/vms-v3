const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      options.push(time);
    }
  }
  return options;
};

const timeOptions = generateTimeOptions();

const TimeRangeSelector = ({ onChange, value }: {onChange:any, value:any}) => (
  <div className="flex gap-2">
    <select
      className="block w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-500"
      value={value.start}
      onChange={(e) => onChange({ ...value, start: e.target.value })}
    >
      {timeOptions.map((time, index) => (
        <option key={index} value={time}>
          {time}
        </option>
      ))}
    </select>
    <span className="flex items-center">to</span>
    <select
      className=" block max-h-60 w-1/2 overflow-y-auto rounded-md border border-gray-300 p-2 text-sm text-gray-500"
      value={value.end}
      onChange={(e) => onChange({ ...value, end: e.target.value })}
    >
      {timeOptions.map((time, index) => (
        <option key={index} value={time}>
          {time}
        </option>
      ))}
    </select>
  </div>
);

export { TimeRangeSelector };


