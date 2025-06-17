const express = require('express');
const morgan = require('morgan');
const { readdirSync } = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const { connectDB } = require('./configs/connect_db');
connectDB();

app.use(express.json());  // อ่าน JSON body
app.use(express.urlencoded({ extended: true })); // รองรับ x-www-form-urlencoded
app.use(morgan('dev'));   // Logger
app.use(cors({ origin: '*' })); // เปิด CORS ทุกโดเมน

// โหลด route ทั้งหมดจากโฟลเดอร์ routes และ mount ที่ /api/ชื่อไฟล์ (ตัด .js ออก)
try {
  const routesPath = path.join(__dirname, 'routes');
  console.log('routesPath:', routesPath); // debug
  const routeFiles = readdirSync(routesPath).filter(file => file.endsWith('.js'));
  console.log('routeFiles:', routeFiles); // debug

  routeFiles.forEach((file) => {
    const route = require(path.join(routesPath, file));
    // เปลี่ยนชื่อ routePrefix ให้เป็น /api/user ถ้าเป็น userRoute.js
    let routePrefix = '/api/' + file.replace('.js', '');
    if (routePrefix === '/api/userRoute') routePrefix = '/api/user';
    app.use(routePrefix, route);
    console.log(`Mounted route: [${routePrefix}] from file: ${file}`);
  });
} catch (err) {
  console.error('Error loading routes:', err);
}

// 404 middleware (จับเส้นทางที่ไม่เจอ)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// error handler (จับ error ที่เกิดใน route หรือ middleware)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.set('json spaces', 2); // ให้ Express ส่ง JSON แบบ pretty print

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
