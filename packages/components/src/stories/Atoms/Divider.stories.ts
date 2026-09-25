import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Atoms/Divider',
  component: 'siaf-divider',
};
export default meta;

type Story = StoryObj;

/** Matriz: orientation horizontal | vertical */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:20px;max-width:320px">
      <div>
        <p style="margin:0 0 8px;font-size:11px;color:#666">horizontal (default)</p>
        <siaf-divider></siaf-divider>
      </div>
      <div style="display:flex;align-items:stretch;gap:16px;min-height:56px">
        <p style="margin:0;font-size:11px;color:#666;align-self:center">vertical</p>
        <siaf-divider orientation="vertical" style="height:56px"></siaf-divider>
      </div>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div style="display:flex;align-items:stretch;gap:16px;min-height:48px">
      <div style="flex:1;max-width:240px"><siaf-divider></siaf-divider></div>
      <siaf-divider orientation="vertical" style="height:48px"></siaf-divider>
    </div>
  `,
};
