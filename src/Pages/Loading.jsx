import React from 'react';
import { RiseLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className=' flex flex-col justify-center items-center text-center text-6xl min-h-screen'><RiseLoader size={30} /></div>
    );
};

export default Loading;