import { getJob, getJobs } from "./db/jobs.js";

export const resolvers = {
    Query: {
        // getJob will be coming from db/jobs.js where we establish connection with sqlite
        job: (_root, { id }, context) => {
            console.log(context);
            return getJob(id);
        },
        jobs: () => {
            console.log( 'get jobs from server' );
            getJobs();
        },
        company: async (_root, { id }) => {
            const company = await getCompany(id);
            if (!company) {
                throw notFoundError('No Company found with id ' + id);
            }
            return company;
        },
    },
    Mutation: {
        createJob: (_root, { title, description }) => {
            const companyId = "";
            createJob(companyId, title, description);
        }
    },
    Company: {
        jobs: (company) => getJobsByCompany(company.id),
    },
}