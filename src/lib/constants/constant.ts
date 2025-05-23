export const _defaultSkills: string[] = Array.from(
	new Set([
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
	])
);

export const _codePanelValue = `
const skills = Array.from(
  new Set([
    "HTML",
    "CSS",
    "Javascript",
    "Typescript",
    "PHP",
    "Java",
    "Go",
    "Laravel",
    "Spring Boot",
    "NestJS",
    "Next.js",
    "Vue.js",
    "Sveltekit",
    "Git",
    "Github",
    "Docker",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Node.js",
    "Restful API",
    "Linux",
    "Agile/Scrum Development",
    "Rapid Application Development",
    "Problem Solving",
    "Attention to Detail",
    "Collaboration",
    "Time Management",
    "Version Control",
    "Microservices Architecture",
    "Monolithic Architecture",
  ])
);

const hoarePartition = <T extends string | number>(
  v: T[],
  front: number,
  back: number
) => {
  const p = v[Math.floor((front + back) / 2)];
  let lp = front - 1;
  let rp = back + 1;

  while (true) {
    do {
      lp++;
    } while (v[lp] < p);

    do {
      rp--;
    } while (v[rp] > p);

    if (lp < rp) {
      const temp = v[lp];
      v[lp] = v[rp];
      v[rp] = temp;
    } else {
      return rp;
    }
  }
};

const quickSort = <T extends string | number>(
  v: T[],
  front: number,
  back: number
) => {
  if (v.length <= 1) return v;

  if (front < back) {
    const partition = hoarePartition(v, front, back);
    quickSort(v, front, partition);
    quickSort(v, partition + 1, back);
  }
};

function executable(): void {
  quickSort(skills, 0, skills.length - 1);
  console.log(skills);
}

function main() {
  executable();
}

main();
`;

export const _achievedSkills = {
	_f: ['Typescript', 'Laravel', 'NestJS', 'Vue.js', 'PostgreSQL', ' Rest API', 'Swagger', 'Git'],
	_s: ['Javascript', 'Laravel', 'Vue.js', 'Ionic', 'PostgreSQL', 'Docker', 'Git'],
	_t: ['Laravel', 'Vue.js', 'Mongodb', 'Figma']
};
