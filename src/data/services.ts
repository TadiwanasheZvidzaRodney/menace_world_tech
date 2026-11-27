export interface Service {
	id: string;
	title: string;
	shortTitle: string;
	outcome: string;
	description: string;
	featured: boolean;
}

export const services: Service[] = [
	{
		id: 'social-media-marketing',
		title: 'Social media marketing',
		shortTitle: 'Social media',
		outcome: 'Turn regular posts into a clearer path to enquiry.',
		description: 'We connect audience insight, useful content, and consistent publishing around the channels your customers use.',
		featured: true,
	},
	{
		id: 'paid-advertising',
		title: 'Paid advertising',
		shortTitle: 'Paid advertising',
		outcome: 'Put your budget behind a message people can act on.',
		description: 'We plan, launch, and improve targeted campaigns while keeping your management fee and client-controlled ad spend separate.',
		featured: true,
	},
	{
		id: 'website-design',
		title: 'Website design',
		shortTitle: 'Web design',
		outcome: 'Give buyers a reason to trust you and get in touch.',
		description: 'We build responsive pages that explain your offer, answer key questions, and make the next step easy on mobile.',
		featured: true,
	},
	{
		id: 'ai-chatbot-development',
		title: 'AI chatbot development',
		shortTitle: 'AI chatbots',
		outcome: 'Keep useful enquiries moving, even after hours.',
		description: 'We set up helpful conversation flows to answer common questions, capture details, and hand complex requests to a person.',
		featured: true,
	},
	{
		id: 'cloud-services',
		title: 'Cloud services',
		shortTitle: 'Cloud services',
		outcome: 'Make the digital tools behind your business work together.',
		description: 'We configure practical cloud, hosting, email, and backup tools around the way your team works.',
		featured: false,
	},
	{
		id: 'packaging-brand-design',
		title: 'Packaging & brand design',
		shortTitle: 'Brand design',
		outcome: 'Look as dependable as the business you have built.',
		description: 'We create clear visual identities, packaging, and print-ready assets that help customers recognise your business.',
		featured: false,
	},
	{
		id: 'content-creation',
		title: 'Content creation',
		shortTitle: 'Content creation',
		outcome: 'Make your offer easier to notice and understand.',
		description: 'We shape useful concepts, copy, graphics, and short-form edits into a consistent plan for your channels.',
		featured: true,
	},
	{
		id: 'community-management',
		title: 'Community management',
		shortTitle: 'Community',
		outcome: 'Keep customer conversations from going cold.',
		description: 'We support publishing and timely, thoughtful responses to comments and messages within an agreed scope.',
		featured: true,
	},
];

export const featuredServices = services.filter((service) => service.featured);
