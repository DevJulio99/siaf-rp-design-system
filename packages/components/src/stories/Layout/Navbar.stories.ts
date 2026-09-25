import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Layout/Navbar',
  component: 'siaf-navbar',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    showMenu: { control: 'boolean' },
    showNotifications: { control: 'boolean' },
  },
  args: {
    showMenu: true,
    showNotifications: true,
    userName: 'Juan Doe Perez Perez',
    userOffice: 'Office name',
    userInitials: 'JP',
    logoSrc: '/assets/navbar/logo-siaf.svg',
  },
};
export default meta;

type Story = StoryObj;

/** Desktop full: menu + logo + notificaciones + perfil */
export const DesktopFull: Story = {
  render: (args) =>
    html`<siaf-navbar
      ?show-menu=${args.showMenu}
      ?show-notifications=${args.showNotifications}
      user-name=${args.userName}
      user-office=${args.userOffice}
      user-initials=${args.userInitials}
      logo-src=${args.logoSrc}
    ></siaf-navbar>`,
};

export const Matrix: Story = {
  render: () =>
    html`<siaf-navbar
      show-menu
      show-notifications
      user-name="Juan Doe Perez Perez"
      user-office="Office name"
      user-initials="JP"
      logo-src="/assets/navbar/logo-siaf.svg"
    ></siaf-navbar>`,
};

export const Gallery: Story = {
  render: () => html`<siaf-navbar></siaf-navbar>`,
};
