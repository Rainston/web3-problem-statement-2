import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Blockchain } from './utils/Blockchain';
import Navigation from './components/Navigation';
import StudentForm from './components/StudentForm';
import RecordList from './components/RecordList';
import './App.css';

function App() {
  const [blockchain] = useState(new Blockchain());
  const [, setUpdateTrigger] = useState(0);

  const handleAddRecord = (studentData) => {
    blockchain.addBlock(studentData);
    setUpdateTrigger(prev => prev + 1);
  };

  const handleDeleteBlock = (index) => {
    if (blockchain.deleteBlock(index)) {
      setUpdateTrigger(prev => prev + 1);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-start py-12">
            <Routes>
              <Route 
                path="/" 
                element={<StudentForm onAddRecord={handleAddRecord} />} 
              />
              <Route 
                path="/records" 
                element={<RecordList blocks={blockchain.chain} onDeleteBlock={handleDeleteBlock} />} 
              />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;