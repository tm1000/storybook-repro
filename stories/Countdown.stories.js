import React from 'react';

//https://github.com/storybookjs/storybook/issues/9586

// This is wrapped in memo and will not show documentation
import Countdown from '../lib/Countdown';

//This is a direct export and will show documentation
//import { Countdown } from '../lib/Countdown/Countdown';

export default {
	title: 'Countdown Timer',
	component: Countdown,
	argTypes: {
		display: {
			control: {
				type: 'inline-radio',
				options: ['seconds', 'hours', 'minutes'],
			},
		},
	},
};

const Template = args => <Countdown {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	expireTime: parseInt((new Date().getTime() / 1000).toFixed(0)) + 3600,
};
