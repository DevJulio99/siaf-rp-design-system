# siaf-menu



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                              | Type                       | Default      |
| --------- | --------- | ---------------------------------------- | -------------------------- | ------------ |
| `density` | `density` | Standard h48 · Compact h32 (Kit Density) | `"compact" \| "standard"`  | `'standard'` |
| `items`   | `items`   |                                          | `SiafMenuItem[] \| string` | `[]`         |


## Events

| Event        | Description | Type                  |
| ------------ | ----------- | --------------------- |
| `siafSelect` |             | `CustomEvent<string>` |


## Slots

| Slot        | Description |
| ----------- | ----------- |
| `"trigger"` |             |


## Dependencies

### Depends on

- [siaf-button](../siaf-button)

### Graph
```mermaid
graph TD;
  siaf-menu --> siaf-button
  siaf-button --> siaf-icon
  style siaf-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
