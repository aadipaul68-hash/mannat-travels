import express from 'express';
import { createServer as createViteServer } from 'vite';
import { db } from './src/db/index.ts';
import { tours, inquiries, users } from './src/db/schema.ts';
import { eq, desc } from 'drizzle-orm';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Route: Get all tours (or by category)
  app.get('/api/tours', async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      let queryResult;
      if (category) {
        queryResult = await db.select().from(tours).where(eq(tours.category, category)).orderBy(desc(tours.id));
      } else {
        queryResult = await db.select().from(tours).orderBy(desc(tours.id));
      }
      res.json(queryResult);
    } catch (error) {
      console.error('Error fetching tours from PostgreSQL:', error);
      res.status(500).json({ error: 'Failed to fetch tours' });
    }
  });

  // API Route: Save or update a tour
  app.post('/api/tours', async (req, res) => {
    try {
      const {
        slug,
        title,
        category,
        destination,
        duration,
        price,
        originalPrice,
        availableSeats,
        totalSeats,
        busType,
        vehicle,
        route,
        departureDate,
        image,
        badge,
        description,
        status,
      } = req.body;

      if (!title || !destination || !price) {
        return res.status(400).json({ error: 'Title, destination and price are required' });
      }

      const generatedSlug = slug || `tour-${Date.now()}`;

      const inserted = await db
        .insert(tours)
        .values({
          slug: generatedSlug,
          title,
          category: category || 'popular',
          destination,
          duration: duration || '2 Nights / 3 Days',
          price: Number(price),
          originalPrice: originalPrice ? Number(originalPrice) : null,
          availableSeats: availableSeats ? Number(availableSeats) : 20,
          totalSeats: totalSeats ? Number(totalSeats) : 35,
          busType: busType || null,
          vehicle: vehicle || null,
          route: route || null,
          departureDate: departureDate || null,
          image: image || '/images/chardham.jpg',
          badge: badge || null,
          description: description || '',
          status: status || 'active',
        })
        .onConflictDoUpdate({
          target: tours.slug,
          set: {
            title,
            category: category || 'popular',
            destination,
            duration: duration || '2 Nights / 3 Days',
            price: Number(price),
            originalPrice: originalPrice ? Number(originalPrice) : null,
            availableSeats: availableSeats ? Number(availableSeats) : 20,
            totalSeats: totalSeats ? Number(totalSeats) : 35,
            busType: busType || null,
            vehicle: vehicle || null,
            route: route || null,
            departureDate: departureDate || null,
            image: image || '/images/chardham.jpg',
            badge: badge || null,
            description: description || '',
            status: status || 'active',
            updatedAt: new Date(),
          },
        })
        .returning();

      res.json(inserted[0]);
    } catch (error) {
      console.error('Error saving tour to PostgreSQL:', error);
      res.status(500).json({ error: 'Failed to save tour' });
    }
  });

  // API Route: Delete a tour
  app.delete('/api/tours/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      await db.delete(tours).where(eq(tours.slug, slug));
      res.json({ success: true, deletedSlug: slug });
    } catch (error) {
      console.error('Error deleting tour:', error);
      res.status(500).json({ error: 'Failed to delete tour' });
    }
  });

  // API Route: Submit new customer inquiry / lead
  app.post('/api/inquiries', async (req, res) => {
    try {
      const { name, phone, destination, travelDate, passengers, source } = req.body;
      if (!name || !phone) {
        return res.status(400).json({ error: 'Name and phone are required' });
      }

      const inserted = await db
        .insert(inquiries)
        .values({
          name,
          phone,
          destination: destination || null,
          travelDate: travelDate || null,
          passengers: passengers ? Number(passengers) : 1,
          source: source || 'website_contact',
          status: 'new',
        })
        .returning();

      res.json({ success: true, inquiry: inserted[0] });
    } catch (error) {
      console.error('Error creating inquiry in PostgreSQL:', error);
      res.status(500).json({ error: 'Failed to record inquiry' });
    }
  });

  // Mount Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
