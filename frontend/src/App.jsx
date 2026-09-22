import { useEffect, useState } from "react";

import { apifetch } from "./api/client";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";


function App() {
  const [items, setItems] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    loadItems();
  }, []);


  async function loadItems() {
    try {
      const data = await apifetch("/items/");
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  }


  async function createItem() {
    try {
      const newItem = await apifetch("/items/", {
        method: "POST",
        body: JSON.stringify({
          name,
          description,
        }),
      });

      setItems((currentItems) => [
        ...currentItems,
        newItem,
      ]);

      clearForm();
    } catch (error) {
      console.error(error);
    }
  }


  async function updateItem() {
    try {
      const updatedItem = await apifetch(`/items/${editingId}`, {
        method: "PUT",
        body: JSON.stringify({
          name,
          description,
        }),
      });

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === editingId ? updatedItem : item
        )
      );

      clearForm();
    } catch (error) {
      console.error(error);
    }
  }


  async function deleteItem(id) {
    try {
      await apifetch(`/items/${id}`, {
        method: "DELETE",
      });

      setItems((currentItems) =>
        currentItems.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  }


  function startEdit(item) {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description || "");
  }


  function clearForm() {
    setEditingId(null);
    setName("");
    setDescription("");
  }


  function handleSubmit() {
    if (editingId === null) {
      createItem();
    } else {
      updateItem();
    }
  }


  return (
    <div>
      <h1>Hackathon Starter</h1>

      <ItemForm
        name={name}
        description={description}
        editingId={editingId}
        setName={setName}
        setDescription={setDescription}
        onSubmit={handleSubmit}
        onCancel={clearForm}
      />

      <ItemList
        items={items}
        onEdit={startEdit}
        onDelete={deleteItem}
      />
    </div>
  );
}

export default App;