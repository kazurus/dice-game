import Vuetify from 'vuetify';
import Result from '@/components/Result.vue';
import { createLocalVue, mount, shallow } from '@vue/test-utils';

describe('Result.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);

  const result = 100;
  const wrapper = mount(localVue.extend(Result), {
    localVue,
    propsData: { result },
  });
  const { validator } = wrapper.vm.$options.props.result;

  const spy = jest.spyOn(console, 'error');
  afterEach(() => spy.mockReset());

  it('should throw exception when props.result not number', () => {
    const wrongResult = '123';

    expect(() => validator(wrongResult)).toThrow();
  });

  it('should throw exception when props.result not passed', () => {
    expect(() => validator()).toThrow();
  });

  it('props.result should equal passed data', () => {
    expect(wrapper.props().result).toEqual(result);
  });

  it('renders props.result when passed', () => {
    expect(wrapper.find('h3').text()).toMatch(`${result.toFixed(2)} WIN`);
  });

  it('renders loss message when props.result negative', () => {
    const negativeResult = -100;
    const wrapperExtra = mount(Result, {
      localVue,
      propsData: { result: negativeResult },
    });

    expect(wrapperExtra.find('h3').text()).toMatch(
      `${(-negativeResult).toFixed(2)} LOSS`
    );
  });
});
