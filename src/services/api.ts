import { GroceryItem, CreateGroceryItem, UpdateGroceryItem } from '../types';
import { config } from '../config/environment';

const BASE_URL = config.API_BASE_URL;

export const groceryApi = {
  // Get all grocery items
  getGroceryItems: async (): Promise<GroceryItem[]> => {
    const response = await fetch(`${BASE_URL}/groceryItems`);
    if (!response.ok) {
      throw new Error('Failed to fetch grocery items');
    }
    return response.json();
  },

  // Create a new grocery item
  createGroceryItem: async (item: CreateGroceryItem): Promise<GroceryItem> => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      bought: false,
      createdAt: new Date().toISOString(),
    };

    const response = await fetch(`${BASE_URL}/groceryItems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });

    if (!response.ok) {
      throw new Error('Failed to create grocery item');
    }
    return response.json();
  },

  // Update a grocery item
  updateGroceryItem: async (data: UpdateGroceryItem): Promise<GroceryItem> => {
    const { id, ...updateData } = data;
    const response = await fetch(`${BASE_URL}/groceryItems/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error('Failed to update grocery item');
    }
    return response.json();
  },

  // Delete a grocery item
  deleteGroceryItem: async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/groceryItems/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete grocery item');
    }
  },
};
