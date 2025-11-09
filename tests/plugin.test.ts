import postcss from 'postcss';
import tailwind from 'tailwindcss';
import { describe, expect, it } from 'vitest';

import tailwindcssContainPlugin from '../src';

describe('tailwindcss-contain plugin', () => {
	it('generates basic contain utilities', async () => {
		const results = await postcss([
			tailwind({
				content: [
					{
						raw: `
							contain-none
							contain-strict
							contain-content
						`,
					},
				],
				plugins: [tailwindcssContainPlugin],
			}),
		]).process('@tailwind utilities', {
			from: undefined,
		});

		// Check for the presence of the classes
		expect(results.css).toContain('.contain-none');
		expect(results.css).toContain('.contain-strict');
		expect(results.css).toContain('.contain-content');

		// Check the actual CSS values (note: order may vary)
		expect(results.css).toMatch(/\.contain-none\s*{[^}]*contain:\s*none/);
		expect(results.css).toMatch(/\.contain-strict\s*{[^}]*contain:\s*(?:strict|size layout paint style)/);
		expect(results.css).toMatch(/\.contain-content\s*{[^}]*contain:\s*(?:content|layout paint style)/);
	});

	it('generates individual contain values', async () => {
		const results = await postcss([
			tailwind({
				content: [
					{
						raw: `
							contain-size
							contain-layout
							contain-paint
							contain-style
						`,
					},
				],
				plugins: [tailwindcssContainPlugin],
			}),
		]).process('@tailwind utilities', {
			from: undefined,
		});

		// Check that all individual values are generated
		expect(results.css).toContain('.contain-size');
		expect(results.css).toContain('.contain-layout');
		expect(results.css).toContain('.contain-paint');
		expect(results.css).toContain('.contain-style');
	});

	it('generates combination utilities', async () => {
		const results = await postcss([
			tailwind({
				content: [
					{
						raw: `
							contain-layout-paint
							contain-size-layout
							contain-inline-size-layout
							contain-layout-style-paint
						`,
					},
				],
				plugins: [tailwindcssContainPlugin],
			}),
		]).process('@tailwind utilities', {
			from: undefined,
		});

		// Check that combination classes are generated
		expect(results.css).toContain('.contain-layout-paint');
		expect(results.css).toContain('.contain-size-layout');
		expect(results.css).toContain('.contain-inline-size-layout');
		expect(results.css).toContain('.contain-layout-style-paint');
	});

	it('includes global CSS values', async () => {
		const results = await postcss([
			tailwind({
				content: [
					{
						raw: `
							contain-inherit
							contain-initial
							contain-revert
							contain-revert-layer
							contain-unset
						`,
					},
				],
				plugins: [tailwindcssContainPlugin],
			}),
		]).process('@tailwind utilities', {
			from: undefined,
		});

		// Check that global values are generated
		expect(results.css).toContain('.contain-inherit');
		expect(results.css).toContain('contain: inherit');
		expect(results.css).toContain('.contain-initial');
		expect(results.css).toContain('contain: initial');
		expect(results.css).toContain('.contain-revert');
		expect(results.css).toContain('contain: revert');
		expect(results.css).toContain('.contain-revert-layer');
		expect(results.css).toContain('contain: revert-layer');
		expect(results.css).toContain('.contain-unset');
		expect(results.css).toContain('contain: unset');
	});

	it('supports custom theme values', async () => {
		const results = await postcss([
			tailwind({
				content: [
					{
						raw: 'contain-custom contain-another',
					},
				],
				plugins: [tailwindcssContainPlugin],
				theme: {
					extend: {
						contain: {
							custom: 'layout paint',
							another: 'size style',
						},
					},
				},
			}),
		]).process('@tailwind utilities', {
			from: undefined,
		});

		// Check that custom values are generated
		expect(results.css).toContain('.contain-custom');
		expect(results.css).toContain('contain: layout paint');
		expect(results.css).toContain('.contain-another');
		expect(results.css).toContain('contain: size style');
	});

	it('verifies size and inline-size are mutually exclusive', async () => {
		const results = await postcss([
			tailwind({
				content: [
					{
						raw: `
							contain-size
							contain-inline-size
							contain-size-layout
							contain-inline-size-layout
						`,
					},
				],
				plugins: [tailwindcssContainPlugin],
			}),
		]).process('@tailwind utilities', {
			from: undefined,
		});

		// Both size and inline-size should exist separately
		expect(results.css).toContain('.contain-size');
		expect(results.css).toContain('.contain-inline-size');
		expect(results.css).toContain('.contain-size-layout');
		expect(results.css).toContain('.contain-inline-size-layout');

		// But size-inline-size should NOT exist (they're mutually exclusive)
		expect(results.css).not.toContain('.contain-size-inline-size');
	});

	it('generates utilities from theme configuration', async () => {
		const results = await postcss([
			tailwind({
				content: [
					{
						raw: 'contain-strict',
					},
				],
				plugins: [tailwindcssContainPlugin],
			}),
		]).process('@tailwind utilities', {
			from: undefined,
		});

		// The plugin should make theme('contain') available
		expect(results.css).toContain('.contain-strict');
	});
});
