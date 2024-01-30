import { useRef, useState } from "react";

import { ResultModal } from "./ResultModal";

export const TimerChallenge = ({title, targetTime}) => {
  
  	const [remainingTime, setRemainingTime] = useState(targetTime * 1000); 
   	const timer = useRef();
	const dialog = useRef();
	
	const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;

	if (remainingTime <= 0) {
		clearInterval(timer.current);
		dialog.current.open();
	}
	
	function handleReset() {
		setRemainingTime(targetTime * 1000);
	}
	
  	function handleStart() {
      timer.current = setInterval(() => {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 10);
      }, 10);
  	}

	function handleStop() {
		clearInterval(timer.current);
		dialog.current.open();
	}

    return (
      <>
        <ResultModal
          ref={dialog}
          targetTime={targetTime}
          remainingTime={remainingTime}
          onReset={handleReset}
        ></ResultModal>
        <section className="challenge">
          <h2>{title}</h2>
          <p className="challenge-time">
            {targetTime} second{targetTime > 1 ? "s" : ""}
          </p>
          <p>
            <button onClick={timerIsActive ? handleStop : handleStart}>
              {timerIsActive ? "Stop" : "Start"} Challenge
            </button>
          </p>
          <p className={timerIsActive ? "active" : undefined}>
            {timerIsActive ? "Time is running..." : "Timer inactive"}
          </p>
        </section>
      </>
    );
}
