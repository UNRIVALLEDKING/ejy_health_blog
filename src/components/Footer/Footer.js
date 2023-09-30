import { ejyHealthLogo } from '@/assets';
import { SNSData, title } from '@/constants/constant';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto container space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex flex-row items-center justify-center xl:justify-start gap-2">
              <Image className="w-10" src={ejyHealthLogo} alt={title} />
              <h1 className="text-2xl font-semibold">
                {title.slice(0, 3)}
                <span className="text-red-600">{title.slice(3)}</span>
              </h1>
              {/* <Link href="/">
                <Image className="w-40" src={largeLogo} alt={title} />
              </Link> */}
            </div>

            <p className="mt-4 max-w-xs text-white text-xl">
              Access the Superpower of Health
            </p>
            <p className="mt-4 max-w-xs text-gray-400">
              Get the exclusive early access.
            </p>
            <button className="bg-[#ff0000] hover:scale-[1.01]text-lg transition-all text-white text-xl mt-4 rounded-full px-10 py-2">
              Early Access &#10132;
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            <div>
              <p className="font-medium ">LINKS</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    href="https://ejyhealth.in/"
                    className="text-lg transition opacity-75 hover:opacity-100"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://ejyhealth.in/events"
                    className="text-lg transition opacity-75 hover:opacity-100"
                  >
                    Events
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://ejyhealth.in/community  "
                    className="text-lg transition opacity-75 hover:opacity-100"
                  >
                    Community
                  </Link>
                </li>

                <li>
                  <Link
                    href="/"
                    className="text-lg transition opacity-75 hover:opacity-100"
                  >
                    Health Gyan
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contactus"
                    className="text-lg transition opacity-75 hover:opacity-100"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium ">ABOUT</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-lg transition opacity-75 hover:opacity-100"
                  >
                    Resources
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://ejyhealth.in/career"
                    className="text-lg transition opacity-75 hover:opacity-100"
                  >
                    Career
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://ejyhealth.in/"
                    className="text-lg transition opacity-75 hover:opacity-100"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium">FEATURES</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    href="https://ejyhealth.in/"
                    className="text-lg transition opacity-75 hover:opacity-100"
                  >
                    Our Services
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://ejyhealth.in/career"
                    className="text-lg transition opacity-75 hover:opacity-100"
                  >
                    Job Portal
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://ejyhealth.in/contactus"
                    className="text-lg transition opacity-75 hover:opacity-100"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* <div>
              <p className="font-medium ">Legal</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link href="/" className="text-lg transition opacity-75 hover:opacity-100">
                    Accessibility
                  </Link>
                </li>

                <li>
                  <Link href="/" className="text-lg transition opacity-75 hover:opacity-100">
                    Returns Policy
                  </Link>
                </li>

                <li>
                  <Link href="/" className="text-lg transition opacity-75 hover:opacity-100">
                    Refund Policy
                  </Link>
                </li>

                <li>
                  <Link href="/" className="text-lg transition opacity-75 hover:opacity-100">
                    Hiring Statistics
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>

      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row justify-between xl:items-center">
          <div className="flex xl:w-1/2 flex-col xl:flex-row xl:gap-x-3">
            <Link href="/" className="transition opacity-75 hover:opacity-100">
              Privacy Policy
            </Link>
            <Link href="/" className="transition opacity-75 hover:opacity-100">
              T & C
            </Link>
          </div>
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-around w-full">
            <ul className="mt-2 flex gap-4">
              {SNSData.map((item, id) => (
                <li key={id}>
                  <Link
                    href={item.url}
                    rel="noreferrer"
                    target="_blank"
                    className="text-whitetext-lg transition opacity-75 hover:opacity-100"
                  >
                    <span className="sr-only">{item.title}</span>
                    <span className="text-2xl">{item.icon}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col mt-4 gap-y-4 xl:gap-4">
              <p className="text-gray-400">
                Address <br /> Incubation Cell, IIT Patna, Bihar, India
              </p>
            </div>
          </div>
        </div>
        <p className="text-base text-gray-200 mt-5 text-center w-full">
          &copy; 2023. EJYhealth. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
