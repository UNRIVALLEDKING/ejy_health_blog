import Link from 'next/link';

export default function page() {
  return (
    <div className="text-black w-full bg-transparent md:pb-20">
      <div className="text-right">
        <h1 className="text-4xl text-center">Events</h1>
        <Link href={'/events/create'} className="btn-primary">
          Create Event
        </Link>
      </div>
      No Events Available
    </div>
  );
}
