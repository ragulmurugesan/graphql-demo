import JobList from '../components/JobList';
// import { jobs } from '../lib/fake-data';
import { gql, useQuery } from "@apollo/client";
import { getJobs } from "../graphql/queries";
import { useEffect, useState } from 'react';

const JOBS = gql`
  query {
    jobs {
      id
      title
      desc  
      date
    }
  }
`;



function HomePage() {

  const { data, loading, error } = useQuery(JOBS);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs().then(data => setJobs(data))
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Oopsies!</p>

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      {jobs.length > 0 && <JobList jobs={data.jobs} />}
    </div>
  );
}

export default HomePage;
