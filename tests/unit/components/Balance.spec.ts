import Vuetify from 'vuetify';
import Balance from '@/components/Balance.vue';
import { createLocalVue, mount, shallow } from '@vue/test-utils';
import { BalanceData } from '@/types';

describe('Balance.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);

  const spy = jest.spyOn(console, 'error');
  afterEach(() => spy.mockReset());

  it('should equal default when props.balance not passed', () => {
    const balance = BalanceData.DEFAULT;
    const wrapper = shallow(Balance);
    expect(wrapper.props().balance).toEqual(balance);
  });

  it('props.balance should equal passed data', () => {
    const balance = 125;
    const wrapper = shallow(Balance, {
      propsData: { balance },
    });
    expect(wrapper.props().balance).toEqual(balance);
  });

  it('renders props.balance when passed', () => {
    const balance = 150;
    const wrapper = mount(Balance, {
      localVue,
      propsData: { balance },
    });

    const input = wrapper.find('input').element;

    expect((input as HTMLInputElement).value).toMatch(balance.toFixed(2));
  });

  it(`credits button should disabled when balance 0`, () => {
    const balance = BalanceData.DEFAULT;
    const wrapper = mount(Balance, {
      localVue,
      propsData: { balance },
    });

    expect(wrapper.find('button').attributes().disabled).toBeDefined();
  });

  it(`credits button should enabled when balance not 0`, () => {
    const balance = 0;
    const wrapper = mount(Balance, {
      localVue,
      propsData: { balance },
    });

    expect(wrapper.find('button').attributes().disabled).not.toBeDefined();
  });

  it(`should throw exception when balance less 0`, () => {
    const balance = -100;
    const wrapper = shallow(localVue.extend(Balance), {
      localVue,
    });

    const { validator } = wrapper.vm.$options.props.balance;

    expect(() => validator(balance)).toThrow();
  });

  // it(`should throw exception when balance less 0`, () => {
  //   const balance = -100;
  //   const wrapper = shallow(Balance, {
  //     localVue,
  //   });

  //   expect(spy).toBeCalledWith(
  //     expect.stringContaining('[Vue warn]: Invalid prop')
  //   );
  // });

  it('should call once add function when clicked add button && balance 0', () => {
    const balance = 0;
    const addCredit = jest.fn();
    const wrapper = mount(localVue.extend(Balance), {
      localVue,
      propsData: { balance },
      methods: {
        addCredit,
      },
    });

    wrapper.find('button').trigger('click');
    wrapper.setProps({ balance: BalanceData.ADD });
    wrapper.find('button').trigger('click');

    expect(addCredit).toHaveBeenCalledTimes(1);
  });

  it('should emit once add credit event when clicked add button', () => {
    const balance = 0;
    const wrapper = mount(localVue.extend(Balance), {
      localVue,
      propsData: { balance },
    });

    wrapper.find('button').trigger('click');
    wrapper.setProps({ balance: BalanceData.ADD });
    wrapper.find('button').trigger('click');

    expect(wrapper.emitted()['update:balance'].length).toBe(1);
  });
});
