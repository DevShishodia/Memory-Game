import Card from "./Card";
import { useEffect, useState } from "react";
import random from "../HelperFunc";
import { pairs_emojis, initial } from "../Constants";
import Confetti from 'react-confetti';

const Grid = () => {

  const [flipped, setFlipped] = useState(initial)
  const [data, setData] = useState([]);
  const [matched, setMatched] = useState(initial);
  const [timerId, setTimerId] = useState(0);
  const [score, setScore] = useState(0);
  const [win, setWinning] = useState(false);

  useEffect(() => {
    const randomArr = random(pairs_emojis);
    console.log(randomArr);
    setData(randomArr);
  }, []);

  const toggleFlipped = (index) => {
    let flipped_copy = [...flipped];

    const counter = flipped_copy.reduce((count, current) => {
      if (current === true) {
        count++;
      }
      return count;
    }, 0);

    if (counter >= 2) {
      clearTimeout(timerId);
      setTimerId(0)
      flipped_copy = [...initial];
    }

    if (!flipped_copy[index]) {
      flipped_copy[index] = true;
    }

    const counter_two = flipped_copy.reduce((count, current) => {
      if (current === true) {
        count++;
      }
      return count;
    }, 0);


    if (counter_two === 2) {

      const selected_idx = [];

      flipped_copy.forEach((elem, idx) => {
        if (elem === true) {
          selected_idx.push(idx);
        }
      });

      if (data[selected_idx[0]] === data[selected_idx[1]]) {
        const matched_copy = [...matched];
        matched_copy[selected_idx[0]] = true;
        matched_copy[selected_idx[1]] = true;

        setMatched(matched_copy);

        const allMatched = matched_copy.every(single => single === true)
        if (allMatched) {
          setWinning(true);
        }
      } else {
        const timer_id = setTimeout(() => {
          setFlipped(initial)
        }, 1000);
        setTimerId(timer_id);
      }
      setScore(score + 1);
    }
    setFlipped(flipped_copy);

  }

  return (
    <>
      <div className="card-container">
        {win ? <Confetti /> : false}
        {flipped.map((single_card, idx) => {
          const emoji = data[idx];
          const matchedState = matched[idx];
          return (
            <Card
              key={idx}
              isFlipped={single_card}
              flip={toggleFlipped}
              index={idx}
              emoji={emoji}
              matchedState={matchedState}
            />
          )
        })}
      </div>
      <h1>Moves : {score}</h1>
      {win ? <h2>Congratulations</h2> : false}
    </>
  );
}

export default Grid;