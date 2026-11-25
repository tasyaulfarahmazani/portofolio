import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-Memory & File-based storage for messages
const messagesFilePath = path.join(__dirname, 'messages.json');
if (!fs.existsSync(messagesFilePath)) {
  fs.writeFileSync(messagesFilePath, JSON.stringify([], null, 2));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Royal Portfolio API is running smoothly 👑' });
});

// Endpoint kirim pesan dari HRD / Klien
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Nama, email, dan pesan wajib diisi.' 
    });
  }

  const newMessage = {
    id: 'MSG-' + Date.now(),
    name,
    email,
    subject: subject || 'General Inquiry',
    message,
    timestamp: new Date().toISOString()
  };

  try {
    const rawData = fs.readFileSync(messagesFilePath, 'utf-8');
    const messages = JSON.parse(rawData);
    messages.unshift(newMessage);
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));

    console.log(`[Royal Mail] Pesan baru diterima dari: ${name} (${email})`);

    return res.status(201).json({
      success: true,
      message: 'Pesan berhasil dikirim ke istana! Tasya akan segera merespons Anda.',
      data: newMessage
    });
  } catch (error) {
    console.error('Error saving message:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server backend saat menyimpan pesan.'
    });
  }
});

// Endpoint untuk melihat pesan masuk (Admin / Owner Tasya)
app.get('/api/messages', (req, res) => {
  try {
    const rawData = fs.readFileSync(messagesFilePath, 'utf-8');
    const messages = JSON.parse(rawData);
    res.json({ success: true, count: messages.length, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal membaca pesan.' });
  }
});

app.listen(PORT, () => {
  console.log(`🏰 Royal Portfolio Backend Server running on http://localhost:${PORT}`);
});
