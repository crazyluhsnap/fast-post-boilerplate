function ItemForm({
  name,
  description,
  editingId,
  setName,
  setDescription,
  onSubmit,
  onCancel,
}) {
  return (
    <section>
      <h2>{editingId === null ? "Create Item" : "Edit Item"}</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <button onClick={onSubmit}>
        {editingId === null ? "Add Item" : "Update Item"}
      </button>

      {editingId !== null && (
        <button onClick={onCancel}>
          Cancel
        </button>
      )}
    </section>
  );
}

export default ItemForm;