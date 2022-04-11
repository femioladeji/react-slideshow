import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './views/components/NavBar';
import Sidebar from './views/components/SideBar';
import ExamplesPage from './views/pages/ExamplesPage';
import LandingPage from './views/pages/LandingPage';
import ApiPage from './views/pages/ApiPage';
import ForTypescript from './views/pages/ForTypescript';
import SlideExample from './views/pages//Examples/Slide';
import FadeExample from './views/pages//Examples/Fade';
import ZoomExample from './views/pages//Examples/Zoom';
import ZoomOutExample from './views/pages//Examples/ZoomOut';
import CustomArrow from './views/pages//Examples/CustomArrow';
import CustomIndicator from './views/pages//Examples/CustomIndicator';
import PauseHover from './views/pages//Examples/PauseHover';
import MultipleSlides from './views/pages/Examples/MultipleSlides';
import ResponsiveSlides from './views/pages/Examples/Responsive';
import CanSwipe from './views/pages//Examples/CanSwipe';
import Autoplay from './views/pages//Examples/Autoplay';
import Methods from './views/pages//Examples/Methods';
import Callback from './views/pages//Examples/Callback';
import Next from './views/pages/Next';
import './views/styles.css';
import './app.css';

// package css
import '../src/css/styles.css';

const App = () => {
  const [sidebar, setSidebar] = useState(true);

  window.onresize = () => {
    if (window.screen.width > 768) {
      setSidebar(true);
    } else {
      setSidebar(false);
    }
  };

  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    <BrowserRouter>
      <Navbar toggleSidebar={toggleSidebar} isOpen={sidebar} />
      <Sidebar isOpen={sidebar} />
      <div className="app-container">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/all-examples" element={<ExamplesPage />} />
          <Route exact path="/api" element={<ApiPage />} />
          <Route exact path="/typescript" element={<ForTypescript />} />
          <Route exact path="/slide-effect" element={<SlideExample />} />
          <Route exact path="/fade-effect" element={<FadeExample />} />
          <Route exact path="/zoom-in" element={<ZoomExample />} />
          <Route exact path="/zoom-out" element={<ZoomOutExample />} />
          <Route exact path="/custom-arrows" element={<CustomArrow />} />
          <Route
            exact
            path="/custom-indicators"
            element={<CustomIndicator />}
          />
          <Route exact path="/pause-hover" element={<PauseHover />} />
          <Route exact path="/multiple-slides" element={<MultipleSlides />} />
          <Route exact path="/can-swipe" element={<CanSwipe />} />
          <Route exact path="/autoplay" element={<Autoplay />} />
          <Route exact path="/responsive" element={<ResponsiveSlides />} />
          <Route exact path="/methods" element={<Methods />} />
          <Route exact path="/callback" element={<Callback />} />
          <Route exact path="/next" element={<Next />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
