import {shallowMount, mount } from '@vue/test-utils'
import Homepage from '@/components/Homepage.vue'

const $nuxt = {
  $on: jest.fn()
}

describe('Homepage', () => {
    test('homepage component render', () => {
      const wrapper = shallowMount(Homepage)
      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('render whole page including child components', () => {
    let wrapper
    beforeEach(() => {
       wrapper = mount(Homepage, {
        mocks: {
          $nuxt
        },
      })
    })
    test('homepage component render including child components', () => {
      expect(wrapper.vm).toBeTruthy()
    })
  })


  describe('Homepage.vue', () => {
    it('test to "add to cart" text', () => {
      const wrapper = shallowMount(Homepage);
      const data = wrapper.get('[data-test="text"]');
      expect(data.text()).toBe('Item Added into cart');
    });
  })

  describe('Homepage.vue', () => {
    it('array check', () => {
      const wrapper = shallowMount(Homepage);
      expect(wrapper.vm.$data.candyItem[0]).toStrictEqual(
          {
            "details": "This biscuit stick coated with chocolate is also available in a wide variety of other flavors.",
            "name": "Pocky"
          }
          )
    });
  })

  describe('Homepage.vue', () => {
    it('test to check lenght of candy items', () => {
      const wrapper = shallowMount(Homepage);
      expect(wrapper.vm.$data.candyItem.length).toBe(5)
    });
  })

  describe('Homepage.vue', () => {
    it('test to check names of candyitems', () => {
      const wrapper = shallowMount(Homepage);
      expect(wrapper.vm.$data.candyItem.map(obj => obj.name)).toEqual(
        ["Pocky", "Haw flakes", "Peen tong", "Orange jelly candy", "Deuk Deuk Tong"]
      );
    });
  })

  describe('delete button', () => {
    const expectedData = [
      {"details": "It is a sweet, tangy, disc shaped candy made from hawthorn fruit, packaged in a cylindrical paper wrapper.", "name": "Haw flakes"},
      {"details": "Chinese brown sugar candy.", "name": "Peen tong"},
      {"details": "These finger-sized sticks of soft jelly candy are generally sold in food specialty stores in Hong Kong", "name": "Orange jelly candy"}, 
      {"details": "Also known as \"Ding Ding Tong\", it is a hard maltose candy with sesame and ginger flavours.", "name": "Deuk Deuk Tong"}
    ]
    test('delete button', async () => {
      const wrapper = shallowMount(Homepage)
      const button = wrapper.find('.on-delete')
      await button.trigger('click')
      expect(wrapper.vm.$data.candyItem).toEqual(expectedData);
    })
  })


  describe('delete button', () => {
    test('delete button', async () => {
      const wrapper = shallowMount(Homepage)
      const button = wrapper.find('.on-delete')
      await button.trigger('click')
      expect(wrapper.vm.$data.candyItem.length).toEqual(4);
    })
  })

  describe('edit button', () => {
    test('edit button', async () => {
      const wrapper = shallowMount(Homepage)
      const button = wrapper.find('.on-edit')
      await button.trigger('click')
      expect(wrapper.vm.$data.candyItem[0].name).not.toBe('Pockyyy');
    })
  })


