import React, { ChangeEvent, useState } from "react";
import axios from "axios";

const MeberJoin: React.FC = () => {

  const [inputData, setInputData] = useState({
    loginId : '',
    loginPassword : '',
    nickname : '',
    name : '',
    address : '',
    tel : '',
    birthDay: '',
    email : '',
  })

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const nextInput = {
        ...inputData,
        [e.target.name] : e.target.value,
    }
    setInputData(nextInput)
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const memberJoinRequest = {
      loginId : inputData.loginId,
      loginPassword : inputData.loginPassword,
      nickname : inputData.nickname,
      name : inputData.name,
      address : inputData.address,
      tel : inputData.tel,
      birthDay : inputData.birthDay,
      email : inputData.email,
    };

    const json = JSON.stringify(memberJoinRequest);
    const jsonBlob = new Blob([json], { type: "application/json" });

    const formData = new FormData();
    formData.append("memberJoinRequest", jsonBlob);

    // this.imageFiles.forEach((image) => {
    //     formData.append("imageList", image, image.name);
    // });
    
    axios
      .post("api/v1/account/member/join", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
      .then(response => {
        console.log(response.data)
      }).catch(err => {
        console.log(memberJoinRequest)
        console.log(err.response.data)
      })
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          loginId:
          <input type="text" name="loginId" 
          onChange={ e => {
            changeInput(e)

          }} 
          value = {inputData.loginId}
          />
        </label>
      </div>
      <br />
      <div>
        <label>
            loginPassword:
            <input type="text" name="loginPassword" 
            onChange={ e => {
                changeInput(e)

            }} 
            value = {inputData.loginPassword}
            />
        </label>
      </div>
      <br />
      <div>
        <label>
            nickname:
            <input type="text" name="nickname" 
            onChange={ e => {
                changeInput(e)

            }} 
            value = {inputData.nickname}
            />
        </label>
      </div>
      <br />
      <div>
        <label>
            name:
            <input type="text" name="name" 
            onChange={ e => {
                changeInput(e)

            }} 
            value = {inputData.name}
            />
        </label>
      </div>
      <br />
      <div>
        <label>
            address:
            <input type="text" name="address" 
            onChange={ e => {
                changeInput(e)

            }} 
            value = {inputData.address}
            />
        </label>
      </div>
      <br />
      <div>
        <label>
            tel:
            <input type="text" name="tel" 
            onChange={ e => {
                changeInput(e)

            }} 
            value = {inputData.tel}
            />
        </label>
      </div>
      <br />
      <div>
        <label>
            birthDay:
            <input type="text" name="birthDay" 
            onChange={ e => {
                changeInput(e)

            }} 
            value = {inputData.birthDay}
            />
        </label>
      </div>
      <br />
      <div>
        <label>
            email:
            <input type="text" name="email" 
            onChange={ e => {
                changeInput(e)

            }} 
            value = {inputData.email}
            />
        </label>
      </div>
      <br />
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default MeberJoin;