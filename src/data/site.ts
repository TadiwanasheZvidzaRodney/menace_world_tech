export const SITE_NAME = 'Menace World Tech';
export const SITE_TAGLINE = 'Connected digital systems. Clearer paths to growth.';
export const PHONE_DISPLAY = '+263 78 3980 802';
export const PHONE_E164 = '+263783980802';
export const WHATSAPP_NUMBER = '263783980802';

export interface NavigationItem {
	label: string;
	href: string;
}

export const navigation: NavigationItem[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Services', href: '/services' },
	{ label: 'Packages', href: '/packages' },
	{ label: 'About', href: '/about' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Contact', href: '/contact' },
];

export const capabilityStrip = [
	'Strategy',
	'Content',
	'Paid media',
	'Web',
	'Automation',
	'Reporting',
] as const;

export interface ProcessStep {
	number: string;
	title: string;
	description: string;
}

export const processSteps: ProcessStep[] = [
	{ number: '01', title: 'Understand', description: 'Review your offer, customer journey, current presence, and priorities.' },
	{ number: '02', title: 'Plan', description: 'Agree the scope, channels, content, budget, and useful measures.' },
	{ number: '03', title: 'Put it to work', description: 'Launch approved creative and systems across the channels that fit.' },
	{ number: '04', title: 'Learn and improve', description: 'Review the response together and decide what to refine next.' },
];

export const values = [
	'Clarity over jargon',
	'Local context',
	'Practical creativity',
	'Transparent execution',
	'Continuous improvement',
] as const;

export const siteMetadata = {
	description: 'Digital growth support for Zimbabwean businesses, from strategy and content to websites and automation, with clear fees and straightforward reporting.',
	locale: 'en_ZW',
} as const;
