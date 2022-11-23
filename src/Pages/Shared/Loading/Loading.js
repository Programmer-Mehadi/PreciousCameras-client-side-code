import React from 'react';

const Loading = () => {
    return (
        <div className='w-full mx-auto flex justify-center items-center mt-10'>
            <progress className="progress w-56 max-w-screen-md mx-auto"></progress>
        </div>
    );
};

export default Loading;