import Navbar from '../components/Navbar';
import Info from '../components/Info';
import Slider from '../components/Slider';

import '../base.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='main'>
        <Info />
        <Slider />
      </div>
    </div>

  );
}

export default App;
