import { SignIn } from '@clerk/nextjs'
import React from 'react'

const CustomSignInModal = () => {
    return (
        <div>
            <SignIn
                appearance={{
                    elements: {
                        formButtonPrimary: 'bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg text-lg font-semibold transition-all duration-300',
                        formInput: 'bg-gray-800 text-white border border-gray-700 py-2 px-4 rounded-md',
                        formHeaderTitle: 'text-2xl text-center text-white font-semibold',
                        formFooter: 'text-white',
                    },
                }}
            />
        </div>
    )
}

export default CustomSignInModal;

