export interface Skill {
	readonly id: string;
	readonly name: string;
}

export function toSlug(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
}

function createSkill(name: string): Skill {
	return { id: toSlug(name), name } as const;
}

const _rawSkillNames: ReadonlySet<string> = new Set([
	'HTML',
	'CSS',
	'Javascript',
	'Typescript',
	'PHP',
	'Java',
	'Go',
	'Laravel',
	'Spring Boot',
	'NestJS',
	'Next.js',
	'Vue.js',
	'Sveltekit',
	'Git',
	'Github',
	'Docker',
	'MySQL',
	'PostgreSQL',
	'MongoDB',
	'Node.js',
	'Restful API',
	'Linux',
	'Agile/Scrum Development',
	'Rapid Application Development',
	'Problem Solving',
	'Attention to Detail',
	'Collaboration',
	'Time Management',
	'Version Control',
	'Microservices Architecture',
	'Monolithic Architecture'
]);

export const _defaultSkills: ReadonlyArray<Skill> = Array.from(_rawSkillNames, (name) =>
	createSkill(name)
);

export const _skillsById: ReadonlyMap<string, Skill> = new Map(
	_defaultSkills.map((skill) => [skill.id, skill])
);

export function isValidSkillId(id: string): boolean {
	return _skillsById.has(id);
}

export const _codePanelValue = `\
interface Skill {
  readonly id: string;
  readonly name: string;
}
 
const toSlug = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-").replace(/^-|-$/g, "");
 
const skills: Skill[] = [
  "HTML", "CSS", "Javascript", "Typescript",
  "PHP", "Java", "Go", "Laravel",
  "Spring Boot", "NestJS", "Next.js", "Vue.js",
  "Sveltekit", "Git", "Docker", "MySQL",
  "PostgreSQL", "MongoDB", "Node.js",
  "Restful API", "Linux",
  "Microservices Architecture",
  "Monolithic Architecture",
].map((name) => ({ id: toSlug(name), name }));
 
const hoarePartition = <T extends { name: string }>(
  v: T[],
  front: number,
  back: number
): number => {
  const pivot = v[Math.floor((front + back) / 2)];
  let lp = front - 1;
  let rp = back + 1;
 
  while (true) {
    do { lp++; }
    while (v[lp].name.localeCompare(pivot.name) < 0);
 
    do { rp--; }
    while (v[rp].name.localeCompare(pivot.name) > 0);
 
    if (lp >= rp) return rp;
 
    [v[lp], v[rp]] = [v[rp], v[lp]];
  }
};
 
const quickSort = <T extends { name: string }>(
  v: T[],
  front: number,
  back: number
): void => {
  if (front >= back) return;
 
  const p = hoarePartition(v, front, back);
  quickSort(v, front, p);
  quickSort(v, p + 1, back);
};
 
quickSort(skills, 0, skills.length - 1);
console.log(skills);
`;

export const _achievedSkills = {
	_f: [
		'Typescript',
		'Laravel',
		'NestJS',
		'Vue.js',
		'PHP',
		'Javascript',
		'PostgreSQL',
		'MySQL',
		'Restful API',
		'Swagger',
		'Git',
		'Github'
	],
	_s: [
		'PHP',
		'Javascript',
		'Typescript',
		'Laravel',
		'Vue.js',
		'Ionic',
		'PostgreSQL',
		'MySQL',
		'Docker',
		'Restful API',
		'Git',
		'Github'
	],
	_t: [
		'Java',
		'Spring Framework',
		'HTML',
		'CSS',
		'Javascript',
		'Oracle SQL Developer',
		'Git',
		'Postman',
		'Netbeans'
	]
};

export const _welcomeTexts = [
	'Selamat datang!',
	'Witaj!',
	'Добро пожаловать!',
	'Välkommen!',
	'Bem-vindo/a!',
	'Benvenuto/a!',
	'Bienvenue!',
	'¡Bienvenido/a!',
	'Willkommen!',
	'Hoş geldin!',
	'欢迎',
	'ようこそ',
	'어서 오십시오'
];

export const _goodbyeTexts = [
	'Sampai jumpa',
	'Dag',
	'Adeus',
	'Auf Wiedersehen',
	'Arrivederci',
	'Au revoir',
	'Adiós',
	'Hoşçakalın',
	'Hej då',
	'Do widzenia',
	'再见',
	'またね',
	'안녕히 계세요'
];

export interface ExperienceEntry {
	name: string;
	title: string;
	project: string;
	duration: string | (() => string);
	descriptionKey: string;
	skills: string[];
}

export function computeOngoingDuration(
	startYear: number,
	startMonth: number,
	startLabel: string
): string {
	const now = new Date();
	const start = new Date(startYear, startMonth);
	const months =
		(now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
	const monthName = now.toLocaleDateString('en-US', { month: 'short' });

	return `${startLabel} ─ ${monthName} ${now.getFullYear()} • ${months} ${months === 1 ? 'Month' : 'Months'}`;
}

export function resolveExperienceDuration(d: string | (() => string)): string {
	return typeof d === 'function' ? d() : d;
}

export const _experiences: ExperienceEntry[] = [
	{
		name: 'PT. Citiasia, Inc.',
		title: 'Full Stack Developer ─ Internship',
		project: 'SurveyAsia Website',
		duration: 'Feb 2023 ─ Jun 2023 • 5 Months',
		descriptionKey: 'content.experience.body.citiasia.description',
		skills: _achievedSkills._f
	},
	{
		name: 'PT. Sinergi Global Servis',
		title: 'IT Developer ─ Internship',
		project: 'SIDIA (Sales Distribution Application)',
		duration: 'Feb 2024 ─ Jun 2024 • 5 Months',
		descriptionKey: 'content.experience.body.sgs.description',
		skills: _achievedSkills._s
	},
	{
		name: 'PT. Astra Honda Motor',
		title: 'Junior Developer',
		project: 'AHMAS (Astra Honda Management Assistant System)',
		duration: () => computeOngoingDuration(2025, 7, 'Aug 2025'),
		descriptionKey: 'content.experience.body.ahm.description',
		skills: _achievedSkills._t
	}
];
