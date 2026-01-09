"use client";

export default function LinkedInButton() {
    return (
        <a
            href="https://www.linkedin.com/in/swarup-shekhar1711/"
            target="_blank"
            rel="noopener noreferrer"
        >
            <button className="group w-12 hover:w-44 h-12 hover:bg-sky-600 relative bg-sky-700 rounded text-neutral-50 duration-700 font-bold flex justify-start gap-2 items-center p-2 pr-6 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 shrink-0 fill-white">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.21-.43-2-1.52-2A1.6 1.6 0 0013 13.82V19h-3v-9h3v1.4a3.13 3.13 0 012.8-1.54c2.05 0 3.2 1.34 3.2 4.21z" />
                </svg>

                <span className="origin-left inline-flex duration-300 delay-200 opacity-0 group-hover:opacity-100 border-l-2 px-2 transform scale-x-0 group-hover:scale-x-100 transition-all">
                    LinkedIn
                </span>
            </button>
        </a>
    );
}
