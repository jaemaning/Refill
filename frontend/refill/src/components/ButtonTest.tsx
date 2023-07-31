import * as React from 'react';
import Button from './elements/Button';


export default function ButtonTest () {

  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div>
      <Button content='성공' variant='success' width='200px' onClick={handleClick} customStyles={{ width: '100%' }} />
      <Button content='경고' variant='warning' size='small' onClick={handleClick} />
      <Button content='불가' variant='disable' size='medium' onClick={handleClick} />
      <Button content='위험' variant='danger' size='large' onClick={handleClick} />
      <Button content='일반' variant='normal' size='large' onClick={handleClick} />
    </div>
  );
}
