import addcandy from '@/components/addcandy.vue'
import Homepage from '@/components/Homepage.vue'
import {shallowMount } from '@vue/test-utils'

const $nuxt = {
  $on: jest.fn()
}

describe('Addcandy page', () => {
    test('Addcandy component render', () => {
      const wrapper = shallowMount(addcandy)
      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('add button', () => {
    test('add button', async () => {
      const wrapper = shallowMount(addcandy)
      const wrapper2 = shallowMount(Homepage)
      const button = wrapper.find('.save-btn')
      await button.trigger('click')
      expect(wrapper2.vm.$data.candyItem.push(wrapper.vm.$data.form)).toEqual(6);
    })
  })


