import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Personal AI OS Terms',
    description: 'Scope, authorization and use of the private Personal AI OS application.',
    alternates: { canonical: '/personal-ai-os/terms' },
};

export default function PersonalOSTermsPage() {
    return (
        <>
            <h1>Terms of use</h1>
            <p>Personal AI OS is a private application operated by Eric Haupt. These terms describe its intended use. Last updated: October 7, 2026.</p>
            <h2>Private use</h2>
            <p>The application is intended for its owner&apos;s personal organization and authorized accounts. It is under active development. This website is an information resource, not an invitation to register for a public service.</p>
            <h2>Account authorization</h2>
            <p>Connect only accounts and information you are authorized to use. Google permissions are granted through Google&apos;s consent flow and can be revoked at any time. The current Google connection is read-only. Sending messages, changing events, modifying files or taking other external actions requires an appropriately authorized workflow and permissions.</p>
            <h2>Review and responsibility</h2>
            <p>AI-generated summaries, recommendations and answers can be incomplete or incorrect. Check the original sources and the connected-account coverage before relying on a briefing. Review consequential decisions and externally visible actions before execution.</p>
            <h2>Data and third-party services</h2>
            <p>Use of connected information is described in the <Link href="/personal-ai-os/privacy">privacy policy</Link>. Google and configured AI providers operate under their own applicable terms and account settings. This application does not claim affiliation with or endorsement by those providers.</p>
            <h2>Availability and changes</h2>
            <p>Features and connections may change or become unavailable. The application is provided without a service-level commitment. Keep original records in their source systems and maintain appropriate backups of assistant notes.</p>
            <h2>Stopping use</h2>
            <p>You can stop using the application and revoke connected-account access. Previously saved information must be removed separately as explained in the privacy policy.</p>
            <h2>Contact</h2>
            <p>Questions about the application or these terms: <a href="mailto:eric@erichaupt.com">eric@erichaupt.com</a>.</p>
        </>
    );
}
