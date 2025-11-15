// export class CartManager {
//   private static CART_KEY = "product_cart";
//
//   // Get cart from localStorage
//   static getCart(): CartItem[] {
//     if (typeof window === "undefined") return [];
//
//     try {
//       const cartData = localStorage.getItem(this.CART_KEY);
//       return cartData ? JSON.parse(cartData) : [];
//     } catch (error) {
//       console.error("Error reading cart from storage:", error);
//       return [];
//     }
//   }
//
//   // Save cart to localStorage
//   static saveCart(cart: CartItem[]): void {
//     if (typeof window === "undefined") return;
//
//     try {
//       localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
//     } catch (error) {
//       console.error("Error saving cart to storage:", error);
//     }
//   }
//
//   // Add product to cart
//   static addToCart(product: Product, quantity: number = 1): CartItem[] {
//     const cart = this.getCart();
//     const existingItem = cart.find(item => item.product.id === product.id);
//
//     let updatedCart: CartItem[];
//
//     if (existingItem) {
//       updatedCart = cart.map(item =>
//         item.product.id === product.id
//           ? {
//               ...item,
//               quantity: item.quantity + quantity,
//               totalPrice: (item.quantity + quantity) * product.sellPrice
//             }
//           : item
//       );
//     } else {
//       updatedCart = [
//         ...cart,
//         {
//           product,
//           quantity,
//           totalPrice: quantity * product.sellPrice
//         }
//       ];
//     }
//
//     this.saveCart(updatedCart);
//     return updatedCart;
//   }
//
//   // Update product quantity in cart
//   static updateQuantity(productId: string, quantity: number): CartItem[] {
//     const cart = this.getCart();
//
//     if (quantity < 1) {
//       return this.removeFromCart(productId);
//     }
//
//     const updatedCart = cart.map(item =>
//       item.product.id === productId
//         ? {
//             ...item,
//             quantity,
//             totalPrice: quantity * item.product.sellPrice
//           }
//         : item
//     );
//
//     this.saveCart(updatedCart);
//     return updatedCart;
//   }
//
//   // Remove product from cart
//   static removeFromCart(productId: string): CartItem[] {
//     const cart = this.getCart();
//     const updatedCart = cart.filter(item => item.product.id !== productId);
//     this.saveCart(updatedCart);
//     return updatedCart;
//   }
//
//   // Clear entire cart
//   static clearCart(): void {
//     if (typeof window === "undefined") return;
//     localStorage.removeItem(this.CART_KEY);
//   }
//
//   // Get total number of items in cart
//   static getTotalItems(): number {
//     const cart = this.getCart();
//     return cart.reduce((total, item) => total + item.quantity, 0);
//   }
//
//   // Get total price of cart
//   static getTotalPrice(): number {
//     const cart = this.getCart();
//     return cart.reduce((total, item) => total + item.totalPrice, 0);
//   }
//
//   // Check if product is in cart
//   static isInCart(productId: string): boolean {
//     const cart = this.getCart();
//     return cart.some(item => item.product.id === productId);
//   }
//
//   // Get quantity of specific product in cart
//   static getProductQuantity(productId: string): number {
//     const cart = this.getCart();
//     const item = cart.find(item => item.product.id === productId);
//     return item ? item.quantity : 0;
//   }
// }
