import Vuetify from 'vuetify';
import Bet from '@/components/Bet.vue';
import { createLocalVue, mount, shallow } from '@vue/test-utils';
import { NumRange, BetType } from '@/types';

describe('Bet.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);

  const userNumber = NumRange.MIN;
  const type = BetType.HI;
  const isGameReady = true;
  const wrapper = mount(localVue.extend(Bet), {
    localVue,
    propsData: { type, isGameReady, userNumber },
  });

  it('should calculate right chance', () => {
    expect((wrapper.vm as any).chance).toEqual(100);
  });

  it('should render right chance', () => {
    expect(wrapper.find('.chance').text()).toMatch('chance: 100%');
  });

  it('should calculate right payout', () => {
    expect((wrapper.vm as any).payout).toEqual(1);
  });

  it('should render right payout', () => {
    expect(wrapper.find('.payout').text()).toMatch('payout: 1.00x');
  });
});
