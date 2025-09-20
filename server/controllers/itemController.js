const supabase = require('../config/supabaseClient');

// Get all items
exports.getItems = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Get single item by id
exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Create new item with optional image
exports.createItemWithImage = async (req, res) => {
  try {
    const { name, category, quantity, location } = req.body;
    let imageUrl = null;

    if (req.file) {
      const fileName = `${Date.now()}_${req.file.originalname}`;
      const { data, error } = await supabase.storage
        .from('items-images') // Make sure this bucket exists
        .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('items-images')
        .getPublicUrl(fileName);

      imageUrl = urlData.publicUrl;
    }

    const { data, error } = await supabase
      .from('items')
      .insert([{ name, category, quantity: Number(quantity), location, image_url: imageUrl }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Update item with optional new image
exports.updateItemWithImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, quantity, location } = req.body;
    let imageUrl;

    if (req.file) {
      const fileName = `${Date.now()}_${req.file.originalname}`;
      const { data, error } = await supabase.storage
        .from('items-images')
        .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('items-images')
        .getPublicUrl(fileName);

      imageUrl = urlData.publicUrl;
    }

    const updateData = {
      name,
      category,
      quantity: Number(quantity),
      location,
      updated_at: new Date().toISOString(),
    };
    if (imageUrl) updateData.image_url = imageUrl;

    const { data, error } = await supabase
      .from('items')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('items').delete().eq('id', id);
    if (error) throw error;
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
