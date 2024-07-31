import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const Profile = ({ posts, handleEdit, handleDelete }) => {
  const { data: session } = useSession();

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{session?.user.name}'s Profile</span>
      </h1>
      <div className="mt-10 flex items-center gap-5">
        <Image
          src={session?.user.image}
          width={120}
          height={120}
          className="rounded-full"
          alt="profile"
        />
        <div>
          <h2 className="text-2xl font-bold">{session?.user.name}</h2>
          <p className="text-gray-500">{session?.user.email}</p>
        </div>
      </div>
      
      <p className="desc text-left mt-5">
        Welcome to your profile page. Here you can view and manage your posts.
      </p>

      <div className="mt-10 prompt_layout">
        {posts.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;