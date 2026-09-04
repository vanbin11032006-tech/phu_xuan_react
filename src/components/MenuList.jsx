import MenuItem from './MenuItem';

function MenuList({ items, onToggleFavorite }) {
  return (
    <div className="menu-list">
      {items.map((item) => (
        <MenuItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          description={item.description}
          isSpicy={item.isSpicy}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default MenuList;
