const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const products = [
  { name: "Laptop Pro 15", description: "High-performance laptop for professionals", price: 1200, image: "https://m.media-amazon.com/images/I/71vz-82GlOL.jpg", rating: 4.6 },
  { name: "Smartphone X", description: "5G-enabled smartphone with AMOLED display", price: 800, image: "https://pluspng.com/img-png/cell-phones-png-hd--1024.png", rating: 4.5 },
  { name: "Smartwatch Z", description: "Track fitness, heart rate and more", price: 250, image: "https://m.media-amazon.com/images/I/61ftG19NACL._AC_SL1500_.jpg", rating: 4.3 },
  { name: "Wireless Earbuds", description: "Noise-cancelling Bluetooth earbuds", price: 150, image: "https://cdn1.smartprix.com/rx-iZgUQ66R0-w1200-h1200/ZgUQ66R0.jpg", rating: 4.2 },
  { name: "Gaming Mouse", description: "RGB gaming mouse with adjustable DPI", price: 90, image: "https://www.bhphotovideo.com/images/images2500x2500/logitech_910003636_m185_wireless_mouse_blue_black_1433569.jpg", rating: 4.4 },
  { name: "Mechanical Keyboard", description: "Backlit mechanical keyboard for gamers", price: 110, image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5709/5709661_rd.jpg", rating: 4.3 },
  { name: "Tablet A10", description: "10-inch Android tablet with HD screen", price: 500, image: "https://dwu32cgxelq1c.cloudfront.net/local_newspapers/sites/32/2015/01/tablet.jpg", rating: 4.1 },
  { name: "Bluetooth Speaker", description: "Portable wireless speaker with deep bass", price: 180, image: "https://m.media-amazon.com/images/I/713TUYjagQL.jpg", rating: 4.4 },
  { name: "4K Monitor", description: "Ultra HD 4K display for crisp visuals", price: 600, image: "https://www.wepc.com/wp-content/uploads/2019/05/DSC02079-1-scaled.jpg", rating: 4.5 },
  { name: "External SSD", description: "1TB high-speed external solid state drive", price: 200, image: "https://m.media-amazon.com/images/I/61cHBHHxTyL._AC_SL1500_.jpg", rating: 4.6 },
  { name: "Wireless Charger", description: "Fast charging pad for all Qi devices", price: 120, image: "https://m.media-amazon.com/images/I/71c9U4sdMSL._AC_SL1500_.jpg", rating: 4.3 },
  { name: "Drone X2", description: "Compact drone with 4K camera and GPS", price: 950, image: "https://highlandradio.com/wp-content/uploads/2016/04/drone.jpg", rating: 4.7 },
  { name: "Laser Printer", description: "Wireless laser printer for home office", price: 400, image: "https://www.bhphotovideo.com/images/images2500x2500/Epson_C11CB53201_Artisan_1430_Inkjet_Printer_838610.jpg", rating: 4.2 },
  { name: "Wi-Fi Router", description: "Dual-band high-speed Wi-Fi router", price: 170, image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6377/6377908ld.jpg", rating: 4.5 },
  { name: "Noise Cancelling Headphones", description: "Over-ear ANC headphones with mic", price: 300, image: "https://m.media-amazon.com/images/I/61K4azdo8BL._AC_SL1500_.jpg", rating: 4.6 }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/techworld');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('✅ Products seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seed();
