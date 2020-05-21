# toucan-header



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description | Type                               | Default    |
| ----------------- | ------------------ | ----------- | ---------------------------------- | ---------- |
| `sticky`          | `sticky`           |             | `boolean`                          | `false`    |
| `transitionStyle` | `transition-style` |             | `"fade" \| "slide"`                | `'slide'`  |
| `visibility`      | `visibility`       |             | `"always" \| "hidden" \| "to-top"` | `'always'` |
| `visible`         | `visible`          |             | `boolean`                          | `true`     |


## Events

| Event              | Description | Type                  |
| ------------------ | ----------- | --------------------- |
| `twcHeaderHeight`  |             | `CustomEvent<object>` |
| `twcHeaderInit`    |             | `CustomEvent<object>` |
| `twcHeaderSticky`  |             | `CustomEvent<object>` |
| `twcHeaderVisible` |             | `CustomEvent<object>` |


## Methods

### `getSettings() => Promise<{ height: number; sticky: boolean; visible: boolean; }>`

Returns the current settings.

#### Returns

Type: `Promise<{ height: number; sticky: boolean; visible: boolean; }>`



### `setSettings(settings: any) => Promise<{ height: number; sticky: boolean; visible: boolean; }>`

Change the settings of the Toucan Header Component, returns the current settings.

#### Returns

Type: `Promise<{ height: number; sticky: boolean; visible: boolean; }>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
