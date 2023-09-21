import Image from "next/image";
import Link from "next/link";

type SkillsList = readonly { name: string; image: string; link: string }[];

const programmingLanguages: SkillsList = [
    {
        image: "programming/typescript.svg",
        name: "TypeScript",
        link: "https://www.typescriptlang.org/",
    },
    {
        image: "programming/nodejs.svg",
        name: "Node.js",
        link: "https://nodejs.org/en",
    },
    {
        image: "programming/python.svg",
        name: "Python",
        link: "https://www.python.org/",
    },
    {
        image: "programming/golang.svg",
        name: "Go lang",
        link: "https://go.dev/",
    },
    {
        image: "programming/c.svg",
        name: "C lang",
        link: "https://gcc.gnu.org/",
    },
    { image: "programming/cc.svg", name: "C++", link: "https://gcc.gnu.org/" },
] as const;

const databases: SkillsList = [
    {
        image: "database/mysql.svg",
        name: "MySQL",
        link: "https://www.mysql.com/",
    },
    {
        image: "database/postgres.svg",
        name: "PostgreSQL",
        link: "https://www.postgresql.org/",
    },
    {
        image: "database/solr.svg",
        name: "Apache Solr",
        link: "https://solr.apache.org/",
    },
    {
        image: "database/elasticsearch.svg",
        name: "Elastic Search",
        link: "https://www.elastic.co/",
    },
    {
        image: "database/dynamodb.svg",
        name: "Amazon DynamoDB",
        link: "https://aws.amazon.com/dynamodb/",
    },
    {
        image: "database/athena.svg",
        name: "Amazon Athena",
        link: "https://aws.amazon.com/athena/",
    },
    {
        image: "database/mongodb.svg",
        name: "MongoDB",
        link: "https://www.mongodb.com/",
    },
] as const;

const frontend: SkillsList = [
    { image: "frontend/react.svg", name: "React", link: "https://react.dev/" },
    {
        image: "frontend/nextjs.svg",
        name: "Next.js",
        link: "https://nextjs.org/docs",
    },
    {
        image: "frontend/vuejs.svg",
        name: "Vue.js",
        link: "https://vuejs.org/guide/introduction.html",
    },
    {
        image: "frontend/tailwindcss.svg",
        name: "Tailwind Css",
        link: "https://tailwindcss.com/",
    },
] as const;

const backend: SkillsList = [
    {
        image: "backend/express.svg",
        name: "Express.js",
        link: "https://expressjs.com/",
    },
    {
        image: "backend/flask.svg",
        name: "Flask",
        link: "https://flask.palletsprojects.com/",
    },
    {
        image: "backend/prisma.svg",
        name: "Prisma",
        link: "https://www.prisma.io/",
    },
] as const;

const cloud: SkillsList = [
    { image: "cloud/aws.svg", name: "AWS", link: "https://aws.amazon.com/" },
];
const computing: SkillsList = [
    {
        image: "computing/ec2.svg",
        name: "Amazon EC2",
        link: "https://aws.amazon.com/ec2/",
    },
    {
        image: "computing/ecs.svg",
        name: "Amazon ECS",
        link: "https://aws.amazon.com/ecs/",
    },
    {
        image: "computing/eks.svg",
        name: "Amazon EKS",
        link: "https://aws.amazon.com/eks/",
    },
    {
        image: "computing/fargate.svg",
        name: "Fargate",
        link: "https://aws.amazon.com/fargate/",
    },
    {
        image: "computing/lambda.svg",
        name: "AWS Lambda",
        link: "https://aws.amazon.com/lambda/",
    },
];

const cicd: SkillsList = [
    {
        image: "cicd/codepipeline.svg",
        name: "AWS CodePipeline",
        link: "https://aws.amazon.com/codepipeline/",
    },
    {
        image: "cicd/codecommit.svg",
        name: "AWS CodeCommit",
        link: "https://aws.amazon.com/codecommit/",
    },
    {
        image: "cicd/codebuild.svg",
        name: "AWS CodeBuild",
        link: "https://aws.amazon.com/codebuild/",
    },
    {
        image: "cicd/codedeploy.svg",
        name: "AWS CodeDeploy",
        link: "https://aws.amazon.com/codedeploy/",
    },
    {
        image: "cicd/github.svg",
        name: "GitHub / GitHub Actions",
        link: "https://github.com/features/actions",
    },
];

const api: SkillsList = [
    {
        image: "api/apigateway.svg",
        name: "Amazon API Gateway",
        link: "https://aws.amazon.com/api-gateway/",
    },
    {
        image: "api/kong.svg",
        name: "Kong API Gateway",
        link: "https://konghq.com/",
    },
    {
        image: "api/appsync.svg",
        name: "AWS AppSync",
        link: "https://aws.amazon.com/appsync/",
    },
];

const Icon = async ({ image, name, link }: SkillsList[number]) => (
    <Link
        href={link}
        className="inline-block h-full w-full"
        target="_blank"
        rel="noopener noreferrer"
    >
        <div className="h-full w-full flex flex-col items-center text-center">
            <Image
                src={`/images/skills/${image}`}
                alt={name}
                width={"80"}
                height={"80"}
                className="w-10 h-10"
            />
            <span className="text-xs">{name}</span>
        </div>
    </Link>
);

const IconList = async ({ skillsList }: { skillsList: SkillsList }) => (
    <ul className="flex gap-8 flex-wrap mt-4 max-w-[304px] md:max-w-none md:mt-5">
        {skillsList.map((icon) => (
            <li key={icon.name} className="w-20 h-20">
                <Icon {...icon} />
            </li>
        ))}
    </ul>
);

const Skills = async () => {
    return (
        <section className="my-10 flex flex-col gap-11 items-center">
            <h1 className="font-black text-6xl">Skills</h1>
            <div className="flex flex-col gap-y-5">
                {[
                    {
                        skillsList: programmingLanguages,
                        title: "Programming languages",
                    },
                    {
                        skillsList: databases,
                        title: "Database",
                    },
                    {
                        skillsList: backend,
                        title: "Back end frameworks / libraries",
                    },
                    {
                        skillsList: frontend,
                        title: "Front end frameworks / libraries",
                    },
                    {
                        skillsList: cloud,
                        title: "Cloud",
                    },
                    {
                        skillsList: cicd,
                        title: "CI/CD",
                    },
                    {
                        skillsList: api,
                        title: "API",
                    },
                    {
                        skillsList: computing,
                        title: "Computing",
                    },
                ].map(({ skillsList, title }) => (
                    <section key={title}>
                        <h3 className="font-bold text-xl">{title}</h3>
                        <IconList skillsList={skillsList} />
                    </section>
                ))}
            </div>
        </section>
    );
};

export default Skills;
