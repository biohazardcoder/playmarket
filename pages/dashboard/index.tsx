import { UserButton, useUser } from '@clerk/nextjs'
import React from 'react'

const index: React.FC = () => {
    const { user, isLoaded, isSignedIn } = useUser()
    console.log(user);
    console.log(isLoaded);
    console.log(isSignedIn);

    return (
        <div>
            {user?.firstName}<br />
            {user?.lastName} <br />
            <UserButton />
        </div>
    )
}

export default index