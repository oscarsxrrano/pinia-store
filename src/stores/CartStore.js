import { isEmpty } from "lodash";
import { groupBy } from "lodash";
import { defineStore } from "pinia";
export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
    };
  },
  actions: {
    addItems(count, item) {
      count = parseInt(count);
      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },
  },
  // getters
  getters: {
    count: (state) => {
      return state.items.length;
    },
    isEmpty: (state) => {
      return state.count === 0;
    },
    grouped: state => groupBy(state.items, item => item.name),
  }
});
