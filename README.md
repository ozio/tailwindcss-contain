# @ozio/tailwindcss-contain

A Tailwind CSS plugin that provides utilities for the CSS `contain` property. This property allows you to indicate that an element and its contents are, as much as possible, independent of the rest of the document tree, enabling the browser to optimize rendering performance.

Please review the following resources for more information:

- https://developer.mozilla.org/en-US/docs/Web/CSS/contain
- https://web.dev/css-containment/

## Installation

Install the plugin from npm:

```sh
npm install -D @ozio/tailwindcss-contain
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
	theme: {
		// ...
	},
	plugins: [
		require("@ozio/tailwindcss-contain"),
		// ...
	],
};
```

## Usage

Use the `contain-{value}` classes to control CSS containment on an element:

```html
<div class="contain-strict">
	<!-- Applies: contain: size layout paint style -->
</div>

<div class="contain-content">
	<!-- Applies: contain: layout paint style -->
</div>

<div class="contain-layout-paint">
	<!-- Applies: contain: layout paint -->
</div>
```

## Available Classes

### Single Keywords

| Class          | CSS Output      |
|----------------|-----------------|
| `contain-none` | `contain: none` |

### Shorthands

| Class             | CSS Output                         |
|-------------------|------------------------------------|
| `contain-strict`  | `contain: size layout paint style` |
| `contain-content` | `contain: layout paint style`      |

### Individual Values

All individual values and their valid combinations are available:

- `contain-size`
- `contain-inline-size`
- `contain-layout`
- `contain-style`
- `contain-paint`

### Combinations

You can use any valid combination of the individual values (excluding mutually exclusive `size` and `inline-size` together):

- `contain-size-layout`
- `contain-size-paint`
- `contain-layout-paint`
- `contain-layout-style`
- `contain-paint-style`
- `contain-size-layout-paint`
- `contain-size-layout-style`
- `contain-size-paint-style`
- `contain-layout-paint-style`
- `contain-size-layout-paint-style`
- And many more valid combinations...

### Global Values

| Class                  | CSS Output              |
|------------------------|-------------------------|
| `contain-inherit`      | `contain: inherit`      |
| `contain-initial`      | `contain: initial`      |
| `contain-revert`       | `contain: revert`       |
| `contain-revert-layer` | `contain: revert-layer` |
| `contain-unset`        | `contain: unset`        |

## Configuration

You can configure additional defaults and override existing classes under the `contain` key in your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
	theme: {
		extend: {
			contain: {
				custom: "layout paint",
			},
		},
	},
};
```

With the above configuration, you could then use:

```html
<div class="contain-custom">...</div>
```

And this would output:

```css
.contain-custom {
	contain: layout paint;
}
```

## Performance Benefits

The CSS `contain` property can provide significant performance improvements by:

1. **Size containment** - The element's size is calculated independently of its children
2. **Layout containment** - Layout inside the element doesn't affect outside elements
3. **Paint containment** - Descendants don't display outside the element's bounds
4. **Style containment** - Effects of certain properties are scoped to the element

This helps browsers optimize rendering, especially for large pages or complex components.

## License

MIT © Nikolay Solovyov
