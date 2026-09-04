import AttractionCard from './AttractionCard';

function AttractionList({ attractions }) {
  return (
    <div className="attraction-list">
      {attractions.map((item) => (
        <AttractionCard
          key={item.id}
          name={item.name}
          category={item.category}
          description={item.description}
          rating={item.rating}
          price={item.price}
        />
      ))}
    </div>
  );
}

export default AttractionList;
