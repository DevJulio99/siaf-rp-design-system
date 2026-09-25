import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Atoms/Tag',
  component: 'siaf-tag',
  argTypes: {
    selected: { control: 'boolean' },
    size: { control: 'select', options: ['standard', 'small'] },
  },
  args: { selected: false, size: 'standard', label: 'Label' },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) =>
    html`<siaf-tag ?selected=${args.selected} size=${args.size}>${args.label}</siaf-tag>`,
};

/** Filter tags: Selected × Size (check + expand_more cuando selected) */
export const Matrix: Story = {
  render: () => {
    const rows = [
      { selected: false, size: 'standard' as const, caption: 'Enabled · standard' },
      { selected: false, size: 'small' as const, caption: 'Enabled · small' },
      { selected: true, size: 'standard' as const, caption: 'Selected · standard' },
      { selected: true, size: 'small' as const, caption: 'Selected · small' },
    ];
    return html`
      <div style="display:grid;gap:16px">
        ${rows.map(
          (row) => html`
            <div style="display:flex;align-items:center;gap:16px">
              <span style="width:160px;font-size:11px;color:#666">${row.caption}</span>
              <siaf-tag ?selected=${row.selected} size=${row.size}>Label</siaf-tag>
              <siaf-tag ?selected=${row.selected} size=${row.size}>Año 2026</siaf-tag>
            </div>
          `,
        )}
      </div>
    `;
  },
};

export const Gallery: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
      <siaf-tag>Label</siaf-tag>
      <siaf-tag selected size="small">Label</siaf-tag>
      <siaf-tag selected size="small">UE 012</siaf-tag>
    </div>
  `,
};
