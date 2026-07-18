import { useState } from "react"
import Input from "../../components/Input"
import AuthLayout from "../../layouts/AuthLayout"
import Button from "../../components/Button";

const SignUp = () => {
    const [formData, setformData] = useState({
        name:'',
        email:'',
        password:''
    });
    const [error, seterror] = useState('');


    const changeHandler = (e) => {
        setformData({
            ...formData,
            [e.target.name] : e.target.value
        })
        if(error) seterror('');
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(!formData.name || !formData.email || !formData.password){
        seterror('All fields are required!');
        return;
        }
        if(formData.password.length<8){
            seterror('Password must be 8 characters!');
            return;
        }
        console.log(formData);
        seterror('');
        return
    }
    return (
        <AuthLayout
        message='Get Started'
        title='Create your account'
        subtitle='Start shortening links in seconds — no card required.' 
        >
            <form className="mt-6" onSubmit={submitHandler}>
                <Input 
                htmlFor='name'
                id='name'
                type='text'
                placeholder='Enter Name'
                value={formData.name}
                onChange={changeHandler}
                name='name'
                label='Full Name'
                />
                <Input 
                htmlFor='email'
                id='email'
                type='text'
                placeholder='mirza@gmail.com'
                value={formData.email}
                onChange={changeHandler}
                name='email'
                label='Email Address'
                />
                <Input 
                htmlFor='password'
                id='password'
                type='password'
                placeholder='Create a password'
                value={formData.password}
                onChange={changeHandler}
                name='password'
                label='Password'
                />

                {error && <p className="mt-6 text-red-400">
                    {error}
                </p>}

                <Button value='Create account' />
            </form>

        </AuthLayout>
    )
}

export default SignUp
