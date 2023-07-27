import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../store/counter';

function Counter() {
  const counter = useSelector((state: any) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      Counter: {counter}
      <button onClick={() => dispatch(increment())}>Increase</button>
      <button onClick={() => dispatch(decrement())}>Decrease</button>
    </div>
  );
}

export default Counter;