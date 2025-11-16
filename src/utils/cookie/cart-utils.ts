/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

export const CookieCart = (key: string) => ({
  get() {
    const raw = document.cookie
      .split("; ")
      .find((c) => c.startsWith(key + "="));

    if (!raw) return [];
    try {
      return JSON.parse(raw.split("=")[1]);
    } catch {
      return [];
    }
  },

  set(value: any) {
    document.cookie = `${key}=${JSON.stringify(value)}; path=/; max-age=${
      7 * 24 * 60 * 60
    }`;
  },

  update(
    id: string,
    limit: number,
    name: string,
    sellPrice: number,
    stock: number,
    updateSellPrice?: number,
  ) {
    let cart = this.get();

    // Convert to number before using
    limit = Number(limit);

    // Ensure limit does not exceed stock
    if (limit > stock) {
      limit = stock;
    }

    // remove item if limit <= 0
    if (limit <= 0) {
      cart = cart.filter((item: any) => item.id !== id);
      this.set(cart);
      return cart;
    }

    // update item if exists
    const exists = cart.find((item: any) => item.id === id);
    if (exists) {
      cart = cart.map((item: any) =>
        item.id === id
          ? { ...item, limit, name, sellPrice, stock, updateSellPrice }
          : item,
      );
    } else {
      // add new item
      cart.push({ id, limit, name, sellPrice, stock, updateSellPrice });
    }

    this.set(cart);
    return cart;
  },

  remove() {
    // Clear the data from the cookie (set an empty array)
    this.set([]);

    // Delete the cookie completely
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    return []; // return empty cart
  },
});
