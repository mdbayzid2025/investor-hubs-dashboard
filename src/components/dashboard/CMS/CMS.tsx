import {
  CheckCircle,
  Clock,
  Edit3,
  Eye,
  FileText,
  Globe,
  Save
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../ui/button';

type PageType = 'about' | 'privacy' | 'terms' | 'contact' | 'faq' | 'how-it-works';

interface PageContent {
  id: PageType;
  title: string;
  slug: string;
  lastUpdated: string;
  status: 'published' | 'draft';
  content: string;
}

export default function CMS() {
  const [selectedPage, setSelectedPage] = useState<PageType>('about');
  const [isSaving, setIsSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [pages, setPages] = useState<PageContent[]>([
    {
      id: 'about',
      title: 'About Us',
      slug: '/about',
      lastUpdated: '2024-01-15',
      status: 'published',
      content: `<h1>About Investors Hub</h1>

<p>Investors Hub is the premier platform connecting discerning investors with exclusive property investment opportunities. Our mission is to democratize access to high-value real estate deals while maintaining the highest standards of privacy and professionalism.</p>

<h2>Our Story</h2>
<p>Founded in 2020, Investors Hub emerged from a simple observation: the traditional real estate investment market was fragmented, opaque, and difficult to navigate for serious investors seeking premium opportunities.</p>

<h2>What We Do</h2>
<p>We curate exceptional property investment opportunities and connect them with verified, accredited investors. Every listing on our platform undergoes rigorous vetting to ensure quality, legitimacy, and investment potential.</p>

<h2>Our Approach</h2>
<ul>
<li><strong>Privacy First:</strong> We protect both property locations and investor identities through advanced privacy features</li>
<li><strong>Quality Over Quantity:</strong> Only verified, premium listings make it to our platform</li>
<li><strong>Offline Excellence:</strong> All deals are finalized through our admin team to ensure security and professionalism</li>
<li><strong>Transparency:</strong> Clear information, honest communication, no hidden fees</li>
</ul>

<h2>Why Choose Us</h2>
<p>Unlike traditional platforms, we don't facilitate direct transactions. Instead, we serve as a sophisticated matchmaking service, introducing verified investors to curated opportunities while maintaining complete discretion throughout the process.</p>`
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      slug: '/privacy',
      lastUpdated: '2024-01-10',
      status: 'published',
      content: `<h1>Privacy Policy</h1>
<p><em>Last Updated: January 10, 2024</em></p>

<h2>1. Information We Collect</h2>
<p>We collect information you provide directly to us, including:</p>
<ul>
<li>Name, email address, and contact information</li>
<li>Investment preferences and financial qualifications</li>
<li>Identity verification documents</li>
<li>Communication records and inquiry history</li>
</ul>

<h2>2. How We Use Your Information</h2>
<p>Your information is used to:</p>
<ul>
<li>Verify your identity and investment qualifications</li>
<li>Match you with relevant investment opportunities</li>
<li>Facilitate communication between parties</li>
<li>Improve our services and user experience</li>
<li>Comply with legal obligations</li>
</ul>

<h2>3. Information Sharing</h2>
<p>We do not sell your personal information. We may share your information:</p>
<ul>
<li>With property owners when you express interest (with your consent)</li>
<li>With service providers who assist our operations</li>
<li>When required by law or to protect our rights</li>
</ul>

<h2>4. Data Security</h2>
<p>We implement industry-standard security measures to protect your information, including encryption, secure servers, and regular security audits.</p>

<h2>5. Your Rights</h2>
<p>You have the right to:</p>
<ul>
<li>Access your personal information</li>
<li>Request corrections or deletions</li>
<li>Opt-out of marketing communications</li>
<li>Request data portability</li>
</ul>

<h2>6. Cookies</h2>
<p>We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content.</p>

<h2>7. Contact Us</h2>
<p>For privacy-related questions or requests, contact us at privacy@investorshub.com</p>`
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      slug: '/terms',
      lastUpdated: '2024-01-10',
      status: 'published',
      content: `<h1>Terms and Conditions</h1>
<p><em>Last Updated: January 10, 2024</em></p>

<h2>1. Acceptance of Terms</h2>
<p>By accessing and using Investors Hub, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our platform.</p>

<h2>2. Eligibility</h2>
<p>To use our platform, you must:</p>
<ul>
<li>Be at least 18 years of age</li>
<li>Have the legal capacity to enter into binding agreements</li>
<li>Provide accurate and complete registration information</li>
<li>Comply with all applicable laws and regulations</li>
</ul>

<h2>3. Account Registration</h2>
<p>Users must create an account and undergo verification. You are responsible for:</p>
<ul>
<li>Maintaining the confidentiality of your account credentials</li>
<li>All activities that occur under your account</li>
<li>Notifying us immediately of any unauthorized access</li>
</ul>

<h2>4. Platform Usage</h2>
<p>Investors Hub is an introduction service. We:</p>
<ul>
<li>Do NOT facilitate direct transactions between users</li>
<li>Do NOT provide investment advice or recommendations</li>
<li>Do NOT guarantee the accuracy of listing information</li>
<li>Require all deals to be finalized through our admin team</li>
</ul>

<h2>5. User Responsibilities</h2>
<p>You agree to:</p>
<ul>
<li>Provide truthful and accurate information</li>
<li>Conduct your own due diligence on all investments</li>
<li>Not misuse or attempt to circumvent our platform</li>
<li>Respect the privacy of other users</li>
</ul>

<h2>6. Intellectual Property</h2>
<p>All content, trademarks, and intellectual property on Investors Hub are owned by us or our licensors. Unauthorized use is prohibited.</p>

<h2>7. Limitation of Liability</h2>
<p>Investors Hub is not liable for:</p>
<ul>
<li>Investment losses or financial damages</li>
<li>Disputes between users</li>
<li>Accuracy of user-provided information</li>
<li>Service interruptions or technical issues</li>
</ul>

<h2>8. Termination</h2>
<p>We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.</p>

<h2>9. Governing Law</h2>
<p>These terms are governed by the laws of [Jurisdiction], without regard to conflict of law principles.</p>

<h2>10. Contact</h2>
<p>For questions about these terms, contact legal@investorshub.com</p>`
    },
    {
      id: 'contact',
      title: 'Contact Us',
      slug: '/contact',
      lastUpdated: '2024-01-18',
      status: 'published',
      content: `<h1>Contact Investors Hub</h1>

<p>We're here to help! Whether you have questions about our platform, need support, or want to discuss an investment opportunity, our team is ready to assist.</p>

<h2>Get In Touch</h2>

<div class="contact-methods">
<h3>General Inquiries</h3>
<p><strong>Email:</strong> info@investorshub.com<br>
<strong>Phone:</strong> +1 (555) 123-4567<br>
<strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST</p>

<h3>Investment Support</h3>
<p><strong>Email:</strong> investments@investorshub.com<br>
<strong>Phone:</strong> +1 (555) 123-4568<br>
For questions about listings, investment processes, and opportunities</p>

<h3>Technical Support</h3>
<p><strong>Email:</strong> support@investorshub.com<br>
Available 24/7 for platform issues and technical assistance</p>

<h3>Media & Press</h3>
<p><strong>Email:</strong> press@investorshub.com<br>
For media inquiries, press releases, and partnership opportunities</p>
</div>

<h2>Office Location</h2>
<p>Investors Hub Headquarters<br>
123 Finance Street, Suite 4500<br>
New York, NY 10004<br>
United States</p>

<p><em>Please note: We do not accept walk-in visits. All meetings are by appointment only.</em></p>

<h2>Social Media</h2>
<p>Connect with us on social media for updates and industry insights:</p>
<ul>
<li>LinkedIn: @InvestorsHub</li>
<li>Twitter: @InvestorsHub</li>
<li>Instagram: @InvestorsHub</li>
</ul>`
    },
    {
      id: 'how-it-works',
      title: 'How It Works',
      slug: '/how-it-works',
      lastUpdated: '2024-01-12',
      status: 'published',
      content: `<h1>How Investors Hub Works</h1>

<p>Investors Hub connects serious investors with exclusive property opportunities through a curated, privacy-focused platform. Here's how our process works:</p>

<h2>For Investors</h2>

<h3>1. Create Your Account</h3>
<p>Sign up and complete our verification process. We verify all investors to maintain platform integrity and ensure you're matched with legitimate opportunities.</p>

<h3>2. Browse Curated Listings</h3>
<p>Access our exclusive collection of pre-vetted property investments. Each listing includes detailed information while protecting sensitive location data through our privacy features.</p>

<h3>3. Express Your Interest</h3>
<p>When you find an opportunity that matches your criteria, submit a formal interest request through our platform. Include your investment parameters and any specific questions.</p>

<h3>4. Admin-Facilitated Connection</h3>
<p>Our admin team reviews your request and facilitates the introduction. We never allow direct contact between parties to maintain privacy and security.</p>

<h3>5. Offline Negotiation</h3>
<p>All deal negotiations, due diligence, and transactions are handled offline through our admin team, ensuring professionalism and security throughout the process.</p>

<h2>For Property Owners</h2>

<h3>1. Submit Your Listing</h3>
<p>Contact our team to submit your property for consideration. We conduct thorough vetting to ensure quality and legitimacy.</p>

<h3>2. Professional Listing Creation</h3>
<p>Our team creates a compelling listing with professional photography and detailed information while maintaining your desired privacy level.</p>

<h3>3. Targeted Exposure</h3>
<p>Your property is showcased to our network of verified, qualified investors actively seeking opportunities in your market segment.</p>

<h3>4. Qualified Leads Only</h3>
<p>We pre-screen all investor inquiries and forward only serious, qualified leads to you through our admin team.</p>

<h3>5. Secure Transactions</h3>
<p>Our team coordinates all communications and facilitates the transaction process, ensuring professionalism at every step.</p>

<h2>Why Our Process Works</h2>
<ul>
<li><strong>Privacy Protection:</strong> No direct contact means enhanced security for all parties</li>
<li><strong>Quality Control:</strong> Every listing and investor is vetted by our team</li>
<li><strong>Professional Service:</strong> Admin facilitation ensures smooth, professional interactions</li>
<li><strong>Time Efficiency:</strong> Only qualified matches are connected, saving everyone time</li>
</ul>`
    }
  ]);

  const currentPage = pages.find(p => p.id === selectedPage);

  const handleSave = () => {
    setIsSaving(true);
    // TODO: API call to save page content
    setTimeout(() => {
      setIsSaving(false);
      alert('Page content saved successfully!');
    }, 1000);
  };

  const handleContentChange = (newContent: string) => {
    setPages(pages.map(p => 
      p.id === selectedPage ? { ...p, content: newContent } : p
    ));
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-serif text-white mb-1">Content Management System</h1>
        <p className="text-sm text-gray-400">Edit and manage website pages and content</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Pages Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-4">
            <h2 className="text-lg font-serif text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#D4AF37]" />
              Pages
            </h2>
            <div className="space-y-2">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => {
                    setSelectedPage(page.id);
                    setEditMode(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedPage === page.id
                      ? 'bg-[#D4AF37]/20 border border-[#D4AF37]'
                      : 'bg-[#1A1A1A] border border-transparent hover:border-[#D4AF37]/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-white font-medium text-sm">{page.title}</p>
                    {page.status === 'published' ? (
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    ) : (
                      <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-gray-400 text-xs">{page.slug}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Updated {new Date(page.lastUpdated).toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-3">
          <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg">
            {/* Editor Header */}
            <div className="border-b border-[#D4AF37]/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-serif text-white mb-1">{currentPage?.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{currentPage?.slug}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Last updated: {new Date(currentPage?.lastUpdated || '').toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditMode(!editMode)}
                    className="flex items-center gap-2"
                  >
                    {editMode ? (
                      <>
                        <Eye className="w-4 h-4" />
                        Preview
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2"
                    size="sm"
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>

              {/* Editor Toolbar (when in edit mode) */}
              {editMode && (
                <div className="flex items-center gap-2 p-3 bg-[#1A1A1A] rounded-lg border border-[#D4AF37]/10">
                  <button className="px-3 py-1 bg-[#0A0A0A] rounded text-gray-300 hover:text-white text-sm">
                    <strong>B</strong>
                  </button>
                  <button className="px-3 py-1 bg-[#0A0A0A] rounded text-gray-300 hover:text-white text-sm">
                    <em>I</em>
                  </button>
                  <button className="px-3 py-1 bg-[#0A0A0A] rounded text-gray-300 hover:text-white text-sm">
                    H1
                  </button>
                  <button className="px-3 py-1 bg-[#0A0A0A] rounded text-gray-300 hover:text-white text-sm">
                    H2
                  </button>
                  <div className="w-px h-6 bg-[#D4AF37]/20 mx-2"></div>
                  <button className="px-3 py-1 bg-[#0A0A0A] rounded text-gray-300 hover:text-white text-sm">
                    Link
                  </button>
                  <button className="px-3 py-1 bg-[#0A0A0A] rounded text-gray-300 hover:text-white text-sm">
                    Image
                  </button>
                  <button className="px-3 py-1 bg-[#0A0A0A] rounded text-gray-300 hover:text-white text-sm">
                    List
                  </button>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-6">
              {editMode ? (
                <textarea
                  value={currentPage?.content || ''}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="w-full h-[600px] bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg p-4 text-white font-mono text-sm focus:outline-none focus:border-[#D4AF37] resize-none"
                  placeholder="Enter HTML content here..."
                />
              ) : (
                <div 
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: currentPage?.content || '' }}
                  style={{
                    color: '#e5e5e5',
                  }}
                />
              )}
            </div>

            {/* Editor Footer */}
            <div className="border-t border-[#D4AF37]/20 p-4 bg-[#0A0A0A]">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4 text-gray-400">
                  <span>{currentPage?.content.length} characters</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    HTML Editor
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1 ${
                    currentPage?.status === 'published' ? 'text-green-400' : 'text-orange-400'
                  }`}>
                    {currentPage?.status === 'published' ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Published
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4" />
                        Draft
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              Editor Tips
            </h3>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>• Use HTML tags for formatting: &lt;h1&gt;, &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, etc.</li>
              <li>• Changes are saved as drafts - click "Save Changes" to update the live page</li>
              <li>• Preview your changes before saving to see how they'll appear on the website</li>
              <li>• Maintain consistent formatting across all pages for better user experience</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
