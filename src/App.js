import React from 'react';
// import { Switch, Route } from 'react-router-dom';

// import the timeline and dynamic info/comment section
import NavBar from './navigation/navBar.jsx';
import Arcus from './components/arcus.jsx';
import Comments from './components/comments.jsx';
import ArcusEdit from './components/arcusEdit.jsx'

//import style sheet

const App = () => {
    return (
        <div className='router'>
            {/* nav bar */}
            <NavBar></NavBar>
            {/* where the timline will be */}
            <Arcus/>
            {/* where the dynamic/switch comment section will be */}
            <Comments></Comments>
            {/* another switch to timeline edit */}
            <ArcusEdit></ArcusEdit>
        </div>
    );
}

export default App;