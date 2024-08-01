import './styles/App.css';
import { NavigationProvider } from '@hooks/useNavigate';
import Router from '@router/index';
import { useState } from 'react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  return (
    <NavigationProvider>
      <Router 
        selectedCategory={selectedCategory} 
        onCategorySelection={handleCategorySelection} 
      />
    </NavigationProvider>
  );
}

export default App;
