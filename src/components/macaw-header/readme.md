# macaw-header



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
| `mwcHeaderHeight`  |             | `CustomEvent<object>` |
| `mwcHeaderInit`    |             | `CustomEvent<object>` |
| `mwcHeaderSticky`  |             | `CustomEvent<object>` |
| `mwcHeaderVisible` |             | `CustomEvent<object>` |


## Methods

### `getSettings() => Promise<{ height: number; sticky: boolean; visible: boolean; }>`

Returns the current settings.

#### Returns

Type: `Promise<{ height: number; sticky: boolean; visible: boolean; }>`



### `setSettings(settings: any) => Promise<{ height: number; sticky: boolean; visible: boolean; }>`

Change the settings of the Macaw Header Component, returns the current settings.

#### Returns

Type: `Promise<{ height: number; sticky: boolean; visible: boolean; }>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
