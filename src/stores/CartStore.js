import { groupBy } from "lodash";
import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
  state: () => ({
    items: [],
  }),
  actions: {
    addItems(count, item) {
      count = parseInt(count);
      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },
    setItemCount(item, count) {
      const index = this.items.findIndex((i) => i.name === item.name);
      if (index !== -1) {
        // Eliminar todos los elementos con el mismo nombre
        this.items = this.items.filter((i) => i.name !== item.name);
      }
      // Agregar la cantidad especificada del item
      for (let i = 0; i < count; i++) {
        this.items.push({ ...item });
      }
    },
    clearItem(name) {
      this.items = this.items.filter((item) => item.name !== name);
    },
  },
  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    grouped: (state) => groupBy(state.items, (item) => item.name),
    groupCount: (state) => (name) => state.grouped[name]?.length || 0,
    totalPrice: (state) => state.items.reduce((total, item) => total + item.price, 0),
  }
});
