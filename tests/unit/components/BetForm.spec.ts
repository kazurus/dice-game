import Vuetify from 'vuetify';
import BetForm from '@/components/BetForm.vue';
import { createLocalVue, mount, shallow } from '@vue/test-utils';
import { NumRange } from '@/types';

describe('BetForm.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);

  const userNumber = NumRange.MIN;
  const balance = 100;
  const bet = 10;
  const isGameReady = true;

  it('should be invalid when user bet greater then balance', () => {
    const wrapper = mount(localVue.extend(BetForm), {
      localVue,
      propsData: { userNumber, balance, bet, isGameReady },
    });

    expect((wrapper.vm as any).isFormValid).toBeTruthy();

    const input = wrapper.find('input[aria-label="Bet Amount"]');

    // input.element.value = balance + 1;
    wrapper.setProps({ bet: balance + 1 });
    input.trigger('input');

    expect((wrapper.vm as any).isFormValid).toBeFalsy();
  });

  it('should be valid when user add credit to balance', () => {
    const wrapper = mount(localVue.extend(BetForm), {
      localVue,
      propsData: { userNumber, balance, bet, isGameReady },
    });

    expect((wrapper.vm as any).isFormValid).toBeTruthy();

    const input = wrapper.find('input[aria-label="Bet Amount"]');

    // input.element.value = balance + 1;
    wrapper.setProps({ bet: balance + 1 });
    input.trigger('input');

    expect((wrapper.vm as any).isFormValid).toBeFalsy();

    wrapper.setProps({
      balance: (input.element as HTMLInputElement).value + 1,
    });

    expect((wrapper.vm as any).isFormValid).toBeTruthy();
  });

  it('should be invalid when user input wrong number', () => {
    const wrapper = mount(localVue.extend(BetForm), {
      localVue,
      propsData: { userNumber, balance, bet, isGameReady },
    });

    expect((wrapper.vm as any).isFormValid).toBeTruthy();

    const wrongNumber = NumRange.MAX + 1;
    const input = wrapper.find('input[aria-label="Number"]');

    // input.element.value = wrongNumber;
    wrapper.setProps({ userNumber: wrongNumber });
    input.trigger('input');

    expect((wrapper.vm as any).isFormValid).toBeFalsy();
  });
});
