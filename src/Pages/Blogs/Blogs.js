import React from 'react';

const Blogs = () => {
    return (
        <div>
            <h2 className="text-center font-bold text-3xl text-primary p-8">
                Blogs
            </h2>
            <div className='w-[99%] mx-auto flex gap-4 flex-col pb-8'>
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box w-[90%] md:w-[600px] mx-auto">
                    <div className="collapse-title text-xl font-medium">
                        What are the different ways to manage a state in a React application?
                    </div>
                    <div className="collapse-content">
                        <p>React state management is a process for managing the data that React components need in order to render themselves. This data is typically stored in the component's state object. When the state object changes, the component will re-render itself. React state management is basically half of a React app.The Four Kinds of React State to Manage
                            Local state. Global state. Server state. URL state.UseCotext, useState,Redux,etc...</p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box w-[90%] md:w-[600px] mx-auto">
                    <div className="collapse-title text-xl font-medium">
                        How does prototypical inheritance work?
                    </div>
                    <div className="collapse-content">
                        <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. The prototype is itself an object, so the prototype will have its own prototype, making what's called a prototype chain. The chain ends when we reach a prototype that has null for its own prototype.The object from where the properties are inherited is called the prototype.</p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box w-[90%] md:w-[600px] mx-auto">
                    <div className="collapse-title text-xl font-medium">
                        What is a unit test? Why should we write unit tests?
                    </div>
                    <div className="collapse-content">
                        <p>A unit test is a way of testing a unit - the smallest piece of code that can be logically isolated in a system.when you write test you take the perspective of the one that will consume your code. It forces you to have an holistic approach of the behavior to implement. This way ambiguities you get from requirements become obvious and are immediately taken account when code is written the first time.developers typically write unit tests. However, they are largely responsible for writing these tests to ensure that the code works – most developer tests are likely to cover happy-path and obvious negative cases.</p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box w-[90%] md:w-[600px] mx-auto">
                    <div className="collapse-title text-xl font-medium">
                        React vs. Angular vs. Vue?
                    </div>
                    <div className="collapse-content">
                        <p><span className='text-base font-bold'>React:</span> It's used for building interactive user interfaces and web applications quickly and efficiently with significantly less code than you would with vanilla JavaScript. In React, you develop your applications by creating reusable components that you can think of as independent Lego blocks.</p>
                        <p><span className='text-base font-bold'>Angular:</span> AngularJS is a JavaScript framework. It can be added to an HTML page with a {'<script>'} tag. AngularJS extends HTML attributes with Directives, and binds data to HTML with Expressions.</p>
                        <p> <span className='text-base font-bold'>Vue:</span> Vue is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.Vue. js combined the top-level features of React and Angular, but its main feature is the perfect user experience</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;