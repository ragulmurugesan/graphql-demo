import { gql } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({ uri: 'http://localhost:9000/graphql' });

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

// A Basic query to fetch data from graphql 
export const getJobs = async () => {
    const GET_JOBS = gql`
        query {
            jobs {
                id
                title 
                desc
            }
        }
    `;
    const { jobs } = await client.query({ query: GET_JOBS }).then(res => res.data);
    return jobs;
}

// Pass argument to Gql 

export async function getJob(id) {
    const GET_JOB = gql`
        query ($jobId: ID!) {
            job(jobId: $jobId) {
                id
                title
                date
            }
        }
    `;
    const { job } = await client.query({ query: GET_JOB, variables: { jobId: id } }).then(res => res.data);
    return job;
}

// Perform mutation - Add a Job posting