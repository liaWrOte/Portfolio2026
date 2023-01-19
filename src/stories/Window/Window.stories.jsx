import React from 'react';

import { Window } from './Window';
import file from '../assets/img/file.png';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Window',
  component: Window,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Window {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Projets',
  srcImd : file,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Window',
};

export const Ternary = Template.bind({});
Ternary.args = {
  size: 'large',
  label: 'Window',
};
