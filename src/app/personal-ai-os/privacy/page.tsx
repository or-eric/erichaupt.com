import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Personal AI OS Privacy',
    description: 'How Personal AI OS accesses, uses, stores and shares connected-account information.',
    alternates: { canonical: '/personal-ai-os/privacy' },
};

export default function PersonalOSPrivacyPage() {
    return (
        <>
            <h1>Privacy policy</h1>
            <p>Personal AI OS is a private application operated by Eric Haupt for his own authorized accounts. This policy covers the application and its Google connection. Last updated: October 7, 2026.</p>
            <h2>Information accessed</h2>
            <p>With the account owner&apos;s authorization, the application can read Google account identity information; Gmail message headers, content and attachments; calendar lists and event details; and Drive file information and contents. It requests read-only Gmail, Calendar and Drive access, together with basic identity permissions.</p>
            <p>A particular briefing may retrieve only a subset of that information. For example, the initial email review uses message headers and snippets. Read-only permission does not mean the application is unable to read message or file content.</p>
            <h2>How information is used</h2>
            <p>Information is used to provide the owner&apos;s requested assistant features: account review, briefings, answers, scheduling awareness and project continuity. Derived summaries and notes may be retained to support later work. Google account information is not sold, used for advertising, or used by this application to train a general-purpose AI model.</p>
            <h2>AI processing and service providers</h2>
            <p>Selected connected-account information may be included in requests to the AI provider configured by the owner, currently OpenAI, to produce answers or briefings. Local models may also be used. Google provides the account APIs; the configured AI provider processes the information included in a model request. Cloudflare hosts these public application-information pages.</p>
            <p>Provider processing and retention depend on the service and account settings in use. Google-derived information must be handled under provider arrangements and settings consistent with Google&apos;s Limited Use requirements. A provider or account configuration that does not meet those requirements must not be used for that information.</p>
            <p>The public website does not receive the assistant&apos;s OAuth tokens, private briefings or connected-account contents. Information is not shared with Obsidian Rowe&apos;s business systems merely because this website is hosted in the same Cloudflare account.</p>
            <h2>Storage and retention</h2>
            <p>Google access and refresh tokens are stored in the private environment using the connection tool&apos;s encrypted credential storage. Retrieved information, summaries, project notes and operational logs may be stored on the owner&apos;s devices. These derived files are not all separately encrypted by the application.</p>
            <p>Saved information remains until the owner removes it or changes the retention workflow. There is currently no automatic deletion period. Backups and AI-provider records may have separate retention settings; deleting a local briefing does not automatically remove those copies.</p>
            <h2>Access and disclosure</h2>
            <p>The application is for its owner. Access by service providers is limited to delivering the requested features. Other human access to Google-derived information requires the owner&apos;s affirmative agreement for the specific information, or a permitted security or legal purpose. The application does not offer public account registration or public access to private records.</p>
            <h2>Disconnecting and deleting information</h2>
            <p>The owner can revoke the Google connection through <a href="https://myaccount.google.com/connections" target="_blank" rel="noopener noreferrer">Google Account connections</a>. Revocation prevents subsequent retrieval but does not erase information already saved.</p>
            <p>To remove retained information, disconnect the account and remove its saved source records, derived summaries, relevant notes and applicable backup copies from the private environment. Provider-side information is managed through the provider&apos;s available data controls. Questions or deletion assistance can be directed to <a href="mailto:eric@erichaupt.com">eric@erichaupt.com</a>.</p>
            <h2>Google API Limited Use</h2>
            <p>Personal AI OS&apos;s use and transfer of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including its Limited Use requirements.</p>
            <h2>Changes</h2>
            <p>This policy will be updated when permissions, providers, storage or the application&apos;s use of information changes. Material changes will be reviewed before the application processes information under the new arrangement.</p>
        </>
    );
}
