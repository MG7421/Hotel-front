import React, { useContext } from 'react';
import { Link, Navigate , useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { MdLockOpen } from 'react-icons/md';
import { Input, Switch, Button } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import { AuthContext } from 'context/AuthProvider';
import { FORGET_PASSWORD_PAGE } from 'settings/constant';
import { FieldWrapper, SwitchWrapper, Label } from '../Auth.style';
import axios from 'axios';




export default function SignInForm() {
 

  const { signIn, loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data,history) => { 
    // signIn(data);
    try {
      const response = await axios.post('https://groupe-residence-production-residences-managements.k8s.dev02.ovh.smile.ci/residence/users/login', {
        user: "1",
        datas: [
          {
            login: data.login,
            password: data.password
          }
        ]
      });
  
      if (response.data && response.data.success) {
        signIn(response.data.token);
        navigate('/lien/bon');
      } else {
        console.error('Erreur de connexion:', response.data.message);
        navigate('/lien/mauvais');
      }
  
    } catch (error) {
      
      console.error('Une erreur s\'est produite lors de la tentative de connexion : ', error);
    }
    
  };
  if (loggedIn) {
    return <Navigate to="/lien/bon" replace={true} />;
  }

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>

    <FormControl
        label="Login"
        htmlFor="login"
        error={
          errors.login && (
            <>
              {errors.login?.type === 'required' && (
                <span>This field is required!</span>
              )}
              
            </>
          )
        }
      >
        <Controller
          name="login"
          defaultValue=""
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              type="login"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </FormControl>
      <FormControl
        label="Password"
        htmlFor="password"
        error={
          errors.password && (
            <>
              {errors.password?.type === 'required' && (
                <span>This field is required!</span>
              )}
              {errors.password?.type === 'minLength' && (
                <span>Password must be at lest 6 characters!</span>
              )}
              {errors.password?.type === 'maxLength' && (
                <span>Password must not be longer than 20 characters!</span>
              )}
            </>
          )
        }
      >
        <Controller
          name="password"
          defaultValue=""
          control={control}
          rules={{ required: true, minLength: 6, maxLength: 20 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input.Password onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
      </FormControl>
      <FieldWrapper>
        <SwitchWrapper>
          <Controller
            control={control}
            name="rememberMe"
            valueName="checked"
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <Switch onChange={onChange} checked={value} />
            )}
          />
          <Label>Remember Me</Label>
        </SwitchWrapper>
        <Link to={FORGET_PASSWORD_PAGE}>Forget Password ?</Link>
      </FieldWrapper>
      <Button
        className="signin-btn"
        type="primary"
        htmlType="submit"
        size="large"
        style={{ width: '100%' }}
      >
        <MdLockOpen />
        Login
      </Button>
    </form>
  );
}
