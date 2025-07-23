'use client';
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  TextField,
  Alert,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import axios from 'axios';

interface Product {
  name: string;
  imageURL: string;
  price: string;
  quantity: string;
}

type MessageType = {
  open: boolean;
  type: 'success' | 'error' | 'info' | 'warning';
  text: string;
};

const AddProductPage = () => {
  const [product, setProduct] = useState<Product>({
    name: '',
    imageURL: '',
    price: '',
    quantity: '',
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState<MessageType>({
    open: false,
    type: 'info',
    text: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const showMessage = (type: MessageType['type'], text: string) => {
    setMessage({ open: true, type, text });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, imageURL, price, quantity } = product;

    if (!name || !imageURL || !price || !quantity) {
      return showMessage('error', 'Please fill in all fields.');
    }

    try {
      await axios.post('https://ecommerce-backend-ie1h.onrender.com/api/product/addproduct', product);
      showMessage('success', 'Product added successfully!');
      setProduct({ name: '', imageURL: '', price: '', quantity: '' });
      fetchAllProducts();
    } catch (error) {
      console.error('Add Error:', error);
      showMessage('error', 'Failed to add product.');
    }
  };

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get('https://ecommerce-backend-ie1h.onrender.com/api/product/getAllproducts');
      if (Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      showMessage('error', 'Failed to load products.');
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      {/* Topbar */}
      <AppBar position="static" sx={{ backgroundColor: '#2e7d32' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🛒 Kart Admin Panel
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Main Container */}
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Manage Products
        </Typography>

        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Add Product Form */}
          <Paper elevation={4} sx={{ p:2, flex: 1, borderRadius:'8px',height:'430px'}}>
            <Typography variant="h6" gutterBottom>
              Add New Product
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={product.name}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Image URL"
                name="imageURL"
                value={product.imageURL}
                onChange={handleChange}
                margin="normal"
              />
              {product.imageURL && (
                <Box mt={2}>
                  <img
                    src={product.imageURL}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </Box>
              )}
              <TextField
                fullWidth
                label="Price (₹)"
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={product.quantity}
                onChange={handleChange}
                margin="normal"
              />
              <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit">
                Add Product
              </Button>
            </Box>
          </Paper>

          {/* Product List */}
          <Box sx={{ flex: 2 }}>
            <Typography variant="h6" gutterBottom>
              Product Catalog ({products.length})
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'flex-start',
              }}
            >
              {products.length === 0 ? (
                <Typography>No products found.</Typography>
              ) : (
                products.map((product, idx) => (
                  <Card key={idx} sx={{ width: 220 }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={product.imageURL}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {product.name}
                      </Typography>
                      <Typography variant="body2">₹{product.price}</Typography>
                      <Typography variant="body2">Qty: {product.quantity}</Typography>
                    </CardContent>
                  </Card>
                ))
              )}
            </Box>
          </Box>
        </Box>

        {/* Snackbar */}
        <Snackbar
          open={message.open}
          autoHideDuration={3000}
          onClose={() => setMessage((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            severity={message.type}
            variant="filled"
            onClose={() => setMessage((prev) => ({ ...prev, open: false }))}
          >
            {message.text}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default AddProductPage;
