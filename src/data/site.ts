export const SITE_NAME = 'Menace World Tech';
export const SITE_TAGLINE = 'Taking your business to another dimension.';
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
	{ number: '01', title: 'Audit', description: 'Review the current presence, priorities, and practical opportunities.' },
	{ number: '02', title: 'Build', description: 'Shape the strategy, content, systems, and assets around the agreed direction.' },
	{ number: '03', title: 'Launch', description: 'Put approved work into market across the channels selected for the business.' },
	{ number: '04', title: 'Optimize', description: 'Learn from performance, refine the execution, and report with clarity.' },
];

export const values = [
	'Clarity over jargon',
	'Local context',
	'Practical creativity',
	'Transparent execution',
	'Continuous improvement',
] as const;

export const siteMetadata = {
	description: 'Zimbabwe-based digital growth support for small businesses through strategy, content, advertising, web, automation, and transparent reporting.',
	locale: 'en_ZW',
} as const;
