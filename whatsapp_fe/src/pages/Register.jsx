import React from 'react'
import RegisterForm from '../components/auth/RegisterForm'

const Register = () => {
    return (
        <div className='min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19] overflow-hidden'>

            <div className="flex w-[1600px] mx-auto h-full" >
                {/*Register */}
                <RegisterForm />
            </div>

        </div>
    )
}

export default Register