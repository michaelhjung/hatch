import './NotFound.css';
import { useHistory } from 'react-router-dom';

export default function NotFound() {
    const history = useHistory();

    return (
        <div className="not-found-container" >
            <div className='not-found-title-wrapper'>
                <div className='not-found-title'>Uh Oh.</div>
                <div className='not-found-subtitle'>This page does not currently exist, but it may be under construction!</div>
                <div className='not-found-subtitle2'>(If you're trying to get to a certain room, try double-checking your forward slashes.)</div>
            </div>
            <div className='not-found-img-container'>
                <img className='not-found-img' src="https://bit.ly/3WoXNzs" alt="construction" onError={e => e.target.src="https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1664&q=80"} />
            </div>
            <div className='main-page-button' onClick={() => history.push('/')}>GO BACK TO THE MAIN PAGE</div>
        </div>
    )
}
