import React from 'react';

import { Item } from './Item';
import file from '../assets/img/file.png';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Item',
  component: Item,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Item {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Projets',
  srcImd : file,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Item',
};

export const Ternary = Template.bind({});
Ternary.args = {
  size: 'large',
  label: 'Item',
};
