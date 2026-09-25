import { Component, Host, Prop, h } from '@stencil/core';

export interface SiafTimelineItem {
  id: string;
  title: string;
  time?: string;
  description?: string;
  status?: 'pending' | 'current' | 'finished';
}

/**
 * Timeline Kit TL_GOAL_VERTICAL (`19149:1332`):
 * gap 16 · title 12 Bold · row h45.
 */
@Component({ tag: 'siaf-timeline', styleUrl: 'siaf-timeline.css', shadow: true })
export class SiafTimeline {
  @Prop() items: SiafTimelineItem[] | string = [];

  private parsed(): SiafTimelineItem[] {
    if (typeof this.items === 'string') {
      try {
        return JSON.parse(this.items);
      } catch {
        return [];
      }
    }
    return this.items || [];
  }

  render() {
    return (
      <Host>
        <ol>
          {this.parsed().map(item => (
            <li class={{ [`status-${item.status || 'pending'}`]: true }}>
              <span class="rail" aria-hidden="true">
                <span class="dot" />
              </span>
              <div class="content">
                <div class="title">{item.title}</div>
                {item.time ? <time>{item.time}</time> : null}
                {item.description ? <p>{item.description}</p> : null}
              </div>
            </li>
          ))}
          <slot />
        </ol>
      </Host>
    );
  }
}
