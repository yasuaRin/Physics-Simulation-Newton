import React from 'react';
import NewtonThirdLawSim from './components/simulations/ch3_simulation_1/NewtonThirdLawSim';

const App: React.FC = () => {
  return (
    <div style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
      <NewtonThirdLawSim />
    </div>
  );
};

export default App;