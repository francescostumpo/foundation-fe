import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '@core/widgets';

const meta: Meta<ButtonComponent> = {
    title: 'Core/Widgets/Button',
    component: ButtonComponent,
};
export default meta;

type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
    args: {
        label: 'Click me',
    },
};
