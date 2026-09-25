import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

/**
 * Navbar Ver Transversales `5104:4022`:
 * h56 · pad 4/16 · Logo (menu 32 + logo 128, gap 24) · notif 32 · perfil (avatar 40 + name/office + chevron 24).
 */
@Component({ tag: 'siaf-navbar', styleUrl: 'siaf-navbar.css', shadow: true })
export class SiafNavbar {
  /** Texto fallback si no hay slot brand ni logoSrc */
  @Prop() brand = 'SIAF-RP';
  /** Logo SIAF (Transversales · 128×40). Default asset del paquete. */
  @Prop() logoSrc = '/assets/navbar/logo-siaf.svg';
  @Prop() logoAlt = 'SiAF-RP';
  /** Mostrar toggle menú (Menu header 20 en hit 32) */
  @Prop() showMenu = true;
  /** Mostrar campana notifications 32 */
  @Prop() showNotifications = true;
  @Prop() userName = '';
  @Prop() userOffice = '';
  @Prop() userInitials = '';

  @Event() siafMenuClick!: EventEmitter<void>;
  @Event() siafNotificationsClick!: EventEmitter<void>;
  @Event() siafProfileClick!: EventEmitter<void>;

  private initials(): string {
    if (this.userInitials) return this.userInitials.slice(0, 2).toUpperCase();
    const parts = (this.userName || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  private hasProfile(): boolean {
    return !!(this.userName || this.userOffice || this.userInitials);
  }

  render() {
    const initials = this.initials();
    return (
      <Host>
        <header class="nav" part="nav">
          <div class="start">
            {this.showMenu ? (
              <button
                type="button"
                class="menu-btn"
                part="menu"
                aria-label="Abrir menú"
                onClick={() => this.siafMenuClick.emit()}
              >
                <slot name="menu">
                  <siaf-icon name="menu" size="md"></siaf-icon>
                </slot>
              </button>
            ) : null}
            <div class="brand" part="brand">
              <slot name="brand">
                {this.logoSrc ? (
                  <img class="logo" src={this.logoSrc} alt={this.logoAlt} width={128} height={40} />
                ) : (
                  <span class="brand-text">{this.brand}</span>
                )}
              </slot>
            </div>
          </div>

          <div class="center">
            <slot />
          </div>

          <div class="end" part="actions">
            <slot name="actions">
              {this.showNotifications ? (
                <button
                  type="button"
                  class="icon-btn"
                  part="notifications"
                  aria-label="Notificaciones"
                  onClick={() => this.siafNotificationsClick.emit()}
                >
                  <siaf-icon name="notifications" size="xl"></siaf-icon>
                </button>
              ) : null}
              {this.hasProfile() ? (
                <button
                  type="button"
                  class="profile"
                  part="profile"
                  aria-label={this.userName || 'Perfil'}
                  onClick={() => this.siafProfileClick.emit()}
                >
                  <span class="profile-main">
                    <span class="avatar" aria-hidden="true">
                      {initials || '·'}
                    </span>
                    <span class="user-block">
                      {this.userName ? <span class="user-name">{this.userName}</span> : null}
                      {this.userOffice ? <span class="user-office">{this.userOffice}</span> : null}
                    </span>
                  </span>
                  <siaf-icon name="expand_more" size="lg"></siaf-icon>
                </button>
              ) : null}
            </slot>
          </div>
        </header>
      </Host>
    );
  }
}
