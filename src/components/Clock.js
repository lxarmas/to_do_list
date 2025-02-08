import React, { useEffect, useState, useCallback } from "react";

const Clock = () => {
  const [date, setDate] = useState( new Date() );
  const [timerInput, setTimerInput] = useState( { hours: 0, minutes: 0, seconds: 0 } );
  const [timer, setTimer] = useState( null );
  const [isTimerActive, setIsTimerActive] = useState( false );
  const [isPaused, setIsPaused] = useState( false );
  const [alarm, setAlarm] = useState( null ); // New state for the alarm audio

  // Play alarm sound
  const playAlarmSound = useCallback( () => {
    if ( alarm ) return; // Prevent multiple alarms
    const newAlarm = new Audio( `${process.env.PUBLIC_URL}/sounds/ducksound.mp3` );
    newAlarm.loop = true; // Enable looping
    newAlarm.play().catch( ( error ) => {
      console.error( "Error playing sound:", error );
    } );
    setAlarm( newAlarm );
  }, [alarm] ); // Add alarm as a dependency to avoid closure issues

  // Update current time every second
  useEffect( () => {
    const intervalId = setInterval( () => {
      setDate( new Date() );
    }, 1000 );
    return () => clearInterval( intervalId );
  }, [] );

  // Timer countdown
  useEffect( () => {
    let countdown;
    if ( isTimerActive && timer !== null && !isPaused ) {
      if ( timer > 0 ) {
        countdown = setInterval( () => setTimer( ( prev ) => prev - 1 ), 1000 );
      } else {
        // Play sound when timer reaches zero
        playAlarmSound();
        setIsTimerActive( false );
      }
    }

    // Cleanup the interval on component unmount or when timer is paused/stopped
    return () => clearInterval( countdown );
  }, [isTimerActive, timer, isPaused, playAlarmSound] ); // Include playAlarmSound here

  // Stop the alarm sound
  const stopAlarmSound = () => {
    if ( alarm ) {
      alarm.pause(); // Stop the sound
      alarm.currentTime = 0; // Reset to the start
      setAlarm( null ); // Clear the alarm state
    }
  };

  // Convert timer input to seconds and start countdown
  const startTimer = () => {
    const totalSeconds =
      timerInput.hours * 3600 + timerInput.minutes * 60 + timerInput.seconds;
    setTimer( totalSeconds );
    setIsTimerActive( true );
    setIsPaused( false ); // Ensure the timer starts in an unpaused state
  };

  // Pause or resume timer
  const togglePause = () => {
    setIsPaused( ( prev ) => !prev );
  };

  // Reset timer to stop it completely
  const resetTimer = () => {
    stopAlarmSound(); // Stop any alarm sound
    setIsTimerActive( false );
    setIsPaused( false );
    setTimer( null );
  };

  // Clock display calculations
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours() % 12; // Convert to 12-hour format
  const secondDeg = ( seconds / 60 ) * 360;
  const minuteDeg = ( minutes / 60 ) * 360 + ( seconds / 60 ) * 6; // Extra for seconds
  const hourDeg = ( hours / 12 ) * 360 + ( minutes / 60 ) * 30; // Extra for minutes

  return (
    <div>
      <div className="clock">
        <div className="hand hour" style={{ transform: `rotate(${hourDeg}deg)` }} />
        <div className="hand minute" style={{ transform: `rotate(${minuteDeg}deg)` }} />
        <div className="hand second" style={{ transform: `rotate(${secondDeg}deg)` }} />
        <div className="center-circle" />
        {Array.from( { length: 12 }, ( _, i ) => (
          <div
            key={i}
            className="clock-number"
            style={{ transform: `rotate(${i * 30}deg) translateY(-120px)` }}
          >
            {i === 0 ? 12 : i}
          </div>
        ) )}
      </div>

      {/* Timer Input */}
      <div className="timer-controls">
        <input
          type="number"
          min="0"
          placeholder="Hours"
          onChange={( e ) => setTimerInput( { ...timerInput, hours: Number( e.target.value ) } )}
        />
        <input
          type="number"
          min="0"
          placeholder="Minutes"
          onChange={( e ) => setTimerInput( { ...timerInput, minutes: Number( e.target.value ) } )}
        />
        <input
          type="number"
          min="0"
          placeholder="Seconds"
          onChange={( e ) => setTimerInput( { ...timerInput, seconds: Number( e.target.value ) } )}
        />
        <button onClick={startTimer}>Start Timer</button>
        <button onClick={togglePause}>
          {isPaused ? "Resume Timer" : "Pause Timer"}
        </button>
        <button onClick={resetTimer}>Reset Timer</button>

      </div>

      {/* Display countdown */}
      {isTimerActive && (
        <div className="countdown">
          <p>Time remaining: {Math.floor( timer / 3600 )}h : {Math.floor( ( timer % 3600 ) / 60 )}m : {timer % 60}s</p>
        </div>
      )}
    </div>
  );
};

export default Clock;
