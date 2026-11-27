export interface PackageTier {
	id: string;
	name: string;
	label: string;
	managementFee: string;
	adBudget: string;
}

export const packageTiers: PackageTier[] = [
	{ id: 'starter-presence', name: 'Starter Presence', label: 'Build Visibility', managementFee: '$60–$150/mo', adBudget: '$20–$50/mo' },
	{ id: 'growth-engagement', name: 'Growth Engagement', label: 'Invite Enquiries', managementFee: '$120–$300/mo', adBudget: '$50–$150/mo' },
	{ id: 'business-boost', name: 'Business Boost', label: 'Support Sales', managementFee: '$250–$500/mo', adBudget: '$100–$300/mo' },
	{ id: 'premium', name: 'Premium', label: 'Connected Growth', managementFee: '$400–$600/mo', adBudget: '$200+/mo' },
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
		answer: 'The management fee pays for the agreed work. Your ad spend is a separate budget paid to the advertising platform from an account you control. We agree both amounts upfront and report on campaign activity clearly.',
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
		answer: 'Your business keeps control of its pages and advertising accounts. We agree the access needed to manage the work before anything launches.',
	},
	{
		question: 'How will we know if the work is helping?',
		answer: 'We agree on what matters to your business, review the available data together, and talk about what to improve. You will always know what we are working on and why.',
	},
];

export const pricingNote = 'All prices are USD management-fee ranges. Your separate ad budget stays under your control and is paid to the advertising platform.';
