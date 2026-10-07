import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Personal AI OS',
    description: 'A private assistant for Eric Haupt: briefings, connected-account review and continuity across personal projects.',
    alternates: { canonical: '/personal-ai-os' },
};

export default function PersonalOSPage() {
    return (
        <>
            <h1>More room for what matters.</h1>
            <p className="lead">Personal AI OS is Eric Haupt&apos;s private assistant for organizing commitments, reviewing information and resuming work with context.</p>
            <h2>What it does</h2>
            <p>The current setup brings together selected email, calendar and document information to help prepare briefings, identify items for review, answer questions and maintain project notes. It is under active development and is available only to its owner.</p>
            <h2>Why it connects to Google</h2>
            <ul>
                <li><strong>Gmail:</strong> read messages to identify commitments, communications and briefing material.</li>
                <li><strong>Calendar:</strong> read calendars and events to understand upcoming obligations.</li>
                <li><strong>Drive:</strong> find and read authorized files to support answers and project continuity.</li>
                <li><strong>Account identity:</strong> identify the Google account that granted access.</li>
            </ul>
            <p>Google access currently uses read-only permissions. It does not permit this connection to send or delete email, change calendar events, or modify Drive files. Any future expansion requires a separate authorization.</p>
            <h2>Your information and control</h2>
            <p>Connected-account information is processed in the private assistant environment. Selected information may also be processed by a configured AI provider to generate a requested answer or briefing. This public website hosts information about the application; it does not provide access to the assistant or its connected accounts.</p>
            <p>Access can be revoked at any time through <a href="https://myaccount.google.com/connections" target="_blank" rel="noopener noreferrer">Google Account connections</a>. Revoking access stops future account retrieval; removing previously saved information is a separate step described in the privacy policy.</p>
            <p>Read the <Link href="/personal-ai-os/privacy">privacy policy</Link> for data handling and retention, and the <Link href="/personal-ai-os/terms">terms of use</Link> for the application&apos;s scope.</p>
        </>
    );
}
