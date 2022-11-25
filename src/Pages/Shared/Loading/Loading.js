import React from 'react';

const Loading = () => {
    return (
        <div className='w-fit mx-auto flex rounded justify-center items-center mt-10 bg-white p-4'>
            <progress className="progress w-56 max-w-screen-md mx-auto "></progress>
        </div>
    );
};

export default Loading;