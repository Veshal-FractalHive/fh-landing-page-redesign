/**
 * Company identity and contact details. The name and logo will change after the redesign:
 * update them here (and the logo file in src/assets/brand/) and nowhere else.
 */
export const site = {
	name: 'FractalHive',
	// TODO: the current site says "FractalHive Inc." but the privacy policy names FractalHive Solutions Private
	// Limited. Confirm which entity the footer should show.
	legalName: 'FractalHive Inc.',
	description:
		'ElevateRM, V-Track and Nico: AI platforms for relationship managers, collateral valuation and banking operations.',
	url: 'https://fractalhive.com',
	location: 'Bengaluru, India',
	// From the privacy policy.
	address:
		'2nd Floor, Incubinet Coworking Space, Marg Aditya Complex, Kothnur Main Road, JP Nagar 8th Phase, Bengaluru, Karnataka 560078',
	mapUrl: 'https://maps.app.goo.gl/wZ5DbBQFunt32nd68',
	email: 'contact@fractalhive.com',
	careersEmail: 'contact@fractalhive.com', // TODO: replace with a shared careers@ inbox
	phone: '+91 63660 01729',
	linkedin: 'https://www.linkedin.com/company/105007753',
} as const;

/** Main navigation. Products come first, by name (see docs/content/site-plan.md). */
export const nav = {
	products: [
		{ label: 'ElevateRM', href: '/products/elevaterm' },
		{ label: 'V-Track', href: '/products/v-track' },
		{ label: 'Nico', href: '/products/nico' },
	],
	company: [
		{ label: 'Insights', href: '/insights' },
		{ label: 'About', href: '/about' },
		{ label: 'Careers', href: '/careers' },
	],
	cta: { label: 'Request a demo', href: '/demo' },
} as const;
