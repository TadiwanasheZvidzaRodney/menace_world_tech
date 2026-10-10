export interface Service {
	id: string;
	title: string;
	shortTitle: string;
	description: string;
	featured: boolean;
}

export const services: Service[] = [
	{
		id: 'social-media-marketing',
		title: 'Social media marketing',
		shortTitle: 'Social media',
		description: 'Channel-aware planning and ongoing execution shaped around your business priorities.',
		featured: true,
	},
	{
		id: 'paid-advertising',
		title: 'Paid advertising',
		shortTitle: 'Paid advertising',
		description: 'Campaign setup, creative coordination, monitoring, and optimization with transparent reporting.',
		featured: true,
	},
	{
		id: 'website-design',
		title: 'Website design',
		shortTitle: 'Web design',
		description: 'Clear, responsive websites that make it easier to understand your offer and take the next step.',
		featured: true,
	},
	{
		id: 'ai-chatbot-development',
		title: 'AI chatbot development',
		shortTitle: 'AI chatbots',
		description: 'Practical conversation flows designed to support common enquiries and customer hand-offs.',
		featured: true,
	},
	{
		id: 'cloud-services',
		title: 'Cloud services',
		shortTitle: 'Cloud services',
		description: 'Cloud setup and support scoped around the tools and access your business actually needs.',
		featured: false,
	},
	{
		id: 'packaging-brand-design',
		title: 'Packaging & brand design',
		shortTitle: 'Brand design',
		description: 'Practical visual systems and packaging creative that help your business show up consistently.',
		featured: false,
	},
	{
		id: 'content-creation',
		title: 'Content creation',
		shortTitle: 'Content creation',
		description: 'Platform-ready concepts, copy, graphics, and short-form edits built from an agreed plan.',
		featured: true,
	},
	{
		id: 'community-management',
		title: 'Community management',
		shortTitle: 'Community',
		description: 'Consistent publishing and thoughtful response support within agreed working guidelines.',
		featured: true,
	},
];

export const featuredServices = services.filter((service) => service.featured);
