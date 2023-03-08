import React from 'react';

import { Stolify } from './Stolify';
import file from '../assets/img/file.png';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Stolify',
  component: Stolify,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Stolify {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Projets',
  srcImd : file,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Stolify',
};

export const Ternary = Template.bind({});
Ternary.args = {
  size: 'large',
  label: 'Stolify',
};
