import { ejyHealthLogo, footerBorder } from '@/assets';
import { SNSData, description, title } from '@/constants/constant';
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
              <h1 className="text-2xl font-bold">
                {title.slice(0, 3)}
                <span className="text-red-600">{title.slice(3)}</span>
              </h1>
            </div>

            <p className="mt-4 max-w-xs text-gray-300 text-center text-2xl font-semibold xl:text-start">
              Unlock the full potential of your health
            </p>
            <p className="mt-4 max-w-xs text-gray-300 text-center xl:text-start">
              Get the exclusive early access of the EJY Health by joining the
              waitlist.
            </p>
            <button className="bg-[#ff0000] hover:scale-[1.01] transition-all text-white text-xl mt-4 rounded-full px-10 py-2">
              Join The Waitlist &#10132;
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium ">Services</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link href="/" className=" transition hover:opacity-75">
                    1on1 Coaching
                  </Link>
                </li>

                <li>
                  <Link href="/" className=" transition hover:opacity-75">
                    Company Review
                  </Link>
                </li>

                <li>
                  <Link href="/" className=" transition hover:opacity-75">
                    Accounts Review
                  </Link>
                </li>

                <li>
                  <Link href="/" className=" transition hover:opacity-75">
                    HR Consulting
                  </Link>
                </li>

                <li>
                  <Link href="/" className=" transition hover:opacity-75">
                    SEO Optimisation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium ">Company</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link href="/" className=" transition hover:opacity-75">
                    About
                  </Link>
                </li>

                <li>
                  <Link href="/" className=" transition hover:opacity-75">
                    Meet the Team
                  </Link>
                </li>

                <li>
                  <Link href="/" className=" transition hover:opacity-75">
                    Accounts Review
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium ">Helpful Links</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link href="/" className=" transition hover:opacity-75">
                    Contact
                  </Link>
                </li>

                <li>
                  <Link href="/" className=" transition hover:opacity-75">
                    FAQs
                  </Link>
                </li>

                <li>
                  <Link href="/" className=" transition hover:opacity-75">
                    Live Chat
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium ">Legal</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link href="/" className=" transition hover:opacity-75">
                    Accessibility
                  </Link>
                </li>

                <li>
                  <Link href="/" className=" transition hover:opacity-75">
                    Returns Policy
                  </Link>
                </li>

                <li>
                  <Link href="/" className=" transition hover:opacity-75">
                    Refund Policy
                  </Link>
                </li>

                <li>
                  <Link href="/" className=" transition hover:opacity-75">
                    Hiring Statistics
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Image
        className="w-full hidden xl:block"
        src={footerBorder}
        alt="footerBorder"
      />
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row justify-between xl:items-center">
          <div className="flex flex-col xl:flex-row xl:gap-x-3">
            <Link href="/" className="transition hover:opacity-75">
              Privacy Policy
            </Link>
            <Link href="/" className="transition hover:opacity-75">
              T & C
            </Link>
          </div>
          <div className="flex flex-col mt-4 gap-y-4 xl:gap-4">
            <div>
              <p>Follow Us</p>
              <ul className="mt-2 flex gap-4">
                {SNSData.map((item, id) => (
                  <li key={id}>
                    <Link
                      href={item.url}
                      rel="noreferrer"
                      target="_blank"
                      className="text-white transition hover:opacity-75"
                    >
                      <span className="sr-only">{item.title}</span>
                      <span className="text-2xl">{item.icon}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p>Address : Incubation Cell, IIT Patna</p>
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
