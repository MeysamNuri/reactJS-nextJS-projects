import React, { FC, useState, useEffect } from "react";
import { Input } from "antd";

interface IPScoreInput {
  interview: any;
  updateScore: (id: number, value: string, findScore: any) => void;
}

const ScoreInput: FC<IPScoreInput> = ({ interview, updateScore }) => {
  let InterviewId = interview.Id;
  let IndexQ = interview.Id;
  
  const [value, setValue] = useState<any>();
  const [error, setError] = useState("");
  const [findScore, setFindScore] = useState({} as any);

  useEffect(() => {
    if (!value) return;
    updateScore(InterviewId, value, findScore);
  }, [value, interview, findScore]);


  
  return (
    <div>
      <Input
        value={value}
        type="text"
        bordered={false}
        maxLength={4}
        onChange={(e) => {
          if (Number(e.target.value) <= 100) {
            setValue(e.target.value);
          } else {
            setError("نباید بیشتر از 100 باشد");
          }
        }}
        name={`${InterviewId.toString()}${IndexQ.toString()}`}
        title="باید بین 0 تا 100 باشد"
      />

      {/* {value > 100 && <h2 className="errorType">{error}</h2>} */}
    </div>
  );
};

export default ScoreInput;
