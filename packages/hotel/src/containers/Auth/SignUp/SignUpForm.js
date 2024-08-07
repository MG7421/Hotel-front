import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { MdLockOpen } from 'react-icons/md';
import { Input, Switch, Button } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import { AuthContext } from 'context/AuthProvider';
import { FieldWrapper, SwitchWrapper, Label } from '../Auth.style';
import axios from 'axios';

const SignUpForm = () => {
  const { signUp, loggedIn } = useContext(AuthContext);
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  });
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  // const onSubmit = (data) => {
  //   signUp(data);
  // };
  // if (loggedIn) {
  //   return <Navigate to="/" replace={true} />;
  // }
  const onSubmit = async (data) => {
    // if (data.password !== data.confirmPassword) {
    //   console.error('Les mots de passe ne correspondent pas');
    //   return;
    // }
    // try {
    //   const userData = {
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //     phone: data.phone,
    //     email: data.email,
    //     password: data.password,
    //     city: data.city,
    //     district: data.district,
    //     roleId: "",
    //     login: data.firstName + ' ' + data.lastName
    //   };

    const requestBody = {
      user: "1",
      datas: [
        {
          roleId: 1,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          password: data.password,         
          city: data.city,
          district: data.district,
          login: data.lastName,
        }
      ]
    };
    
    try {
      const response = await axios.post(
        'https://groupe-residence-production-residences-managements.k8s.dev02.ovh.smile.ci/residence/users/create',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        label="First Name"
        htmlFor="firstName"
        error={
          errors.username && (
            <>
              {errors.username?.type === 'required' && (
                <span>This field is required!</span>
              )}
            </>
          )
        }
      >
        <Controller
          name="firstName"
          defaultValue=""
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
      </FormControl>

      <FormControl
      label="Last Name"
      htmlFor="lastName"
      error={
        errors.lastName && (
          <>
            {errors.lastName?.type === 'required' && (
              <span>This field is required!</span>
            )}
          </>
        )
      }
    >
    <Controller
      name="lastName"
      defaultValue=""
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input onChange={onChange} onBlur={onBlur} value={value} />
      )}
    />
  </FormControl>

  <FormControl
  label="Phone"
  htmlFor="phone"
  error={
    errors.phone && (
      <>
        {errors.phone?.type === 'required' && (
          <span>This field is required!</span>
        )}
      </>
    )
  }
>
  <Controller
    name="phone"
    defaultValue=""
    control={control}
    rules={{ required: true }}
    render={({ field: { onChange, onBlur, value } }) => (
      <Input onChange={onChange} onBlur={onBlur} value={value} />
    )}
  />
</FormControl>

<FormControl
  label="City"
  htmlFor="city"
  error={
    errors.city && (
      <>
        {errors.city?.type === 'required' && (
          <span>This field is required!</span>
        )}
      </>
    )
  }
>
  <Controller
    name="city"
    defaultValue=""
    control={control}
    rules={{ required: true }}
    render={({ field: { onChange, onBlur, value } }) => (
      <Input onChange={onChange} onBlur={onBlur} value={value} />
    )}
  />
</FormControl>

<FormControl
  label="District"
  htmlFor="district"
  error={
    errors.district && (
      <>
        {errors.district?.type === 'required' && (
          <span>This field is required!</span>
        )}
      </>
    )
  }
>
  <Controller
    name="district"
    defaultValue=""
    control={control}
    rules={{ required: true }}
    render={({ field: { onChange, onBlur, value } }) => (
      <Input onChange={onChange} onBlur={onBlur} value={value} />
    )}
  />
</FormControl>


      <FormControl
        label="Email"
        htmlFor="email"
        error={
          errors.email && (
            <>
              {errors.email?.type === 'required' && (
                <span>This field is required!</span>
              )}
              {errors.email?.type === 'pattern' && (
                <span>Please enter a valid email address!</span>
              )}
            </>
          )
        }
      >
        <Controller
          name="email"
          defaultValue=""
          control={control}
          rules={{
            required: true,
            pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              type="email"
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
      <FormControl
        label="Confirm password"
        htmlFor="confirmPassword"
        error={
          confirmPassword &&
          password !== confirmPassword && (
            <span>Your password is not same!</span>
          )
        }
      >
        <Controller
          name="confirmPassword"
          defaultValue=""
          control={control}
          rules={{ required: true }}
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
        <SwitchWrapper>
          <Controller
            control={control}
            name="termsAndConditions"
            valueName="checked"
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <Switch onChange={onChange} checked={value} />
            )}
          />
          <Label>I agree with terms and conditions</Label>
        </SwitchWrapper>
      </FieldWrapper>
      <Button
        className="signin-btn"
        type="primary"
        htmlType="submit"
        size="large"
        style={{ width: '100%' }}
      >
        <MdLockOpen />
        Register
      </Button>
    </form>
  );
};



export default SignUpForm;
