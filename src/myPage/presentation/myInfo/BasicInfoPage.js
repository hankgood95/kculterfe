import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { checkNick } from '../../container/NickCheck';
import countryList from 'react-select-country-list';
import Select from 'react-select';
import { EditMemberInfo } from '../../container/EditMemberInfo';
import { getMemberInfo } from '../../container/GetMemberInfo';
import ColorButton from '../common/ColorButton';
import InfoContainer from '../common/InfoContainer';

export default function EditBasicInfo() {
  const [nickName, setNickName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [countryLabel, setCountryLabel] = useState('');
  const [countryDefault, setCountryDefault] = useState('');
  const [gender,setGender] = useState('');
  const [pfImg, setPfImg] = useState('');
  const [pfImgPr, setPfImgPr] = useState('');

  const [memberInfo, setMemberInfo] = useState([]);

  const [nickNameMessage, setnickNameMessage] = useState('');

  const [isNickName, setIsNickName] = useState(false);

  const [checkAbled, setCheckAbled] = useState(false);

  const [NickNameBtDis, setNicNameBtDis] = useState(true);
  const [checkDefaultGender, setCheckDefaultGender] = useState(false);

  useEffect(() => {
    getMemberInfo()
    .then(resData => {
      setMemberInfo(resData)
      setPfImgPr(resData.pfUrl);

      if (resData.gender === "female") {
        setCheckDefaultGender(false);
      }
      else {
        setCheckDefaultGender(true);
      }

      const code = resData.countryCode;
      setCountryDefault(countryList().getLabel(code));
    })
    .catch(err => {
      console.log(err);
    })
  },[]);

  const onChangeProfilImg = (e) => {
    e.preventDefault();
    const imgUrl = e.target.files[0];
    const imgUrlPr = e.target.files[0];
    var reader = new FileReader();

    if (imgUrl == null) {
      setCheckAbled(false);
      setPfImg("");
      alert("Upload image");
      return 0;
    }
    reader.readAsDataURL(imgUrlPr);
    reader.onloadend = function(e) {
      setCheckAbled(true);
      setPfImg(imgUrl);
      window.sessionStorage.setItem("pfUrl" ,imgUrl);
      setPfImgPr(e.target.result);
    }
  }

  const onChangeNickName = (e) => {
    let regExp = /[^a-zA-Z]/g
    const nickNameRegex = e.target.value;

    if(nickNameRegex === ""){
      setnickNameMessage("");
      setNicNameBtDis(true);
      setIsNickName(false);
    }
    else if (regExp.test(nickNameRegex)){
      setnickNameMessage("no only char plz");
      setNicNameBtDis(true);
      setIsNickName(false);
    }
    else
    {
      setNickName(nickNameRegex);
      setnickNameMessage("OK :)")
      setIsNickName(true);
      setNicNameBtDis(false);
    }
  }

  const nicknamedupli = async () => {
    const result = await checkNick(nickName);
    if(result > 0){
      alert("This nick name is not available.");
      setCheckAbled(false);
    }else{
      alert("This nick name is available.");
      setCheckAbled(true);
    }
  }

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = value => {
    setCountryLabel(value.label);
    setCountryCode(value.value);
    setCheckAbled(true);
  }

  const editMember = async () => {
    var gender_ = gender;
    var countryCode_ = countryCode;
    var nickName_ = nickName;

    if (nickName === ''){ nickName_ = memberInfo.nickName; }
    if (gender === '') { gender_ = memberInfo.gender; }
    if (countryCode === '') { countryCode_ = memberInfo.countryCode; }

    const memberNumHash = window.sessionStorage.getItem("memberHash")

    const formData = {
      memberNumHash: memberNumHash,
      nickName : nickName_,
      countryCode : countryCode_,
      gender : gender_,
    }

    const fmd = new FormData();
    const jsonForm = JSON.stringify(formData);
    const blobForm = new Blob([jsonForm],{
        type : 'application/json'
    })

    fmd.append('formValue', blobForm);
    fmd.append('file', pfImg);

    const result = await EditMemberInfo(fmd);
    if(result === 200){
      alert("Success on edit");
      window.location.reload();
      return 0;
    }
    else{
      alert("Edit failed");
    }
  }

  return (
    <InfoContainer color={blue} id="my-info">
      <Form>
        <Form.Group className='mb-4'>
          <InfoText>Photo</InfoText>
          <div className='text-center'>
            <PfImg src={pfImgPr}></PfImg>
          </div>
          <Form.Control accept="image/jpg, image/png, image/jpeg" onChange={onChangeProfilImg} type="file" />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicEmail">
          <InfoText>Nick-Name</InfoText>
          <Form.Control type="text" placeholder="Enter Your NickName" onChange={onChangeNickName} defaultValue={memberInfo.nickName} />
          <span className={`message ${isNickName ? 'success' : 'error'}`}>{nickNameMessage}</span>
          <div className='text-center'>
            <CheckButton type="button" check={NickNameBtDis} disabled={NickNameBtDis} onClick={nicknamedupli}>Check</CheckButton>
          </div>
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">
          <InfoText>Contury</InfoText>
          <Select 
            options={options} 
            value={{ label: countryLabel || countryDefault }}
            onChange={changeHandler} >
          </Select>
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">
          <InfoText>Gender</InfoText>
          <SelectGender className="select-gender">
            <input type='radio' id = "select" name='gender' value='female' checked={checkDefaultGender ? false : true} onClick={(e) => { 
              setGender(e.target.value); setCheckAbled(true); setCheckDefaultGender(false)}} /> {/* checked 초기값 줄 때 추후 리팩토링의 여지가 있다. */}
            <label for ="select">여성</label>
            <input type='radio' id = "select2" name='gender' value='male' checked={checkDefaultGender ? true : false} onClick={(e) => { 
              setGender(e.target.value); setCheckAbled(true); setCheckDefaultGender(true)}}/>
            <label for="select2">남성</label>
          </SelectGender>
        </Form.Group>
      </Form>

      <div className='text-center'>
        <ColorButton color={pink} text='Edit' check={checkAbled} 
          disabled={checkAbled} 
          onClick={editMember}>
            Edit
        </ColorButton>
      </div>
    </InfoContainer>
  )
}

// CSS

const blue = '#1755d1';
const pink = '#f4029b';

const InfoText = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1px;
`

const PfImg = styled.img.attrs({ alt: 'profile' })`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  margin-bottom: 1rem;
`
const SelectGender = styled.div`
  text-align: center;
`

const CheckButton = styled.button`
  font-size: 10px;
  border: none;
  background-color: ${blue};
  font-weight: bold;
  margin-top: 10px;
  padding: 3px 5px;
  color: ${props => props.check ? 'gray' : 'white'};
`