import { useState } from 'react';

export default function AddItem() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 0,
    location: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('quantity', formData.quantity);
      data.append('location', formData.location);
      if (formData.image) data.append('image', formData.image);

      const res = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        body: data
      });

      if (!res.ok) throw new Error('Failed to create item');
      const result = await res.json();
      alert(`Item "${result.name}" added successfully!`);
      setFormData({ name: '', category: '', quantity: 0, location: '', image: null });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add New Item</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          style={styles.fileInput}
        />
        {formData.image && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="Preview"
            style={styles.imagePreview}
          />
        )}
        <button type="submit" style={styles.button}>Add Item</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#2563eb'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  fileInput: {
    padding: '5px',
    fontSize: '14px'
  },
  imagePreview: {
    width: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginTop: '10px'
  },
  button: {
    padding: '12px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  }
};

