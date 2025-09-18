import JobCard from "./JobCard";

const JobList = ({ jobs, onJobClick }) => (
  <div className="flex gap-6 flex-wrap">
    {jobs.map((job) => (
      <JobCard key={job.id} job={job} onClick={onJobClick} />
    ))}
  </div>
);

export default JobList;
