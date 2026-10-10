export interface PackageTier {
	id: string;
	name: string;
	label: string;
	managementFee: string;
	adBudget: string;
}

export const packageTiers: PackageTier[] = [
	{ id: 'starter-presence', name: 'Starter Presence', label: 'Get Visible', managementFee: '$60–$150/mo', adBudget: '$20–$50/mo' },
	{ id: 'growth-engagement', name: 'Growth Engagement', label: 'Get Customers', managementFee: '$120–$300/mo', adBudget: '$50–$150/mo' },
	{ id: 'business-boost', name: 'Business Boost', label: 'Make Sales', managementFee: '$250–$500/mo', adBudget: '$100–$300/mo' },
	{ id: 'premium', name: 'Premium', label: 'Full Command', managementFee: '$400–$600/mo', adBudget: '$200+/mo' },
];

export interface AddOn {
	name: string;
	price: string;
	unit?: string;
}

export const addOns: AddOn[] = [
	{ name: 'Logo', price: '$20–$50' },
	{ name: 'Flyer/post', price: '$3–$10', unit: 'per piece' },
	{ name: 'TikTok editing', price: '$5–$15' },
	{ name: 'On-location shoot', price: '$30–$100' },
	{ name: 'Page setup/audit', price: '$20–$40' },
];

export interface FaqItem {
	question: string;
	answer: string;
}

export const packageFaqs: FaqItem[] = [
	{
		question: 'What is the difference between the management fee and ad spend?',
		answer: 'The management fee covers the agreed service work. Ad spend is an additional, agreed budget used by the advertising platform and kept transparent.',
	},
	{
		question: 'How do onboarding and payment work?',
		answer: 'Scope, timing, access needs, and payment terms are confirmed with you before work begins.',
	},
	{
		question: 'Will I approve content?',
		answer: 'An approval approach is agreed during onboarding so responsibilities and publishing decisions are clear.',
	},
	{
		question: 'Which platforms will you use?',
		answer: 'Channels are selected for the business and audience rather than added by default.',
	},
	{
		question: 'Who owns the accounts?',
		answer: 'Business-owned accounts are preferred where the selected platform supports them, with access arrangements agreed before execution.',
	},
	{
		question: 'Are results guaranteed?',
		answer: 'No. Outcomes vary by offer, market, budget, timing, and execution. The focus is practical strategy, ongoing optimization, and transparent reporting.',
	},
];

export const pricingNote = 'All prices are USD management-fee ranges. Ad spend is additional, agreed, and transparent.';
