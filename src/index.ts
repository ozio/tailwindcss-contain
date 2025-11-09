import plugin from 'tailwindcss/plugin';

/**
 * Generate all valid contain values based on MDN:
 * none | strict | content | [ size || inline-size || layout || style || paint ]
 * Plus global values: inherit, initial, revert, revert-layer, unset.
 */
function generateContainValues(): Record<string, string> {
	const values: Record<string, string> = {
		// Single keywords
		none: 'none',

		// Shorthands from spec
		strict: 'size layout paint style',
		content: 'layout paint style',

		// Global values
		inherit: 'inherit',
		initial: 'initial',
		revert: 'revert',
		'revert-layer': 'revert-layer',
		unset: 'unset',
	};

	const keywords = ['size', 'inline-size', 'layout', 'style', 'paint'];

	const hasBothSizeAndInlineSize = (parts: string[]): boolean =>
		parts.includes('size') && parts.includes('inline-size');

	const n = keywords.length;
	for (let mask = 1; mask < 1 << n; mask++) {
		const parts: string[] = [];
		for (let i = 0; i < n; i++) {
			if (mask & (1 << i)) parts.push(keywords[i]);
		}

		// `size` and `inline-size` are mutually exclusive
		if (hasBothSizeAndInlineSize(parts)) continue;

		const key = parts.join('-'); // e.g. "size-layout-paint"
		const value = parts.join(' '); // e.g. "size layout paint"

		if (!values[key]) {
			values[key] = value;
		}
	}

	return values;
}

const defaultContainValues = generateContainValues();

const tailwindcssContain = plugin(
	function ({ addUtilities, theme }) {
		// Allow user to override/extend theme.contain
		const containTheme = theme('contain') || defaultContainValues;

		const utilities = Object.entries(containTheme).reduce(
			(acc: Record<string, { contain: string }>, [name, value]) => {
				acc[`.contain-${name}`] = { contain: value as string };
				return acc;
			},
			{},
		);

		addUtilities(utilities);
	},
	{
		theme: {
			extend: {
				// Expose as theme('contain')
				contain: defaultContainValues,
			},
		},
	},
);

export default tailwindcssContain;
