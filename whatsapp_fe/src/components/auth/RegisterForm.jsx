import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Picture from './Picture'
//import loading icon
import { PulseLoader } from 'react-spinners'



import { signUpSchema } from '../../utils/validation'
import Authinput from './Authinput';
import { changeStatus, registerUser } from '../../features/userSlice';
import axios from 'axios';


const cloud_secret = process.env.REACT_APP_CLOUD_SECRET
const cloud_name = process.env.REACT_APP_CLOUD_NAME
const RegisterForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { status, error } = useSelector((state) => state.user)
    const [picture, setPicture] = useState()
    const [readablePicture, setRedablePicture] = useState()
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema)
    });
    const onSubmit = async (data) => {
        dispatch(changeStatus("loading"))
        let res;
        if (picture) {
            // upload to cloudinaru and then register the user
            await uploadImage().then(async (img) => {
                res = await dispatch(registerUser({ ...data, picture: img.secure_url }))
            })


        } else {

            res = await dispatch(registerUser({ ...data, picture: "" }))

        }
        // console.log(res.payload);
        if (res?.payload?.user) { navigate("/") }
    };
    // console.log("values", watch());
    // console.log("errors", errors);

    // console.log(picture, readablePicture);

    const uploadImage = async () => {
        let formData = new FormData()
        formData.append('upload_preset', cloud_secret)
        formData.append('file', picture)
        const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
        // console.log(data);
        return data

    }

    return (
        <div className='h-screen w-full flex items-center justify-center overflow-hidden'>
            {/* container */}
            <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
                {/* Heading */}
                <div className="text-center dark:text-white">
                    <h2 className='mt-6 text-3xl font-bold'>Welcome</h2>
                    <p className="mt-2 text-sm">Sign Up</p>
                </div>
                {/* form */}
                <form onSubmit={handleSubmit(onSubmit)}
                    className='mt-6 space-y-6'
                >
                    <Authinput
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        register={register}
                        error={errors?.name?.message}
                    />
                    <Authinput
                        name="email"
                        type="text"
                        placeholder="Email address"
                        register={register}
                        error={errors?.email?.message}
                    />
                    <Authinput
                        name="status"
                        type="text"
                        placeholder="Status (Optional)"
                        register={register}
                        error={errors?.status?.message}
                    />
                    <Authinput
                        name="password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        error={errors?.password?.message}
                    />
                    {/* for the picture */}
                    <Picture
                        readablePicture={readablePicture}
                        setReadablePicture={setRedablePicture}
                        setPicture={setPicture}
                    />
                    {/* if we have error */}
                    {
                        error ? <div>
                            <p className='text-red-400'>`${error}`</p>
                        </div> : null
                    }
                    {/* submit button */}
                    <button
                        className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300
          "
                        type='submit'>
                        {status == "loading" ? <PulseLoader color="#36d7b7" /> : "Sign Up"}
                    </button>
                    {/* Sign In Link */}
                    <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
                        <span>have an account ?</span>
                        <Link
                            to="/login"
                            className=" hover:underline cursor-pointer transition ease-in duration-300"
                        >
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm