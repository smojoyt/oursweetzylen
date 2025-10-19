// /js/components/boxBuilder.js
// Alpine component that supports multiples of the same item.

(function (global) {
  function boxBuilder() {
    return {
      filter: 'all',
      items: [
        { id: 1, name: 'Milk Choc. Strawberry',  price: 4.50, image: 'https://placehold.co/100x100/A64B3C/F5F0EA?text=🍓', category: 'strawberry' },
        { id: 2, name: 'Dark Choc. Strawberry',  price: 4.50, image: 'https://placehold.co/100x100/4B2E1E/F5F0EA?text=🍓', category: 'strawberry' },
        { id: 3, name: 'White Choc. Strawberry', price: 4.50, image: 'https://placehold.co/100x100/B97A7A/F5F0EA?text=🍓', category: 'strawberry' },
        { id: 4, name: 'Red Velvet Cupcake',     price: 4.00, image: 'https://placehold.co/100x100/A64B3C/F5F0EA?text=🧁', category: 'cupcake' },
        { id: 5, name: 'Vanilla Bean Cupcake',   price: 3.75, image: 'https://placehold.co/100x100/6E5A4A/F5F0EA?text=🧁', category: 'cupcake' },
        { id: 6, name: 'Double Choc. Cupcake',   price: 4.00, image: 'https://placehold.co/100x100/4B2E1E/F5F0EA?text=🧁', category: 'cupcake' },
        { id: 7, name: 'Sprinkle Strawberry',    price: 4.75, image: 'https://placehold.co/100x100/A64B3C/F5F0EA?text=🍓', category: 'strawberry' },
        { id: 8, name: 'Carrot Cake Cupcake',    price: 4.25, image: 'https://placehold.co/100x100/6E5A4A/F5F0EA?text=🧁', category: 'cupcake' },
        { id: 9, name: 'Lemon Zest Cupcake',     price: 4.00, image: 'https://placehold.co/100x100/B97A7A/F5F0EA?text=🧁', category: 'cupcake' }
      ],

      // The box is a "slots" list (duplicates allowed)
      box: [],
      maxSize: 6,
      boxFee: 5.00,

      // --- Derivations & helpers ---
      filteredItems() {
        return this.filter === 'all' ? this.items : this.items.filter(i => i.category === this.filter);
      },
      remaining() {
        return this.maxSize - this.box.length;
      },
      isFull() {
        return this.box.length >= this.maxSize;
      },
      getCount(id) {
        return this.box.reduce((n, it) => n + (it.id === id ? 1 : 0), 0);
      },
      isInBox(id) {
        return this.getCount(id) > 0;
      },

      // --- Mutations ---
      increment(item) {
        if (this.isFull()) return;
        this.box.push(item); // allow duplicates
      },
      decrement(id) {
        // remove the first occurrence of that id
        const idx = this.box.findIndex(it => it.id === id);
        if (idx !== -1) this.box.splice(idx, 1);
      },
      removeSlot(index) {
        // remove by slot index in the preview grid
        if (index >= 0 && index < this.box.length) this.box.splice(index, 1);
      },
      clear() {
        this.box = [];
      },

      // Totals
      subtotal() {
        return this.box.reduce((sum, it) => sum + it.price, 0);
      },
      total() {
        return this.subtotal() + this.boxFee;
      },

      // For adding the whole custom box to a cart/checkout
      payload() {
        // compress to {id, qty}
        const map = new Map();
        this.box.forEach(it => map.set(it.id, (map.get(it.id) || 0) + 1));
        return {
          items: Array.from(map.entries()).map(([id, qty]) => ({ id, qty })),
          fee: this.boxFee,
          subtotal: this.subtotal(),
          total: this.total()
        };
      },
    };
  }

  // Expose to window so Alpine can call x-data="OSZ.boxBuilder()"
  global.OSZ = global.OSZ || {};
  global.OSZ.boxBuilder = boxBuilder;
})(window);
