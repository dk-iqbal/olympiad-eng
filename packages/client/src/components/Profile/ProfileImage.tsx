'use client'

import { USER_API } from '@/services/api-end-point/user';
import clientAxios from '@/services/config';
import { sleep } from '@/services/helper';
import Image from 'next/image'
import React, { useState } from 'react'

const ProfileImage = ({ session }) => {
    const [profileImage, setProfileImage] = useState("");

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);

            // Convert image file to base64 string
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                const base64Image = reader.result?.toString().split(",")[1];
                // console.log(base64Image)
                // return;
                sleep();
                try {
                    await clientAxios.put(
                        `${USER_API.user_edit(session?.user?.id)}`,
                        {
                            image: base64Image,
                        }
                    );
                } catch (error) {
                    console.error("Error uploading image:", error);
                }
            };
        }
    };

    return (
        <div className="flex flex-col items-center">
            <label htmlFor="profileImageInput">
                <div className="w-32 h-32 rounded-full mb-4 shrink-0 cursor-pointer">
                    <img className="w-32 h-32 rounded-full absolute"
                        src={profileImage || session?.user?.image || '/images/own/profile.png'} alt="" />
                    <div className="w-32 h-32 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
                        <img className="hidden group-hover:block w-12"
                            src="https://www.svgrepo.com/show/33565/upload.svg" alt="" />
                    </div>
                </div>
            </label>
            <input
                type="file"
                id="profileImageInput"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
            />
            <h1 className="text-xl font-bold">{session.user.name || ""}</h1>
            <p className="text-gray-700 dark:text-gray-300">{session.user.email || ""}</p>
        </div>
    )
}

export default ProfileImage