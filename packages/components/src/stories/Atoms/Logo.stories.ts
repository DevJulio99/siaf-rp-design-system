import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Atoms/Logo',
  component: 'siaf-logo',
};
export default meta;

type Story = StoryObj;

export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:24px;padding:16px;background:#1a1a1a;border-radius:8px">
      <div style="display:flex;flex-wrap:wrap;gap:24px;align-items:flex-end">
        <siaf-logo variant="blanco" version="simplificado"></siaf-logo>
        <siaf-logo variant="blanco" version="default"></siaf-logo>
      </div>
    </div>
    <div style="display:grid;gap:24px;padding:16px;margin-top:16px;background:#f5f5f5;border-radius:8px">
      <div style="display:flex;flex-wrap:wrap;gap:24px;align-items:flex-end">
        <siaf-logo variant="negro" version="simplificado"></siaf-logo>
        <siaf-logo variant="negro" version="default"></siaf-logo>
        <siaf-logo variant="acolor" version="simplificado"></siaf-logo>
        <siaf-logo variant="acolor" version="default"></siaf-logo>
      </div>
    </div>
  `,
};
