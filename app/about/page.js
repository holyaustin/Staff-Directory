export const metadata = { title: "About | Staff Directory" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <p className="eyebrow">Project Documentation</p>
      <h1 className="section-heading">About this System</h1>

      <div className="mt-6 card-surface p-6 sm:p-8 space-y-5 text-sm text-steel-700 leading-relaxed">
        <p>
          The <strong className="text-ink">Staff Directory Information System</strong> is a web
          application built to centralise and simplify access to staff records at{" "}
          <strong className="text-ink">Akanu Ibiam Federal Polytechnic, Unwana</strong>. It
          replaces manual, paper-based record keeping with a searchable digital directory covering
          every school, department and staff member of the institution.
        </p>
        <p>
          The system allows administrative users to register new staff, update existing records,
          and remove outdated entries, while giving every visitor a fast way to search and filter
          staff by name, department or school.
        </p>

        <div>
          <p className="field-label mb-2">Core objectives</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide a single, authoritative index of staff across the Polytechnic.</li>
            <li>Allow quick search and filtering by department, school or name.</li>
            <li>Give each department and school a clear organisational overview.</li>
            <li>Support full create, read, update and delete operations on staff records.</li>
          </ul>
        </div>

        <div>
          <p className="field-label mb-2">Technology stack</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Next.js 16 (App Router) for both the interface and API routes.</li>
            <li>Tailwind CSS for the blue, black and white institutional theme.</li>
            <li>JSON files as a lightweight, file-based data store.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
