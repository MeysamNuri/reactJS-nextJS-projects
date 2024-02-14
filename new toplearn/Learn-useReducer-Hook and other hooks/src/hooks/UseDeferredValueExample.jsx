import { useState, useMemo, useEffect } from "react";

const List = ({ value }) => {
  const list = useMemo(() => {
    const numbersList = [];
    let count = 0;

    while (count <= 20000) {
      numbersList.push(
        <div key={count}>{`عدد برابر است با : ${value} 🏎 `}</div>
      );
      count++;
    }
    return numbersList;
  }, [value]);

  useEffect(() => {
    console.log(`Value : ${value}`);
  }, [value]);

  return list;
};

const UseDeferredValueExample = () => {
  const [value, setValue] = useState(0);

  return (
    <div className="mx-auto mt-5 d-grid gap-3 w-50">
      <h5 className="alert alert-warning text-center">
        آشنایی با هوک useDeferredValue
      </h5>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value !== 0 ? <List value={value} /> : null}
    </div>
  );
};

export default UseDeferredValueExample;
