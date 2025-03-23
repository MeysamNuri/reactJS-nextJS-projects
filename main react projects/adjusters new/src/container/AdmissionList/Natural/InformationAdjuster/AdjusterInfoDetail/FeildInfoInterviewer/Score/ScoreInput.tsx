import React, { FC, useState, useEffect } from "react";
import { Input } from "antd";
import { useSelector } from "react-redux";
import { IFetchScore } from "../../../../../../../shared/ulitities/Model/score";

interface IPScoreInput {
  interview: any;
  updateScore: (id: number, value: string, findScore: IFetchScore) => void;
  submitScore: any;
  setSubmitScore: any;
}

const ScoreInput: FC<IPScoreInput> = ({
  interview,
  updateScore,
  submitScore,
  setSubmitScore,
}) => {
  let InterviewId = interview.Id;
  let IndexQ = interview.Id;
  const [value, setValue] = useState<any>();
  const [error, setError] = useState("");
  const [findScore, setFindScore] = useState({} as any);
  const {scoreList} = useSelector(
    (state: any) => state.fetchScore
  );

  
  useEffect(() => {
    if (!value) return;
    updateScore(InterviewId, value, findScore);
  }, [value, interview, findScore]);

  useEffect(() => {
    if (scoreList) {
      let findScore = scoreList?.Result?.find(
        (interviewerScore: IFetchScore) =>
          interviewerScore.InterviewerId === InterviewId
      );
      setFindScore(findScore);
      setSubmitScore(scoreList?.Result);
    }
  }, [scoreList]);

  const updateScoreList = (interviwerId: any, score: any) => {

    let preUpdate: any = submitScore?.filter(
      (item: any) => item.InterviewerId !== interviwerId
    );
    let currentItem: any = submitScore?.find(
      (item: any) => item.InterviewerId === interviwerId
    );
    currentItem.Score = score;
    setSubmitScore([...preUpdate,currentItem]);
  };

  return (
   
    <div>
      {(findScore && findScore?.Score) || findScore?.Score === "" ||findScore?.Score === 0 ||findScore?.Score===null  ? (
        <Input
          value={value}
          defaultValue={findScore?.Score}
          type="text"
          bordered={false}
          maxLength={4}
          onChange={(e) => {
            if (
              Number(e.target.value) <= 100 &&
              Number(e.target.value) !== undefined
            ) {
              setValue(e.target.value);
              updateScoreList(InterviewId, e.target.value);
            } else {
              setError("باید بین 0 تا 100 باشد");
            }
          }}
          //onChange={(e) => updateScoreList(InterviewId, e.target.value)}
          name={`${InterviewId.toString()}${IndexQ.toString()}`}
          title="باید بین 0 تا 100 باشد"
        />
      ) : null}

      {findScore?.Score > 100 ||
        (value === undefined && <h2 className="errorType">{error}</h2>)}
    </div>
  );
};

export default ScoreInput;
