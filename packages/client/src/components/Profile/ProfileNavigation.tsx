;
import Link from "next/link";

const ProfileNavigation = () => {
  return (
    <nav className="space-y-1">
      <Link
        href={"/profile"}
        className="group flex items-center rounded-md px-3 py-2 text-sm font-medium bg-slate-100 text-violet-600 dark:bg-slate-800 dark:text-sky-600 hover:bg-slate-100 hover:text-slate-500 dark:hover:bg-slate-800"
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="-ml-1 mr-3 h-4 w-4 flex-shrink-0 text-violet-600 dark:text-sky-600"
          aria-hidden="true"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <polyline points="17 11 19 13 23 9"></polyline>
        </svg>
        <span className="truncate">প্রোফাইল</span>
      </Link>
      <Link
        href={"/profile/change-password"}
        className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-1 bg-slate-100 text-violet-600 dark:bg-slate-800 dark:text-sky-600 hover:bg-slate-100 hover:text-slate-500 dark:hover:bg-slate-800"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className="-ml-1 mr-3 h-4 w-4 flex-shrink-0 text-violet-600 dark:text-sky-600"
          aria-hidden="true"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zM5 10v10h14V10H5zm6 4h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2zm1-6V7a4 4 0 1 0-8 0v1h8z"></path>
          </g>
        </svg>
        <span className="truncate">পাসওয়ার্ড</span>
      </Link>
      <Link
        href={"/profile/transactions"}
        className="group flex items-center rounded-md px-3 py-2 text-sm font-medium bg-slate-100 text-violet-600 dark:bg-slate-800 dark:text-sky-600 hover:bg-slate-100 hover:text-slate-500 dark:hover:bg-slate-800"
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="-ml-1 mr-3 h-4 w-4 flex-shrink-0 text-violet-600 dark:text-sky-600"
          aria-hidden="true"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <desc></desc>
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
          <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
          <line x1="9" y1="7" x2="10" y2="7"></line>
          <line x1="9" y1="13" x2="15" y2="13"></line>
          <line x1="13" y1="17" x2="15" y2="17"></line>
        </svg>
        <span className="truncate">ট্রানজেকশন</span>
      </Link>
      <Link
        href={"/profile/enrollment"}
        className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-1 bg-slate-100 text-violet-600 dark:bg-slate-800 dark:text-sky-600 hover:bg-slate-100 hover:text-slate-500 dark:hover:bg-slate-800"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className="-ml-1 mr-3 h-4 w-4 flex-shrink-0 text-violet-600 dark:text-sky-600"
          aria-hidden="true"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 8c-.202 0-4.85.029-9 2.008C7.85 8.029 3.202 8 3 8a1 1 0 0 0-1 1v9.883a1 1 0 0 0 .305.719c.195.188.48.305.729.28l.127-.001c.683 0 4.296.098 8.416 2.025.016.008.034.005.05.011.119.049.244.083.373.083s.254-.034.374-.083c.016-.006.034-.003.05-.011 4.12-1.928 7.733-2.025 8.416-2.025l.127.001c.238.025.533-.092.729-.28.194-.189.304-.449.304-.719V9a1 1 0 0 0-1-1zM4 10.049c1.485.111 4.381.48 7 1.692v7.742c-3-1.175-5.59-1.494-7-1.576v-7.858zm16 7.858c-1.41.082-4 .401-7 1.576v-7.742c2.619-1.212 5.515-1.581 7-1.692v7.858z"></path>
          <circle cx="12" cy="5" r="3"></circle>
        </svg>
        <span className="truncate">এনরোলমেন্ট</span>
      </Link>
    </nav>
  );
}

export default ProfileNavigation