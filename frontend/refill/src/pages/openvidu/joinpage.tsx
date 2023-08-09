import * as React from 'react';
import Button from 'components/elements/Button'
import axios from 'axios';

export interface IJoinPageProps {

}

export function JoinPage (props: IJoinPageProps) {

  // const joinSession = () => {
  //   axios
  //   .get()
  // }
  
  // axios 요청으로 token 받기 


  return (
    <div>
      <Button content='joinSession' />
    </div>
  );
}
