import { PHONE_E164, WHATSAPP_NUMBER } from '../data/site';

export const FREE_AUDIT_MESSAGE = "Hello Menace World Tech, I'd like a free growth audit for my business.";

export function buildWhatsAppUrl(message = FREE_AUDIT_MESSAGE): string {
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildCallUrl(): string {
	return `tel:${PHONE_E164}`;
}
