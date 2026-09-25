import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

// Users table (linked with Firebase Auth UID)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  role: text('role').default('user'), // 'admin' or 'user'
  createdAt: timestamp('created_at').defaultNow(),
});

// Tours and Holiday Packages table (Persisted in PostgreSQL database)
export const tours = pgTable('tours', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  category: text('category').notNull(), // 'popular', 'bus', 'holiday'
  destination: text('destination').notNull(),
  duration: text('duration').notNull(),
  price: integer('price').notNull(),
  originalPrice: integer('original_price'),
  availableSeats: integer('available_seats').default(20),
  totalSeats: integer('total_seats').default(35),
  busType: text('bus_type'),
  vehicle: text('vehicle'),
  route: text('route'),
  departureDate: text('departure_date'),
  image: text('image').notNull(),
  badge: text('badge'),
  description: text('description').notNull(),
  status: text('status').default('active'), // 'active' or 'hidden'
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Customer Inquiries and Bookings table
export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  destination: text('destination'),
  travelDate: text('travel_date'),
  passengers: integer('passengers').default(1),
  source: text('source').default('website_contact'), // 'website_contact' | 'quote_popup'
  status: text('status').default('new'), // 'new', 'contacted', 'confirmed'
  createdAt: timestamp('created_at').defaultNow(),
});
