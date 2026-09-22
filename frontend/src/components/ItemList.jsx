function ItemList({ items, onEdit, onDelete }) {
  return (
    <section>
      <h2>Items</h2>

      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        items.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>

            <button onClick={() => onEdit(item)}>
              Edit
            </button>

            <button onClick={() => onDelete(item.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </section>
  );
}

export default ItemList;