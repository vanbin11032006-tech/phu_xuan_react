function CategoryTabs({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-tabs">
      {categories.map((category) => (
        <button
          key={category}
          className={category === selectedCategory ? 'is-active' : ''}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
