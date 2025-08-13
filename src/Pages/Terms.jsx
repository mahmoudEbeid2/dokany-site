import React from "react";
import "./Terms.css";

const Terms = () => {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1>Terms & Conditions</h1>
        
        <section className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Dokany's services, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on Dokany's website for personal, non-commercial transitory viewing only.
          </p>
          <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul>
            <li>modify or copy the materials</li>
            <li>use the materials for any commercial purpose or for any public display</li>
            <li>attempt to reverse engineer any software contained on Dokany's website</li>
            <li>remove any copyright or other proprietary notations from the materials</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>3. Disclaimer</h2>
          <p>
            The materials on Dokany's website are provided on an 'as is' basis. Dokany makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="terms-section">
          <h2>4. Limitations</h2>
          <p>
            In no event shall Dokany or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Dokany's website, even if Dokany or a Dokany authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        <section className="terms-section">
          <h2>5. Accuracy of Materials</h2>
          <p>
            The materials appearing on Dokany's website could include technical, typographical, or photographic errors. Dokany does not warrant that any of the materials on its website are accurate, complete or current. Dokany may make changes to the materials contained on its website at any time without notice.
          </p>
        </section>

        <section className="terms-section">
          <h2>6. Links</h2>
          <p>
            Dokany has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Dokany of the site. Use of any such linked website is at the user's own risk.
          </p>
        </section>

        <section className="terms-section">
          <h2>7. Modifications</h2>
          <p>
            Dokany may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Service.
          </p>
        </section>

        <section className="terms-section">
          <h2>8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of Egypt and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
        </section>

        <div className="terms-footer">
          <p>Last updated: January 2024</p>
          <p>For questions about these Terms & Conditions, please contact us at legal@dokany.com</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
