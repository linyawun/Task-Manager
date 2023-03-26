import { Link } from 'react-router-dom';
import { formatTime } from '../utilities/helper';

export default function TaskIntro({ issue }) {
  const repoUrl = new URL(issue.repository_url);
  const owner = repoUrl.pathname.split('/')[2];
  const repoName = repoUrl.pathname.split('/')[3];
  return (
    <div className='card mb-2' key={issue.id}>
      <div className='card-body'>
        <span
          className='badge mb-2'
          style={{ backgroundColor: `#${issue.labels[0].color}` }}
        >
          {issue.labels[0].name}
        </span>
        <h5 className='card-title'>
          <small>{issue.repository_url.split('repos/')[1]}</small>
          <Link
            to={`/taskinfo/${owner}/${repoName}/${issue.number}`}
            className='link-primary ms-2'
          >
            {issue.title}
          </Link>
        </h5>
        <small className='text-light'>{formatTime(issue.created_at)}</small>
      </div>
    </div>
  );
}
