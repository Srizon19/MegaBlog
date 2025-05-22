import React, { useEffect, useState } from 'react';
import service from '../appwrite/config';
import { Container, PostCard } from '../components';

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getPosts().then((posts) => {
            console.log("fetched posts for home: ", posts);
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);
    console.log("posts: ",posts)
    return posts.length === 0 ? (
        <div className='flex flex-wrap'>
            <div className='p-2 w-full'>
                <h1 className='text-2xl font-bold hover:text-gray-500'>
                    No posts available
                </h1>
            </div>
        </div>
    ) : (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Home;
