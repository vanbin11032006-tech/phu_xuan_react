import { useState } from 'react';
import MenuList from './components/MenuList';
import { menuItems } from './data/menu';
import './App.css';

function App() {
  const [favoriteIds, setFavoriteIds] = useState([]);

  function handleToggleFavorite(id, isFavorite) {
    if (isFavorite) {
      setFavoriteIds((prev) => [...prev, id]);
    } else {
      setFavoriteIds((prev) => prev.filter((item) => item !== id));
    }
  }

  const favoriteCount = favoriteIds.length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍜 Thực đơn Ẩm thực Huế</h1>
        <p className="favorite-counter">
          Số món đã yêu thích: <strong>{favoriteCount}/{menuItems.length}</strong>
        </p>
      </header>

      <main>
        <MenuList items={menuItems} onToggleFavorite={handleToggleFavorite} />
      </main>
    </div>
  );
}

export default App;
