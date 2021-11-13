import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { SkeletonProfile } from '../components';

const fetchUser = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const data = await res.json();
    return data;
}

function User() {
    const [profile, setProfile] = useState(null);

    const {
        data,
        isLoading,
    } = useQuery("user", fetchUser, { keepPreviousData: true });

    useEffect(() => {
        setProfile(data);
    }, [data])

    return (
        <div className="user">
            <h2>User Details</h2>

            {
                profile && (
                    <div className="profile">
                        <h3>{profile.username}</h3>
                        <p>{profile.email}</p>
                        <a href={profile.website}>{profile.website}</a>
                    </div>
                )
            }

            {isLoading && <SkeletonProfile />}
        </div>
    )
}

export default User
