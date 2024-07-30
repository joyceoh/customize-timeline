import React from 'react';
// import { Switch, Route } from 'react-router-dom';

// import the timeline and dynamic info/comment section
import NavBar from './navigation/navBar.jsx';
import Timeline from './components/timeline.jsx';
import Comments from './components/comments.jsx';

//import style sheet

const App = () => {
    return (
        <div className='router'>
            {/* nav bar */}
            <NavBar></NavBar>
            {/* where the timline will be */}
            <Timeline/>
            {/* where the dynamic/switch comment section will be */}
            <Comments></Comments>
            <Comments></Comments>
        </div>
    );
}

export default App;