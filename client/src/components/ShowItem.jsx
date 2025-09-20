import { useEffect, useState } from 'react';

export default function ShowItem() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/items');
      if (!res.ok) throw new Error('Failed to fetch items');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <p>Loading items...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <h2>Inventory Items</h2>
      {items.length === 0 && <p>No items found.</p>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {items.map(item => (
          <div key={item.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px' }}
              />
            )}
            <h3>{item.name}</h3>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Location:</strong> {item.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
