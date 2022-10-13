import { DateTime } from "luxon";
import { FC, useEffect, useRef, useState } from "react";
import { NumberHelper } from "../../utils/helpers/number";

interface TimerProps {
  targetTime: DateTime;
}

export const Timer: FC<TimerProps> = ({ targetTime }) => {
  const [secondsLeft, setSecondsLeft] = useState(
    Math.floor(targetTime.diffNow("seconds").seconds)
  );
  const timerIntervalRef = useRef<NodeJS.Timer>();

  const hoursFormatted = NumberHelper.toLeadingZerosString(
    Math.floor(secondsLeft / 60 / 60) % 24,
    2
  );
  const minutesFormatted = NumberHelper.toLeadingZerosString(
    Math.floor(secondsLeft / 60) % 60,
    2
  );
  const secondsFormatted = NumberHelper.toLeadingZerosString(
    secondsLeft % 60,
    2
  );

  useEffect(() => {
    if (secondsLeft > 0)
      timerIntervalRef.current = setInterval(
        () => setSecondsLeft((prev) => prev - 1),
        1000
      );

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0 && timerIntervalRef.current)
      clearInterval(timerIntervalRef.current);
  }, [secondsLeft]);

  return (
    <>
      <span>{hoursFormatted}h </span>
      <span>{minutesFormatted}m </span>
      <span>{secondsFormatted}s</span>
    </>
  );
};
