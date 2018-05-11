import Vuetify from 'vuetify';
import Balance from '@/components/Hash.vue';
import { createLocalVue, mount, shallow } from '@vue/test-utils';

describe('Hash.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);

  const hash = 'lksjflkjdflkj393948';
  const wrapper = mount(Balance, {
    localVue,
    propsData: { hash },
  });

  it('props.hash should equal passed data', () => {
    expect(wrapper.props().hash).toEqual(hash);
  });

  it('renders props.hash when passed', () => {
    expect(wrapper.find('h3').text()).toMatch(hash);
  });
});
