export type SkillCategory = 'language' | 'framework' | 'database' | 'tool' | 'practice';

export interface SkillMeta {
	category: SkillCategory;
	iconSlug?: string;
	color?: string;
}

export const CATEGORY_LABEL: Record<SkillCategory, string> = {
	language: 'Languages',
	framework: 'Frameworks & Runtimes',
	database: 'Databases',
	tool: 'Tools & Platforms',
	practice: 'Practices & Methodologies'
};

export const CATEGORY_ACCENT: Record<SkillCategory, string> = {
	language: '34d399',
	framework: '38bdf8',
	database: 'fbbf24',
	tool: 'a78bfa',
	practice: '94a3b8'
};

export const SKILL_META: Record<string, SkillMeta> = {
	html: { category: 'language', iconSlug: 'html5', color: 'e34f26' },
	css: { category: 'language', iconSlug: 'css3', color: '1572b6' },
	javascript: { category: 'language', iconSlug: 'javascript', color: 'f7df1e' },
	typescript: { category: 'language', iconSlug: 'typescript', color: '3178c6' },
	php: { category: 'language', iconSlug: 'php', color: '8892bf' },
	java: { category: 'language', iconSlug: 'java', color: 'ed8b00' },
	go: { category: 'language', iconSlug: 'go', color: '00add8' },
	laravel: { category: 'framework', iconSlug: 'laravel', color: 'ff2d20' },
	'spring-boot': { category: 'framework', iconSlug: 'springboot', color: '6db33f' },
	nestjs: { category: 'framework', iconSlug: 'nestjs', color: 'e0234e' },
	'next-js': { category: 'framework', iconSlug: 'nextdotjs', color: 'ffffff' },
	'vue-js': { category: 'framework', iconSlug: 'vuejs', color: '4fc08d' },
	sveltekit: { category: 'framework', iconSlug: 'svelte', color: 'ff3e00' },
	'node-js': { category: 'framework', iconSlug: 'nodedotjs', color: '339933' },
	mysql: { category: 'database', iconSlug: 'mysql', color: '4479a1' },
	postgresql: { category: 'database', iconSlug: 'postgresql', color: '4169e1' },
	mongodb: { category: 'database', iconSlug: 'mongodb', color: '47a248' },
	git: { category: 'tool', iconSlug: 'git', color: 'f05032' },
	github: { category: 'tool', iconSlug: 'github', color: 'ffffff' },
	docker: { category: 'tool', iconSlug: 'docker', color: '2496ed' },
	linux: { category: 'tool', iconSlug: 'linux', color: 'e5e5e5' },
	'restful-api': { category: 'tool' },
	'agile-scrum-development': { category: 'practice' },
	'rapid-application-development': { category: 'practice' },
	'problem-solving': { category: 'practice' },
	'attention-to-detail': { category: 'practice' },
	collaboration: { category: 'practice' },
	'time-management': { category: 'practice' },
	'version-control': { category: 'practice' },
	'microservices-architecture': { category: 'practice' },
	'monolithic-architecture': { category: 'practice' },
	'tailwind-css': { category: 'framework', iconSlug: 'tailwindcss', color: '38bdf8' },
	'vanilla-javascript': { category: 'language', iconSlug: 'javascript', color: 'f7df1e' }
};

const DEFAULT_META: SkillMeta = { category: 'practice' };

export function resolveSkillMeta(id: string): SkillMeta {
	return SKILL_META[id] ?? DEFAULT_META;
}

const STOP_WORDS = new Set(['to', 'of', 'and', 'the', 'a', 'an']);

export function getSkillInitials(name: string): string {
	const words = name
		.split(/[\s/]+/)
		.filter((word) => word.length > 0 && !STOP_WORDS.has(word.toLowerCase()));

	if (words.length === 0) return name.slice(0, 2).toUpperCase();
	if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
	return (words[0][0] + words[1][0]).toUpperCase();
}
