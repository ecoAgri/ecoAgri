import React from 'react'
import MainHeader from '../../layouts/MainHeader'
import ProfileContainer from '../ProfileContainer'

function Profile() {
    return (
        <React.Fragment>
            <MainHeader value={1} />
            <ProfileContainer />
        </React.Fragment>
    )
}

export default Profile