export const state = () => ({
    count: 0,
    cart: []
  });

  export const getters = {
    getCounter: state => state.count,
    cardData: state => state.cart
  };
  
  export const mutations = {
    increment(state) {
      state.count++;
    },

    Add_To_Cart(state,  product) {
        state.cart.push(product)
    }
  };

  export const actions = {
    addProductToCart({ commit }, product) {
        commit('Add_To_Cart', product)
      },
  }